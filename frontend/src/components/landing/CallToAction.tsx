import { motion } from "framer-motion";
import { Rocket, Star, Sparkles } from "lucide-react";
import { GameButton } from "@/components/ui/GameButton";
import { Link } from "react-router-dom";

export function CallToAction() {
    return (
        <section className="py-24 px-4 relative overflow-hidden bg-linear-to-br from-amber-100 via-orange-50 to-rose-50">
            {/* Background decoration */}

            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            {/* Floating stars */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-accent/40"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                    }}
                >
                    <Star size={12 + Math.random() * 20} className="fill-current" />
                </motion.div>
            ))}

            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-nunito font-bold text-sm mb-6 border border-primary/20"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <Sparkles size={16} className="animate-pulse" />
                        Join 50,000+ Young Heroes
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-fredoka font-bold mb-6">
                        <span className="text-dark">Ready to Become a </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">Rights Champion?</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-dark-lighter font-nunito mb-8 max-w-2xl mx-auto">
                        Start your adventure today! Create your hero, solve puzzles,
                        earn rewards, and learn about your rights in the most fun way possible.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <GameButton variant="primary" size="lg" className="w-full sm:w-auto shadow-orange-500/20">
                                <Rocket size={24} />
                                Create Your Hero
                            </GameButton>
                        </Link>
                        <Link to="/demo">
                            <GameButton variant="secondary" size="lg" className="w-full sm:w-auto shadow-sky-500/20">
                                <Star size={24} />
                                Watch Demo
                            </GameButton>
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <motion.div
                        className="mt-12 flex flex-wrap justify-center gap-8 text-dark-lighter"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center gap-2 text-sm font-nunito font-semibold">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            Child-Safe Environment
                        </div>
                        <div className="flex items-center gap-2 text-sm font-nunito font-semibold">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            COPPA Compliant
                        </div>
                        <div className="flex items-center gap-2 text-sm font-nunito font-semibold">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            No Ads
                        </div>
                        <div className="flex items-center gap-2 text-sm font-nunito font-semibold">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            Free to Start
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
