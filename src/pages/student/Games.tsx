// src/pages/student/Games.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
    Gamepad2,
    Brain,
    Calculator,
    BookOpen,
    Sparkles,
    Star,
    Heart,
    Trophy,
    Clock,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Rocket,
    Smile,
    PartyPopper
} from "lucide-react";

interface Game {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    category: string;
}

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation?: string;
}

export default function Games() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const games: Game[] = [
        {
            id: "math-quiz",
            title: "Math Adventure",
            description: "Solve fun math problems and collect stars!",
            icon: Calculator,
            color: "from-blue-400 to-cyan-500",
            bgColor: "bg-blue-100",
            category: "Mathematics"
        },
        {
            id: "word-game",
            title: "Word Explorer",
            description: "Discover new words and build your vocabulary",
            icon: BookOpen,
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-100",
            category: "English"
        },
        {
            id: "brain-teaser",
            title: "Brain Teasers",
            description: "Challenge your mind with fun puzzles",
            icon: Brain,
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-100",
            category: "Logic"
        },
        {
            id: "quran-quiz",
            title: "Quran Explorer",
            description: "Learn about the Quran in a fun way",
            icon: Star,
            color: "from-emerald-400 to-teal-500",
            bgColor: "bg-emerald-100",
            category: "Islamic Studies"
        }
    ];

    const mathQuestions: Question[] = [
        {
            question: "What is 15 + 7?",
            options: ["21", "22", "23", "24"],
            correct: 1,
            explanation: "15 + 7 = 22. Great job! 🎉"
        },
        {
            question: "If you have 3 apples and you get 5 more, how many apples do you have?",
            options: ["6", "7", "8", "9"],
            correct: 2,
            explanation: "3 + 5 = 8 apples! 🍎"
        },
        {
            question: "What is 4 × 6?",
            options: ["20", "22", "24", "26"],
            correct: 2,
            explanation: "4 × 6 = 24. Excellent! ✨"
        }
    ];

    const wordQuestions: Question[] = [
        {
            question: "Which word means 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            correct: 1,
            explanation: "Joyful means very happy! 😊"
        },
        {
            question: "What is the opposite of 'big'?",
            options: ["Large", "Huge", "Small", "Giant"],
            correct: 2,
            explanation: "Small is the opposite of big! 📏"
        }
    ];

    const brainQuestions: Question[] = [
        {
            question: "Which number is missing? 2, 4, 6, ?, 10",
            options: ["7", "8", "9", "11"],
            correct: 1,
            explanation: "The pattern is adding 2 each time: 6 + 2 = 8! 🧮"
        },
        {
            question: "What comes next? 🟢, 🔵, 🟡, ?",
            options: ["🟠", "🟣", "🔴", "⚪"],
            correct: 2,
            explanation: "Red comes after yellow in the rainbow! 🌈"
        }
    ];

    const quranQuestions: Question[] = [
        {
            question: "How many chapters (Surahs) are in the Quran?",
            options: ["100", "114", "120", "99"],
            correct: 1,
            explanation: "The Quran has 114 Surahs! 📖"
        },
        {
            question: "Which is the first Surah of the Quran?",
            options: ["Al-Baqarah", "Al-Fatihah", "Al-Ikhlas", "Yasin"],
            correct: 1,
            explanation: "Al-Fatihah is the first Surah! 🌟"
        }
    ];

    const startGame = (gameId: string) => {
        setSelectedGame(gameId);
        setGameStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setTimeLeft(30);

        switch(gameId) {
            case "math-quiz":
                setQuestions(mathQuestions);
                break;
            case "word-game":
                setQuestions(wordQuestions);
                break;
            case "brain-teaser":
                setQuestions(brainQuestions);
                break;
            case "quran-quiz":
                setQuestions(quranQuestions);
                break;
            default:
                setQuestions(mathQuestions);
        }

        toast({
            title: "✨ Game Started! ✨",
            description: "Have fun and do your best!",
        });
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameStarted && !showResult && !showFeedback && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showFeedback) {
            handleTimeout();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, gameStarted, showResult, showFeedback]);

    const handleAnswer = (optionIndex: number) => {
        setSelectedAnswer(optionIndex);
        setShowFeedback(true);
        
        if (optionIndex === questions[currentQuestion].correct) {
            setScore(prev => prev + 10);
            toast({
                title: "🎉 Correct!",
                description: questions[currentQuestion].explanation || "Well done!",
            });
        } else {
            toast({
                title: "😅 Not quite!",
                description: questions[currentQuestion].explanation || "Try again next time!",
                variant: "destructive",
            });
        }
    };

    const handleTimeout = () => {
        setShowFeedback(true);
        toast({
            title: "⏰ Time's up!",
            description: "Don't worry, you'll get the next one!",
            variant: "destructive",
        });
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setTimeLeft(30);
        } else {
            setShowResult(true);
            setGameStarted(false);
        }
    };

    const restartGame = () => {
        setSelectedGame(null);
        setGameStarted(false);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(30);
    };

    const getScoreMessage = () => {
        const percentage = (score / (questions.length * 10)) * 100;
        if (percentage >= 80) return "🌟 Amazing! You're a star! 🌟";
        if (percentage >= 60) return "✨ Good job! Keep shining! ✨";
        if (percentage >= 40) return "😊 Nice try! Practice makes perfect!";
        return "💪 Don't give up! You'll do better next time!";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Gamepad2 className="w-8 h-8 text-amber-500" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                Fun Learning Games
                            </h1>
                        </div>
                        <Button
                            onClick={() => navigate("/dashboard-student")}
                            variant="outline"
                            className="border-2 border-amber-500 text-amber-600"
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {!selectedGame ? (
                    <>
                        {/* Games Grid */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose a Game!</h2>
                            <p className="text-gray-600">Pick a game and start learning while having fun!</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {games.map((game) => {
                                const Icon = game.icon;
                                return (
                                    <Card
                                        key={game.id}
                                        className="group p-6 bg-white border-2 border-yellow-200 hover:border-amber-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                        onClick={() => startGame(game.id)}
                                    >
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} mb-4 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                                        <div className={`inline-block px-3 py-1 ${game.bgColor} rounded-full text-xs font-medium`}>
                                            {game.category}
                                        </div>
                                        <div className="mt-4 flex justify-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Fun Facts */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl text-center">
                                <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-700">10+ Brain Training Games</p>
                            </div>
                            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl text-center">
                                <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-700">Earn Points & Badges</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl text-center">
                                <Rocket className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-700">Learn While Having Fun</p>
                            </div>
                        </div>
                    </>
                ) : showResult ? (
                    // Results Screen
                    <Card className="max-w-2xl mx-auto p-8 bg-white border-2 border-yellow-200 rounded-2xl text-center">
                        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Complete! 🎉</h2>
                        <div className="text-5xl font-bold text-amber-600 mb-2">{score}</div>
                        <p className="text-gray-600 mb-4">points earned</p>
                        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-xl mb-6">
                            <p className="text-gray-700">{getScoreMessage()}</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={restartGame}
                                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Play Again
                            </Button>
                            <Button
                                onClick={() => setSelectedGame(null)}
                                variant="outline"
                                className="border-2 border-amber-500 text-amber-600"
                            >
                                Choose Another Game
                            </Button>
                        </div>
                        <div className="mt-6 flex justify-center gap-2">
                            <PartyPopper className="w-5 h-5 text-yellow-500" />
                            <Smile className="w-5 h-5 text-amber-500" />
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                    </Card>
                ) : (
                    // Game Screen
                    <Card className="max-w-2xl mx-auto p-8 bg-white border-2 border-yellow-200 rounded-2xl">
                        {/* Game Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Question {currentQuestion + 1}/{questions.length}
                                </h2>
                                <p className="text-gray-500">Score: {score}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span className="font-bold text-amber-600">{timeLeft}s</span>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-8">
                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-200">
                                <p className="text-xl text-gray-800">{questions[currentQuestion]?.question}</p>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {questions[currentQuestion]?.options.map((option, index) => (
                                <Button
                                    key={index}
                                    onClick={() => !showFeedback && handleAnswer(index)}
                                    disabled={showFeedback}
                                    className={`p-4 h-auto text-lg font-medium ${
                                        showFeedback && index === questions[currentQuestion].correct
                                            ? "bg-green-500 hover:bg-green-500 text-white"
                                            : showFeedback && index === selectedAnswer
                                            ? "bg-red-500 hover:bg-red-500 text-white"
                                            : "bg-white border-2 border-amber-200 text-gray-700 hover:border-amber-500"
                                    }`}
                                    variant="ghost"
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>

                        {/* Feedback */}
                        {showFeedback && (
                            <div className="text-center mb-4">
                                {selectedAnswer === questions[currentQuestion].correct ? (
                                    <div className="text-green-600 font-bold flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" />
                                        Correct!
                                    </div>
                                ) : (
                                    <div className="text-red-600 font-bold flex items-center justify-center gap-2">
                                        <XCircle className="w-5 h-5" />
                                        Oops! The correct answer was: {questions[currentQuestion].options[questions[currentQuestion].correct]}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Next Button */}
                        {showFeedback && (
                            <Button
                                onClick={nextQuestion}
                                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-6 text-lg"
                            >
                                {currentQuestion + 1 === questions.length ? "See Results" : "Next Question"}
                                <Rocket className="w-5 h-5 ml-2" />
                            </Button>
                        )}
                    </Card>
                )}
            </div>
        </div>
    );
}