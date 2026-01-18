import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, LogIn, Lock, Mail, AlertCircle } from 'lucide-react';
import { GameButton } from '../components/ui/GameButton';
import { useAuth } from '../context/AuthContext';

// Schema for form validation
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, 'Password must contain at least 8 characters, including one uppercase letter, one digit, and one special character'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const [searchParams, ] = useSearchParams();
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    const destination = searchParams.get('dest') || '/dashboard';
    if (isAuthenticated) {
        navigate(destination);
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setLoginError(null);
        try {
            await login(data.email, data.password);
            navigate(destination);
        } catch (err) {
            setLoginError('Invalid email or password. Try again hero!');
        }
    };

    return (
        <div className="min-h-screen bg-light flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
                <motion.div
                    className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative z-10"
            >
                {/* Header */}
                <div className="bg-primary p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                    <Link to="/" className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3"
                    >
                        <Shield size={32} className="text-primary" />
                    </motion.div>

                    <h2 className="text-3xl font-display font-bold mb-1">Welcome Back!</h2>
                    <p className="text-white/90 font-nunito">Resume your adventure, Hero.</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {loginError && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 text-red-500 p-3 rounded-xl flex items-center gap-2 text-sm font-bold"
                            >
                                <AlertCircle size={16} />
                                {loginError}
                            </motion.div>
                        )}

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-dark-lighter ml-1">Email Base</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary focus:outline-none transition-colors font-nunito font-bold text-dark"
                                    placeholder="hero@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs ml-1 font-bold">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-dark-lighter ml-1">Secret Code</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary focus:outline-none transition-colors font-nunito font-bold text-dark"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs ml-1 font-bold">{errors.password.message}</p>}
                        </div>

                        <div className="pt-2">
                            <GameButton
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full flex items-center justify-center gap-2"
                                disabled={isSubmitting}
                            >
                                <LogIn size={20} />
                                {isSubmitting ? 'Unlocking...' : 'Log In'}
                            </GameButton>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-dark-lighter font-nunito">
                            New to the squad?{' '}
                            <Link to="/register" className="text-primary font-bold hover:underline">Create a Hero</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
