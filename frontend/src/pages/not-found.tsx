import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const NotFound = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const returnPath = searchParams.get('return') || '/';

    return (
        <div className="flex flex-col items-left justify-center h-screen p-5">
            <Link to={returnPath} className="flex items-center gap-2 text-lg">
                <ArrowLeft />
                <span>Back To Home</span>
            </Link>
            <DotLottieReact
                src="https://lottie.host/09e7c44e-3ad3-4c13-bdd3-51c0e5931a0d/R6tOMQwHOD.lottie"
                loop
                autoplay
            />
        </div>
    );
};

export default NotFound;

