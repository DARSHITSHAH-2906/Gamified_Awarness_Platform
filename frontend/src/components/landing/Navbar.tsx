import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star, Trophy, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = ['Missions', 'Heroes', 'About', 'Community'];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg border border-white/40 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-25 h-15 bg-primary p-1 rounded-full shadow-md group-hover:scale-110 transition-transform duration-200">
                        {/* <Star className="text-white w-6 h-6 fill-current" /> */}
                        <img src="/logo.png" alt="Logo" className='w-full h-full rounded-full'/>
                    </div>
                    <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        EduRights
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-dark font-bold hover:text-primary transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-secondary rounded-full group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn-primary flex items-center gap-2 bg-gradient-hero text-white rounded-xl p-2 text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                <Trophy className="w-4 h-4" />
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login?dest=/dashboard" className="font-bold text-dark-lighter hover:text-primary transition-colors">
                                Log In
                            </Link>
                            <Link to="/register?dest=/dashboard" className="btn-primary flex items-center gap-2 bg-gradient-hero text-white rounded-xl p-2 text-sm font-semibold">
                                <User className="w-4 h-4" />
                                Join Squad
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-dark hover:bg-light-soap rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 md:hidden flex flex-col gap-4"
                    >
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item}
                                to={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-lg font-bold text-dark hover:text-primary p-2 rounded-lg hover:bg-light-soap transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="h-px bg-gray-200 my-2" />
                        <div className="flex flex-col items-center gap-2">
                            <Link
                                to="/login"
                                className="text-center text-md font-bold text-dark py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary text-center bg-gradient-hero text-white rounded-xl p-2 text-md font-semibold hover:bg-gradient-hero/80 display-inline-block w-2/3 "
                                onClick={() => setIsOpen(false)}
                            >
                                Join Squad
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
