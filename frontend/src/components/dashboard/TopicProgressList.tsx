import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useState, useEffect } from "react";
import { gameApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface TopicProgress {
    id: string;
    name: string; // or title
    progress: number;
    color: string;
}

export const TopicProgressList = () => {
    const { user } = useAuth();
    const [topics, setTopics] = useState<TopicProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [end, setEnd] = useState<number>(4);

    useEffect(() => {
        const fetchTopics = async () => {
            if (!user || !user.progress) {
                setLoading(false); // If no user or progress, stop loading and show empty state
                return;
            }
            try {
                const res = await gameApi.getMapData();
                const mapData = res.data;

                const calculatedProgress = mapData.map((region: any) => {
                    const totalLevels = region.levels.length;
                    const completedInRegion = user.progress.filter((p: any) =>
                        p.status === 'completed' &&
                        region.levels.some((l: any) => String(l.levelId) === String(p.levelId) || String(l._id) === String(p.levelId))
                    ).length;

                    return {
                        id: region.regionId,
                        name: region.title,
                        progress: Math.round((completedInRegion / (totalLevels || 1)) * 100),
                        color: region.themeColor || 'blue'
                    };
                });

                setTopics(calculatedProgress);
            } catch (error) {
                console.error("Failed to fetch topic progress", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [user]);

    if (loading) {
        return (
            <GameCard glow="none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                        <BookOpen size={20} className="text-primary" />
                        Topic Mastery
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
                    <BookOpen size={20} className="text-primary" />
                    Topic Mastery
                </h3>
                {topics.length > 4 && (
                    <button onClick={() => setEnd(end === 4 ? topics.length : 4)} className="text-primary font-bold text-sm hover:underline">
                        {end === 4 ? "View All" : "Show Less"}
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {topics.slice(0, end).map((topic, index) => {
                    return (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                                    <BookOpen size={24} className="text-white w-full h-full rounded-xl p-2" style={{ backgroundColor: topic.color }} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-nunito font-bold text-dark">{topic.name}</span>
                                        <span className="font-nunito font-bold text-primary">{topic.progress}%</span>
                                    </div>
                                    <ProgressBar
                                        current={topic.progress}
                                        max={100}
                                        showLabel={false}
                                        variant={topic.progress === 100 ? "accent" : "primary"}
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                {topics.length === 0 && (
                    <div className="text-center text-gray-400 font-nunito text-sm py-4">
                        No topics found
                    </div>
                )}
            </div>
        </GameCard>
    );
};
