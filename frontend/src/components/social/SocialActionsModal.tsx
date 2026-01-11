import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'KUDOS' | 'GIFT';
    recipientName: string;
    onSubmit: (data: any) => void;
}

const SocialActionsModal: React.FC<SocialActionsModalProps> = ({ isOpen, onClose, type, recipientName, onSubmit }) => {
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(type === 'KUDOS' ? 'high-five' : 'coffee');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ assetType: selectedAsset, amount, message });
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-white/20 shadow-xl"
                >
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-1">
                        Send {type === 'KUDOS' ? 'Kudos' : 'a Gift'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">to {recipientName}</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Asset Selection */}
                        <div className="grid grid-cols-3 gap-2">
                            {(type === 'KUDOS' ? ['high-five', 'applause', 'fire'] : ['coffee', 'gold-coin', 'trophy']).map(asset => (
                                <button
                                    key={asset}
                                    type="button"
                                    onClick={() => setSelectedAsset(asset)}
                                    className={`p-2 rounded-lg border text-2xl flex items-center justify-center transition-all ${selectedAsset === asset
                                            ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200'
                                            : 'border-slate-200 hover:bg-slate-50 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    {asset === 'high-five' && '✋'}
                                    {asset === 'applause' && '👏'}
                                    {asset === 'fire' && '🔥'}
                                    {asset === 'coffee' && '☕'}
                                    {asset === 'gold-coin' && '🪙'}
                                    {asset === 'trophy' && '🏆'}
                                </button>
                            ))}
                        </div>

                        {type === 'GIFT' && (
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (Coins)</label>
                                <input
                                    type="number"
                                    min="10"
                                    step="10"
                                    value={amount}
                                    onChange={e => setAmount(Number(e.target.value))}
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-indigo-500 px-3 py-2"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Message (Optional)</label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-indigo-500 px-3 py-2 text-sm"
                                rows={2}
                                placeholder="Say something nice..."
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-200"
                            >
                                Send {type === 'KUDOS' ? 'Kudos' : 'Gift'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SocialActionsModal;
