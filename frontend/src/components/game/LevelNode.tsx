import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Map, Check, Star } from 'lucide-react';
import clsx from 'clsx';

interface LevelNodeProps {
    status: 'locked' | 'unlocked' | 'completed';
    stars?: number;
    label?: string;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}

export const LevelNode: React.FC<LevelNodeProps> = ({
    status,
    stars = 0,
    label,
    onClick,
    size = 'md',
    icon
}) => {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20'
    };

    const iconSize = {
        sm: 16,
        md: 24,
        lg: 32
    };

    return (
        <motion.div
            className="flex flex-col items-center cursor-pointer z-10 relative"
            whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
            onClick={status !== 'locked' ? onClick : undefined}
        >
            <div className={clsx(
                "rounded-full flex items-center justify-center border-4 shadow-lg transition-all relative",
                sizeClasses[size],
                status === 'completed' && 'bg-green-500 border-green-200',
                status === 'unlocked' && 'bg-primary border-orange-200 animate-bounce-slow', // Custom slow bounce? Or just standard bounce
                status === 'locked' && 'bg-slate-400 border-slate-300',
                status === 'unlocked' && "shadow-orange-500/50"
            )}>
                {icon ? (
                    icon
                ) : status === 'locked' ? (
                    <Lock className="text-white" size={iconSize[size]} />
                ) : status === 'completed' ? (
                    <Check className="text-white" size={iconSize[size]} />
                ) : (
                    <Map className="text-white" size={iconSize[size]} />
                )}
            </div>

            {label && (
                <div className="mt-2 text-center bg-white/90 backdrop-blur px-3 py-1 rounded-xl shadow-sm border border-white/50 min-w-[100px]">
                    <p className="font-bold text-sm text-dark">{label}</p>
                    {status !== 'locked' && (
                        <div className="flex justify-center gap-0.5 mt-0.5">
                            {[...Array(3)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={10}
                                    className={`${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};
