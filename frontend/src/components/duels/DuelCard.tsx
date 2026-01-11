import React from 'react';

interface DuelCardProps {
    duel: any;
    currentUserId: string;
    onRespond: (duelId: string, response: 'ACCEPT' | 'DECLINE') => void;
}

const DuelCard: React.FC<DuelCardProps> = ({ duel, currentUserId, onRespond }) => {
    const isChallenger = duel.challengerId._id === currentUserId;
    const opponentName = isChallenger ? duel.opponentId.username : duel.challengerId.username;
    const opponentAvatar = isChallenger ? duel.opponentId.avatarId : duel.challengerId.avatarId;

    const isPendingForMe = duel.status === 'PENDING' && !isChallenger;

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            {/* Status Badge */}
            <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl ${duel.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                    duel.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-500'
                }`}>
                {duel.status}
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden border-2 border-indigo-200">
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${opponentAvatar}`}
                        className="w-full h-full"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">vs. {opponentName}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{duel.metric} Challenge</p>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center mb-4">
                <span className="text-2xl font-black text-indigo-600">{duel.wager}</span>
                <p className="text-[10px] text-gray-400 uppercase">Wager (Coins)</p>
            </div>

            {isPendingForMe ? (
                <div className="flex gap-2">
                    <button
                        onClick={() => onRespond(duel._id, 'DECLINE')}
                        className="flex-1 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => onRespond(duel._id, 'ACCEPT')}
                        className="flex-1 py-1.5 text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        Accept
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    {duel.status === 'ACTIVE' && (
                        <p className="text-xs text-indigo-500 font-medium animate-pulse">Running...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DuelCard;
