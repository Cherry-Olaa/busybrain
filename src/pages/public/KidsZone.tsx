// src/pages/public/KidsZone.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    Rocket,
    Smile,
    PartyPopper,
    Lock,
    Unlock,
    GraduationCap,
    Users
} from "lucide-react";

interface Game {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    bgColor: string;
    category: string;
    isPublic: boolean;
    ageRange: string;
    playCount?: string;
}

export default function KidsZone() {
    const { toast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const games: Game[] = [
        {
            id: "math-basics",
            title: "Math Basics",
            description: "Learn numbers and simple addition with fun characters!",
            icon: Calculator,
            color: "from-blue-400 to-cyan-500",
            bgColor: "bg-blue-100",
            category: "math",
            isPublic: true,
            ageRange: "5-8 years",
            playCount: "10k+ plays"
        },
        {
            id: "abc-adventure",
            title: "ABC Adventure",
            description: "Discover letters and words in a magical world!",
            icon: BookOpen,
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-100",
            category: "english",
            isPublic: true,
            ageRange: "4-7 years",
            playCount: "15k+ plays"
        },
        {
            id: "memory-match",
            title: "Memory Match",
            description: "Test your memory with fun animal cards!",
            icon: Brain,
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-100",
            category: "logic",
            isPublic: true,
            ageRange: "5-10 years",
            playCount: "8k+ plays"
        },
        {
            id: "quran-letters",
            title: "Quran Letters",
            description: "Learn Arabic letters with our fun interactive game!",
            icon: Star,
            color: "from-emerald-400 to-teal-500",
            bgColor: "bg-emerald-100",
            category: "islamic",
            isPublic: true,
            ageRange: "5-12 years",
            playCount: "5k+ plays"
        },
        {
            id: "advanced-math",
            title: "Math Challenge",
            description: "For our advanced students - multiplication & division",
            icon: Calculator,
            color: "from-indigo-400 to-purple-500",
            bgColor: "bg-indigo-100",
            category: "math",
            isPublic: false,
            ageRange: "9-12 years",
            playCount: "Student Only"
        },
        {
            id: "spelling-bee",
            title: "Spelling Bee Pro",
            description: "Advanced spelling challenges for enrolled students",
            icon: BookOpen,
            color: "from-rose-400 to-pink-500",
            bgColor: "bg-rose-100",
            category: "english",
            isPublic: false,
            ageRange: "8-12 years",
            playCount: "Student Only"
        }
    ];

    const categories = [
        { id: "all", name: "All Games", icon: Gamepad2 },
        { id: "math", name: "Math", icon: Calculator },
        { id: "english", name: "English", icon: BookOpen },
        { id: "logic", name: "Brain Games", icon: Brain },
        { id: "islamic", name: "Islamic", icon: Star },
    ];

    const filteredGames = selectedCategory === "all" 
        ? games 
        : games.filter(game => game.category === selectedCategory);

    const publicGames = filteredGames.filter(game => game.isPublic);
    const privateGames = filteredGames.filter(game => !game.isPublic);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex justify-center mb-4 relative">
                        <Gamepad2 className="w-16 h-16" />
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-ping" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">🎮 Kids Learning Zone</h1>
                    <p className="text-xl mb-6 max-w-2xl mx-auto">
                        Fun educational games for everyone! Play for free and learn while having fun!
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <Button className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-6 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all">
                                <GraduationCap className="w-5 h-5 mr-2" />
                                Enroll Your Child
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-bold px-8 py-6 rounded-xl text-lg">
                                <Users className="w-5 h-5 mr-2" />
                                Student Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`${
                                    selectedCategory === cat.id
                                        ? "bg-amber-500 text-white"
                                        : "bg-white text-gray-700 hover:bg-amber-100"
                                } rounded-full px-6`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {cat.name}
                            </Button>
                        );
                    })}
                </div>

                {/* Public Games Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Unlock className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Free Games for Everyone</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {publicGames.map((game) => {
                            const Icon = game.icon;
                            return (
                                <Card
                                    key={game.id}
                                    className="group p-6 bg-white border-2 border-yellow-200 hover:border-green-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                    onClick={() => window.location.href = `/games/${game.id}`}
                                >
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                            Free
                                        </span>
                                        <span className="text-xs text-gray-500">{game.ageRange}</span>
                                    </div>
                                    <div className="mt-3 text-xs text-amber-600">
                                        {game.playCount} ⭐
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Student Only Games Section */}
                {privateGames.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-amber-100 rounded-full">
                                <Lock className="w-6 h-6 text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Student Only Games</h2>
                            <div className="bg-amber-100 px-3 py-1 rounded-full">
                                <span className="text-sm text-amber-600">Login Required</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {privateGames.map((game) => {
                                const Icon = game.icon;
                                return (
                                    <Card
                                        key={game.id}
                                        className="group p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl opacity-75 relative overflow-hidden"
                                    >
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                                                <Lock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                                <p className="text-sm font-medium text-gray-700 mb-2">Student Only</p>
                                                <Link to="/login">
                                                    <Button size="sm" className="bg-amber-500 text-white text-xs">
                                                        Login to Play
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} mb-4 opacity-50`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                                                Students Only
                                            </span>
                                            <span className="text-xs text-gray-500">{game.ageRange}</span>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Why Join Section */}
                <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Join Busy Brains?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Track Progress</h3>
                            <p className="text-sm text-gray-600">Students can track their scores and earn badges</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Rocket className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">More Games</h3>
                            <p className="text-sm text-gray-600">Access to advanced games and challenges</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Join Community</h3>
                            <p className="text-sm text-gray-600">Be part of our fun learning community</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/contact">
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-6 rounded-xl text-lg">
                                Enroll Today!
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}