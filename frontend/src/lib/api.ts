import axios from 'axios';

const Backend_URL = process.env.Backend_URL || 'http://localhost:5000/api';
const api = axios.create({
    baseURL: Backend_URL,
    withCredentials: true
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: (email: string, password: string) => api.post('/auth/login', { email, password }),
    register: (data: any) => api.post('/auth/register', data),
    verifyToken: () => api.get('/auth/verify'),
    logout: () => api.get('/auth/logout'),
};

// Helper methods
export const gameApi = {
    getLeaderboard: () => api.get('/game/leaderboard'),
    getDailyQuests: () => api.get('/game/daily-quests'),
    getMapData: () => api.get('/game/map'), // Reuse existing map endpoint
    completeLevel: (levelId: string, solvedPuzzles: string[] = []) => api.post('/game/level/complete', { levelId, solvedPuzzles }),
    getLevel: (levelId: string) => api.get(`/game/level/${levelId}`),
    submitFeedback: (message: string) => api.post('/game/feedback', { message }),
    completePuzzle: (solvedPuzzles: string[]) => api.post('/game/puzzle/complete', { solvedPuzzles }),
};

export const socialApi = {
    sendKudos: (data: { recipientId: string; assetType: string; message?: string }) =>
        api.post('/social/kudos', data),
    sendGift: (data: { recipientId: string; assetType: string; amount: number; message?: string }) =>
        api.post('/social/gift', data),
    getHistory: () => api.get('/social/history'),
    searchUsers: () => api.get(`/social/search`),
};

export const duelApi = {
    createDuel: (data: { opponentId: string; metric: string; wager: number; durationHours?: number }) =>
        api.post('/duels/create', data),
    respondToDuel: (data: { duelId: string; response: 'ACCEPT' | 'DECLINE' }) =>
        api.post('/duels/respond', data),
    getDuels: () => api.get('/duels'),
};

export default api;
