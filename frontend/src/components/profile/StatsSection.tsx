import { Clock, BookOpen } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";

interface StatsSectionProps {
    user: any;
}

export const StatsSection = ({ user }: StatsSectionProps) => {
    return (
        <GameCard>
            <h3 className="font-bold text-dark mb-4 border-b border-gray-100 pb-2">Activity</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500">
                            <Clock size={16} />
                        </div>
                        <span className="font-nunito font-bold text-gray-600">Login Streak</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{user.streak?.count || 0} Days</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
                            <BookOpen size={16} />
                        </div>
                        <span className="font-nunito font-bold text-gray-600">Quests Done</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{user.dailyQuests?.filter((q: any) => q.isClaimed).length || 0}</span>
                </div>
            </div>
        </GameCard>
    );
};
