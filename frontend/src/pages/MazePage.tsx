import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MazeProvider } from '../context/MazeContext';
import { MazeGame } from '../components/game/MazeGame';
import { X } from 'lucide-react';

import { useState } from 'react';
import { gameApi } from '../lib/api';
import { ChallengeGame } from '../components/game/challenges/ChallengeGame';

const MazePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const levelId = searchParams.get('levelId') || undefined;
    const [levelData, setLevelData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (levelId) {
            gameApi.getLevel(levelId)
                .then(res => {
                    setLevelData(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch level", err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [levelId]);

    const handleClose = () => {
        navigate('/dashboard/play?return=/dashboard');
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
            {/* Header / Close Button */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={handleClose}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                >
                    <X size={28} />
                </button>
            </div>

            {/* Game Container */}
            <div className="flex-1 w-full h-full relative overflow-hidden">
                <MazeProvider onComplete={handleClose}>
                    <MazeGame onClose={handleClose} levelId={levelId} />
                </MazeProvider>
            </div>
        </div>
    );
};

export default MazePage;
