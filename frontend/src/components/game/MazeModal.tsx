import { motion, AnimatePresence } from 'framer-motion';
import { MazeProvider } from '../../context/MazeContext';
import { MazeGame } from './MazeGame'; // We will define this below
import { X } from 'lucide-react';

interface MazeModalProps {
    isOpen: boolean;
    onClose: () => void;
    levelId?: string;
}

export const MazeModal = ({ isOpen, onClose, levelId }: MazeModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-3xl shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-8 py-4 bg-slate-800/50 border-b border-slate-700">
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Game Area */}
                        <div className="flex-1 relative overflow-hidden bg-slate-950">
                            {/* Pass onClose to handle win state/exit */}
                            <MazeProvider onComplete={onClose}>
                                <MazeGame levelId={levelId} />
                            </MazeProvider>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};