import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Heart, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-16 px-4 bg-gradient-to-t from-slate-100 to-white border-t border-border">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <motion.div
                                className="flex items-center gap-3"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                                    <Shield size={24} className="text-primary-foreground" />
                                </div>
                                <span className="font-fredoka font-bold text-xl text-foreground">
                                    Edu<span className="text-primary">Rights</span>
                                </span>
                            </motion.div>
                        </Link>
                        <p className="text-muted-foreground font-nunito text-sm">
                            Empowering children to learn their rights through play.
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3 mt-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Youtube size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-fredoka font-bold text-foreground mb-4">Adventure</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Topics</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Leaderboard</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Daily Quests</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Badges</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-fredoka font-bold text-foreground mb-4">Learn</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Articles</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Videos</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Glossary</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-fredoka font-bold text-foreground mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Help Center</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Parents Guide</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-foreground font-nunito text-sm transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground font-nunito text-sm">
                        © 2024 EduRights. Made with <Heart size={14} className="inline text-primary fill-primary" /> for children everywhere.
                    </p>
                    <p className="text-muted-foreground font-nunito text-sm">
                        🇺🇳 Supporting the UN Convention on the Rights of the Child
                    </p>
                </div>
            </div>
        </footer>
    );
}
