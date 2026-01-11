import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GameCard } from "@/components/ui/GameCard";
import { gameApi } from "@/lib/api";
import { getAvatarSeed } from "@/utils/avatarUtils";
import { useSearchParams } from "react-router-dom";

const LeaderboardPage = () => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const returnPath = searchParams.get('return') || '/';

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await gameApi.getLeaderboard();
                const mapped = res.data.map((player: any, index: number) => ({
                    rank: index + 1,
                    name: player.username,
                    xp: player.xp || 0,
                    avatar: player.avatarId,
                    badges: player.badges?.length || 0,
                    isUser: player._id === user?._id
                }));
                setLeaderboardData(mapped);
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [user]);



    const topThree = leaderboardData.slice(0, 3);
    const restList = leaderboardData.slice(3);

    return (
        <div className="min-h-screen bg-light">
            <header className="mb-8 text-center p-4">
                <h1 className="text-3xl font-display font-bold text-dark mb-2">Global Leaderboard</h1>
                <p className="text-dark-lighter font-nunito">See where you stand among other heroes!</p>
            </header>

            <div className="max-w-3xl mx-auto space-y-4 px-4 pb-8">
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading rankings...</div>
                ) : leaderboardData.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No players found yet. Be the first!</div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        <div className="flex justify-center items-end gap-4 mb-12">
                            {/* 2nd Place */}
                            {topThree[1] && (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border-4 border-gray-300 bg-gray-100 overflow-hidden flex items-center justify-center text-4xl shadow-lg relative mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(topThree[1].avatar)}`}
                                            alt={topThree[1].name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute -bottom-0 bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">2</div>
                                    </div>
                                    <p className="font-bold text-dark">{topThree[1].name}</p>
                                    <p className="text-sm text-primary font-bold">{topThree[1].xp} XP</p>
                                </div>
                            )}
                            {/* 1st Place */}
                            {topThree[0] && (
                                <div className="flex flex-col items-center mb-6">
                                    <Crown className="text-yellow-500 mb-2 animate-bounce" size={32} />
                                    <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-yellow-100 overflow-hidden flex items-center justify-center text-5xl shadow-xl relative mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(topThree[0].avatar)}`}
                                            alt={topThree[0].name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute -bottom-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">1</div>
                                    </div>
                                    <p className="font-bold text-lg text-dark">{topThree[0].name}</p>
                                    <p className="text-primary font-bold">{topThree[0].xp} XP</p>
                                </div>
                            )}
                            {/* 3rd Place */}
                            {topThree[2] && (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border-4 border-orange-300 bg-orange-100 overflow-hidden flex items-center justify-center text-4xl shadow-lg relative mb-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(topThree[2].avatar)}`}
                                            alt={topThree[2].name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute -bottom-0 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">3</div>
                                    </div>
                                    <p className="font-bold text-dark">{topThree[2].name}</p>
                                    <p className="text-sm text-primary font-bold">{topThree[2].xp} XP</p>
                                </div>
                            )}
                        </div>

                        {/* List */}
                        {restList.length > 0 && (
                            <GameCard glow="none">
                                {restList.map((player, index) => (
                                    <motion.div
                                        key={player.rank}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-b border-gray-50 last:border-0 ${player.isUser ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="font-display font-bold text-dark-lighter w-8 text-center text-xl">{player.rank}</div>
                                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-xl">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(player.avatar)}`}
                                                alt={player.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-nunito font-bold ${player.isUser ? 'text-primary' : 'text-dark'}`}>{player.name} {player.isUser && '(You)'}</p>
                                            <p className="text-xs text-dark-lighter">{player.badges} Badges</p>
                                        </div>
                                        <div className="font-fredoka font-bold text-secondary text-lg">{player.xp.toLocaleString()} XP</div>
                                    </motion.div>
                                ))}
                            </GameCard>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;
