import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { Map, Trophy, BookOpen, Settings, LogOut, Users, Swords, Gift, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardSidebarProps {
    onLogout: () => void;
}

const SideBarItems = [
    { icon: Map, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Mission Map', path: '/dashboard/play?return=/dashboard' },
    { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard?return=/dashboard' },
    { icon: Users, label: 'Community', path: '/dashboard/community?return=/dashboard' },
    { icon: Swords, label: 'Duels', path: '/dashboard/duels?return=/dashboard' },
    { icon: BookOpen, label: 'Topics', path: '/dashboard/topics?return=/dashboard' },
    { icon: Gift, label: 'Reward Shop', path: '/dashboard/shop?return=/dashboard' },
];

export const DashboardSidebar = ({ onLogout }: DashboardSidebarProps) => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <motion.aside
            className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 p-4 hidden lg:flex flex-col z-20 shadow-sm"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20">
                    <Shield size={24} className="text-white" />
                </div>
                <span className="font-display font-bold text-xl text-dark">
                    Edu<span className="text-primary">Rights</span>
                </span>
            </Link>

            {/* Nav items */}
            <nav className="flex-1 space-y-2">
                {SideBarItems.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-dark-lighter hover:bg-gray-50 font-nunito font-bold transition-colors ${location.pathname === item.path.split('?')[0]
                                ? 'bg-gradient-hero shadow-sm'
                                : 'bg-gray-50'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom nav */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-lighter hover:bg-gray-50 font-nunito font-bold transition-colors">
                    <Settings size={20} />
                    Settings
                </Link>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-dark-lighter hover:bg-red-50 hover:text-red-500 font-nunito font-bold transition-colors">
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </motion.aside>
    );
};
