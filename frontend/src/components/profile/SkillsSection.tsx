import { Star, Edit2, Plus, X } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface SkillsSectionProps {
    skills: string[];
    updateUser: (data: any) => void;
}

export const SkillsSection = ({ skills, updateUser }: SkillsSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkills, setCurrentSkills] = useState<string[]>(skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCurrentSkills(skills || []);
    }, [skills]);

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setCurrentSkills([...currentSkills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (index: number) => {
        const updated = [...currentSkills];
        updated.splice(index, 1);
        setCurrentSkills(updated);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put('/user/profile', { topSkills: currentSkills });
            updateUser(res.data);
            setIsEditing(false);
            toast.success("Skills updated!");
        } catch (error) {
            toast.error("Failed to update skills");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameCard className="relative group h-auto">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-dark flex items-center gap-2">
                    <Star size={20} className="text-yellow-500" /> Top Skills
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
                    <div className="flex flex-wrap gap-2 mb-2">
                        {currentSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100 flex items-center gap-1">
                                {skill}
                                <button onClick={() => removeSkill(i)} className="hover:text-red-500"><X size={14} /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add skill..."
                            className="flex-1 border-gray-200 rounded-lg text-sm"
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                        />
                        <button onClick={handleAddSkill} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"><Plus size={18} /></button>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setIsEditing(false)} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50">Save</button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-1">
                    {skills && skills.length > 0 ? (
                        skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No skills listed</p>
                    )}
                </div>
            )}
        </GameCard>
    );
};
