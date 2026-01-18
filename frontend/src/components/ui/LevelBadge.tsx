import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface LevelBadgeProps {
    level: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const LevelBadge = ({ level, size = 'md', className }: LevelBadgeProps) => {
    const sizes = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
    };

    return (
        <motion.div
            className={clsx(
                'flex items-center justify-center rounded-full font-fredoka font-bold bg-linear-to-br from-primary to-primary-hover text-white shadow-lg border-2 border-white',
                sizes[size],
                className
            )}
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
        >
            {level}
        </motion.div>
    );
};
