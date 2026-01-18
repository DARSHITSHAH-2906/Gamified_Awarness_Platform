import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryGameProps {
    data: any; // Can contain initial context if needed, though we use the specific story tree below
    onComplete: (xp: number) => void;
}

export const StoryGame = ({ data, onComplete }: StoryGameProps) => {
    // Hardcoded Story Tree as requested
    const storyTree: any = {
        start: {
            text: "You wake up in a mysterious forest. The sun is setting, and you hear strange sounds. What do you do?",
            choices: [
                { text: "Follow the sound", next: "followSound" },
                { text: "Climb a tree to look around", next: "climbTree" },
                { text: "Find a place to hide", next: "hide" },
            ],
        },
        followSound: {
            text: "You follow the sound and find a small village. The villagers look friendly. What do you do?",
            choices: [
                { text: "Approach the villagers", next: "approachVillagers" },
                { text: "Observe from distance", next: "observe" },
                { text: "Turn back", next: "turnBack" },
            ],
        },
        climbTree: {
            text: "From the tree, you see a river in one direction and mountains in another. Which way do you go?",
            choices: [
                { text: "Head to the river", next: "river" },
                { text: "Head to the mountains", next: "mountains" },
                { text: "Stay in the tree until morning", next: "stayTree" },
            ],
        },
        hide: {
            text: "You find a cave to hide in. Inside, you see glowing crystals. What do you do?",
            choices: [
                { text: "Touch the crystals", next: "touchCrystals" },
                { text: "Take one crystal", next: "takeCrystal" },
                { text: "Leave the cave", next: "leaveCave" },
            ],
        },
        approachVillagers: {
            text: "The villagers welcome you warmly and offer you food and shelter. You're safe!",
            choices: [],
            ending: "good",
            score: 3,
        },
        observe: {
            text: "You watch for hours and fall asleep. You wake up surrounded by friendly villagers who found you. You're safe!",
            choices: [],
            ending: "good",
            score: 3,
        },
        turnBack: {
            text: "You get lost in the dark forest. After wandering for hours, you find your way out by morning.",
            choices: [],
            ending: "neutral",
            score: 2,
        },
        river: {
            text: "You find a boat by the river. You sail to a nearby town and are rescued!",
            choices: [],
            ending: "good",
            score: 3,
        },
        mountains: {
            text: "You climb the mountains and find a rescue team! They take you to safety.",
            choices: [],
            ending: "good",
            score: 3,
        },
        stayTree: {
            text: "You stay in the tree all night. In the morning, you see a clear path out of the forest.",
            choices: [],
            ending: "neutral",
            score: 2,
        },
        touchCrystals: {
            text: "The crystals glow brighter and teleport you to safety! You're home!",
            choices: [],
            ending: "great",
            score: 4,
        },
        takeCrystal: {
            text: "The crystal guides you out of the forest with its light. You're safe!",
            choices: [],
            ending: "good",
            score: 3,
        },
        leaveCave: {
            text: "You leave and wander until morning when you find a path to safety.",
            choices: [],
            ending: "neutral",
            score: 2,
        },
    };

    const [currentNode, setCurrentNode] = useState('start');
    const [history, setHistory] = useState(['start']);
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [ending, setEnding] = useState('');

    const handleChoice = (nextNode: string) => {
        setHistory([...history, nextNode]);
        setCurrentNode(nextNode);

        const node = storyTree[nextNode];
        if (node.choices.length === 0) {
            setGameOver(true);
            setFinalScore(node.score || 0);
            setEnding(node.ending || 'neutral');
        }
    };

    const handleComplete = () => {
        onComplete(finalScore);
    };

    const handleReset = () => {
        setCurrentNode('start');
        setHistory(['start']);
        setGameOver(false);
        setFinalScore(0);
        setEnding('');
    };

    const currentStory = storyTree[currentNode];

    const getEndingMessage = () => {
        switch (ending) {
            case 'great':
                return '🌟 Amazing ending! You found the best path!';
            case 'good':
                return '😊 Great job! You made it to safety!';
            case 'neutral':
                return '👍 You survived! Not bad!';
            default:
                return '🎮 Game Over!';
        }
    };

    return (
        <div className="flex flex-col items-center justify-start md:justify-center w-full h-full p-4 overflow-y-auto overflow-x-hidden bg-white/0">
            <div className="max-w-3xl w-full flex flex-col gap-6 my-auto">
                {/* Progress Header */}
                <div className="flex items-center justify-between bg-white px-6 py-3 rounded-full shadow-sm w-full font-bold text-gray-500 text-sm md:text-base border border-gray-100">
                    <span>📖 Story Mode</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">Step {history.length}</span>
                </div>

                {!gameOver ? (
                    <>
                        {/* Story Card */}
                        <motion.div
                            key={currentNode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-white p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(255,107,53,0.15)] border-[3px] border-[#ff8c42] overflow-hidden"
                        >
                            <div className="absolute -top-6 -right-6 text-[8rem] opacity-[0.05] pointer-events-none select-none">🌲</div>
                            <h3 className="text-center text-xl font-bold text-[#ff6b35] mb-4 uppercase tracking-wider opacity-80">What happens next?</h3>
                            <p className="text-lg md:text-2xl text-gray-800 text-center leading-relaxed font-medium">
                                {currentStory.text}
                            </p>
                        </motion.div>

                        {/* Choices Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {currentStory.choices.map((choice: any, index: number) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleChoice(choice.next)}
                                    className="bg-white border-2 border-[#ff8c42] text-gray-800 py-4 px-6 rounded-xl text-lg font-bold shadow-sm hover:bg-gradient-to-r hover:from-[#ff6b35] hover:to-[#ff8c42] hover:text-white hover:border-transparent hover:shadow-lg transition-all text-left flex items-center justify-between group"
                                >
                                    <span>{choice.text}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                                </motion.button>
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-[#fff5f0] to-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(255,107,53,0.2)] border-[3px] border-[#ff6b35] text-center"
                    >
                        <div className="text-6xl mb-4 animate-bounce">
                            {ending === 'great' ? '🌟' : ending === 'good' ? '😊' : '👍'}
                        </div>
                        <h2 className="text-3xl font-black text-[#ff6b35] mb-2">{getEndingMessage()}</h2>
                        <p className="text-xl text-gray-600 mb-8 font-medium">Final Score: <span className="text-[#ff6b35] font-bold text-2xl">{finalScore}</span></p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={handleComplete}
                                className="bg-green-500 hover:bg-green-600 text-white border-0 py-3 px-8 rounded-full text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span>Complete Story</span>
                                <span className="text-xl">✓</span>
                            </button>
                            <button
                                onClick={handleReset}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 py-3 px-8 rounded-full text-lg font-bold shadow-md transition-all active:scale-95"
                            >
                                Replay
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
