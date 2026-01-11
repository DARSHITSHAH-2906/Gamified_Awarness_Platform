import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface AvatarSelectorProps {
    onSelect: (avatarId: number) => void;
    selectedId: number;
}

import { AVATARS } from '@/utils/avatarUtils';

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onSelect, selectedId }) => {
    // Find index based on selectedId or default toward 0
    const initialIndex = AVATARS.findIndex(a => a.id === selectedId);
    const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

    const handleNext = () => {
        const next = (currentIndex + 1) % AVATARS.length;
        setCurrentIndex(next);
        onSelect(AVATARS[next].id);
    };

    const handlePrev = () => {
        const prev = (currentIndex - 1 + AVATARS.length) % AVATARS.length;
        setCurrentIndex(prev);
        onSelect(AVATARS[prev].id);
    };

    const currentAvatar = AVATARS[currentIndex];

    // Generate avatar URL using DiceBear API (using 'avataaars' style for a fun look)
    const getAvatarUrl = (seed: string) =>
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`;

    return (
        <div className="flex flex-col items-center">
            {/* Carousel Container */}
            <div className={`relative w-64 h-64 rounded-full ${currentAvatar.color} border-4 ${currentAvatar.borderColor} shadow-xl mb-6 transition-colors duration-500 flex items-center justify-center group overflow-hidden`}>

                {/* Avatar Image */}
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={currentAvatar.id}
                        src={getAvatarUrl(currentAvatar.seed)}
                        alt={currentAvatar.name}
                        className="w-48 h-48 object-contain z-10 drop-shadow-lg"
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                </AnimatePresence>

                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-center z-0" />

                {/* Navigation Buttons (Floating) */}
                <button
                    onClick={handlePrev}
                    type="button"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md text-dark hover:text-primary hover:scale-110 transition-all z-20"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={handleNext}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md text-dark hover:text-primary hover:scale-110 transition-all z-20"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Info Card */}
            <motion.div
                key={`info-${currentAvatar.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <h3 className="text-2xl font-display font-bold text-dark flex items-center justify-center gap-2">
                    {currentAvatar.name}
                    {selectedId === currentAvatar.id && (
                        <span className="bg-green-500 text-white p-1 rounded-full animate-bounce">
                            <Check size={14} strokeWidth={3} />
                        </span>
                    )}
                </h3>
                <p className="text-dark-lighter font-nunito font-bold text-lg">{currentAvatar.desc}</p>

                <div className="flex gap-2 justify-center mt-4">
                    {AVATARS.map((avatar, idx) => (
                        <button
                            key={avatar.id}
                            type="button"
                            onClick={() => {
                                setCurrentIndex(idx);
                                onSelect(avatar.id);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? `w-8 bg-primary` : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default AvatarSelector;
