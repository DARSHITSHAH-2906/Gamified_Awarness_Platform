import React from 'react';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface XPDisplayProps {
    points: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const XPDisplay = ({ points, size = 'md', className }: XPDisplayProps) => {
    const sizes = {
        sm: 'text-sm px-2 py-1',
        md: 'text-base px-3 py-1.5',
        lg: 'text-lg px-4 py-2',
    };

    return (
        <motion.div
            className={clsx(
                'inline-flex items-center gap-2 rounded-full font-fredoka font-bold bg-white/50 border border-white/20 shadow-sm backdrop-blur-sm text-yellow-600',
                sizes[size],
                className
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <Sparkles size={size === 'lg' ? 20 : 16} className="fill-yellow-400 text-yellow-500" />
            <span>{points.toLocaleString()} XP</span>
        </motion.div>
    );
};
