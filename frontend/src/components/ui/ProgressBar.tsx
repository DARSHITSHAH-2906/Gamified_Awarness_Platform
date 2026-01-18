import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressBarProps {
    current: number;
    max: number;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export const ProgressBar = ({
    current,
    max,
    variant = 'primary',
    size = 'md',
    showLabel = true,
    className
}: ProgressBarProps) => {
    const percentage = Math.min(100, Math.max(0, (current / max) * 100));

    const variants = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
    };

    const sizes = {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
    };

    return (
        <div className={clsx('w-full', className)}>
            {showLabel && (
                <div className="flex justify-between text-xs font-bold mb-1 text-gray-500 font-nunito">
                    <span>Progress</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={clsx('w-full bg-gray-100 rounded-full overflow-hidden', sizes[size])}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={clsx('h-full rounded-full', variants[variant])}
                />
            </div>
        </div>
    );
};
