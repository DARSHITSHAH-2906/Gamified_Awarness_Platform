import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialApi } from '../../lib/api';
import { X, Swords, Trophy, Clock, Coins, User, Search } from 'lucide-react';

interface CreateDuelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    currentUserId: string;
}

const CreateDuelModal: React.FC<CreateDuelModalProps> = ({ isOpen, onClose, onSubmit, currentUserId }) => {
    const [opponentName, setOpponentName] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedOpponent, setSelectedOpponent] = useState<any>(null);
    const [isSearching, ] = useState(false);

    const [wager, setWager] = useState(50);
    const [metric, setMetric] = useState('XP');
    const [durationDays, setDurationDays] = useState(7);

    let timer = useRef<NodeJS.Timeout|undefined>(undefined);

    useEffect(()=>{
        const fetchUsers = async () => {
            if (currentUserId) {
                const res = await socialApi.searchUsers();
                console.log(res.data);
                setUsers(res.data.filter((u: any) => u._id !== currentUserId));
            }
        }
        fetchUsers();
    }, [currentUserId])

    // Debounce Search
    useEffect(() => {
        clearTimeout(timer.current);

        if (!opponentName) {
            setSuggestions([]);
            return;
        }

        timer.current = setTimeout(() => {
            if (opponentName.length) {
                console.log(opponentName)
                const filteredUsers = users.filter((user: any) =>
                    user.username.toLowerCase().includes(opponentName.toLowerCase())
                );
                console.log(filteredUsers);
                setSuggestions(filteredUsers);
            } else {
                setSuggestions([]);
            }
        }, 500);
    }, [opponentName]);

    const handleSelectOpponent = (user: any) => {
        setSelectedOpponent(user);
        setOpponentName('');
        setSuggestions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOpponent) return;
        onSubmit({ opponentId: selectedOpponent._id, metric, wager, durationDays });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-slate-950 rounded-lg w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col gap-0 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex flex-col space-y-1.5 p-6 pb-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Swords className="w-5 h-5 text-indigo-500" />
                                Create Duel
                            </h2>
                            <button onClick={onClose} className="rounded-sm opacity-70 ring-offset-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Challenge a peer to a competitive face-off.
                        </p>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">

                        {/* Opponent Search */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium leading-none flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-500" /> Opponent
                            </label>

                            {selectedOpponent ? (
                                <div className="flex items-center justify-between p-3 rounded-md border border-indigo-200 bg-indigo-50 text-indigo-900">
                                    <span className="font-bold">{selectedOpponent.username}</span>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedOpponent(null)}
                                        className="text-indigo-500 hover:text-indigo-700"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search username..."
                                        value={opponentName}
                                        onChange={e => setOpponentName(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 pl-9 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-3">
                                            <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                                        </div>
                                    )}

                                    {/* Suggestions Dropdown */}
                                    {suggestions.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                            {suggestions.map(u => (
                                                <div
                                                    key={u._id}
                                                    onClick={() => handleSelectOpponent(u)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-2"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                                                        {u.username[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-sm">{u.username}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Metric & Duration Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-slate-500" /> Metric
                                </label>
                                <select
                                    value={metric}
                                    onChange={e => setMetric(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <option value="XP">Highest XP</option>
                                    <option value="STEPS">Steps (Mock)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500" /> Duration
                                </label>
                                <select
                                    value={durationDays}
                                    onChange={e => setDurationDays(Number(e.target.value))}
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <option value={1}>24 Hours</option>
                                    <option value={3}>3 Days</option>
                                    <option value={7}>7 Days</option>
                                    <option value={10}>10 Days</option>
                                    <option value={30}>30 Days</option>
                                </select>
                            </div>
                        </div>

                        {/* Wager Grid */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none flex items-center gap-2">
                                <Coins className="w-4 h-4 text-amber-500" /> Wager (Coins)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="10"
                                value={wager}
                                onChange={e => setWager(Number(e.target.value))}
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <p className="text-[0.8rem] text-slate-500 dark:text-slate-400">
                                Winner takes {wager * 2} coins! Ties strictly refund.
                            </p>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!selectedOpponent}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-slate-50 hover:bg-indigo-700 h-10 px-4 py-2"
                            >
                                Send Challenge
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CreateDuelModal;
