import { useEffect } from 'react';
import { MazeProvider, useMaze } from '../context/MazeContext';
import { MazeRenderer } from '../components/game/MazeRenderer';
import { GameButton } from '../components/ui/GameButton';
import { RefreshCw } from 'lucide-react';

const MazeDemoContent = () => {
    const { generateNewMaze, isLoading } = useMaze();

    useEffect(() => {
        // Generate initial maze
        generateNewMaze({
            width: 15,
            height: 10,
            seed: Date.now(),
            difficulty: 'MEDIUM',
            puzzleDensity: 0.1
        });
    }, []);

    const handleRegenerate = () => {
        generateNewMaze({
            width: 15, // Randomize slightly?
            height: 10,
            seed: Date.now(),
            difficulty: 'MEDIUM',
            puzzleDensity: 0.15
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center pt-20">
            <h1 className="text-4xl font-display text-white mb-8">Maze Architecture Demo</h1>

            <div className="mb-8">
                <GameButton variant="primary" onClick={handleRegenerate} disabled={isLoading}>
                    <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate Maze
                </GameButton>
            </div>

            <MazeRenderer />

            <div className="mt-8 text-slate-400 font-nunito text-center max-w-md">
                <p>Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to move.</p>
                <p className="text-sm mt-2">Green Flag: Start | Yellow Trophy: Exit | Purple Lock: Puzzle</p>
            </div>
        </div>
    );
};

const DemoMaze = () => {
    return (
        <MazeProvider>
            {/* Note: In a real app, Navbar might need to be outside provider if it doesn't consume maze context, 
                but for layout it's fine here or in parent. */}
            <MazeDemoContent />
        </MazeProvider>
    );
};

export default DemoMaze;
