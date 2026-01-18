import type { Maze, MazeConfig, MazeGrid, Direction, MazeCell } from '../../types/maze';

// Simple Linear Congruential Generator for deterministic randomness
class Random {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    // Returns a float between 0 and 1
    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    // Returns an integer between min (inclusive) and max (exclusive)
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min) + min);
    }

    // Helper to shuffle arrays deterministically
    shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

const DIRECTIONS: Direction[] = ['N', 'S', 'E', 'W'];
const OPPOSITE: Record<Direction, Direction> = { 'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E' };

export class MazeGenerator {
    private config: MazeConfig;
    private rng: Random;
    private grid: MazeGrid = [];

    constructor(config: MazeConfig) {
        this.config = config;
        this.rng = new Random(config.seed);
    }

    generate(): Maze {
        const { width, height } = this.config;

        // Initialize grid with full walls
        this.grid = Array(height).fill(null).map((_, y) =>
            Array(width).fill(null).map((_, x) => ({
                x,
                y,
                type: 'path',
                walls: { N: true, S: true, E: true, W: true },
                isVisited: false,
                pathDifficulty: this.config.difficulty
            }))
        );

        const startX = 0;
        const startY = 0;
        
        // 1. Generate the Maze Structure
        const startCell = this.grid[startY][startX];
        startCell.isVisited = true;
        
        // Start carving
        this.carvePassagesFrom(startX, startY);

        // 2. Define Start and Exit
        startCell.type = 'start';
        
        const exitX = width - 1;
        const exitY = height - 1;
        this.grid[exitY][exitX].type = 'exit';

        // 3. Add Complexity (Loops)
        // We add loops to make the maze "forgiving" (easier to find a way out of dead ends)
        this.addComplexity();

        // 4. Smart Puzzle Placement based on Difficulty/Distance
        this.assignPuzzles(startX, startY);

        return {
            id: `maze-${this.config.seed}`,
            grid: this.grid,
            startPosition: { x: startX, y: startY },
            exitPosition: { x: exitX, y: exitY },
            config: this.config
        };
    }

    private carvePassagesFrom(cx: number, cy: number, lastDirection?: Direction) {
        let directions = [...DIRECTIONS];

        // LOGIC CHANGE: Simplify Complexity
        // To make the maze easier for children (8-12), we bias heavily towards
        // continuing in the same direction. This creates long straight corridors 
        // which are easier to visually track than "zigzag" mazes.
        if (lastDirection && this.rng.next() > 0.35) {
             // 65% chance to keep going straight if possible
            directions = this.shuffleWithout(directions, lastDirection);
            directions.unshift(lastDirection);
        } else {
            directions = this.rng.shuffle(directions);
        }

        directions.forEach(dir => {
            const [nx, ny] = this.getNeighborCoords(cx, cy, dir);

            if (this.isValid(nx, ny) && !this.grid[ny][nx].isVisited) {
                this.grid[ny][nx].isVisited = true;

                // Knock down walls
                this.grid[cy][cx].walls[dir] = false;
                this.grid[ny][nx].walls[OPPOSITE[dir]] = false;

                this.carvePassagesFrom(nx, ny, dir);
            }
        });
    }

    // Adds loops to make the maze easier to navigate (fewer punishing dead ends)
    private addComplexity() {
        const { width, height } = this.config;
        
        // Slightly higher loop chance for easier navigation
        const loopChance = 0.05; 

        const extraPaths = Math.max(1, Math.floor((width * height) * loopChance));

        for (let i = 0; i < extraPaths; i++) {
            const x = this.rng.nextInt(1, width - 1);
            const y = this.rng.nextInt(1, height - 1);
            const dir = DIRECTIONS[this.rng.nextInt(0, 4)];
            const [nx, ny] = this.getNeighborCoords(x, y, dir);

            if (this.isValid(nx, ny)) {
                if (this.grid[y][x].walls[dir]) {
                    this.grid[y][x].walls[dir] = false;
                    this.grid[ny][nx].walls[OPPOSITE[dir]] = false;
                }
            }
        }
    }

    // BFS to calculate distance from start for every cell
    private calculateDistances(startX: number, startY: number): Map<string, number> {
        const distances = new Map<string, number>();
        const queue: { x: number, y: number, dist: number }[] = [{ x: startX, y: startY, dist: 0 }];
        const visited = new Set<string>();

        visited.add(`${startX},${startY}`);
        distances.set(`${startX},${startY}`, 0);

        while (queue.length > 0) {
            const { x, y, dist } = queue.shift()!;

            // Check all valid neighbors (where there is no wall)
            DIRECTIONS.forEach(dir => {
                // If there is NO wall in this direction
                if (!this.grid[y][x].walls[dir]) {
                    const [nx, ny] = this.getNeighborCoords(x, y, dir);
                    const key = `${nx},${ny}`;
                    
                    if (this.isValid(nx, ny) && !visited.has(key)) {
                        visited.add(key);
                        distances.set(key, dist + 1);
                        queue.push({ x: nx, y: ny, dist: dist + 1 });
                    }
                }
            });
        }
        return distances;
    }

    private assignPuzzles(startX: number, startY: number) {

        // 1. Calculate true walking distance to every cell
        const distanceMap = this.calculateDistances(startX, startY);
        
        // Find the maximum distance in the maze to normalize logic
        let maxDist = 0;
        for (const dist of distanceMap.values()) maxDist = Math.max(maxDist, dist);

        // 2. Bucket cells by difficulty/distance
        // We prefer Dead Ends for puzzles, but will use paths if needed.
        const buckets = {
            easy: [] as MazeCell[],
            moderate: [] as MazeCell[],
            hard: [] as MazeCell[]
        };

        this.grid.flat().forEach(cell => {
            if (cell.type === 'start' || cell.type === 'exit') return;

            const dist = distanceMap.get(`${cell.x},${cell.y}`) || 0;            
            // Weight dead ends higher for selection by adding them multiple times or handling logic below
            // Here we just categorize strictly by distance zones.
            
            // Easy: First 25% of the path
            if (dist > 2 && dist < maxDist * 0.25) {
                buckets.easy.push(cell);
            }
            // Moderate: 25% to 75% of the path
            else if (dist >= maxDist * 0.25 && dist < maxDist * 0.75) {
                buckets.moderate.push(cell);
            }
            // Hard: Last 25% of the path
            else if (dist >= maxDist * 0.75) {
                buckets.hard.push(cell);
            }
        });

        // Shuffle buckets to pick random spots within the correct zones
        buckets.easy = this.rng.shuffle(buckets.easy);
        buckets.moderate = this.rng.shuffle(buckets.moderate);
        buckets.hard = this.rng.shuffle(buckets.hard);

        // 3. Assign IDs
        // We prioritize dead ends within the buckets if possible, otherwise take any cell
        const assign = (bucket: MazeCell[], count: number, prefix: string) => {
            // Sort bucket so Dead Ends are at the front (preferred for puzzles)
            // This ensures hard puzzles are deep in dead ends if possible
            bucket.sort((a, b) => {
                const aWalls = Object.values(a.walls).filter(w => w).length;
                const bWalls = Object.values(b.walls).filter(w => w).length;
                return bWalls - aWalls; // Descending order of walls (3 = dead end)
            });

            for (let i = 0; i < count; i++) {
                if (bucket.length === 0) break;
                const cell = bucket.shift()!;
                cell.puzzleId = `${prefix}-${i + 1}`; // e.g., 'easy-1', 'hard-2'
            }
        };

        assign(buckets.easy, 4, 'easy');
        assign(buckets.moderate, 4, 'moderate');
        assign(buckets.hard, 2, 'hard');
    }

    private shuffleWithout<T>(array: T[], exclude: T): T[] {
        const filtered = array.filter(item => item !== exclude);
        return this.rng.shuffle(filtered);
    }

    private getNeighborCoords(x: number, y: number, dir: Direction): [number, number] {
        switch (dir) {
            case 'N': return [x, y - 1];
            case 'S': return [x, y + 1];
            case 'E': return [x + 1, y];
            case 'W': return [x - 1, y];
        }
    }

    private isValid(x: number, y: number): boolean {
        return x >= 0 && x < this.config.width && y >= 0 && y < this.config.height;
    }
}