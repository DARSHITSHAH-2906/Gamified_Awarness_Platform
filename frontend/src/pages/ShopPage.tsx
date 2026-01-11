import { ShoppingBag, Coins, Trophy } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { GameButton } from "@/components/ui/GameButton";
import { useAuth } from "@/context/AuthContext";

const ShopPage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-light p-6 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark">Reward Shop</h1>
                    <p className="text-dark-lighter font-nunito">Spend your hard-earned coins!</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-indigo-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-indigo-200 shadow-sm">
                        <Trophy className="text-indigo-600" size={24} />
                        <span className="font-fredoka font-bold text-indigo-700 text-xl">{user?.xp || 0} XP</span>
                    </div>
                    <div className="bg-yellow-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-yellow-200 shadow-sm">
                        <Coins className="text-yellow-600" size={24} />
                        <span className="font-fredoka font-bold text-yellow-700 text-xl">{user?.currency || 0}</span>
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { name: "Neon Avatar Frame", cost: 500, type: "Cosmetic", color: "bg-purple-100 text-purple-600" },
                    { name: "Super Speed Boost", cost: 200, type: "Power-up", color: "bg-blue-100 text-blue-600" },
                    { name: "Golden Crown", cost: 1000, type: "Cosmetic", color: "bg-yellow-100 text-yellow-600" },
                    { name: "Mystery Box", cost: 350, type: "Random", color: "bg-pink-100 text-pink-600" },
                ].map((item, i) => (
                    <GameCard key={i} className="text-center" glow="none">
                        <div className={`w-full aspect-square rounded-xl mb-4 flex items-center justify-center ${item.color}`}>
                            <ShoppingBag size={48} />
                        </div>
                        <h3 className="font-bold text-dark mb-1">{item.name}</h3>
                        <p className="text-xs text-dark-lighter mb-4 uppercase font-bold tracking-wide">{item.type}</p>
                        <GameButton variant="primary" size="sm" className="w-full">
                            Buy {item.cost}
                            <Coins size={14} className="ml-1 inline" />
                        </GameButton>
                    </GameCard>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
