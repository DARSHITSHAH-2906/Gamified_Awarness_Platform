import { motion } from "framer-motion";
import { getAvatarSeed } from "@/utils/avatarUtils";
import { XPDisplay } from "@/components/ui/XPDisplay";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
    username: string;
    currentXP: number;
    currentLevel: number;
    avatarId: string;
}

export const DashboardHeader = ({ username, currentXP, currentLevel, avatarId }: DashboardHeaderProps) => {
    return (
        <motion.header
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-1">
                    Welcome back, <Link to="profile"><span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">{username || 'Hero'}!</span></Link>
                </h1>
                <p className="text-dark-lighter font-nunito font-medium">Ready for today's adventure?</p>
            </div>
            <div className="flex items-center gap-4">
                <XPDisplay points={currentXP} size="lg" />
                <LevelBadge level={currentLevel} size="lg" />
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(avatarId)}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm lg:hidden"
                />
            </div>
        </motion.header>
    );
};
