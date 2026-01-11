import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z} from "zod";
import registerSchema from "../schema/register.schema"

import AvatarSelector from '../components/ui/AvatarSelector';
import { ArrowRight, Lock, User, Sparkles, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GameButton } from '../components/ui/GameButton';

// Random Name Generation
const HERO_ADJECTIVES = ["Super", "Mega", "Captain", "Iron", "Wonder", "Lightning", "Shadow", "Cosmic", "Mighty", "Brave", "Galactic", "Neon"];
const HERO_NOUNS = ["Falcon", "Tiger", "Eagle", "Wolf", "Dragon", "Star", "Guardian", "Ranger", "Ninja", "Knight", "Surfer", "Phoenix"];

const generateHeroName = () => {
    const adj = HERO_ADJECTIVES[Math.floor(Math.random() * HERO_ADJECTIVES.length)];
    const noun = HERO_NOUNS[Math.floor(Math.random() * HERO_NOUNS.length)];
    return `${adj} ${noun} ${Math.floor(Math.random() * 99)}`;
};

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
    const { register: registerUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    if (isAuthenticated) {
        navigate('/dashboard');
    }

    const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            childName: '',
            email: '',
            password: '',
            avatarId: 1,
            heroName: '',
        }
    });

    const currentHeroName = watch('heroName');
    const currentAvatarId = watch('avatarId');

    const handleNext = async () => {
        const isValid = await trigger(['childName', 'email', 'password']);
        if (isValid) setStep(2);
    };

    const randomizeName = () => {
        setValue('heroName', generateHeroName());
    };

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            await registerUser(data);
            navigate('/dashboard');
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-light">
            <div className="pt-24 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
                    <motion.div
                        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-4xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100 relative z-10">

                    {/* Side Panel (Gamified) */}
                    <div className="md:w-1/3 bg-primary p-8 text-white relative flex flex-col justify-between overflow-hidden">
                        <Link to="/" className="relative">
                            <ArrowLeft className="w-6 h-6 text-white hover:cursor-pointer" />
                        </Link>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display mb-4">Join the Squad!</h2>
                            <p className="opacity-90 font-nunito">Create your hero identity and start defending rights.</p>
                        </div>

                        <div className="relative z-10 space-y-6">
                            {[1, 2].map((i) => (
                                <div key={i} className={`flex items-center gap-4 transition-opacity duration-300 ${step >= i ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-white text-lg transition-colors ${step >= i ? 'bg-white text-primary' : 'bg-transparent'}`}>
                                        {i}
                                    </div>
                                    <div>
                                        <span className="font-display font-bold block text-lg">Step {i}</span>
                                        <span className="text-xs font-nunito opacity-80">{i === 1 ? 'Secret Identity' : 'Hero Persona'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative z-10 mt-8">
                            <p className="text-xs font-nunito opacity-70">
                                By joining, you accept the Hero's Code of Conduct and promise to be awesome!
                            </p>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-xl" />
                    </div>

                    {/* Form Area */}
                    <div className="md:w-2/3 p-8 md:p-12 relative">
                        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-center">

                            {/* Step 1: Basic Info */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-display text-dark mb-6">Who are you, Prince/Princess?</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-dark-lighter mb-1">Your Real Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('childName')}
                                                    type="text"
                                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-light border-2 focus:bg-white transition-all outline-none font-nunito font-bold ${errors.childName ? 'border-red-400' : 'border-transparent focus:border-primary'}`}
                                                    placeholder="Alex Smith"
                                                />
                                            </div>
                                            {errors.childName && <p className="text-red-500 text-xs ml-1 mt-1 font-bold flex items-center gap-1"><AlertCircle size={12} />{errors.childName.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-dark-lighter mb-1">Email (or Parent's Email)</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('email')}
                                                    type="email"
                                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-light border-2 focus:bg-white transition-all outline-none font-nunito font-bold ${errors.email ? 'border-red-400' : 'border-transparent focus:border-primary'}`}
                                                    placeholder="hero@example.com"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs ml-1 mt-1 font-bold flex items-center gap-1"><AlertCircle size={12} />{errors.email.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-dark-lighter mb-1">Secret Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('password')}
                                                    type="password"
                                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-light border-2 focus:bg-white transition-all outline-none font-nunito font-bold ${errors.password ? 'border-red-400' : 'border-transparent focus:border-primary'}`}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            {errors.password && <p className="text-red-500 text-xs ml-1 mt-1 font-bold flex items-center gap-1"><AlertCircle size={12} />{errors.password.message}</p>}
                                        </div>
                                    </div>

                                    <GameButton
                                        type="button"
                                        onClick={handleNext}
                                        variant="primary"
                                        size="lg"
                                        className="w-full flex items-center justify-center gap-2 mt-8"
                                    >
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </GameButton>
                                </motion.div>
                            )}

                            {/* Step 2: Avatar & Hero Name */}
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h3 className="text-2xl font-display text-dark mb-4 text-center">Choose Your Hero Identity</h3>

                                    <AvatarSelector
                                        selectedId={currentAvatarId}
                                        onSelect={(id) => setValue('avatarId', id)}
                                    />

                                    <div className="mt-8">
                                        <label className="block text-sm font-bold text-dark-lighter mb-1 text-center">Your Superhero Name</label>
                                        <div className="relative max-w-sm mx-auto">
                                            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-accent w-5 h-5" />
                                            <input
                                                {...register('heroName')}
                                                type="text"
                                                className={`w-full pl-12 pr-12 py-3 rounded-xl bg-light border-2 text-lg font-bold text-center transition-all outline-none text-dark ${errors.heroName ? 'border-red-400' : 'border-accent focus:border-accent-hover'}`}
                                                placeholder="Captain Justice"
                                            />
                                            <button
                                                type="button"
                                                onClick={randomizeName}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors text-accent-hover font-bold text-xs flex items-center gap-1"
                                                title="Generate Random Name"
                                            >
                                                <RefreshCw size={14} />
                                                Generate
                                            </button>
                                        </div>
                                        {errors.heroName && <p className="text-red-500 text-xs text-center mt-1 font-bold">{errors.heroName.message}</p>}
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-6 py-3 rounded-xl font-bold text-dark-lighter hover:bg-gray-100 transition-colors font-nunito"
                                        >
                                            Back
                                        </button>
                                        <GameButton
                                            type="submit"
                                            variant="secondary"
                                            size="lg"
                                            className="flex-1 flex items-center justify-center gap-2"
                                        >
                                            Create Hero Account! 🚀
                                        </GameButton>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
