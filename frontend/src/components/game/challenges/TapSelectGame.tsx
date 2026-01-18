import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TapSelectGameProps {
    data: {
        q: string;
        a: string | string[]; // Can be single string or array of strings
    };
    onComplete: (xp: number) => void;
}

interface Option {
    text: string;
    isCorrect: boolean;
    id: string;
}

export const TapSelectGame = ({ data, onComplete }: TapSelectGameProps) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (!data) return;

        const correctAnswers = Array.isArray(data.a) ? data.a : [data.a];

        const commonDistractors = [
            "Stranger", "Unknown Link", "Candy", "Secret", "Alone",
            "Nothing", "Wait", "Hide", "Run", "Panic",
            "Ignore", "Forget"
        ];

        const distractors = commonDistractors
            .filter(d => !correctAnswers.includes(d))
            .sort(() => 0.5 - Math.random())
            .slice(0, 4 - correctAnswers.length);

        const gameOptions = [
            ...correctAnswers.map(ans => ({ text: ans, isCorrect: true, id: `correct-${ans}` })),
            ...distractors.map(dis => ({ text: dis, isCorrect: false, id: `wrong-${dis}` }))
        ];

        setOptions(gameOptions.sort(() => 0.5 - Math.random()));

        setSelected([]);
        setFeedback(null);
        setLocked(false);
    }, [data]);

    if (!data || options.length === 0) return null;

    const correctIndices = options
        .map((opt, i) => (opt.isCorrect ? i : null))
        .filter((i): i is number => i !== null);

    const handleTap = (index: number) => {
        if (locked || selected.includes(index)) return;

        const isCorrect = options[index].isCorrect;
        const newSelected = [...selected, index];
        setSelected(newSelected);

        if (isCorrect) {
            setFeedback({ text: "Good catch! ✅", type: "success" });

            const correctTapped = newSelected.filter(i => correctIndices.includes(i));

            if (correctTapped.length === correctIndices.length) {
                setLocked(true);
                setFeedback({ text: "Found correctly! 🎉", type: "success" });
                setTimeout(() => {
                    onComplete(3);
                }, 1500);
            } else {
                setTimeout(() => setFeedback(null), 1000);
            }
        } else {
            setFeedback({ text: "Oops! ❌", type: "error" });
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start md:justify-center w-full h-full p-4 bg-linear-to-b from-emerald-50 to-white overflow-y-auto overflow-x-hidden relative">
            <div className="max-w-4xl w-full flex flex-col gap-6 relative border-[6px] border-emerald-200 rounded-4xl p-6 bg-linear-to-b from-emerald-50/50 to-white shadow-xl my-auto">
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -20, x: "-50%" }}
                            className={`absolute top-4 left-1/2 z-50 px-4 py-2 rounded-xl shadow-lg font-bold text-base whitespace-nowrap border-2
                            ${feedback.type === 'success'
                                    ? 'bg-green-100 text-green-700 border-green-400'
                                    : 'bg-red-100 text-red-600 border-red-400'}`}
                        >
                            {feedback.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-emerald-700 mb-2 drop-shadow-sm">
                        {data.q}
                    </h2>
                    <div className="h-2 w-24 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    {options.map((option, index) => {
                        const isSelected = selected.includes(index);
                        const isCorrect = option.isCorrect;

                        let buttonClass = "bg-white border-emerald-300 text-emerald-700 hover:-translate-y-1 hover:shadow-md";
                        if (isSelected) {
                            buttonClass = isCorrect
                                ? "bg-green-100 border-green-400 text-green-700 hover:none"
                                : "bg-red-100 border-red-400 text-red-600 hover:none";
                        }
                        if (locked) buttonClass += " opacity-80 cursor-not-allowed";

                        return (
                            <motion.button
                                key={option.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleTap(index)}
                                disabled={locked || (isSelected && isCorrect)}
                                className={`p-4 rounded-2xl border-4 font-black text-lg transition-all shadow-sm flex flex-col items-center justify-center gap-2 min-h-[100px]
                                ${buttonClass}`}
                            >
                                <span className="text-3xl leading-none">
                                    {isCorrect ? (isSelected ? "✅" : "❔") : (isSelected ? "❌" : "🤔")}
                                </span>
                                <span className="leading-tight text-center text-sm md:text-base">{option.text}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {!locked && (
                    <div className="text-center text-emerald-400 font-bold animate-pulse text-sm">
                        Tap correct choice 👆
                    </div>
                )}
            </div>
        </div>
    );
};
