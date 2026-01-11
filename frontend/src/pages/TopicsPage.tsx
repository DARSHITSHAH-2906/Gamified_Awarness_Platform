import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { gameApi } from "@/lib/api";

const TopicsPage = () => {
    const { user } = useAuth();
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopicsData = async () => {
            try {
                const mapRes = await gameApi.getMapData();

                if (user && user.progress && mapRes.data) {
                    const mapData = mapRes.data;
                    const calculatedTopics = mapData.map((region: any) => {
                        return {
                            id: region.regionId || region.id, // Use regionId if available to match static data
                            title: region.title,
                            desc: region.description || "Explore this topic to learn more!",
                            color: region.themeColor || "#111111"
                        };
                    });
                    setTopics(calculatedTopics);
                }
            } catch (error) {
                console.error("Failed to load topics", error);
            } finally {
                setLoading(false);
            }
        };

        // If user is loaded
        if (user) {
            fetchTopicsData();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-light">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark">Knowledge Hub</h1>
                    <p className="text-dark-lighter font-nunito">Explore and master your rights!</p>
                </div>
            </header>

            <div className="p-4 lg:p-8 pt-0">
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading topics...</div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {topics.map((topic, index) => {

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GameCard className="h-full flex flex-col justify-between" glow="none">
                                        <div>
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-4`}>
                                                <BookOpen className={`w-full h-full p-2 rounded-md text-white`} style={{ backgroundColor: topic.color }} />
                                            </div>
                                            <h3 className="text-xl font-display font-bold text-dark mb-2">{topic.title}</h3>
                                            <p className="text-dark-lighter text-sm font-nunito mb-6">{topic.desc}</p>
                                        </div>

                                        <div>
                                            <Link to={`/dashboard/topics/${topic.id}`}>
                                                <button className="w-full mt-4 py-2 rounded-lg bg-gray-50 text-dark font-bold hover:bg-primary hover:text-white transition-colors">
                                                    {topic.progress === 100 ? 'Review' : topic.progress > 0 ? 'Continue' : 'Start Learning'}
                                                </button>
                                            </Link>
                                        </div>
                                    </GameCard>
                                </motion.div>
                            )
                        })}
                        {topics.length === 0 && (
                            <div className="col-span-full text-center text-gray-400">No topics found. Check back later!</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicsPage;
