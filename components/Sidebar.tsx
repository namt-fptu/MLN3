import React, { useState } from 'react';
import {
    BookOpen,
    Share2,
    Zap,
    GitMerge,
    Scale,
    Activity,
    History,
    Gamepad2,
    BarChart2,
    Smartphone,
    Search,
    AlertTriangle,
    Send
} from 'lucide-react';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const items: SidebarItem[] = [
    { id: 'hero', label: 'Mở Đầu', icon: <BookOpen size={18} /> },
    { id: 'origins', label: 'Nguồn Gốc', icon: <Share2 size={18} /> },
    { id: 'concept', label: 'Cấu Trúc', icon: <Zap size={18} /> },
    { id: 'system', label: 'Hệ Thống', icon: <GitMerge size={18} /> },
    { id: 'contradiction', label: 'Động Lực', icon: <Scale size={18} /> },
    { id: 'dialectics', label: 'Quy Luật', icon: <Activity size={18} /> },
    { id: 'timeline', label: 'Lịch Sử', icon: <History size={18} /> },
    { id: 'simulator', label: 'Cơ Chế', icon: <Gamepad2 size={18} /> },
    { id: 'analysis', label: 'Bài Học', icon: <BarChart2 size={18} /> },
    { id: 'modern', label: 'Hiện Đại', icon: <Smartphone size={18} /> },
    { id: 'analysis-deep', label: 'Phân Tích', icon: <Search size={18} /> },
    { id: 'myths', label: 'Giải Ảo', icon: <AlertTriangle size={18} /> },
    { id: 'future', label: 'Tương Lai', icon: <Send size={18} /> },
];

const Sidebar: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Trigger Area - Invisible strip on the left to detect initial hover */}
            <div
                className="fixed top-0 left-0 h-screen w-4 z-[99] bg-transparent"
                onMouseEnter={() => setIsHovered(true)}
            />

            {/* Sidebar Container */}
            <nav
                className={`fixed top-0 left-0 h-screen bg-black/80 backdrop-blur-xl border-r border-red-900/30 z-[100] transition-all duration-500 ease-in-out flex flex-col justify-center py-10 overflow-hidden ${isHovered ? 'w-64 translate-x-0 shadow-[0_0_50px_rgba(220,38,38,0.3)]' : 'w-0 -translate-x-full opacity-0 pointer-events-none'
                    }`}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setHoveredItem(null);
                }}
            >
                <div className="w-64 px-6 flex flex-col gap-1">
                    {items.map((item) => {
                        const isActive = hoveredItem === item.id;
                        const isDimmed = hoveredItem !== null && hoveredItem !== item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleScrollTo(item.id)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`group flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 ease-out text-left w-full
                  ${isActive ? 'bg-red-600/20 translate-x-2 scale-105 shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-500/30' : 'hover:bg-white/5 border border-transparent'}
                  ${isDimmed ? 'opacity-30 blur-[0.5px]' : 'opacity-100'}
                `}
                            >
                                <span className={`transition-colors duration-300 ${isActive ? 'text-red-400' : 'text-stone-400 group-hover:text-red-400'}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
