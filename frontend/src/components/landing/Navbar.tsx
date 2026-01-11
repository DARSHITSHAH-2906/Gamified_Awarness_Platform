import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { GameButton } from "@/components/ui/GameButton";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20">
                                <Shield size={24} className="text-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-dark">
                                Edu<span className="text-primary">Rights</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#topics" className="font-nunito font-bold text-dark-lighter hover:text-primary transition-colors">
                                Topics
                            </a>
                            <a href="#how-it-works" className="font-nunito font-bold text-dark-lighter hover:text-primary transition-colors">
                                How It Works
                            </a>
                            <a href="#leaderboard" className="font-nunito font-bold text-dark-lighter hover:text-primary transition-colors">
                                Leaderboard
                            </a>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <GameButton variant="primary" size="sm">
                                        Dashboard
                                    </GameButton>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <GameButton variant="ghost" size="sm" glow={false}>
                                            Sign In
                                        </GameButton>
                                    </Link>
                                    <Link to="/register">
                                        <GameButton variant="primary" size="sm">
                                            Play Now
                                        </GameButton>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            className="md:hidden p-2 text-dark"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 pt-4 border-t border-gray-100"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="flex flex-col gap-4">
                                <a href="#topics" className="font-nunito font-bold text-dark-lighter hover:text-dark transition-colors py-2">
                                    Topics
                                </a>
                                <a href="#how-it-works" className="font-nunito font-bold text-dark-lighter hover:text-dark transition-colors py-2">
                                    How It Works
                                </a>
                                <a href="#leaderboard" className="font-nunito font-bold text-dark-lighter hover:text-dark transition-colors py-2">
                                    Leaderboard
                                </a>
                                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                    {isAuthenticated ? (
                                        <Link to="/dashboard">
                                            <GameButton variant="primary" size="md">
                                                Go to Dashboard
                                            </GameButton>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link to="/login">
                                                <GameButton variant="ghost" size="md" glow={false}>
                                                    Sign In
                                                </GameButton>
                                            </Link>
                                            <Link to="/register">
                                                <GameButton variant="primary" size="md">
                                                    Play Now
                                                </GameButton>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
