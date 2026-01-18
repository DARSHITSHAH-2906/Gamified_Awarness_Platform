import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeChallengeGameProps {
    data: {
        questions: {
            q: string;
            a: string[];
        }[];
    };
    onComplete: (xp: number) => void;
}

export const TimeChallengeGame = ({ data, onComplete }: TimeChallengeGameProps) => {
    // Game State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // 30s total for all questions
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0); // Track logic score internally

    // Current Question State
    const [currentOptions, setCurrentOptions] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const questions = data.questions || [];

    // Initialize Question
    useEffect(() => {
        if (!gameStarted || gameOver || !questions[currentIndex]) return;

        const currentQ = questions[currentIndex];

        // Pick ONE correct answer to display
        const correct = currentQ.a[0]; // Always pick the first one as the 'target' correct answer
        setCorrectAnswer(correct);

        // Generate Distractors
        const commonDistractors = [
            'Ignore', 'Run away', 'Hide', 'Cry', 'Give up', 'Forget',
            'Panic', 'Wait', 'Nothing', 'Sleep', 'Stay silent', 'Avoid'
        ];

        // Filter distractors that are NOT in the correct answers list
        const availableDistractors = commonDistractors.filter(d => !currentQ.a.includes(d));
        const distractors = availableDistractors.sort(() => Math.random() - 0.5).slice(0, 3);

        // Combine and Shuffle
        const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
        setCurrentOptions(options);

    }, [currentIndex, gameStarted, gameOver, questions]);

    // Timer Logic
    useEffect(() => {
        if (gameStarted && !gameOver) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleGameOver();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                if (timerRef.current) clearInterval(timerRef.current);
            };
        }
    }, [gameStarted, gameOver]);

    const handleGameOver = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameOver(true);
        setTimeout(() => onComplete(score), 2000);
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setTimeLeft(30);
        setCurrentIndex(0);
        setScore(0);
    };

    const handleOptionClick = (option: string) => {
        if (selectedOption || gameOver) return; // Prevent double clicking
        setSelectedOption(option);

        const isCorrect = option === correctAnswer;

        if (isCorrect) {
            setFeedback({ type: 'correct', message: '+2s Correct!' });
            setTimeLeft(prev => prev + 2);
            setScore(prev => prev + 2); // 2 XP per correct answer
        } else {
            setFeedback({ type: 'wrong', message: '-1s Wrong!' });
            setTimeLeft(prev => Math.max(0, prev - 1));
        }

        // Wait brief moment then go to next question
        setTimeout(() => {
            setFeedback(null);
            setSelectedOption(null);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // No more questions? Loop or End? 
                // Let's end for now, users can replay if they want high score
                handleGameOver();
            }
        }, 800);
    };

    if (!questions.length) return <div className="text-center p-10">No questions loaded.</div>;

    const currentQ = questions[currentIndex];

    return (
        <div className="flex flex-col items-center justify-start md:justify-center w-full h-full p-4 overflow-y-auto overflow-x-hidden bg-linear-to-br from-[#fff5f0] via-white to-[#fff5f0]">
            {!gameStarted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl my-auto border-2 border-[#ff8c42]"
                >
                    <div className="text-7xl mb-4 animate-bounce">⚡</div>
                    <h2 className="text-4xl font-black text-[#ff6b35] mb-4">Speed Blitz!</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Answer as many as you can!
                        <br />
                        <span className="font-bold text-green-600">+2s per correct</span>
                        <br />
                        <span className="font-bold text-red-500">-1s per wrong</span>
                    </p>
                    <button
                        onClick={handleStartGame}
                        className="bg-linear-to-r from-[#ff6b35] to-[#ff8c42] text-white py-4 px-12 rounded-full text-xl font-bold uppercase shadow-lg hover:scale-105 transition-transform"
                    >
                        Start Blitz
                    </button>
                </motion.div>
            ) : (
                <div className="max-w-3xl w-full flex flex-col gap-4 animate-fadeInUp my-auto">
                    {/* Header: Timer & Score */}
                    <div className="flex justify-between items-center px-4">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <span className="text-2xl">⚡</span>
                            <span className="text-xl font-bold text-gray-700">{currentIndex + 1}/{questions.length}</span>
                        </div>

                        <div className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-2xl shadow-md transition-colors
                            ${timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-[#ff6b35]'}`}>
                            <span>⏱️ {timeLeft}s</span>
                        </div>
                    </div>

                    {/* Feedback Overlay */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
                            >
                                <div className={`text-5xl font-black px-12 py-8 rounded-3xl shadow-2xl backdrop-blur-sm border-4
                                    ${feedback.type === 'correct' ? 'bg-green-100/90 text-green-600 border-green-500' : 'bg-red-100/90 text-red-600 border-red-500'}`}>
                                    {feedback.message}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Question Card */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-[3px] border-[#ff8c42] text-center min-h-[160px] flex items-center justify-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-[#ff6b35] leading-tight">
                            {currentQ?.q}
                        </h2>
                    </motion.div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {currentOptions.map((option, idx) => {
                            const isSelected = selectedOption === option;
                            const isCorrect = option === correctAnswer;

                            let statusClass = "bg-white border-[#ff8c42] text-gray-800 hover:bg-[#fff5f0]";
                            if (selectedOption) {
                                if (isSelected && isCorrect) statusClass = "bg-green-500 border-green-600 text-white";
                                else if (isSelected && !isCorrect) statusClass = "bg-red-500 border-red-600 text-white";
                                else if (isCorrect) statusClass = "bg-green-100 border-green-400 text-green-700 opacity-70"; // Show correct answer if wrong
                                else statusClass = "opacity-50";
                            }

                            return (
                                <motion.button
                                    key={`${currentIndex}-${idx}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={!!selectedOption}
                                    className={`relative p-5 rounded-xl text-xl font-bold border-b-4 border-r-4 transition-all active:border-b-0 active:border-r-0 active:translate-y-1
                                    ${statusClass}`}
                                >
                                    {option}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="text-8xl mb-4">🏆</div>
                        <h2 className="text-4xl font-black text-[#ff6b35]">Time's Up!</h2>
                        <p className="text-2xl text-gray-600 mt-2">Score: {score} XP</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
