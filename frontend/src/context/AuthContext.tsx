import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../lib/api';

interface User {
    _id: string; // Added _id
    id: string;
    username: string;
    email: string;
    avatarId: string;
    totalStars: number;
    currentRegion?: string;
    progress: { levelId: string; status: string; stars: number }[];
    xp: number;
    level?: number; // Added level
    accuracy: number;
    badges: string[];
    streak: { count: number; lastLogin: string };
    dailyQuests?: any[]; // Added dailyQuests
    currency? : number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>; // Added password
    register: (data: any) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                    // Verify token with backend
                    const res = await authApi.verifyToken();
                    const { user } = res.data;
                    setUser(user);
                } catch (error) {
                    // If verification fails, clear auth
                    console.error("Token verification failed", error);
                    localStorage.removeItem('edu_user');
                    setUser(null);
                }
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await authApi.login(email, password);
            const { user } = res.data;
            localStorage.setItem('edu_user', JSON.stringify(user));
            setUser(user);
            toast.success(`Welcome back, ${user.username}!`);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Login failed", error);
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            const payload = {
                username: data.heroName,
                email: data.email,
                password: data.password,
                avatarId: String(data.avatarId)
            };

            const res = await authApi.register(payload);
            const { user } = res.data;

            localStorage.setItem('edu_user', JSON.stringify(user));
            setUser(user);
            toast.success(`Welcome, ${user.username}! Your journey begins!`);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Registration failed", error);
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
            localStorage.removeItem('edu_user');
            toast.success('You have been logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
            toast.error('Logout failed. Please try again.');
        }
    };

    const updateUser = (userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null);
        const currentUser = JSON.parse(localStorage.getItem('edu_user') || '{}');
        localStorage.setItem('edu_user', JSON.stringify({ ...currentUser, ...userData }));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
