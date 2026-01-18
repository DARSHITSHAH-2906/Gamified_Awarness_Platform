import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, ChevronRight, Star } from "lucide-react"; // Removed unused icons for now
import { GameCard } from "@/components/ui/GameCard";
import { getBadgeDetails } from "@/utils/badgeUtils";

interface RecentBadgesListProps {
    badges?: string[];
}

export const RecentBadgesList = ({ badges = [] }: RecentBadgesListProps) => {
    // We can also have a set of "featured" or "next" badges to show even if not earned
    const displayBadges = badges.map(id => ({ ...getBadgeDetails(id), earned: true }));

    return (
        <GameCard glow="none">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                    <Trophy size={20} className="text-accent" />
                    Badges
                </h3>
                <Link to="/profile" className="text-primary font-nunito font-bold text-sm flex items-center gap-1 hover:underline">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {displayBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                        <motion.div
                            key={badge.id + index}
                            className="relative group"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <div
                                className={`w-14 h-14 rounded-xl bg-linear-to-br ${badge.name === 'Unknown' ? 'from-gray-300 to-gray-400' : 'from-yellow-400 to-orange-500'} flex items-center justify-center shadow-md cursor-help transition-all group-hover:shadow-lg`}
                                title={badge.name}
                            >
                                <Icon size={24} className="text-white" />
                            </div>

                            <motion.div
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <Star size={10} className="text-accent fill-accent" />
                            </motion.div>
                        </motion.div>
                    );
                })}
                {displayBadges.length === 0 && (
                    <div className="col-span-4 text-center text-gray-400 font-nunito text-sm py-4">
                        No badges earned yet.
                    </div>
                )}
            </div>
        </GameCard>
    );
};
