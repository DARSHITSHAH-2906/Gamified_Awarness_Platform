import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";

import { getAvatarSeed } from "@/utils/avatarUtils";
import { gameApi } from "@/lib/api";

interface Player {
    username: string;
    totalStars?: number;
    xp?: number;
    avatarId: string;
}

export const LeaderboardPreview = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await gameApi.getLeaderboard();
                setPlayers(res.data);
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <GameCard glow="none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                        <Trophy size={20} className="text-yellow-500" />
                        Top Heroes
                    </h3>
                </div>
                <div className="text-center py-4 text-gray-400 font-nunito">
                    Loading...
                </div>
            </GameCard>
        );
    }

    return (
        <GameCard glow="none">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" />
                    Top Heroes
                </h3>
                <Link to="/dashboard/leaderboard" className="text-primary font-bold text-sm hover:underline">
                    View All
                </Link>
            </div>

            <div className="space-y-3">
                {players.slice(0, 3).map((player, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                    >
                        <div className="font-display font-bold text-dark-lighter w-6">{index + 1}</div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(player.avatarId)}`}
                                alt={player.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-nunito font-bold text-dark text-sm">{player.username}</p>
                        </div>
                        <span className="font-fredoka font-bold text-primary text-sm">{player.xp} XP</span>
                    </motion.div>
                ))}
                {players.length === 0 && (
                    <div className="text-center text-gray-400 font-nunito text-sm py-4">
                        No heroes found
                    </div>
                )}
            </div>
        </GameCard>
    );
};
