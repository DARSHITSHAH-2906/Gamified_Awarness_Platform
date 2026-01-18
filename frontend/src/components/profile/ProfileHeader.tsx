import { MapPin, Star, Edit2 } from "lucide-react";
import { getAvatarSeed } from "@/utils/avatarUtils";
import { GameCard } from "@/components/ui/GameCard";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface ProfileHeaderProps {
    user: any;
    updateUser: (data: any) => void;
}

export const ProfileHeader = ({ user, updateUser }: ProfileHeaderProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        location: user.location || '',
        bio: user.bio || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put('/user/profile', editForm);
            updateUser(res.data);
            setIsEditing(false);
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameCard className="flex flex-col md:flex-row items-center gap-6 p-6 bg-linear-to-br from-primary to-accent text-white relative group">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
                <Edit2 size={16} />
            </button>

            <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center p-1 shrink-0">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(user.avatarId || '1')}`}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div className="flex-1 text-center md:text-left w-full">
                <h2 className="text-3xl font-display font-bold mb-1">{user.username}</h2>

                {isEditing ? (
                    <div className="space-y-2 mt-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-4">
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full bg-white/20 border-0 text-white placeholder:text-white/60 rounded-lg focus:ring-2 focus:ring-white/50"
                            value={editForm.location}
                            onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Short Bio"
                            className="w-full bg-white/20 border-0 text-white placeholder:text-white/60 rounded-lg focus:ring-2 focus:ring-white/50"
                            value={editForm.bio}
                            onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                        />
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setIsEditing(false)} className="text-sm px-3 py-1 bg-white/20 rounded hover:bg-white/30">Cancel</button>
                            <button onClick={handleSave} disabled={loading} className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">Save</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="font-nunito opacity-90 mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
                            <MapPin size={18} /> {user.location || "No location set"}
                        </p>
                        <p className="font-nunito italic opacity-80 mb-4">"{user.bio || "No bio yet..."}"</p>
                    </>
                )}

                <div className="flex justify-center md:justify-start gap-4">
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Total XP</div>
                        <div className="text-2xl font-bold font-fredoka">{(user.xp || 0).toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Stars</div>
                        <div className="text-2xl font-bold font-fredoka flex items-center gap-1">
                            {user.totalStars} <Star className="fill-yellow-400 text-yellow-400" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </GameCard>
    );
};
