import { User as UserIcon, Edit2 } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface AboutSectionProps {
    aboutMe: string;
    updateUser: (data: any) => void;
}

export const AboutSection = ({ aboutMe, updateUser }: AboutSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(aboutMe || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put('/user/profile', { aboutMe: text });
            updateUser(res.data);
            setIsEditing(false);
            toast.success("About updated!");
        } catch (error) {
            toast.error("Failed to update about section");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameCard className="relative group">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-dark flex items-center gap-2">
                    <UserIcon size={20} className="text-primary" /> About Me
                </h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-gray-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Edit2 size={16} />
                </button>
            </div>
            {isEditing ? (
                <div className="space-y-3">
                    <textarea
                        className="w-full border-gray-200 rounded-xl min-h-[100px] p-3 text-sm focus:ring-primary focus:border-primary"
                        placeholder="Tell us about yourself..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setIsEditing(false)} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50">Save</button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 font-nunito leading-relaxed">
                    {aboutMe || "No detailed description added yet."}
                </p>
            )}
        </GameCard>
    );
};
