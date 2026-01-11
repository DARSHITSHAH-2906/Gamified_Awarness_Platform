import React, { useEffect } from 'react';
import { useMaze } from '../../context/MazeContext';
import clsx from 'clsx';
import { Flag, Trophy, Lock } from 'lucide-react';

export const MazeRenderer: React.FC = () => {
    const { maze, playerPos, visitedCells, movePlayer, solvedPuzzles } = useMaze();

    // Keyboard controls
    useEffect(() => {
        const handleInput = (e: KeyboardEvent) => {
            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') movePlayer('N');
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') movePlayer('S');
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') movePlayer('W');
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') movePlayer('E');
        };

        window.addEventListener('keydown', handleInput);
        return () => window.removeEventListener('keydown', handleInput);
    }, [movePlayer]);

    if (!maze) return (
        <div className="flex items-center justify-center w-full h-full text-cyan-400 font-mono animate-pulse">
            INITIALIZING MAZE GRID...
        </div>
    );

    return (
        // Container - Dark background to act as the "void" or "wall color"
        <div className="flex items-center justify-center w-full h-full bg-slate-950 p-4 lg:p-8 rounded-3xl shadow-2xl overflow-hidden">

            {/* The Maze Grid */}
            <div
                className="grid relative shadow-[0_0_50px_rgba(34,211,238,0.1)] rounded-lg overflow-hidden border-4 border-slate-800"
                style={{
                    // Use standard CSS grid
                    gridTemplateColumns: `repeat(${maze.config.width}, 1fr)`,
                    gridTemplateRows: `repeat(${maze.config.height}, 1fr)`,
                    // Force a max width/height to keep cells square-ish and visible
                    width: 'min(90vw, 80vh)',
                    height: 'min(90vw, 80vh)',
                }}
            >
                {maze.grid.map((row) =>
                    row.map((cell, x) => {
                        const y = cell.y;
                        const isPlayerHere = playerPos.x === x && playerPos.y === y;
                        const isVisited = visitedCells.includes(`${x},${y}`);
                        const isStart = cell.type === 'start';
                        const isExit = cell.type === 'exit';

                        // Logic for "Block" walls:
                        // We use very thick borders. 
                        // To make it look like a grid, every cell has a base border, 
                        // but "Walls" are a different, high-contrast color (or transparent to show background).

                        return (
                            <div
                                key={`${x}-${y}`}
                                className={clsx(
                                    "relative flex items-center justify-center box-border",
                                    // Base Floor Color
                                    "bg-slate-900",
                                    // Visited Trail Color (Slightly lighter path)
                                    isVisited && !isPlayerHere && "bg-slate-800 transition-colors duration-500",

                                    // WALLS: Thick borders to simulate blocks
                                    // We use a lighter slate for the walls to make them look like solid barriers
                                    // The 'border' logic here is: If wall exists, show border. 
                                    cell.walls.N ? "border-t-4 border-slate-600" : "border-t border-t-slate-800/30",
                                    cell.walls.S ? "border-b-4 border-slate-600" : "border-b border-b-slate-800/30",
                                    cell.walls.E ? "border-r-4 border-slate-600" : "border-r border-r-slate-800/30",
                                    cell.walls.W ? "border-l-4 border-slate-600" : "border-l border-l-slate-800/30",
                                )}
                            >
                                {/* Start Marker */}
                                {isStart && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/20">
                                        <Flag className="w-1/2 h-1/2 text-emerald-500" fill="currentColor" />
                                    </div>
                                )}

                                {/* Exit Marker */}
                                {isExit && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-amber-900/20 animate-pulse">
                                        <Trophy className="w-1/2 h-1/2 text-amber-400" fill="currentColor" />
                                    </div>
                                )}

                                {/* Puzzle / Lock Marker */}
                                {cell.puzzleId && !isVisited && !solvedPuzzles.includes(cell.puzzleId) && (
                                    <div className="z-10 animate-bounce">
                                        <Lock className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                    </div>
                                )}

                                {/* Player */}
                                {isPlayerHere && (
                                    <div className="relative w-[60%] h-[60%] z-20">
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                                        {/* Player Dot */}
                                        <div className="relative w-full h-full bg-linear-to-tr from-cyan-400 to-blue-500 rounded-full shadow-inner border-2 border-white"></div>
                                    </div>
                                )}

                                {/* Visited Dot (Breadcrumbs) - purely decorative for empty visited cells */}
                                {isVisited && !isPlayerHere && !isStart && !isExit && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50" />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};