import { Award, Edit2, Trash2, Plus } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface Achievement {
    title: string;
    description: string;
    date: string;
}

interface AchievementsSectionProps {
    achievements: Achievement[];
    updateUser: (data: any) => void;
}

export const AchievementsSection = ({ achievements, updateUser }: AchievementsSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [items, setItems] = useState<Achievement[]>(achievements || []);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put('/user/profile', { achievements: items });
            updateUser(res.data);
            setIsEditing(false);
            toast.success("Achievements updated!");
        } catch (error) {
            toast.error("Failed to update achievements");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameCard className="relative group">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-dark flex items-center gap-2">
                    <Award size={20} className="text-orange-500" /> Achievements
                </h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-gray-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Edit2 size={16} />
                </button>
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    {items.map((ach, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group/item">
                            <button
                                onClick={() => {
                                    const newItems = [...items];
                                    newItems.splice(index, 1);
                                    setItems(newItems);
                                }}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                            <input
                                placeholder="Title"
                                className="w-full border-gray-200 rounded-lg mb-2 text-sm font-bold"
                                value={ach.title}
                                onChange={e => {
                                    const newItems = [...items];
                                    newItems[index].title = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                            <input
                                placeholder="Description"
                                className="w-full border-gray-200 rounded-lg text-sm"
                                value={ach.description}
                                onChange={e => {
                                    const newItems = [...items];
                                    newItems[index].description = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => setItems([...items, { title: '', description: '', date: new Date().toISOString() }])}
                        className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-colors font-bold flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Add Achievement
                    </button>
                    <div className="flex gap-2 justify-end mt-4">
                        <button onClick={() => setIsEditing(false)} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50">Save</button>
                    </div>
                </div>
            ) : (
                <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {achievements && achievements.length > 0 ? (
                        achievements.map((ach, i) => (
                            <div key={i} className="flex gap-3 items-center bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                                <div className="text-orange-500 shrink-0">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-sm">{ach.title}</h4>
                                    <p className="text-xs text-gray-600">{ach.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No custom achievements added</p>
                    )}
                </div>
            )}
        </GameCard>
    );
};
