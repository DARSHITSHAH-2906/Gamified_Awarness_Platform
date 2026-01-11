import { motion } from 'framer-motion';
import { getAvatarSeed } from '@/utils/avatarUtils';

interface AvatarMarkerProps {
    avatarId: string;
}

export const AvatarMarker = ({ avatarId }: AvatarMarkerProps) => {
    return (
        <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: [0, -10, 0] }}
            transition={{
                scale: { duration: 0.5 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" } // Floating effect
            }}
        >
            {/* Pin Shape */}
            <div className="relative z-10 w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(avatarId)}`}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Triangle Pointer */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rotate-45 border-r-2 border-b-2 border-white shadow-sm z-0"></div>

            {/* Ripple Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/30 rounded-full animate-ping -z-10"></div>
        </motion.div>
    );
};
