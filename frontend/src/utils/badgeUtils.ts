import { Shield, Star, Award, Zap, Crown, Target, Book } from 'lucide-react';

export const BADGES: Record<string, any> = {
    'sharpshooter': {
        id: 'sharpshooter',
        name: 'Sharpshooter',
        description: 'Achieve 100% accuracy in a level',
        icon: Target,
        color: 'text-red-500',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200'
    },
    'early_bird': {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Complete a quest before 10 AM',
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-200'
    },
    'rights_defender': {
        id: 'rights_defender',
        name: 'Rights Defender',
        description: 'Complete the entire RTI region',
        icon: Shield,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200'
    },
    'scholar': {
        id: 'scholar',
        name: 'Scholar',
        description: 'Earn 1000 XP',
        icon: Book,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200'
    }
    // Add default fallback
};

export const getBadgeDetails = (badgeId: string) => {
    return BADGES[badgeId] || {
        id: badgeId,
        name: 'Unknown Badge',
        description: 'Mystery Achievement',
        icon: Award,
        color: 'text-gray-500',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-200'
    };
};
