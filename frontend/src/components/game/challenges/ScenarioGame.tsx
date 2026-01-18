import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScenarioGameProps {
    data: {
        q: string;  // Scenario/situation text
        a: string;  // Correct response/action
    };
    onComplete: (xp: number) => void;
}

export const ScenarioGame = ({ data, onComplete }: ScenarioGameProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Generate wrong options (distractors) based on common unsafe/incorrect choices
    const generateWrongOptions = (): string[] => {
        const commonWrongChoices = [
            'Ignore it',
            'Do nothing',
            'Keep quiet',
            'Run away',
            'Hide it',
            'Lie about it',
            'Agree to it',
            'Share with everyone',
            'Panic',
            'Give up',
            'Stay silent',
            'Avoid the situation',
            'Pretend it didn\'t happen',
            'Blame someone else'
        ];

        // Filter out choices that are too similar to the correct answer
        const filtered = commonWrongChoices.filter(choice =>
            choice.toLowerCase() !== data.a.toLowerCase() &&
            !data.a.toLowerCase().includes(choice.toLowerCase().slice(0, 5))
        );

        // Shuffle and pick 2-3 wrong options
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    };

    const wrongOptions = generateWrongOptions();
    const allOptions = [data.a, ...wrongOptions].sort(() => Math.random() - 0.5);

    const handleOptionSelect = (option: string, index: number) => {
        if (showFeedback) return; // Prevent multiple clicks

        setSelectedOption(index);
        setShowFeedback(true);

        const correct = option === data.a;
        setIsCorrect(correct);

        // Wait for feedback animation, then complete
        setTimeout(() => {
            if (correct) {
                onComplete(3); // 3 XP for scenario games
            } else {
                // Show error briefly then allow retry
                setShowFeedback(false);
                setSelectedOption(null);
            }
        }, correct ? 1500 : 1000);
    };

    return (
        <div className="flex flex-col items-center justify-start md:justify-center w-full h-full p-4 overflow-y-auto overflow-x-hidden bg-linear-to-br from-[#fff5f0] via-white to-[#fff5f0]">
            <div className="max-w-3xl w-full flex flex-col gap-4 my-auto">
                {/* Scenario Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(255,107,53,0.15)] border-[3px] border-[#ff8c42] overflow-hidden"
                >
                    <div className="absolute -top-8 -right-8 text-[8rem] opacity-[0.03] pointer-events-none select-none">🤔</div>
                    <div className="text-5xl text-center mb-2 animate-bounce">🤔</div>
                    <h3 className="text-center text-xl font-bold text-[#ff6b35] mb-2 uppercase tracking-wide">Situation</h3>
                    <p className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed font-medium">{data.q}</p>
                </motion.div>

                {/* Feedback Display */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-lg font-bold shadow-lg
                            ${isCorrect
                                    ? 'bg-linear-to-br from-green-500 to-green-600 text-white border-2 border-green-600'
                                    : 'bg-linear-to-br from-red-500 to-red-600 text-white border-2 border-red-600 animate-shake'}`}
                        >
                            {isCorrect ? (
                                <>
                                    <span className="text-2xl">✓</span>
                                    <span>Excellent choice!</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl">✗</span>
                                    <span>Not quite. Try again!</span>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Options Grid */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_6px_25px_rgba(255,107,53,0.1)]">
                    <p className="text-center text-base font-bold text-[#ff6b35] mb-4 uppercase tracking-wider">Choose the best response:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allOptions.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isThisCorrect = option === data.a;
                            const showCorrectState = showFeedback && isSelected && isThisCorrect;
                            const showWrongState = showFeedback && isSelected && !isThisCorrect;

                            return (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={!showFeedback ? { scale: 1.02, y: -2 } : {}}
                                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                    onClick={() => handleOptionSelect(option, index)}
                                    disabled={showFeedback}
                                    className={`relative p-4 rounded-xl text-lg font-bold min-h-[70px] flex items-center justify-center text-center transition-all duration-300
                                    ${showCorrectState
                                            ? 'bg-linear-to-br from-green-500 to-green-400 text-white border-2 border-green-500 shadow-md scale-105'
                                            : showWrongState
                                                ? 'bg-linear-to-br from-red-500 to-red-400 text-white border-2 border-red-500 shadow-md'
                                                : 'bg-white border-2 border-[#ff8c42] text-gray-800 hover:bg-linear-to-br hover:from-[#ff6b35] hover:to-[#ff8c42] hover:text-white hover:border-transparent hover:shadow-lg'
                                        }
                                    ${isSelected && !showFeedback ? 'bg-linear-to-br from-[#ff6b35] to-[#ff8c42] text-white' : ''}
                                    `}
                                >
                                    <span className="relative z-10">{option}</span>
                                    {showCorrectState && <span className="absolute top-2 right-2 text-xl font-black text-white">✓</span>}
                                    {showWrongState && <span className="absolute top-2 right-2 text-xl font-black text-white">✗</span>}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Hint Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-2"
                >
                    <p className="text-[#ff6b35] text-sm font-semibold italic opacity-80">💡 Safety First</p>
                </motion.div>
            </div>
        </div>
    );
};
