import { MissionMap } from "../components/game/MissionMap";



const PlayPage = () => {


    return (
        <div className="h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <header className="flex justify-between items-center mb-8 relative z-10 p-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark">Mission Map</h1>
                    <p className="text-dark-lighter font-nunito">Select a level to start your adventure!</p>
                </div>
            </header>

            {/* Map Area */}
            <MissionMap />
        </div>
    );
};

export default PlayPage;
