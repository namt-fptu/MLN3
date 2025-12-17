import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, RotateCw, GitMerge, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
    {
        id: 1,
        title: "Khẳng Định",
        sub: "(The Thesis)",
        icon: <ArrowUpRight className="w-6 h-6" />,
        desc: "Giai đoạn xuất phát của sự phát triển. Sự vật đang tồn tại nhưng chứa đựng những mâu thuẫn nội tại chưa bộc lộ gay gắt.",
        nature: "Cái cũ",
        example: "Xã hội Cộng sản nguyên thủy (Chưa có tư hữu, chưa có giai cấp)."
    },
    {
        id: 2,
        title: "Phủ Định",
        sub: "(The Antithesis)",
        icon: <RotateCw className="w-6 h-6" />,
        desc: "Sự xóa bỏ cái cũ. Mâu thuẫn bùng nổ, cái mới ra đời thay thế cái cũ nhưng kế thừa hạt nhân hợp lý của cái cũ.",
        nature: "Cái đối lập",
        example: "Xã hội có giai cấp (Chiếm hữu nô lệ, Phong kiến, TBCN) - Tư hữu xuất hiện, phủ định CS nguyên thủy."
    },
    {
        id: 3,
        title: "Phủ Định của Phủ Định",
        sub: "(The Synthesis)",
        icon: <GitMerge className="w-6 h-6" />,
        desc: "Sự trở lại cái ban đầu nhưng ở trình độ cao hơn. Kết thúc một chu kỳ và mở ra một chu kỳ mới.",
        nature: "Cái mới hoàn toàn",
        example: "Xã hội Cộng sản chủ nghĩa (Xóa bỏ tư hữu, trở lại công hữu nhưng trên nền tảng công nghiệp hiện đại)."
    }
];

const DialecticalFlow: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStage, setActiveStage] = useState(1);
    const spiralRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation
            gsap.from(".spiral-path", {
                drawSVG: 0,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%"
                }
            });

            gsap.from(".flow-node", {
                scale: 0,
                opacity: 0,
                stagger: 0.3,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%"
                }
            });
            
            // Continuous rotation of the background structure
            gsap.to(".spiral-bg", {
                rotation: 360,
                transformOrigin: "50% 50%",
                duration: 60,
                repeat: -1,
                ease: "linear"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleStageClick = (id: number) => {
        setActiveStage(id);
        // Glitch effect on change
        gsap.fromTo(".detail-panel", 
            { opacity: 0, x: 20, skewX: 20 }, 
            { opacity: 1, x: 0, skewX: 0, duration: 0.4, ease: "power2.out" }
        );
    };

    return (
        <section ref={containerRef} className="py-24 bg-black relative overflow-hidden min-h-[90vh] flex flex-col items-center">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'radial-gradient(circle at center, #330000 0%, transparent 70%)' 
                 }} 
            />

            <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
                
                {/* LEFT: The Spiral Visualization */}
                <div className="lg:col-span-7 relative h-[500px] md:h-[600px] flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[600px] max-h-[600px]">
                        {/* Background Rings */}
                        <div className="absolute inset-0 spiral-bg opacity-30">
                            <svg viewBox="0 0 500 500" className="w-full h-full">
                                <circle cx="250" cy="250" r="150" stroke="#500000" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                                <circle cx="250" cy="250" r="230" stroke="#500000" strokeWidth="1" fill="none" strokeDasharray="10,10" />
                            </svg>
                        </div>

                        {/* Main Spiral Path - Stylized S-curve/Spiral representation */}
                        <svg ref={spiralRef} viewBox="0 0 500 500" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                            <defs>
                                <linearGradient id="spiralGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#500000" />
                                    <stop offset="50%" stopColor="#ff0000" />
                                    <stop offset="100%" stopColor="#ffaaaa" />
                                </linearGradient>
                            </defs>
                            {/* Conceptual Spiral Path */}
                            <path 
                                d="M 100 400 C 150 400, 200 350, 250 250 S 350 100, 450 50" 
                                fill="none" 
                                stroke="url(#spiralGrad)" 
                                strokeWidth="6"
                                className="spiral-path"
                                strokeLinecap="round"
                            />
                            {/* Connector Arrows */}
                            <path d="M 180 340 L 190 330" stroke="#ff0000" strokeWidth="2" />
                            <path d="M 320 170 L 330 160" stroke="#ff0000" strokeWidth="2" />
                        </svg>

                        {/* Interactive Nodes */}
                        {/* Node 1: Khẳng định */}
                        <button 
                            onClick={() => handleStageClick(1)}
                            className={`flow-node absolute left-[15%] bottom-[15%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group
                                ${activeStage === 1 ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-105'}`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-colors
                                ${activeStage === 1 ? 'bg-red-600 border-white shadow-[0_0_30px_#ff0000]' : 'bg-black border-red-800'}`}>
                                <ArrowUpRight className={`w-8 h-8 ${activeStage === 1 ? 'text-white' : 'text-red-600'}`} />
                            </div>
                            <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeStage === 1 ? 'text-white text-glow' : 'text-red-900'}`}>
                                1. Khẳng Định
                            </span>
                        </button>

                        {/* Node 2: Phủ định */}
                        <button 
                            onClick={() => handleStageClick(2)}
                            className={`flow-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group
                                ${activeStage === 2 ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-105'}`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-colors
                                ${activeStage === 2 ? 'bg-red-600 border-white shadow-[0_0_30px_#ff0000]' : 'bg-black border-red-800'}`}>
                                <RotateCw className={`w-10 h-10 ${activeStage === 2 ? 'text-white animate-spin-slow' : 'text-red-600'}`} />
                            </div>
                            <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeStage === 2 ? 'text-white text-glow' : 'text-red-900'}`}>
                                2. Phủ Định
                            </span>
                        </button>

                        {/* Node 3: Phủ định của phủ định */}
                        <button 
                            onClick={() => handleStageClick(3)}
                            className={`flow-node absolute right-[10%] top-[10%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group
                                ${activeStage === 3 ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-105'}`}
                        >
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-colors
                                ${activeStage === 3 ? 'bg-gradient-to-br from-red-500 to-white border-white shadow-[0_0_40px_#ff0000]' : 'bg-black border-red-800'}`}>
                                <GitMerge className={`w-12 h-12 ${activeStage === 3 ? 'text-black' : 'text-red-600'}`} />
                            </div>
                            <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeStage === 3 ? 'text-white text-glow' : 'text-red-900'}`}>
                                3. Phủ Định Của Phủ Định
                            </span>
                        </button>
                    </div>
                </div>

                {/* RIGHT: Detail Panel */}
                <div className="lg:col-span-5 detail-panel">
                    <div className="mb-6">
                        <h2 className="text-4xl md:text-5xl font-black text-red-600 uppercase tracking-tighter mb-2">
                            Quy Luật <br/> <span className="text-white">Phủ Định</span>
                        </h2>
                        <p className="text-red-400 font-mono text-sm tracking-widest border-l-2 border-red-600 pl-3">
                            // KHUYNH HƯỚNG CỦA SỰ PHÁT TRIỂN
                        </p>
                    </div>

                    <div className="bg-red-950/20 border border-red-900/50 p-8 backdrop-blur-sm relative overflow-hidden group">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500"></div>

                        {/* Content */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl font-black text-red-500/20 absolute -top-2 right-4 select-none">
                                0{activeStage}
                            </span>
                            <div className="p-3 bg-red-600 text-black rounded font-bold">
                                {stages[activeStage-1].icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white uppercase">{stages[activeStage-1].title}</h3>
                                <p className="text-red-500 text-sm font-mono">{stages[activeStage-1].sub}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Bản chất</h4>
                                <p className="text-red-100 leading-relaxed text-lg border-l-4 border-red-600 pl-4">
                                    {stages[activeStage-1].desc}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/50 p-3 rounded border border-red-900/30">
                                    <span className="text-red-600 text-[10px] uppercase font-bold block mb-1">Đặc tính</span>
                                    <span className="text-white font-bold">{stages[activeStage-1].nature}</span>
                                </div>
                                <div className="bg-black/50 p-3 rounded border border-red-900/30">
                                    <span className="text-red-600 text-[10px] uppercase font-bold block mb-1">Cơ chế</span>
                                    <span className="text-white font-bold flex items-center gap-2">
                                        <RefreshCw size={12} /> Kế thừa & Lọc bỏ
                                    </span>
                                </div>
                            </div>

                            <div className="bg-red-900/20 p-4 rounded border border-red-500/20">
                                <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Ví dụ thực tiễn</h4>
                                <p className="text-sm text-gray-300 italic">
                                    "{stages[activeStage-1].example}"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-red-800 font-mono">
                        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                        Đường xoắn ốc: Phát triển không phải là vòng tròn khép kín, mà lặp lại ở trình độ cao hơn.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DialecticalFlow;