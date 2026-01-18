import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Map,
    Trophy,
    BookOpen,
    Settings,
    LogOut,
    User,
    Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';

const SidebarItem = ({ icon: Icon, label, path, active }: any) => (
    <Link to={path}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-dark-lighter hover:bg-light-soap'}`}>
            <Icon className="w-5 h-5" />
            <span className="font-bold">{label}</span>
        </div>
    </Link>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const { gameState } = useGame();
    const location = useLocation();

    const NAV_ITEMS = [
        { icon: LayoutDashboard, label: 'Command Center', path: '/dashboard' },
        { icon: Map, label: 'Missions Map', path: '/map' },
        { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
        { icon: BookOpen, label: 'Knowledge Hub', path: '/hub' },
    ];

    return (
        <div className="min-h-screen bg-light flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 fixed h-full z-20"
            >
                <div className="flex items-center gap-2 mb-10 text-primary">
                    <Star className="w-8 h-8 fill-current" />
                    <span className="text-2xl font-display font-bold text-dark">EduRights</span>
                </div>

                <nav className="flex-1">
                    {NAV_ITEMS.map((item) => (
                        <SidebarItem
                            key={item.path}
                            {...item}
                            active={location.pathname === item.path}
                        />
                    ))}
                </nav>

                <div className="border-t border-gray-100 pt-6">
                    <SidebarItem icon={Settings} label="Settings" path="/settings" />
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-danger hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold">Log Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-between">
                    <h1 className="text-2xl text-dark hidden md:block">
                        Welcome back, <span className="text-primary">{user?.username || 'Hero'}</span>!
                    </h1>

                    <div className="flex items-center gap-6 ml-auto">
                        {/* XP Bar */}
                        <div className="flex flex-col items-end w-48">
                            <div className="flex justify-between w-full text-xs font-bold text-dark-lighter mb-1">
                                <span>LVL {gameState.level}</span>
                                <span>{gameState.xp} / {(gameState.level * 1000)} XP</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(gameState.xp % 1000) / 10}%` }}
                                    className="h-full bg-linear-to-r from-primary to-accent"
                                />
                            </div>
                        </div>

                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-light-soap flex items-center justify-center border-2 border-primary">
                            <User className="text-dark" />
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
