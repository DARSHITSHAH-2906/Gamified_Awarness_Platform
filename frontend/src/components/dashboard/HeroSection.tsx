import { motion } from "framer-motion";
import { getAvatarSeed } from "@/utils/avatarUtils";
import { Link } from "react-router-dom";
import { Crown, Play, Flame } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { GameButton } from "@/components/ui/GameButton";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface HeroSectionProps {
    avatarId: string;
    currentLevel: number;
    currentXP: number;
    nextLevelXP: number;
    completedLevelsCount: number;
    accuracy: number;
    badgesCount: number;
    streakCount: number;
}

export const HeroSection = ({
    avatarId,
    currentLevel,
    currentXP,
    nextLevelXP,
    completedLevelsCount,
    accuracy,
    badgesCount,
    streakCount
}: HeroSectionProps) => {
    return (
        <GameCard className="relative overflow-hidden border-none" glow="primary">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Avatar */}
                <motion.div
                    className="relative group cursor-pointer"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-xl shadow-primary/30 p-1">
                        <div className="w-full h-full bg-white rounded-full overflow-hidden relative">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(avatarId)}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <motion.div
                        className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg border-2 border-white"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Crown size={20} className="text-white" />
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <div className="flex-1 text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-display font-bold text-dark">
                                Rights Guardian
                            </h2>
                            <p className="text-dark-lighter font-nunito font-bold">Level {currentLevel} Hero</p>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mb-6 bg-white/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-sm font-nunito mb-2">
                                <span className="text-dark-lighter font-bold">Progress to Level {currentLevel + 1}</span>
                                <span className="text-primary font-bold">{currentXP} / {nextLevelXP} XP</span>
                            </div>
                            <ProgressBar current={currentXP % 30} max={30} showLabel={false} size="lg" />
                        </div>
                        <Link to="/dashboard/play?return=/dashboard" className="hidden md:block flex-shrink-0">
                            <GameButton variant="primary" size="md">
                                <Play size={20} className="fill-current" />
                                Continue
                            </GameButton>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-2 rounded-xl bg-blue-50">
                            <div className="text-xl font-display font-bold text-primary">{completedLevelsCount}</div>
                            <div className="text-xs text-dark-lighter font-bold uppercase tracking-wider">Levels</div>
                        </div>
                        <div className="text-center p-2 rounded-xl bg-purple-50">
                            <div className="text-xl font-display font-bold text-accent">{accuracy}%</div>
                            <div className="text-xs text-dark-lighter font-bold uppercase tracking-wider">Accuracy</div>
                        </div>
                        <div className="text-center p-2 rounded-xl bg-cyan-50">
                            <div className="text-xl font-display font-bold text-secondary">{badgesCount}</div>
                            <div className="text-xs text-dark-lighter font-bold uppercase tracking-wider">Badges</div>
                        </div>
                    </div>
                </div>

                <Link to="/play" className="w-full md:hidden mt-4">
                    <GameButton variant="primary" size="md" className="w-full">
                        <Play size={20} className="fill-current" />
                        Continue
                    </GameButton>
                </Link>
            </div>

            {/* Streak badge */}
            <motion.div
                className="absolute top-4 right-4 hidden md:block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 font-nunito font-bold text-sm border border-orange-200 shadow-sm">
                    <Flame size={16} className="fill-orange-500" />
                    {streakCount} Day Streak!
                </div>
            </motion.div>
        </GameCard>
    );
};
