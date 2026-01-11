import { motion } from "framer-motion";
import { Target, Flame, Gift, Puzzle, MessageSquare } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { GameBadge } from "@/components/ui/GameBadge";
import { useState, useEffect } from "react";
import { gameApi } from "@/lib/api";

interface Quest {
    questId: string;
    title: string;
    xpReward: number;
    progress: number;
    max: number;
    icon?: string;
}

export const DailyQuestsList = () => {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const res = await gameApi.getDailyQuests();
                setQuests(res.data);
            } catch (error) {
                console.error("Failed to fetch daily quests", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuests();
    }, []);

    // Helper to get icon component based on string
    const getIcon = (type?: string) => {
        if (type === 'LEVELS_COMPLETED') return Target;
        if (type === 'STARS_EARNED') return Flame;
        if (type === 'PUZZLES_COMPLETED') return Puzzle;
        if (type === 'FEEDBACK_GIVEN') return MessageSquare;
        return Gift;
    };

    if (loading) {
        return (
            <GameCard glow="none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                        <Target size={20} className="text-primary" />
                        Daily Quests
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
                    <Target size={20} className="text-primary" />
                    Daily Quests
                </h3>
                <GameBadge variant="primary">
                    <Flame size={12} className="fill-current" />
                    Today
                </GameBadge>
            </div>

            <div className="space-y-3">
                {quests.map((quest, index) => {
                    const Icon = getIcon(quest.icon);
                    return (
                        <motion.div
                            key={quest.questId}
                            className={`p-3 rounded-xl border ${quest.progress >= quest.max ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${quest.progress >= quest.max ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-nunito font-bold text-dark text-sm">{quest.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${quest.progress >= quest.max ? 'bg-green-500' : 'bg-primary'}`}
                                                style={{ width: `${Math.min((quest.progress / quest.max) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-dark-lighter font-bold">
                                            {quest.progress}/{quest.max}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-display font-bold text-accent">+{quest.xpReward}</span>
                                    <span className="text-xs text-dark-lighter block font-bold">XP</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                {quests.length === 0 && (
                    <div className="text-center text-gray-400 font-nunito text-sm py-4">
                        No quests available
                    </div>
                )}
            </div>
        </GameCard>
    );
};
