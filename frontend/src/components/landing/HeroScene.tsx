import { motion } from "framer-motion";
import { Play, Star, Shield, BookOpen, Trophy, Sparkles } from "lucide-react";
import { GameButton } from "@/components/ui/GameButton";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 py-20 bg-gradient-to-b from-amber-50 to-sky-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20"
                    animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary/20"
                    animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-accent/20"
                    animate={{ y: [0, -15, 0], rotate: [0, -180, -360] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-highlight/20"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Stars decoration */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-highlight"
                        style={{
                            top: `${15 + Math.random() * 70}%`,
                            left: `${5 + Math.random() * 90}%`,
                        }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.8, 0.3],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        <Star size={16 + Math.random() * 16} className="fill-current" />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-nunito font-bold text-sm mb-6 border border-primary/20 mt-5"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Sparkles size={16} className="animate-pulse" />
                            Adventure Awaits! • Ages 8-16
                        </motion.div>

                        <h1 className="text-4xl sm:text-xl lg:text-6xl xl:text-7xl font-fredoka font-bold leading-tight mb-6">
                            <span className="text-dark">Learn Your </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Rights</span>
                            <br />
                            <span className="text-dark">Through </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Play!</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-dark-lighter font-nunito mb-8 max-w-xl mx-auto lg:mx-0">
                            Escape room adventures, puzzles, and rewards await! Become a Rights Champion
                            and unlock your superpowers through fun challenges.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <Link to="/login?dest=/dashboard">
                                <GameButton variant="primary" size="lg">
                                    <Play size={24} />
                                    Start Adventure
                                </GameButton>
                            </Link>
                            <a href="#how-it-works">
                                <GameButton variant="secondary" size="lg" glow={false}>
                                    <BookOpen size={24} />
                                    How It Works
                                </GameButton>
                            </a>
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-fredoka font-bold text-primary">50K+</div>
                                <div className="text-sm text-dark-lighter font-nunito font-bold">Young Heroes</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-fredoka font-bold text-secondary">8</div>
                                <div className="text-sm text-dark-lighter font-nunito font-bold">Rights Topics</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-fredoka font-bold text-rose-500">100+</div>
                                <div className="text-sm text-dark-lighter font-nunito font-bold">Puzzles</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right content - Mascot/Visual area */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Main mascot container */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Central character area */}
                            <motion.div
                                className="absolute inset-8 rounded-full bg-card shadow-lg flex items-center justify-center bg-neutral-50"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="text-center p-8">
                                    <motion.div
                                        className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center shadow-glow-primary"
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                    >
                                        <Shield size={64} className="text-primary-foreground" />
                                    </motion.div>
                                    <h3 className="font-fredoka font-bold text-xl text-foreground mb-2">
                                        Rights Guardian
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-nunito">
                                        Your guide to adventure!
                                    </p>
                                </div>
                            </motion.div>

                            {/* Floating badges around mascot */}
                            <motion.div
                                className="absolute top-0 right-1/4 w-16 h-16 rounded-2xl bg-card shadow-lg flex items-center justify-center"
                                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                            >
                                <Trophy size={32} className="text-highlight" />
                            </motion.div>

                            <motion.div
                                className="absolute bottom-1/4 left-0 w-14 h-14 rounded-2xl bg-card shadow-lg flex items-center justify-center"
                                animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                            >
                                <BookOpen size={28} className="text-secondary" />
                            </motion.div>

                            <motion.div
                                className="absolute bottom-0 right-1/4 w-12 h-12 rounded-2xl bg-card shadow-lg flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Star size={24} className="text-primary fill-primary" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
