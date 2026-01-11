import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface GameButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
    ({ className, variant = 'primary', size = 'md', glow = true, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-primary text-white border-b-4 border-primary-hover hover:border-b-0 hover:translate-y-1',
            secondary: 'bg-secondary text-white border-b-4 border-secondary-hover hover:border-b-0 hover:translate-y-1',
            outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
            ghost: 'bg-transparent hover:bg-gray-100 text-dark',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.95 }}
                className={twMerge(
                    'relative inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold transition-all duration-200',
                    variants[variant],
                    sizes[size],
                    glow && variant === 'primary' && 'shadow-lg shadow-primary/30',
                    glow && variant === 'secondary' && 'shadow-lg shadow-secondary/30',
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

GameButton.displayName = 'GameButton';
