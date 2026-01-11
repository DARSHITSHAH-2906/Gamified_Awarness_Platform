import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { gameApi } from '../../../lib/api';
import { toast } from 'react-hot-toast';

// Import Game Components (will be created next)
import { DragDropGame } from './DragDropGame';
import { ScenarioGame } from './ScenarioGame';
import { TapSelectGame } from './TapSelectGame';
import { StoryGame } from './StoryGame';
import { TimeChallengeGame } from './TimeChallengeGame';

interface ChallengeGameProps {
    level: any;
    onClose: () => void;
    mode?: 'sequence' | 'single';
}

export const ChallengeGame = ({ level, onClose, mode = 'sequence' }: ChallengeGameProps) => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (level && level.games) {
            // Flatten games into a sequence
            const sequence: any[] = [];

            if (level.games.drag) level.games.drag.forEach((g: any, i: number) => sequence.push({ ...g, type: 'drag', id: `drag-${i}` }));
            if (level.games.situation) level.games.situation.forEach((g: any, i: number) => sequence.push({ ...g, type: 'situation', id: `situation-${i}` }));
            if (level.games.tap) level.games.tap.forEach((g: any, i: number) => sequence.push({ ...g, type: 'tap', id: `tap-${i}` }));
            if (level.games.story) level.games.story.forEach((g: any, i: number) => sequence.push({ ...g, type: 'story', id: `story-${i}` }));

            // Group all time challenges into one continuous "Blitz" game
            if (level.games.time && level.games.time.length > 0) {
                sequence.push({
                    type: 'time',
                    id: 'time-blitz',
                    questions: level.games.time // Pass all time questions here
                });
            }

            if (mode === 'single' && sequence.length > 0) {
                // Pick one random challenge
                const randomChallenge = sequence[Math.floor(Math.random() * sequence.length)];
                setChallenges([randomChallenge]);
            } else {
                setChallenges(sequence);
            }

            setLoading(false);
        }
    }, [level, mode]);

    const handleChallengeComplete = async (xp: number) => {
        try {

            setScore(prev => prev + xp);
            toast.success("Challenge Solved!", { icon: '✅' });

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
    let GameComponent;
    switch (currentChallenge.type) {
        case 'drag': GameComponent = DragDropGame; break;
        case 'situation': GameComponent = ScenarioGame; break;
        case 'tap': GameComponent = TapSelectGame; break;
        case 'story': GameComponent = StoryGame; break;
        case 'time': GameComponent = TimeChallengeGame; break;
        default: GameComponent = () => <div>Unknown Game Type</div>;
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
                            data={currentChallenge}
                            onComplete={handleChallengeComplete}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
