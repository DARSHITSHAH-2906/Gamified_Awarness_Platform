import { useEffect, useState } from 'react';
import { duelApi } from '../lib/api';
import DuelCard from '../components/duels/DuelCard';
import CreateDuelModal from '../components/duels/CreateDuelModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DuelsPage: React.FC = () => {
    const { user } = useAuth();
    const [duels, setDuels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchDuels();
    }, []);

    const fetchDuels = async () => {
        try {
            const res = await duelApi.getDuels();
            setDuels(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDuel = async (data: any) => {
        try {
            await duelApi.createDuel(data);
            toast.success('Duel Created!');
            fetchDuels();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed');
        }
    };

    const handleRespond = async (duelId: string, response: 'ACCEPT' | 'DECLINE') => {
        try {
            await duelApi.respondToDuel({ duelId, response });
            toast.success(`Duel ${response.toLowerCase()}ed`);
            fetchDuels();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Duels Arena
                    </h1>
                    <p className="text-gray-500 mt-2">Challenge peers to 1v1 face-offs.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-amber-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-amber-200 shadow-sm text-amber-700">
                        <span className="font-bold">{user?.currency || 0}</span>
                        <span className="text-xs uppercase font-bold opacity-75">Coins</span>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                        + New Duel
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {duels.length === 0 && (
                        <p className="text-gray-400 col-span-full text-center py-10">No active duels. Start one!</p>
                    )}
                    {duels.map(duel => (
                        <DuelCard
                            key={duel._id}
                            duel={duel}
                            currentUserId={user?.id || ''}
                            onRespond={handleRespond}
                        />
                    ))}
                </div>
            )}

            <CreateDuelModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreateDuel}
                currentUserId={user?.id || ''}
            />
        </div>
    );
};

export default DuelsPage;
