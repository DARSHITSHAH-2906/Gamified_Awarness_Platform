import { useEffect, useState } from 'react';
import { useMaze } from '../../context/MazeContext';
import { MazeRenderer } from './MazeRenderer';
import { ChallengeGame } from './challenges/ChallengeGame';
import { gameApi } from '@/lib/api';
import { AnimatePresence, motion } from 'framer-motion';

interface MazeGameProps {
    levelId?: string;
}

export const MazeGame = ({ levelId }: MazeGameProps) => {
    const { generateNewMaze, activePuzzle, solvePuzzle, clearActivePuzzle } = useMaze();
    const [levelData, setLevelData] = useState<any>(null);

    useEffect(() => {
        // Fetch Level Data for the challenges
        const initLevel = async () => {
            if (levelId) {
                try {
                    const res = await gameApi.getLevel(levelId);
                    const data = res.data;
                    console.log(data);
                    setLevelData(data);

                    // Generate maze AFTER knowing if we have games
                    const hasGames = data.games && Object.keys(data.games).length > 0;

                    generateNewMaze({
                        width: 20,
                        height: 20,
                        seed: Date.now(),
                        difficulty: 'EASY',
                        puzzleDensity: hasGames ? 0.1 : 0
                    }, levelId, data.challenges);

                } catch (e) {
                    console.error("Failed to load level data", e);
                    // Fallback generation if fetch fails
                    generateNewMaze({
                        width: 20,
                        height: 20,
                        seed: Date.now(),
                        difficulty: 'EASY',
                        puzzleDensity: 0
                    }, levelId);
                }
            } else {
                // No level ID, just demo maze
                generateNewMaze({
                    width: 20,
                    height: 20,
                    seed: Date.now(),
                    difficulty: 'EASY',
                    puzzleDensity: 0
                });
            }
        };
        initLevel();
    }, [levelId]);

    const handleChallengeComplete = () => {
        if (activePuzzle) {
            solvePuzzle(activePuzzle);
        }
    };

    return (
        <div className="flex items-center justify-around w-full h-full p-4 relative">
            <AnimatePresence>
                {activePuzzle && levelData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-4"
                    >
                        <div className="w-full max-w-5xl h-[95vh] bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden relative shadow-2xl">
                            <button
                                onClick={clearActivePuzzle}
                                className="absolute top-4 right-4 text-white/50 hover:text-white z-50 bg-black/20 rounded-full px-3 py-1 text-sm font-bold backdrop-blur-sm transition-all hover:bg-black/40"
                            >
                                Cancel
                            </button>
                            <ChallengeGame
                                level={levelData}
                                onClose={handleChallengeComplete}
                                mode="single"
                                puzzleId={activePuzzle}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-4 shrink-0 px-8">
                <h2 className="text-3xl font-display text-white text-center">Level Challenge</h2>

                <div className="mt-1 w-[70vw] min-h-0 bg-slate-900 p-4 rounded-xl border-4 border-slate-700 shadow-2xl relative overflow-hidden">
                    <MazeRenderer />
                </div>
            </div>

            <div className="mt-4 shrink-0 text-slate-300 font-nunito text-center max-w-md bg-slate-800/80 p-3 rounded-xl backdrop-blur-sm">
                <p>Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to move.</p>
                <p className="text-sm mt-1 text-slate-400">Reach the <span className="text-yellow-400 font-bold">Trophy</span> to complete the level!</p>
                <div className="mt-2 flex gap-4 justify-center text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-cyan-500 rounded-full"></span> Lock = Challenge</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-700 rounded-full"></span> Wall</span>
                </div>
            </div>
        </div>
    );
};
