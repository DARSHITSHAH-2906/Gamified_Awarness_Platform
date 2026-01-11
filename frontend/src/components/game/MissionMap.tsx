import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LevelNode } from './LevelNode';
import { gameApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Flag, Cloud, Star, Trees, Heart, Shield, Book, Scale, Zap, MapPin } from 'lucide-react';
import { AvatarMarker } from './AvatarMarker';
// import { AvatarMarker } from './AvatarMarker';

interface LevelData {
    levelId: string;
    title: string;
    status: 'locked' | 'unlocked' | 'completed';
    stars: number;
    x: number;
    y: number;
}

interface RegionData {
    regionId: string;
    title: string;
    levels: LevelData[];
    themeColor: string;
    bgGradient?: string;
}

// Decorative component mapping
const DECORATIONS: Record<string, any> = {
    'rti': Book,
    'rtbn': Heart,
    'rts': Zap,
    'identity-island': Flag,
    'family-forest': Trees,
    'health-haven': Heart,
    'education-empire': Book,
    'equality-expanse': Scale,
    'privacy-peak': Shield,
    'protection-paladin': Shield,
    'peace-pavilion': Cloud,
    'justice-jungle': Scale,
    'dream-domain': Star
};

export const MissionMap = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [regions, setRegions] = useState<RegionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const mapRes = await gameApi.getMapData();
                const mapData = mapRes.data;

                let userProgress: any[] = [];
                if (user && user.progress) {
                    userProgress = user.progress;
                }

                const mergedRegions = mapData.map((region: any) => {
                    const levels = region.levels.map((level: any) => {
                        // Ensure stringent string matching
                        // User progress stores levelId as ObjectId, Map Data level has _id as ObjectId
                        const prog = userProgress.find((p: any) => String(p.levelId) === String(level._id));
                        let status = prog ? prog.status : 'locked';
                        let stars = prog ? prog.stars : 0;

                        if ((!prog || status === 'locked') && String(level.levelId) === '101') {
                            status = 'unlocked';
                        }

                        return {
                            ...level,
                            status,
                            stars,
                        };
                    });

                    return {
                        ...region,
                        levels,
                    };
                });

                setRegions(mergedRegions);
                setLoading(false);

            } catch (error) {
                console.error("Failed to load map", error);
                setLoading(false);
            }
        };

        fetchMapData();
    }, [user]);

    const handlePlayLevel = (levelId?: string) => {
        if (levelId) {
            navigate(`/dashboard/play/maze?levelId=${levelId}`);
        }
    };

    if (loading) {
        return <div className="text-center p-20 font-bold text-gray-400 animate-pulse">Loading World Map...</div>;
    }

    // Dynamic height based on number of regions (approx 400px per region)
    const REGION_HEIGHT_PERCENT = 100 / regions.length;
    const TOTAL_HEIGHT = regions.length * 500;

    // --- LOGIC: Find Current Avatar Position ---

    // Default to the very first level of the first region (Start Position)
    let currentLevelPos = {
        x: regions[0]?.levels[0]?.x || 50,
        y: (regions[0]?.levels[0]?.y || 0) * (REGION_HEIGHT_PERCENT / 100), // Convert local Y to Global Y
        regionIdx: 0
    };

    let highestLevelId = -1;

    regions.forEach((r, rIdx) => {
        r.levels.forEach(l => {
            // We look for the "current" active level (unlocked or completed)
            // If the user has just started, Level 101 is unlocked, so this logic picks it up immediately.
            if (l.status === 'unlocked' || l.status === 'completed') {
                const lid = parseInt(l.levelId);

                // We want the highest unlocked level to place the avatar
                if (lid > highestLevelId) {
                    highestLevelId = lid;

                    // Calculate GLOBAL Y for this position
                    const regionStartPct = rIdx * REGION_HEIGHT_PERCENT;
                    const globalY = regionStartPct + (l.y * (REGION_HEIGHT_PERCENT / 100));

                    currentLevelPos = { x: l.x, y: globalY, regionIdx: rIdx };
                }
            }
        });
    });

    return (
        <div
            className="relative w-full bg-[#f8fafc] rounded-3xl border-8 border-white shadow-2xl overflow-hidden"
            style={{ height: `${TOTAL_HEIGHT}px` }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>

            {/* Region Background Zones */}
            {regions.map((region, idx) => {
                const DecoIcon = DECORATIONS[region.regionId] || MapPin;
                return (
                    <div
                        key={`bg-${region.regionId}`}
                        className="absolute w-full -skew-y-1 transform origin-left border-b-4 border-white/30"
                        style={{
                            height: `${REGION_HEIGHT_PERCENT + 1}%`, // Slight overlap
                            top: `${idx * REGION_HEIGHT_PERCENT}%`,
                            zIndex: 0,
                            // Use themeColor for background with opacity (Hex+Opacity: 20 = ~12%, 05 = ~3%)
                            background: `linear-gradient(to bottom, ${region.themeColor}20, ${region.themeColor}05)`
                        }}
                    >
                        {/* Floating Thematic Decorations */}
                        <div className="absolute right-10 top-10 opacity-10 transform rotate-12 animate-pulse" style={{ color: region.themeColor }}>
                            <DecoIcon size={140} />
                        </div>
                        <div className="absolute left-10 bottom-20 opacity-10 transform -rotate-12" style={{ color: region.themeColor }}>
                            <DecoIcon size={80} />
                        </div>

                        {/* Clouds */}
                        <div className="absolute top-1/2 left-1/4 opacity-20"><Cloud size={60} /></div>
                        <div className="absolute top-10 right-1/3 opacity-10"><Cloud size={40} /></div>
                    </div>
                )
            })}

            {/* SVG Layer for Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {regions.map((region, rIdx) => {
                    const regionStartPct = rIdx * REGION_HEIGHT_PERCENT;

                    const getGlobalY = (localY: number) => {
                        return regionStartPct + (localY * (REGION_HEIGHT_PERCENT / 100));
                    };

                    const points = region.levels.map(l => `${l.x}% ${getGlobalY(l.y)}%`).join(' L ');

                    // Logic for Progress Path
                    let lastUnlockedIndex = -1;
                    for (let i = region.levels.length - 1; i >= 0; i--) {
                        if (region.levels[i].status === 'completed' || region.levels[i].status === 'unlocked') {
                            lastUnlockedIndex = i;
                            break;
                        }
                    }
                    const progressLevels = region.levels.slice(0, lastUnlockedIndex + 1);
                    const progressPoints = progressLevels.map(l => `${l.x}% ${getGlobalY(l.y)}%`).join(' L ');

                    // Connect to next region
                    const nextRegion = regions[rIdx + 1];
                    let connPath = "";
                    if (nextRegion && nextRegion.levels.length > 0) {
                        const lastLvl = region.levels[region.levels.length - 1];
                        const firstLvl = nextRegion.levels[0];

                        const startX = lastLvl.x;
                        const startY = getGlobalY(lastLvl.y);
                        const endX = firstLvl.x;
                        const endY = (rIdx + 1) * REGION_HEIGHT_PERCENT + (firstLvl.y * (REGION_HEIGHT_PERCENT / 100));

                        // Curve connection
                        connPath = `M ${startX}% ${startY}% C ${startX}% ${startY + 2}%, ${endX}% ${endY - 2}%, ${endX}% ${endY}%`;
                    }

                    return (
                        <g key={region.regionId}>
                            {/* Base Track (White + Shadow) */}
                            <path
                                d={`M ${points}`}
                                fill="none"
                                stroke="rgba(255,255,255,0.9)"
                                strokeWidth="24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="drop-shadow-lg"
                            />

                            {/* Dashed Road Markings */}
                            <path
                                d={`M ${points}`}
                                fill="none"
                                stroke="#cbd5e1"
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="0 0"
                            />
                            <path
                                d={`M ${points}`}
                                fill="none"
                                stroke="#fff"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="15 25"
                                className="animate-[dash_20s_linear_infinite]"
                            />

                            {/* Completed Colored Track */}
                            {progressPoints && (
                                <path
                                    d={`M ${progressPoints}`}
                                    fill="none"
                                    stroke={region.themeColor}
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#glow)"
                                    className="transition-all duration-1000 opacity-80"
                                />
                            )}

                            {/* Connector */}
                            {connPath && (
                                <path
                                    d={connPath}
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="10"
                                    strokeDasharray="10 10"
                                    className="opacity-60"
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Avatar Positioned at Current Level */}
            <div
                className="absolute z-40 pointer-events-none transition-all duration-1000 ease-in-out"
                style={{
                    left: `${currentLevelPos.x}%`,
                    top: `${currentLevelPos.y}%`,
                    // -50% centers horizontally
                    // -100% moves the avatar UP so the bottom of the avatar touches the center of the node
                    transform: 'translate(-50%, -100%)'
                }}
            >
                <AvatarMarker avatarId={user?.avatarId || '1'} />
            </div>

            {/* Render Nodes & Labels */}
            {regions.map((region, idx) => {
                const regionStartPct = idx * REGION_HEIGHT_PERCENT;
                const getGlobalY = (localY: number) => {
                    return regionStartPct + (localY * (REGION_HEIGHT_PERCENT / 100));
                };

                return (
                    <div key={region.regionId} className="absolute w-full h-full inset-0 pointer-events-none">
                        {/* Region Label */}
                        <div
                            className="absolute pointer-events-auto transform transition-transform hover:scale-105 z-20"
                            style={{
                                left: '2%',
                                top: `${regionStartPct + 2}%`,
                            }}
                        >
                            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-lg border-b-4 border-r-4" style={{ borderColor: region.themeColor }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: region.themeColor }}>
                                    <Cloud size={24} fill="currentColor" className="text-white/80" />
                                </div>
                                <div>
                                    <h3 className="font-display font-extrabold text-xl leading-none" style={{ color: region.themeColor }}>
                                        {region.title}
                                    </h3>
                                    <div className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Region {idx + 1}</div>
                                </div>
                            </div>
                        </div>

                        {/* Level Nodes */}
                        {region.levels.map((level) => (
                            <div
                                key={level.levelId}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                                style={{
                                    left: `${level.x}%`,
                                    top: `${getGlobalY(level.y)}%`
                                }}
                            >
                                <LevelNode
                                    status={level.status}
                                    stars={level.stars}
                                    label={level.title}
                                    onClick={() => handlePlayLevel(level.levelId)}
                                    size="md"
                                    icon={
                                        <span className="font-fredoka font-bold text-white text-xl drop-shadow-md">
                                            {idx * 5 + parseInt(level.levelId.slice(-1))}
                                        </span>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )
            })}

            {/* Render Nodes & Labels ... (omitted for brevity, keep existing) ... */}
            {/* ... */}

        </div>
    );
};