import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface ReflectionGameProps {
    data: {
        title: string;
        prompt: { main: string; minWords: number };
        examples?: { ideas: { scenario: string; prompt: string }[] };
    };
    onComplete: (xp: number) => void;
}

export const ReflectionGame = ({ data, onComplete }: ReflectionGameProps) => {
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const progress = Math.min(100, (wordCount / data.prompt.minWords) * 100);

    const handleSubmit = () => {
        if (wordCount >= data.prompt.minWords) {
            setSubmitted(true);
            setTimeout(() => onComplete(7), 2000);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[70vh]"
            >
                {/* Sidebar / Prompt Area */}
                <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-gray-100 overflow-y-auto">
                    <div className="mb-6">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Reflection</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-1">{data.title}</h2>
                    </div>

                    <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                        {data.prompt.main}
                    </p>

                    {data.examples && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-400 uppercase">Inspiration</h4>
                            {data.examples.ideas.slice(0, 2).map((idea, i) => (
                                <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-sm text-slate-500">
                                    <span className="font-bold text-slate-700 block mb-1">{idea.scenario}</span>
                                    {idea.prompt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="flex-1 p-6 relative flex flex-col">
                    {!submitted ? (
                        <>
                            <textarea
                                className="w-full flex-1 resize-none border-0 focus:ring-0 text-lg text-slate-700 placeholder:text-slate-300 outline-none leading-relaxed"
                                placeholder="Start typing your story here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className={`text-xs font-bold ${progress >= 100 ? 'text-green-500' : 'text-slate-400'}`}>
                                        {wordCount} / {data.prompt.minWords} words
                                    </span>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={progress < 100}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all
                                    ${progress >= 100
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                >
                                    <Send size={18} />
                                    Submit Story
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                            >
                                <Sparkles size={40} />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-2">Wonderful Story!</h3>
                            <p className="text-slate-500">Your reflection has been recorded.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
