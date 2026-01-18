import { motion } from "framer-motion";
import { Lock, CheckCircle2, Star, Play, BookOpen, Heart, Shield, Mic, School, Stethoscope } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { GameBadge } from "@/components/ui/GameBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";

const topics = [
    {
        id: 1,
        title: "Right to Information",
        description: "Learn how to access knowledge and stay informed!",
        icon: BookOpen,
        color: "from-orange-400 to-orange-600",
        progress: 100,
        completed: true,
        puzzles: 12,
        unlocked: true,
    },
    {
        id: 2,
        title: "Freedom of Expression",
        description: "Your voice matters! Learn to express yourself safely.",
        icon: Mic,
        color: "from-yellow-400 to-yellow-600",
        progress: 65,
        completed: false,
        puzzles: 15,
        unlocked: true,
    },
    {
        id: 3,
        title: "Right to Education",
        description: "Every child deserves to learn and grow.",
        icon: School,
        color: "from-amber-400 to-amber-600",
        progress: 0,
        completed: false,
        puzzles: 14,
        unlocked: true,
    },
    {
        id: 4,
        title: "Right to Health",
        description: "Stay healthy and know your healthcare rights!",
        icon: Stethoscope,
        color: "from-red-400 to-red-600",
        progress: 0,
        completed: false,
        puzzles: 10,
        unlocked: false,
    },
    {
        id: 5,
        title: "Protection from Abuse",
        description: "Learn to stay safe and protect yourself.",
        icon: Shield,
        color: "from-rose-400 to-rose-600",
        progress: 0,
        completed: false,
        puzzles: 12,
        unlocked: false,
    },
    {
        id: 6,
        title: "Right to Family",
        description: "Family bonds and your rights at home.",
        icon: Heart,
        color: "from-orange-500 to-red-500",
        progress: 0,
        completed: false,
        puzzles: 11,
        unlocked: false,
    },
];

export function TopicsPreview() {
    return (
        <section className="py-24 px-4 bg-linear-to-b from-indigo-50 to-amber-50">
            <div className="container mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-nunito font-bold text-sm mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <Star size={16} className="fill-current" />
                        8 Epic Topics
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-fredoka font-bold mb-4">
                        <span className="text-foreground">Choose Your </span>
                        <span className="text-gradient-secondary">Adventure</span>
                    </h2>

                    <p className="text-lg text-muted-foreground font-nunito max-w-2xl mx-auto">
                        Each topic is a unique escape room experience with puzzles,
                        knowledge, and rewards waiting to be discovered!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GameCard
                                className={`relative h-full ${!topic.unlocked ? 'opacity-80' : ''}`}
                                glow={topic.completed ? "accent" : topic.unlocked ? "primary" : "none"}
                            >
                                {/* Status badge */}
                                <div className="absolute top-4 right-4">
                                    {topic.completed ? (
                                        <GameBadge variant="accent" animated>
                                            <CheckCircle2 size={14} />
                                            Complete
                                        </GameBadge>
                                    ) : !topic.unlocked ? (
                                        <GameBadge variant="default">
                                            <Lock size={14} />
                                            Locked
                                        </GameBadge>
                                    ) : topic.progress > 0 ? (
                                        <GameBadge variant="primary" animated>
                                            <Play size={14} />
                                            In Progress
                                        </GameBadge>
                                    ) : null}
                                </div>

                                {/* Icon */}
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${topic.color} flex items-center justify-center mb-4 shadow-lg`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <topic.icon size={32} className="text-white" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-fredoka font-bold text-foreground mb-2">
                                    {topic.title}
                                </h3>
                                <p className="text-muted-foreground font-nunito text-sm mb-4">
                                    {topic.description}
                                </p>

                                {/* Meta info */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground font-nunito mb-4">
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-highlight fill-highlight" />
                                        {topic.puzzles} Puzzles
                                    </span>
                                </div>

                                {/* Progress */}
                                {topic.unlocked && (
                                    <ProgressBar
                                        current={topic.progress}
                                        max={100}
                                        showLabel={false}
                                        variant={topic.completed ? "accent" : "primary"}
                                        size="sm"
                                    />
                                )}

                                {/* Lock overlay */}
                                {!topic.unlocked && (
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl bg-foreground/5 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="text-center">
                                            <Lock size={32} className="text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground font-nunito">
                                                Complete previous level
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </GameCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
