import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface GameBadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
    animated?: boolean;
    className?: string;
}

export const GameBadge = ({ children, variant = 'default', animated = false, className }: GameBadgeProps) => {
    const variants = {
        default: 'bg-gray-100 text-gray-500',
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        accent: 'bg-accent/10 text-accent-darker', // accent usually needs darker text
    };

    const badge = (
        <span className={clsx(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );

    if (animated) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block"
            >
                {badge}
            </motion.div>
        );
    }

    return badge;
};
