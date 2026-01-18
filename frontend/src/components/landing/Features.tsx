import { motion } from "framer-motion";
import { Gamepad2, Trophy, BookOpen, Users, Star, Puzzle, Target } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";

const features = [
    {
        icon: Gamepad2,
        title: "Escape Room Adventures",
        description: "Navigate through exciting maze challenges to unlock your rights knowledge!",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Puzzle,
        title: "Interactive Puzzles",
        description: "Solve word puzzles, match pairs, and crack codes to progress through levels.",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        icon: Trophy,
        title: "Earn Rewards",
        description: "Collect badges, XP points, and climb the leaderboards with each victory!",
        color: "text-highlight",
        bg: "bg-highlight/10",
    },
    {
        icon: BookOpen,
        title: "Learn & Grow",
        description: "Articles, videos, and stories make learning about your rights fun and easy.",
        color: "text-accent",
        bg: "bg-accent/10",
    },
    {
        icon: Target,
        title: "Daily Quests",
        description: "Complete daily challenges for bonus XP and exclusive rewards!",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Users,
        title: "Play with Friends",
        description: "Challenge your friends, share achievements, and learn together!",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export function Features() {
    return (
        <section className="py-24 px-4 bg-linear-to-b from-sky-50 to-indigo-50">
            <div className="container mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-nunito font-bold text-sm mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <Star size={16} className="fill-current" />
                        Why Kids Love Us
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-fredoka font-bold mb-4">
                        <span className="text-foreground">Adventure </span>
                        <span className="text-gradient-hero">Features</span>
                    </h2>

                    <p className="text-lg text-muted-foreground font-nunito max-w-2xl mx-auto">
                        Every feature is designed to make learning about your rights
                        the most exciting adventure you've ever had!
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={feature.title} variants={itemVariants}>
                            <GameCard
                                className="h-full"
                                glow={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}>
                                    <feature.icon size={28} className={feature.color} />
                                </div>
                                <h3 className="text-xl font-fredoka font-bold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground font-nunito">
                                    {feature.description}
                                </p>
                            </GameCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
