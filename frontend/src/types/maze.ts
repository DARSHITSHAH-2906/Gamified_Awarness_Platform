export type Direction = 'N' | 'S' | 'E' | 'W';

export type PathDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'HIDDEN';

export type CellType = 'path' | 'wall' | 'start' | 'exit' | 'checkpoint' | 'empty';

export interface Coordinates {
    x: number;
    y: number;
}

export interface MazeCell {
    x: number;
    y: number;
    type: CellType;
    walls: {
        [key in Direction]: boolean;
    };
    pathDifficulty?: PathDifficulty;
    puzzleId?: string; // ID of the puzzle associated with this cell
    isVisited: boolean;
    isLocked?: boolean;
}

export type MazeGrid = MazeCell[][];

export interface MazeConfig {
    width: number;
    height: number;
    seed: number; // For deterministic generation
    difficulty: PathDifficulty; // Overall level difficulty
    puzzleDensity: number; // 0 to 1, probability of a cell having a puzzle
}

export interface Maze {
    id: string;
    grid: MazeGrid;
    startPosition: Coordinates;
    exitPosition: Coordinates;
    config: MazeConfig;
}
