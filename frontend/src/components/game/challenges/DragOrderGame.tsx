import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface DragItem {
    id: string;
    label: string;
    correctPosition: number;
    description?: string;
}

interface DragOrderGameProps {
    data: {
        title: string;
        instruction: string;
        items: DragItem[]; // Initially shuffled
        feedback?: { allCorrect: string; incorrect: string };
    };
    onComplete: (xp: number) => void;
}

export const DragOrderGame = ({ data, onComplete }: DragOrderGameProps) => {
    // Initialize state with provided items (assuming they are shuffled from backend, or shuffle here)
    const [items, setItems] = useState(data.items);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const checkOrder = () => {
        const isCorrect = items.every((item, index) => item.correctPosition === index + 1);
        setIsSubmitted(true);

        if (isCorrect) {
            setFeedback(data.feedback?.allCorrect || "Correct Order!");
            setTimeout(() => onComplete(8), 2000);
        } else {
            setFeedback(data.feedback?.incorrect || "Incorrect Order, try again.");
            setTimeout(() => {
                setIsSubmitted(false);
                setFeedback(null);
            }, 2000);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <h3 className="text-2xl font-bold text-center text-white mb-2">{data.title}</h3>
                <p className="text-center text-white/80 mb-6">{data.instruction}</p>

                <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
                    {items.map((item) => (
                        <Reorder.Item key={item.id} value={item} id={item.id}>
                            <motion.div
                                className={`bg-white p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center gap-4 ${isSubmitted && item.correctPosition === items.indexOf(item) + 1 ? 'border-2 border-green-500' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="font-bold text-gray-400">::</span>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{item.label}</h4>
                                    {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                                </div>
                            </motion.div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <div className="mt-8 text-center">
                    {feedback ? (
                        <div className="bg-white/90 p-4 rounded-xl font-bold text-indigo-800 animate-pulse">
                            {feedback}
                        </div>
                    ) : (
                        <button
                            onClick={checkOrder}
                            className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                        >
                            Check Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
