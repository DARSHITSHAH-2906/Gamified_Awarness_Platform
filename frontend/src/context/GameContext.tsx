import { createContext, useContext, useState } from 'react';

interface GameState {
    xp: number;
    level: number;
    points: number;
    badges: string[];
}

interface GameContextType {
    gameState: GameState;
    addXp: (amount: number) => void;
    awardBadge: (badgeId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>({
        xp: 0,
        level: 1,
        points: 0,
        badges: []
    });

    const addXp = (amount: number) => {
        setGameState(prev => {
            const newXp = prev.xp + amount;
            const newLevel = Math.floor(newXp / 100) + 1; // Simple linear leveling for now
            return { ...prev, xp: newXp, points: prev.points + amount, level: newLevel };
        });
    };

    const awardBadge = (badgeId: string) => {
        if (!gameState.badges.includes(badgeId)) {
            setGameState(prev => ({ ...prev, badges: [...prev.badges, badgeId] }));
            // Could trigger animation/notification here
        }
    };

    return (
        <GameContext.Provider value={{ gameState, addXp, awardBadge }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
