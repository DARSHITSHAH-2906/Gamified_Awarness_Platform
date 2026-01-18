import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface GameCardProps {
    children: React.ReactNode;
    className?: string;
    glow?: 'primary' | 'secondary' | 'accent' | 'none';
    onClick?: () => void;
}

export const GameCard = ({ children, className, glow = 'none', onClick }: GameCardProps) => {
    const glowStyles = {
        primary: 'hover:shadow-primary/20 hover:border-primary/30',
        secondary: 'hover:shadow-secondary/20 hover:border-secondary/30',
        accent: 'hover:shadow-accent/20 hover:border-accent/30',
        none: '',
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={twMerge(
                'bg-white rounded-3xl p-6 border border-gray-100 shadow-xl transition-all duration-300',
                glow !== 'none' && 'hover:shadow-2xl',
                glowStyles[glow],
                className
            )}
        >
            {children}
        </motion.div>
    );
};
