export const AVATARS = [
    {
        id: 1,
        name: 'The Guardian',
        seed: 'Felix',
        color: 'bg-emerald-100',
        borderColor: 'border-emerald-500',
        desc: 'Protector of the weak'
    },
    {
        id: 2,
        name: 'The Speedster',
        seed: 'Aneka',
        color: 'bg-red-100',
        borderColor: 'border-red-500',
        desc: 'Quick to act'
    },
    {
        id: 3,
        name: 'The Scholar',
        seed: 'Jack',
        color: 'bg-yellow-100',
        borderColor: 'border-yellow-500',
        desc: 'Wisdom seeker'
    },
    {
        id: 4,
        name: 'The Techie',
        seed: 'Bella',
        color: 'bg-blue-100',
        borderColor: 'border-blue-500',
        desc: 'Digital wizard'
    },
    {
        id: 5,
        name: 'The Artist',
        seed: 'Milo',
        color: 'bg-purple-100',
        borderColor: 'border-purple-500',
        desc: 'Creative soul'
    }
];

export const getAvatarSeed = (id: string | number): string => {
    const avatar = AVATARS.find(a => a.id === Number(id));
    return avatar ? avatar.seed : 'adventurer'; // Default to Felix if not found
};
