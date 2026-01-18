import React, { useEffect, useState } from 'react';
import { gameApi, socialApi } from '../lib/api';
import UserCard from '../components/social/UserCard';
import SocialActionsModal from '../components/social/SocialActionsModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CommunityPage: React.FC = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'KUDOS' | 'GIFT'>('KUDOS');
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await gameApi.getLeaderboard();
            // Filter out self
            setUsers(data.filter((u: any) => u._id !== user?.id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAction = (targetUser: any, type: 'KUDOS' | 'GIFT') => {
        setSelectedUser(targetUser);
        setModalType(type);
        setModalOpen(true);
    };

    const handleSubmitAction = async (data: any) => {
        try {
            if (!selectedUser) return;

            if (modalType === 'KUDOS') {
                await socialApi.sendKudos({
                    recipientId: selectedUser._id,
                    assetType: data.assetType,
                    message: data.message
                });
                toast.success(`Sent Kudos to ${selectedUser.username}!`);
            } else {
                await socialApi.sendGift({
                    recipientId: selectedUser._id,
                    assetType: data.assetType,
                    amount: data.amount,
                    message: data.message
                });
                toast.success(`Sent Gift to ${selectedUser.username}!`);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Community
                </h1>
                <p className="text-gray-500 mt-2">Connect with peers, create duels, and share rewards.</p>
            </header>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map(u => (
                        <UserCard
                            key={u._id}
                            user={u}
                            onKudos={() => handleOpenAction(u, 'KUDOS')}
                            onGift={() => handleOpenAction(u, 'GIFT')}
                        />
                    ))}
                </div>
            )}

            <SocialActionsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType}
                recipientName={selectedUser?.username || 'User'}
                onSubmit={handleSubmitAction}
            />
        </div>
    );
};

export default CommunityPage;
