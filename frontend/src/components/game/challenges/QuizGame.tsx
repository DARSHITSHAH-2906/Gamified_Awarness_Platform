import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Timer } from 'lucide-react';

interface QuizQuestion {
    id: string;
    question: string;
    correctAnswer: boolean;
    explanation: {
        ifTrue: string;
        ifFalse: string;
        realExample?: string;
    };
}

interface QuizGameProps {
    data: {
        title: string;
        questions: QuizQuestion[];
        rules?: { timePerQuestion: number };
    };
    onComplete: (xp: number) => void;
}

export const QuizGame = ({ data, onComplete }: QuizGameProps) => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState(data.rules?.timePerQuestion || 20);

    const currentQuestion = data.questions[currentQIndex];
    const isLastQuestion = currentQIndex === data.questions.length - 1;

    useEffect(() => {
        if (showExplanation) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleAnswer(null); // Time out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [currentQIndex, showExplanation]);

    const handleAnswer = (answer: boolean | null) => {
        setSelectedAnswer(answer);
        setShowExplanation(true);
        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (isLastQuestion) {
            onComplete(score * 3); // Base multiplier
        } else {
            setCurrentQIndex(prev => prev + 1);
            setShowExplanation(false);
            setSelectedAnswer(null);
            setTimeLeft(data.rules?.timePerQuestion || 20);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center h-full">
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-100">
                {/* Header */}
                <div className="bg-indigo-50 p-4 flex justify-between items-center border-b border-indigo-100">
                    <span className="font-bold text-indigo-600">Question {currentQIndex + 1}/{data.questions.length}</span>
                    <div className="flex items-center gap-2 text-orange-500 font-bold">
                        <Timer size={18} /> {timeLeft}s
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">{currentQuestion.question}</h3>

                    {!showExplanation ? (
                        <div className="grid grid-cols-2 gap-6">
                            <button
                                onClick={() => handleAnswer(true)}
                                className="bg-green-100 hover:bg-green-200 text-green-700 py-6 rounded-2xl text-xl font-bold transition-all hover:scale-105 border-2 border-green-200"
                            >
                                TRUE
                            </button>
                            <button
                                onClick={() => handleAnswer(false)}
                                className="bg-red-100 hover:bg-red-200 text-red-700 py-6 rounded-2xl text-xl font-bold transition-all hover:scale-105 border-2 border-red-200"
                            >
                                FALSE
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border-2 text-left ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                        >
                            <div className="flex items-center gap-2 mb-2 font-bold text-lg">
                                {selectedAnswer === currentQuestion.correctAnswer ?
                                    <><Check className="text-green-600" /> Correct!</> :
                                    <><X className="text-red-600" /> Oops!</>}
                            </div>
                            <p className="text-gray-700 mb-4">
                                {selectedAnswer === true ? currentQuestion.explanation.ifTrue : currentQuestion.explanation.ifFalse}
                            </p>
                            {currentQuestion.explanation.realExample && (
                                <div className="text-sm bg-white/50 p-3 rounded-lg italic text-gray-600 border border-gray-200">
                                    💡 {currentQuestion.explanation.realExample}
                                </div>
                            )}
                            <button
                                onClick={nextQuestion}
                                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                            >
                                {isLastQuestion ? "Finish Quiz" : "Next Question"}
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
