import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface VideoScriptSegment {
    timing: string;
    visual: string;
    script: string;
}

interface VideoStoryGameProps {
    data: {
        videoScript: {
            title: string;
            content: VideoScriptSegment[];
        };
        challenge: {
            instruction: string;
            options: { text: string; isCorrect: boolean; feedback?: string }[];
        };
    };
    onComplete: (xp: number) => void;
}

export const VideoStoryGame = ({ data, onComplete }: VideoStoryGameProps) => {
    const [step, setStep] = useState<'video' | 'quiz'>('video');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleVideoComplete = () => {
        setStep('quiz');
    };

    const handleOptionSelect = (index: number) => {
        if (showFeedback) return;
        setSelectedOption(index);
        setShowFeedback(true);

        const isCorrect = data.challenge.options[index].isCorrect;
        if (isCorrect) {
            setTimeout(() => onComplete(5), 1500);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            {step === 'video' ? (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl relative aspect-video flex items-center justify-center group"
                >
                    {/* Placeholder for Video Content */}
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-black opacity-80" />

                    <div className="relative z-10 text-center text-white p-8">
                        <h2 className="text-3xl font-bold mb-4">{data.videoScript.title}</h2>
                        <div className="space-y-4 text-left bg-white/10 p-6 rounded-xl backdrop-blur-sm max-h-[60vh] overflow-y-auto">
                            {data.videoScript.content.map((seg, i) => (
                                <div key={i} className="flex gap-4 border-b border-white/10 pb-2 mb-2 last:border-0">
                                    <span className="text-yellow-400 font-mono text-xs">{seg.timing}</span>
                                    <p className="text-sm md:text-base">{seg.script}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8">
                        <button
                            onClick={handleVideoComplete}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            Skip to Quiz <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">{data.challenge.instruction}</h3>
                    <div className="space-y-4">
                        {data.challenge.options.map((opt, idx) => {
                            const isSelected = selectedOption === idx;
                            const statusColor = isSelected
                                ? (opt.isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700')
                                : 'bg-gray-50 border-gray-200 hover:border-blue-300';

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${statusColor} ${showFeedback && !opt.isCorrect && isSelected ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{opt.text}</span>
                                        {isSelected && (opt.isCorrect ? <CheckCircle className="text-green-500" /> : <span className="text-2xl">❌</span>)}
                                    </div>
                                    {isSelected && showFeedback && opt.feedback && (
                                        <p className="text-xs mt-2 font-semibold opacity-80">{opt.feedback}</p>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
