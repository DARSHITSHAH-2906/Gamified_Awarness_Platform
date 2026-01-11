import React from 'react';
import { motion } from 'framer-motion';

interface UserCardProps {
    user: {
        _id: string;
        username: string;
        avatarId: string;
        reputation?: number;
    };
    onKudos: (userId: string) => void;
    onGift: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onKudos, onGift }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all"
        >
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl border-2 border-white/30">
                {/* Avatar Placeholder or Image */}
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarId}`}
                    alt={user.username}
                    className="w-full h-full rounded-full"
                />
            </div>

            <div className="text-center">
                <h3 className="font-bold text-gray-800 dark:text-white">{user.username}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rep: {user.reputation || 0} ⭐</p>
            </div>

            <div className="flex gap-2 w-full mt-2">
                <button
                    onClick={() => onKudos(user._id)}
                    className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs py-2 px-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-1"
                >
                    👏 Kudos
                </button>
                <button
                    onClick={() => onGift(user._id)}
                    className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs py-2 px-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-1"
                >
                    🎁 Gift
                </button>
            </div>
        </motion.div>
    );
};

export default UserCard;
