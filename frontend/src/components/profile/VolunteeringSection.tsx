import { Heart, Edit2, Trash2, Plus } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface VolunteeringExperience {
    role: string;
    organization: string;
    startDate: string;
    endDate?: string;
    description: string;
}

interface VolunteeringSectionProps {
    experiences: VolunteeringExperience[];
    updateUser: (data: any) => void;
}

export const VolunteeringSection = ({ experiences, updateUser }: VolunteeringSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [items, setItems] = useState<VolunteeringExperience[]>(experiences || []);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put('/user/profile', { volunteeringExperience: items });
            updateUser(res.data);
            setIsEditing(false);
            toast.success("Volunteering updated!");
        } catch (error) {
            toast.error("Failed to update volunteering");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameCard className="relative group">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-dark flex items-center gap-2">
                    <Heart size={20} className="text-red-500" /> Volunteering Experience
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
                    {items.map((exp, index) => (
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
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <input
                                    placeholder="Role"
                                    className="border-gray-200 rounded-lg text-sm"
                                    value={exp.role}
                                    onChange={e => {
                                        const newItems = [...items];
                                        newItems[index].role = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                                <input
                                    placeholder="Organization"
                                    className="border-gray-200 rounded-lg text-sm"
                                    value={exp.organization}
                                    onChange={e => {
                                        const newItems = [...items];
                                        newItems[index].organization = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            </div>
                            <input
                                placeholder="Description"
                                className="w-full border-gray-200 rounded-lg text-sm"
                                value={exp.description}
                                onChange={e => {
                                    const newItems = [...items];
                                    newItems[index].description = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => setItems([...items, { role: '', organization: '', startDate: new Date().toISOString(), description: '' }])}
                        className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-colors font-bold flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Add Experience
                    </button>
                    <div className="flex gap-2 justify-end mt-4">
                        <button onClick={() => setIsEditing(false)} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50">Save</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {experiences && experiences.length > 0 ? (
                        experiences.map((exp, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="bg-red-50 p-2 rounded-lg text-red-500 shrink-0">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark">{exp.role}</h4>
                                    <p className="text-sm text-gray-500 font-bold">{exp.organization}</p>
                                    <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No volunteering experience added</p>
                    )}
                </div>
            )}
        </GameCard>
    );
};
