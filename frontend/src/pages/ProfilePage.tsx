import { useAuth } from "@/context/AuthContext";
import { RecentBadgesList } from "@/components/dashboard/RecentBadgesList";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AboutSection } from "@/components/profile/AboutSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { AchievementsSection } from "@/components/profile/AchievementsSection";
import { VolunteeringSection } from "@/components/profile/VolunteeringSection";
import { StatsSection } from "@/components/profile/StatsSection";

const ProfilePage = () => {
    const { user, updateUser } = useAuth();

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
                {/* Left Column - Hero & Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <ProfileHeader user={user} updateUser={updateUser} />
                    <AboutSection aboutMe={user.aboutMe || ''} updateUser={updateUser} />
                    <AchievementsSection achievements={user.achievements || []} updateUser={updateUser} />
                    <VolunteeringSection experiences={user.volunteeringExperience || []} updateUser={updateUser} />
                </div>

                {/* Right Column - Stats, Skills, Badges */}
                <div className="space-y-6">
                    <StatsSection user={user} />

                    <SkillsSection skills={user.topSkills || []} updateUser={updateUser} />

                    <div>
                        <RecentBadgesList badges={user.badges || []} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
