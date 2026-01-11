import React, { createContext, useContext, useState } from 'react';
import type { Maze, MazeConfig, Coordinates, Direction } from '../types/maze';
import { MazeGenerator } from '../lib/maze/generator';
import { useAuth } from './AuthContext'; // Import useAuth
import { gameApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface MazeContextType {
    maze: Maze | null;
    playerPos: Coordinates;
    visitedCells: string[]; // "x,y" strings
    isLoading: boolean;
    activePuzzle: string | null;
    solvedPuzzles: string[];
    generateNewMaze: (config: MazeConfig, levelId?: string) => void;
    movePlayer: (direction: Direction) => void;
    checkCollision: (x: number, y: number, direction: Direction) => boolean;
    solvePuzzle: (puzzleId: string) => Promise<void>;
    clearActivePuzzle: () => void;
}

const MazeContext = createContext<MazeContextType | undefined>(undefined);

export const MazeProvider: React.FC<{ children: React.ReactNode; onComplete?: () => void }> = ({ children, onComplete }) => {
    const { updateUser } = useAuth();
    const [maze, setMaze] = useState<Maze | null>(null);
    const [playerPos, setPlayerPos] = useState<Coordinates>({ x: 0, y: 0 });
    const [visitedCells, setVisitedCells] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);
    const [activePuzzle, setActivePuzzle] = useState<string | null>(null);
    const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);

    const generateNewMaze = (config: MazeConfig, levelId?: string) => {
        setIsLoading(true);
        setCurrentLevelId(levelId || null);
        setSolvedPuzzles([]); // Reset solved puzzles for new maze
        setActivePuzzle(null);

        // Small timeout to allow UI to show loading state if needed
        setTimeout(() => {
            const generator = new MazeGenerator(config);
            const newMaze = generator.generate();

            // Prefix Puzzle IDs with Level ID for Uniqueness
            if (levelId) {
                newMaze.grid.forEach(row => {
                    row.forEach(cell => {
                        if (cell.puzzleId) {
                            cell.puzzleId = `${levelId}-${cell.puzzleId}`;
                        }
                    });
                });
            }

            setMaze(newMaze);
            setPlayerPos(newMaze.startPosition);
            setVisitedCells([`${newMaze.startPosition.x},${newMaze.startPosition.y}`]);
            setIsLoading(false);
        }, 10);
    };

    const checkCollision = (x: number, y: number, dir: Direction): boolean => {
        if (!maze) return true;
        const cell = maze.grid[y][x];
        return cell.walls[dir];
    };

    const movePlayer = async (dir: Direction) => {
        if (!maze || activePuzzle) return; // Block move if puzzle active

        const { x, y } = playerPos;
        if (checkCollision(x, y, dir)) {
            return; // Hit a wall
        }

        let newX = x;
        let newY = y;

        switch (dir) {
            case 'N': newY--; break;
            case 'S': newY++; break;
            case 'E': newX++; break;
            case 'W': newX--; break;
        }

        // Boundary check
        if (newX >= 0 && newX < maze.config.width && newY >= 0 && newY < maze.config.height) {
            const targetCell = maze.grid[newY][newX];

            // Check for Puzzle
            if (targetCell.puzzleId && !solvedPuzzles.includes(targetCell.puzzleId)) {
                setActivePuzzle(targetCell.puzzleId);
                return; // Stop movement until solved
            }

            setPlayerPos({ x: newX, y: newY });

            const cellKey = `${newX},${newY}`;
            if (!visitedCells.includes(cellKey)) {
                setVisitedCells(prev => [...prev, cellKey]);
            }

            if (targetCell.type === 'exit') {
                if (currentLevelId) {
                    try {
                        const res = await gameApi.completeLevel(currentLevelId, solvedPuzzles);

                        if (res.data) {
                            updateUser({
                                xp: res.data.xp,
                                progress: res.data.progress
                            });
                        }

                        toast.success(res.data.message);
                    } catch (e) {
                        console.error("Failed to complete level", e);
                        toast.error("Failed to save progress.");
                    }
                }

                if (onComplete) {
                    setTimeout(() => {
                        onComplete();
                    }, 1500);
                }
            }
        }
    };

    const solvePuzzle = async (puzzleId: string) => {
        try {
            setSolvedPuzzles(prev => [...prev, puzzleId]);
            setActivePuzzle(null);

            toast.success(`Lock Open!`, { icon: '🔓' });

        } catch (error) {
            console.error("Failed to solve puzzle", error);
        }
    };

    const clearActivePuzzle = () => {
        setActivePuzzle(null);
    };

    return (
        <MazeContext.Provider value={{
            maze,
            playerPos,
            visitedCells,
            isLoading,
            activePuzzle,
            solvedPuzzles,
            generateNewMaze,
            movePlayer,
            checkCollision,
            solvePuzzle,
            clearActivePuzzle
        }}>
            {children}
        </MazeContext.Provider>
    );
};

export const useMaze = () => {
    const context = useContext(MazeContext);
    if (context === undefined) {
        throw new Error('useMaze must be used within a MazeProvider');
    }
    return context;
};
