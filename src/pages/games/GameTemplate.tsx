// src/pages/games/GameTemplate.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
    PartyPopper,
    ArrowLeft,
    Home
} from "lucide-react";

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation?: string;
    image?: string;
}

interface GameData {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    instructions: string[];
    questions: Question[];
}

export default function GameTemplate() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameData, setGameData] = useState<GameData | null>(null);

    // Game data for different games
    const games: Record<string, GameData> = {
        "math-basics": {
            id: "math-basics",
            title: "Math Basics",
            description: "Learn numbers and simple addition with fun characters!",
            icon: Calculator,
            color: "from-blue-400 to-cyan-500",
            instructions: [
                "🔢 Read each question carefully",
                "⏰ You have 30 seconds per question",
                "⭐ Earn 10 points for each correct answer",
                "🎯 Try to get all questions right!"
            ],
            questions: [
                {
                    question: "What is 2 + 2?",
                    options: ["3", "4", "5", "6"],
                    correct: 1,
                    explanation: "2 + 2 = 4! Great job! 🎉"
                },
                {
                    question: "What is 5 + 3?",
                    options: ["7", "8", "9", "10"],
                    correct: 1,
                    explanation: "5 + 3 = 8! You're doing great! ✨"
                },
                {
                    question: "What is 10 - 4?",
                    options: ["5", "6", "7", "8"],
                    correct: 1,
                    explanation: "10 - 4 = 6! Wonderful! 🌟"
                },
                {
                    question: "What is 3 × 2?",
                    options: ["5", "6", "7", "8"],
                    correct: 1,
                    explanation: "3 × 2 = 6! Excellent! 🎈"
                },
                {
                    question: "What is 8 ÷ 2?",
                    options: ["2", "3", "4", "5"],
                    correct: 2,
                    explanation: "8 ÷ 2 = 4! You're a math star! ⭐"
                }
            ]
        },
        "abc-adventure": {
            id: "abc-adventure",
            title: "ABC Adventure",
            description: "Discover letters and words in a magical world!",
            icon: BookOpen,
            color: "from-green-400 to-emerald-500",
            instructions: [
                "📚 Listen to the letter sounds",
                "✏️ Choose the correct letter or word",
                "⭐ Earn stars for correct answers",
                "🌈 Complete all levels to become a reading star!"
            ],
            questions: [
                {
                    question: "Which letter makes the 'A' sound?",
                    options: ["B", "A", "C", "D"],
                    correct: 1,
                    explanation: "A says 'ah' like in Apple! 🍎"
                },
                {
                    question: "What word starts with 'B'?",
                    options: ["Cat", "Dog", "Ball", "Fish"],
                    correct: 2,
                    explanation: "Ball starts with B! ⚽"
                },
                {
                    question: "Which is a vowel?",
                    options: ["B", "C", "E", "D"],
                    correct: 2,
                    explanation: "E is a vowel! Great job! ✨"
                },
                {
                    question: "How many letters in 'CAT'?",
                    options: ["2", "3", "4", "5"],
                    correct: 1,
                    explanation: "C-A-T has 3 letters! 🐱"
                }
            ]
        },
        "memory-match": {
            id: "memory-match",
            title: "Memory Match",
            description: "Test your memory with fun animal cards!",
            icon: Brain,
            color: "from-purple-400 to-pink-500",
            instructions: [
                "🧠 Remember the pattern",
                "🎴 Find the matching pairs",
                "⏱️ Race against the clock",
                "🏆 Beat your high score!"
            ],
            questions: [
                {
                    question: "Which animal says 'Moo'?",
                    options: ["Dog", "Cat", "Cow", "Sheep"],
                    correct: 2,
                    explanation: "Cows say Moo! 🐄"
                },
                {
                    question: "What color is a banana?",
                    options: ["Red", "Blue", "Yellow", "Green"],
                    correct: 2,
                    explanation: "Bananas are yellow! 🍌"
                },
                {
                    question: "Which one is a fruit?",
                    options: ["Carrot", "Apple", "Potato", "Broccoli"],
                    correct: 1,
                    explanation: "Apple is a fruit! 🍎"
                }
            ]
        },
        "quran-letters": {
            id: "quran-letters",
            title: "Quran Letters",
            description: "Learn Arabic letters with our fun interactive game!",
            icon: Star,
            color: "from-emerald-400 to-teal-500",
            instructions: [
                "📖 Learn Arabic letters",
                "⭐ Practice letter recognition",
                "🎯 Match letters to sounds",
                "🌙 Perfect for beginners!"
            ],
            questions: [
                {
                    question: "What is the first letter of the Arabic alphabet?",
                    options: ["ب", "ا", "ت", "ث"],
                    correct: 1,
                    explanation: "Alif (ا) is the first letter! 🌟"
                },
                {
                    question: "Which letter makes 'B' sound?",
                    options: ["ا", "ب", "ت", "ث"],
                    correct: 1,
                    explanation: "Baa (ب) makes the B sound! 📚"
                },
                {
                    question: "How many letters in the Arabic alphabet?",
                    options: ["26", "28", "30", "32"],
                    correct: 1,
                    explanation: "The Arabic alphabet has 28 letters! ✨"
                }
            ]
        }
    };

    useEffect(() => {
        if (gameId && games[gameId]) {
            setGameData(games[gameId]);
        } else {
            navigate("/kids-zone");
            toast({
                title: "Game Not Found",
                description: "The game you're looking for doesn't exist.",
                variant: "destructive"
            });
        }
    }, [gameId]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameStarted && !showResult && !showFeedback && timeLeft > 0 && gameData) {
            timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showFeedback && gameData) {
            handleTimeout();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, gameStarted, showResult, showFeedback, gameData]);

    const startGame = () => {
        setGameStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setTimeLeft(30);
    };

    const handleAnswer = (optionIndex: number) => {
        if (!gameData) return;
        
        setSelectedAnswer(optionIndex);
        setShowFeedback(true);
        
        if (optionIndex === gameData.questions[currentQuestion].correct) {
            setScore(prev => prev + 10);
            toast({
                title: "🎉 Correct!",
                description: gameData.questions[currentQuestion].explanation || "Well done!",
            });
        } else {
            toast({
                title: "😅 Not quite!",
                description: gameData.questions[currentQuestion].explanation || "Try again next time!",
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
        if (!gameData) return;
        
        if (currentQuestion + 1 < gameData.questions.length) {
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
        setGameStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(30);
    };

    const getScoreMessage = () => {
        if (!gameData) return "";
        const percentage = (score / (gameData.questions.length * 10)) * 100;
        if (percentage >= 80) return "🌟 Amazing! You're a star! 🌟";
        if (percentage >= 60) return "✨ Good job! Keep shining! ✨";
        if (percentage >= 40) return "😊 Nice try! Practice makes perfect!";
        return "💪 Don't give up! You'll do better next time!";
    };

    if (!gameData) return null;

    const Icon = gameData.icon;

    if (!gameStarted && !showResult) {
        // Game Intro/Instructions Screen
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => navigate("/kids-zone")}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Games
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <Card className="max-w-2xl mx-auto p-8 bg-white border-2 border-yellow-200 rounded-2xl">
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gameData.color} mb-4`}>
                                <Icon className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{gameData.title}</h1>
                            <p className="text-gray-600">{gameData.description}</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl mb-6">
                            <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                How to Play
                            </h2>
                            <ul className="space-y-2">
                                {gameData.instructions.map((instruction, index) => (
                                    <li key={index} className="text-gray-600 flex items-center gap-2">
                                        <span className="text-amber-500">•</span>
                                        {instruction}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button
                            onClick={startGame}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-6 text-lg rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Start Game!
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    if (showResult) {
        // Results Screen
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
                <div className="container mx-auto px-4 py-8">
                    <Card className="max-w-2xl mx-auto p-8 bg-white border-2 border-yellow-200 rounded-2xl text-center">
                        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Complete! 🎉</h2>
                        <div className="text-5xl font-bold text-amber-600 mb-2">{score}</div>
                        <p className="text-gray-600 mb-4">points earned</p>
                        
                        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-xl mb-6">
                            <p className="text-gray-700">{getScoreMessage()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500">Correct Answers</p>
                                <p className="text-xl font-bold text-blue-600">{score / 10}/{gameData.questions.length}</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500">Accuracy</p>
                                <p className="text-xl font-bold text-green-600">
                                    {Math.round((score / 10 / gameData.questions.length) * 100)}%
                                </p>
                            </div>
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
                                onClick={() => navigate("/kids-zone")}
                                variant="outline"
                                className="border-2 border-amber-500 text-amber-600"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                More Games
                            </Button>
                        </div>

                        <div className="mt-6 flex justify-center gap-2">
                            <PartyPopper className="w-5 h-5 text-yellow-500" />
                            <Smile className="w-5 h-5 text-amber-500" />
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    // Game Play Screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
            {/* Game Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${gameData.color}`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-800">{gameData.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-amber-100 px-4 py-2 rounded-full">
                                <span className="font-bold text-amber-600">Score: {score}</span>
                            </div>
                            <div className="bg-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-blue-600">{timeLeft}s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto p-8 bg-white border-2 border-yellow-200 rounded-2xl">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Question {currentQuestion + 1} of {gameData.questions.length}</span>
                            <span>{Math.round(((currentQuestion + 1) / gameData.questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / gameData.questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-200">
                            <p className="text-xl text-gray-800">{gameData.questions[currentQuestion].question}</p>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {gameData.questions[currentQuestion].options.map((option, index) => (
                            <Button
                                key={index}
                                onClick={() => !showFeedback && handleAnswer(index)}
                                disabled={showFeedback}
                                className={`p-4 h-auto text-lg font-medium ${
                                    showFeedback && index === gameData.questions[currentQuestion].correct
                                        ? "bg-green-500 hover:bg-green-500 text-white"
                                        : showFeedback && index === selectedAnswer
                                        ? "bg-red-500 hover:bg-red-500 text-white"
                                        : "bg-white border-2 border-amber-200 text-gray-700 hover:border-amber-500 hover:bg-amber-50"
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
                            {selectedAnswer === gameData.questions[currentQuestion].correct ? (
                                <div className="text-green-600 font-bold flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Correct! {gameData.questions[currentQuestion].explanation}
                                </div>
                            ) : (
                                <div className="text-red-600 font-bold flex items-center justify-center gap-2">
                                    <XCircle className="w-5 h-5" />
                                    Oops! The correct answer was: {gameData.questions[currentQuestion].options[gameData.questions[currentQuestion].correct]}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Next Button */}
                    {showFeedback && (
                        <Button
                            onClick={nextQuestion}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-6 text-lg hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                            {currentQuestion + 1 === gameData.questions.length ? "See Results" : "Next Question"}
                            <Rocket className="w-5 h-5 ml-2" />
                        </Button>
                    )}
                </Card>
            </div>
        </div>
    );
}