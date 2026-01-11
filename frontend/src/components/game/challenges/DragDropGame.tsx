import { useState, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DragDropGameProps {
    data: {
        q: string;          // Question/instruction text
        options: string[];  // All draggable options
        a: string[];        // Correct answers to drag
    };
    onComplete: (xp: number) => void;
}

interface Feedback {
    text: string;
    type: 'success' | 'error';
}

export const DragDropGame = ({ data, onComplete }: DragDropGameProps) => {
    const [items, setItems] = useState<string[]>(data.options || []);
    const [dropped, setDropped] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const correctAnswers = data.a;

    const handleDragStart = (e: any, item: string) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item);
        const target = e.currentTarget as HTMLElement;
        target.style.opacity = '0.5';
    };

    const handleDragEnd = (e: any) => {
        const target = e.currentTarget as HTMLElement;
        target.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const item = e.dataTransfer.getData('text/plain');

        if (!item) return;

        const isCorrect = correctAnswers.includes(item);

        if (isCorrect) {
            if (!dropped.includes(item)) {
                const newDropped = [...dropped, item];
                setDropped(newDropped);
                setItems(items.filter(i => i !== item));
                setFeedback({ text: '✓ Great!', type: 'success' });
                setTimeout(() => setFeedback(null), 1500);

                if (newDropped.length === correctAnswers.length) {
                    setTimeout(() => onComplete(4), 1000);
                }
            }
        } else {
            setFeedback({ text: '✗ Try again!', type: 'error' });
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col items-center justify-start md:justify-center w-full h-full p-4 bg-gradient-to-b from-pink-50 to-white overflow-y-auto overflow-x-hidden font-sans">
            <div className="relative w-full max-w-4xl flex flex-col gap-4 border-[6px] border-pink-200 rounded-[2rem] p-6 bg-gradient-to-b from-pink-50/50 to-white shadow-xl my-auto">
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.8, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                            exit={{ opacity: 0, y: -20, scale: 0.8, x: "-50%" }}
                            className={`absolute top-4 left-1/2 z-50 px-4 py-2 rounded-xl shadow-lg font-bold text-base whitespace-nowrap border-2
                            ${feedback.type === 'success'
                                    ? 'bg-green-100 text-green-700 border-green-400'
                                    : 'bg-red-100 text-red-600 border-red-400'}`}
                        >
                            {feedback.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-purple-600 drop-shadow-sm mb-1">{data.q}</h2>
                    <div className="h-1.5 w-20 bg-yellow-400 mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col gap-2">
                    <p className="text-center text-purple-400 font-bold uppercase tracking-widest text-xs">Drag correct items:</p>
                    <div className="flex flex-wrap justify-center gap-4 p-2">
                        {items.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item)}
                                onDragEnd={handleDragEnd}
                                className={`group cursor-grab active:scale-95 active:rotate-3 transition-transform ${draggedItem === item ? 'opacity-50' : ''}`}
                            >
                                <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-2xl border-[3px] border-blue-300 shadow-[0_4px_0_#93c5fd] flex flex-col items-center justify-center p-3 hover:-translate-y-1 transition-transform">
                                    <span className="text-3xl md:text-4xl mb-1">🎯</span>
                                    <span className="text-xs font-black text-blue-700 uppercase tracking-tighter text-center leading-tight break-words w-full">{item}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    className={`relative w-full min-h-[180px] rounded-[2rem] border-[4px] border-dashed flex flex-col items-center justify-center p-4 transition-colors
                    ${feedback?.type === 'success' ? 'border-green-400 bg-green-50' :
                            feedback?.type === 'error' ? 'border-red-400 bg-red-50' :
                                'border-purple-300 bg-purple-50'}`}
                >
                    <div className="absolute inset-0 flex items-center justify-around opacity-10 pointer-events-none overflow-hidden">
                        <span className="text-6xl animate-pulse">🛡️</span>
                    </div>

                    <div className="relative flex items-center gap-2 mb-4 px-4 py-1.5 bg-white rounded-full shadow-sm">
                        <span className="text-lg">📥</span>
                        <span className="text-sm font-black text-purple-600 tracking-widest">DROP ZONE</span>
                    </div>

                    <div className="w-full flex flex-wrap justify-center gap-4 relative z-10">
                        {dropped.length === 0 ? (
                            <p className="text-purple-400 font-bold text-base animate-pulse">Drop answers here!</p>
                        ) : (
                            dropped.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-20 h-20 bg-white rounded-xl border-[3px] border-green-400 flex flex-col items-center justify-center shadow-md">
                                        <span className="text-2xl mb-1">✅</span>
                                        <span className="text-[0.65rem] font-bold text-green-700 text-center px-1 leading-none">{item}</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
