import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { gameApi } from '../../../lib/api';
import { toast } from 'react-hot-toast';

// Import Game Components (will be created next)
import { DragDropGame } from './DragDropGame';
import { DragOrderGame } from './DragOrderGame';
import { ScenarioGame } from './ScenarioGame';
import { TapSelectGame } from './TapSelectGame';
import { StoryGame } from './StoryGame';
import { VideoStoryGame } from './VideoStoryGame';
import { TimeChallengeGame } from './TimeChallengeGame';
import { QuizGame } from './QuizGame';
import { ReflectionGame } from './ReflectionGame';

interface ChallengeGameProps {
    level: any;
    onClose: () => void;
    mode?: 'sequence' | 'single';
    puzzleId?: string;
}

export const ChallengeGame = ({ level, onClose, mode = 'sequence', puzzleId }: ChallengeGameProps) => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (level) {
            // New Logic: Use level.challenges if available
            if (level.challenges && level.challenges.length > 0) {
                if (mode === 'single' && puzzleId) {
                    const foundChallenge = level.challenges.find((c: any) => c._id === puzzleId);
                    if (foundChallenge) {
                        setChallenges([foundChallenge]);
                    } else {
                        console.error("Challenge not found for ID:", puzzleId);
                        setChallenges([]);
                    }
                } else {
                    setChallenges(level.challenges);
                }
                setLoading(false);
                return;
            }
        } else {
            toast.error("Level not found");
            onClose();
        }
    }, [level, mode, puzzleId]);

    const handleChallengeComplete = async (xp: number) => {
        try {
            // Use the XP from the challenge logic or the default passed value
            const earnedXp = challenges[currentIndex].xp || xp;
            setScore(prev => prev + earnedXp);
            toast.success(`Challenge Solved! +${earnedXp} XP`, { icon: '✅' });

            // Next Challenge Logic
            if (currentIndex < challenges.length - 1) {
                setTimeout(() => setCurrentIndex(prev => prev + 1), 1000);
            } else {
                setGameOver(true);
                // If single mode, we might want to just close automaticall or show small victory?
                if (mode === 'single') {
                    // In maze mode, we don't complete the whole level here.
                    setTimeout(onClose, 1500);
                    return;
                }
            }
        } catch (error) {
            console.error("XP Error", error);
            if (currentIndex < challenges.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setGameOver(true);
                if (mode === 'single') {
                    setTimeout(onClose, 1500);
                }
            }
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Challenges...</div>;

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white">
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="bg-white/10 p-8 rounded-3xl backdrop-blur-md text-center border border-white/20"
                >
                    <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Level Complete!</h2>
                    <p className="text-xl mb-6">You earned {score} XP!</p>
                    <button onClick={onClose} className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-xl font-bold transition-colors">
                        Continue Adventure
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentChallenge = challenges[currentIndex];

    // Identify game component
    // Identify game component
    let GameComponent;
    const type = currentChallenge.type;
    const gameType = currentChallenge.gameType;

    if (type === 'story' && gameType === 'story_video') {
        GameComponent = VideoStoryGame;
    } else if (type === 'true_false_quiz') {
        GameComponent = QuizGame;
    } else if (type === 'reflection_story') {
        GameComponent = ReflectionGame;
    } else if (type === 'drag_and_match') {
        GameComponent = DragOrderGame;
    }
    // Legacy / Generic types
    else if (type === 'drag') {
        GameComponent = DragDropGame;
    } else if (type === 'situation') {
        GameComponent = ScenarioGame;
    } else if (type === 'tap') {
        GameComponent = TapSelectGame;
    } else if (type === 'story') {
        GameComponent = StoryGame;
    } else if (type === 'time') {
        GameComponent = TimeChallengeGame;
    } else {
        GameComponent = () => <div className="text-white p-4">Unknown Game Type: {type} {gameType && `(${gameType})`}</div>;
    }

    return (
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-2 md:p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-white/10 p-3 rounded-2xl backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-white/60 font-bold text-sm md:text-base">Challenge {currentIndex + 1}/{challenges.length}</span>
                    <div className="h-2 w-24 md:w-32 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 transition-all duration-500"
                            style={{ width: `${((currentIndex) / challenges.length) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg md:text-xl">
                    <Star fill="currentColor" size={20} /> {score} XP
                </div>
            </div>

            {/* Game Area */}
            <div className="flex-1 relative min-h-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="h-full"
                    >
                        <GameComponent
                            data={currentChallenge.data || currentChallenge} // Support both new nested data and legacy flat structure
                            onComplete={handleChallengeComplete}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
