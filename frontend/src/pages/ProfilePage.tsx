import { Star, Clock, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAvatarSeed } from "@/utils/avatarUtils";
import { RecentBadgesList } from "@/components/dashboard/RecentBadgesList";
import { GameCard } from "@/components/ui/GameCard";

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-light">
            <header className="flex items-center justify-between mb-8 p-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark mb-1">My Profile</h1>
                    <p className="text-dark-lighter font-nunito">View your stats and achievements</p>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-6 px-4 pb-8">
                {/* Hero Card */}
                <div className="lg:col-span-2">
                    <GameCard className="flex items-center gap-6 p-6 bg-gradient-to-br from-primary to-accent text-white">
                        <div className="w-28 h-28 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center p-1">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(user?.avatarId || '1')}`}
                                alt="Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold mb-1">{user?.username}</h2>
                            <p className="font-nunito opacity-90 mb-4 text-lg">Level {Math.floor((user?.xp || 0) / 1000) + 1} Hero</p>

                            <div className="flex gap-4">
                                <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Total XP</div>
                                    <div className="text-2xl font-bold font-fredoka">{(user?.xp || 0).toLocaleString()}</div>
                                </div>
                                <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Stars</div>
                                    <div className="text-2xl font-bold font-fredoka flex items-center gap-1">
                                        {user?.totalStars} <Star className="fill-yellow-400 text-yellow-400" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GameCard>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-dark mb-4">Badges</h3>
                        <RecentBadgesList badges={user?.badges || []} />
                    </div>
                </div>

                {/* Stats Column */}
                <div className="space-y-6">
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
                                <span className="font-bold text-dark text-lg">{user?.streak?.count || 0} Days</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
                                        <BookOpen size={16} />
                                    </div>
                                    <span className="font-nunito font-bold text-gray-600">Quests Done</span>
                                </div>
                                <span className="font-bold text-dark text-lg">{user?.dailyQuests?.filter((q: any) => q.isClaimed).length || 0}</span>
                            </div>
                        </div>
                    </GameCard>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
