import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    Sprout, 
    Flame, 
    Sparkles, 
    ArrowRight, 
    ArrowDown,
    ChevronRight,
    Wheat,
    Zap,
    RefreshCw,
    TrendingUp,
    Check,
    Egg,
    Bird,
    Leaf,
    TreeDeciduous
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
    {
        id: 1,
        title: "Khẳng Định",
        titleEn: "Thesis",
        color: "from-green-600 to-green-800",
        borderColor: "border-green-500",
        bgColor: "bg-green-950/30",
        textColor: "text-green-400",
        iconBg: "bg-green-600",
        icon: <Sprout className="w-8 h-8" />,
        desc: "Điểm xuất phát của mọi sự phát triển. Sự vật tồn tại với những đặc tính ban đầu, nhưng đã chứa đựng mầm mống của sự thay đổi.",
        keyPoint: "Cái ban đầu",
        analogyIcon: <Egg className="w-6 h-6" />,
        analogy: "Như hạt giống chứa đựng tiềm năng của cây",
        societyExample: {
            title: "Cộng sản nguyên thủy",
            desc: "Xã hội bình đẳng, công hữu về tư liệu sản xuất, chưa có giai cấp"
        }
    },
    {
        id: 2,
        title: "Phủ Định",
        titleEn: "Antithesis",
        color: "from-red-600 to-red-800",
        borderColor: "border-red-500",
        bgColor: "bg-red-950/30",
        textColor: "text-red-400",
        iconBg: "bg-red-600",
        icon: <Flame className="w-8 h-8" />,
        desc: "Xóa bỏ cái cũ để cái mới ra đời. Không phải phủ định sạch trơn mà là phủ định biện chứng - giữ lại những yếu tố tích cực.",
        keyPoint: "Cái đối lập",
        analogyIcon: <Leaf className="w-6 h-6" />,
        analogy: "Như cây con phủ định hạt giống để vươn lên",
        societyExample: {
            title: "Xã hội có giai cấp",
            desc: "Tư hữu xuất hiện, phân chia giai cấp (Nô lệ → Phong kiến → Tư bản)"
        }
    },
    {
        id: 3,
        title: "Phủ Định của Phủ Định",
        titleEn: "Synthesis",
        color: "from-yellow-500 to-amber-600",
        borderColor: "border-yellow-500",
        bgColor: "bg-yellow-950/30",
        textColor: "text-yellow-400",
        iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
        icon: <Sparkles className="w-8 h-8" />,
        desc: "Trở về đặc tính ban đầu nhưng ở trình độ cao hơn. Tổng hợp những yếu tố tích cực của cả quá trình, mở ra chu kỳ phát triển mới.",
        keyPoint: "Cái mới cao hơn",
        analogyIcon: <TreeDeciduous className="w-6 h-6" />,
        analogy: "Như cây ra hoa, kết quả - trở lại thành hạt nhưng hoàn thiện hơn",
        societyExample: {
            title: "Cộng sản chủ nghĩa",
            desc: "Trở lại công hữu nhưng trên nền tảng công nghiệp hiện đại, năng suất cao"
        }
    }
];

const realLifeExamples = [
    {
        category: "Tự nhiên",
        icon: <Wheat className="w-5 h-5" />,
        steps: ["Hạt giống", "Cây con", "Cây ra quả (hạt mới)"],
        explanations: [
            "Hạt giống chứa đựng tiềm năng của cây, là điểm khởi đầu (Khẳng định)",
            "Cây con phủ định hạt giống - hạt tan rã để cây vươn lên, nhưng giữ lại thông tin di truyền (Phủ định)",
            "Cây ra quả tạo hạt mới - trở về dạng ban đầu nhưng hoàn thiện hơn, số lượng nhiều hơn (Phủ định của phủ định)"
        ]
    },
    {
        category: "Sinh học", 
        icon: <Bird className="w-5 h-5" />,
        steps: ["Trứng", "Con non", "Con trưởng thành (đẻ trứng mới)"],
        explanations: [
            "Trứng là dạng tồn tại ban đầu, chứa mầm sống (Khẳng định)",
            "Con non phá vỡ vỏ trứng để sinh ra - phủ định trứng nhưng kế thừa gen (Phủ định)",
            "Con trưởng thành đẻ trứng mới - chu kỳ lặp lại ở trình độ cao hơn (Phủ định của phủ định)"
        ]
    },
    {
        category: "Tri thức",
        icon: <Zap className="w-5 h-5" />,
        steps: ["Giả thuyết cũ", "Phản bác", "Lý thuyết mới hoàn thiện hơn"],
        explanations: [
            "Giả thuyết ban đầu được coi là đúng trong điều kiện nhất định (Khẳng định)",
            "Phản bác/thí nghiệm mới chỉ ra hạn chế của giả thuyết cũ (Phủ định)",
            "Lý thuyết mới kế thừa phần đúng của cũ + khắc phục hạn chế = hoàn thiện hơn (Phủ định của phủ định)"
        ]
    },
    {
        category: "Xã hội",
        icon: <TrendingUp className="w-5 h-5" />,
        steps: ["Công xã nguyên thủy", "Xã hội có giai cấp", "CNXH/CNCS"],
        explanations: [
            "Xã hội không có tư hữu, bình đẳng nhưng lạc hậu (Khẳng định)",
            "Tư hữu xuất hiện, tạo động lực phát triển nhưng sinh ra bóc lột (Phủ định)",
            "Xóa bỏ tư hữu trên nền tảng LLSX hiện đại - bình đẳng + phát triển (Phủ định của phủ định)"
        ]
    }
];

const DialecticalFlow: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStage, setActiveStage] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger entrance for stage cards
            gsap.from(".stage-card", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%"
                }
            });

            // Animate the spiral
            gsap.to(".spiral-rotate", {
                rotation: 360,
                transformOrigin: "50% 50%",
                duration: 20,
                repeat: -1,
                ease: "linear"
            });

            // Animate arrows
            gsap.to(".flow-arrow", {
                x: 10,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleStageClick = (id: number) => {
        if (isAnimating || id === activeStage) return;
        setIsAnimating(true);
        
        gsap.to(".detail-content", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            onComplete: () => {
                setActiveStage(id);
                gsap.to(".detail-content", {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => setIsAnimating(false)
                });
            }
        });
    };

    const currentStage = stages[activeStage - 1];

    return (
        <section ref={containerRef} className="py-24 bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-900/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Animated Spiral Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none spiral-rotate">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <path 
                        d="M200,200 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0 M200,200 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0 M200,200 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
                        fill="none"
                        stroke="#ff0000"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-red-600/50 rounded-full bg-red-950/30 mb-4">
                        <RefreshCw size={14} className="text-red-500 animate-spin" style={{ animationDuration: '3s' }} />
                        <span className="text-xs text-red-400 font-mono uppercase tracking-widest">Dialectical Development</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-3">
                        <span className="text-red-600">Quy Luật</span>{" "}
                        <span className="text-white">Phủ Định</span>
                    </h2>
                    <p className="text-red-400/80 max-w-2xl mx-auto text-lg mb-6">
                        Sự phát triển không phải là đường thẳng, mà là <span className="text-white font-bold">đường xoắn ốc đi lên</span> - 
                        lặp lại những đặc tính cũ nhưng ở trình độ cao hơn.
                    </p>
                    
                    {/* Navigation Buttons - Moved here */}
                    <div className="flex justify-center gap-3 flex-wrap">
                        {stages.map((stage) => (
                            <button
                                key={stage.id}
                                onClick={() => handleStageClick(stage.id)}
                                className={`px-4 py-2.5 rounded-full font-bold uppercase text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${
                                    activeStage === stage.id
                                        ? `bg-gradient-to-r ${stage.color} text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105`
                                        : 'bg-red-950/50 text-red-400 border border-red-800 hover:bg-red-900/50 hover:text-white'
                                }`}
                            >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                    activeStage === stage.id ? 'bg-white/20' : 'bg-red-900'
                                }`}>
                                    {stage.id}
                                </span>
                                {stage.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main 3-Step Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 mb-10 relative">

                    {stages.map((stage, index) => (
                        <div key={stage.id} className="relative">
                            {/* Mobile Arrow */}
                            {index < stages.length - 1 && (
                                <div className="lg:hidden flex justify-center py-4">
                                    <ArrowDown className="text-red-600 animate-bounce" size={24} />
                                </div>
                            )}
                            
                            <div 
                                onClick={() => handleStageClick(stage.id)}
                                className={`stage-card cursor-pointer transition-all duration-500 group ${
                                    activeStage === stage.id 
                                        ? 'scale-105 z-10' 
                                        : 'hover:scale-102 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <div className={`
                                    relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden
                                    ${activeStage === stage.id 
                                        ? `${stage.borderColor} ${stage.bgColor} shadow-[0_0_40px_rgba(255,255,255,0.1)]` 
                                        : 'border-red-900/30 bg-black/50 hover:border-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]'
                                    }
                                `}>
                                    {/* Click Hint Overlay (for inactive cards) */}
                                    {activeStage !== stage.id && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20">
                                            <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg animate-pulse">
                                                <span>👆</span> Click để xem
                                            </div>
                                        </div>
                                    )}
                                    {/* Step Number */}
                                    <div className={`
                                        absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-all
                                        ${activeStage === stage.id 
                                            ? `${stage.iconBg} text-white` 
                                            : 'bg-red-950 text-red-600'
                                        }
                                    `}>
                                        {stage.id}
                                    </div>

                                    {/* Icon */}
                                    <div className={`
                                        w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                                        ${activeStage === stage.id 
                                            ? `${stage.iconBg} text-white shadow-lg` 
                                            : 'bg-red-950/50 text-red-600'
                                        }
                                    `}>
                                        {stage.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-1 transition-colors
                                        ${activeStage === stage.id ? 'text-white' : 'text-red-600'}
                                    `}>
                                        {stage.title}
                                    </h3>
                                    <p className={`text-sm font-mono mb-4 ${stage.textColor}`}>
                                        {stage.titleEn}
                                    </p>

                                    {/* Key Point Badge */}
                                    <div className={`
                                        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4
                                        ${activeStage === stage.id 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-red-950/50 text-red-500'
                                        }
                                    `}>
                                        <Check size={12} />
                                        {stage.keyPoint}
                                    </div>

                                    {/* Analogy */}
                                    <div className={`
                                        flex items-center gap-3 p-3 rounded-lg transition-colors
                                        ${activeStage === stage.id ? 'bg-black/30' : 'bg-red-950/20'}
                                    `}>
                                        <div className={`shrink-0 ${stage.textColor}`}>
                                            {stage.analogyIcon}
                                        </div>
                                        <p className="text-sm text-gray-300 italic">
                                            {stage.analogy}
                                        </p>
                                    </div>

                                    {/* Active Indicator */}
                                    {activeStage === stage.id && (
                                        <>
                                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.color}`}></div>
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                ✓ Đang xem
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="detail-content max-w-4xl mx-auto">
                    <div className={`
                        rounded-2xl border-2 p-8 md:p-10 transition-all duration-500
                        ${currentStage.borderColor} ${currentStage.bgColor}
                    `}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left: Description */}
                            <div>
                                <h4 className={`text-sm font-bold uppercase tracking-widest mb-3 ${currentStage.textColor}`}>
                                    Bản chất của giai đoạn
                                </h4>
                                <p className="text-lg text-white leading-relaxed mb-6">
                                    {currentStage.desc}
                                </p>
                                
                                {/* Society Example */}
                                <div className="bg-black/40 rounded-xl p-5 border border-white/10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp className={currentStage.textColor} size={18} />
                                        <span className={`text-xs font-bold uppercase tracking-widest ${currentStage.textColor}`}>
                                            Ví dụ trong lịch sử xã hội
                                        </span>
                                    </div>
                                    <h5 className="text-white font-bold text-lg mb-1">
                                        {currentStage.societyExample.title}
                                    </h5>
                                    <p className="text-gray-400 text-sm">
                                        {currentStage.societyExample.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Real Life Examples */}
                            <div>
                                <h4 className={`text-sm font-bold uppercase tracking-widest mb-3 ${currentStage.textColor}`}>
                                    Minh họa trong đời sống
                                </h4>
                                <div className="space-y-4">
                                    {realLifeExamples.map((example, idx) => (
                                        <div key={idx} className="bg-black/30 rounded-lg p-4 border border-white/5 hover:border-white/20 transition-colors">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={currentStage.textColor}>{example.icon}</span>
                                                <span className="text-white font-bold text-sm">{example.category}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm flex-wrap mb-3">
                                                {example.steps.map((step, stepIdx) => (
                                                    <React.Fragment key={stepIdx}>
                                                        <span className={`
                                                            px-2 py-1 rounded text-xs font-medium
                                                            ${stepIdx === activeStage - 1 
                                                                ? `${currentStage.iconBg} text-white shadow-lg` 
                                                                : 'bg-red-950/50 text-gray-400'
                                                            }
                                                        `}>
                                                            {step}
                                                        </span>
                                                        {stepIdx < example.steps.length - 1 && (
                                                            <ChevronRight className="text-red-700 shrink-0" size={14} />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            {/* Explanation for current stage */}
                                            <div className={`text-xs p-2 rounded border-l-2 ${currentStage.borderColor} bg-black/40`}>
                                                <span className={`${currentStage.textColor} font-semibold`}>→ </span>
                                                <span className="text-gray-300 italic">{example.explanations[activeStage - 1]}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Insight */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 rounded-full border border-red-800/50 flex-wrap justify-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                        <p className="text-red-300 text-sm md:text-base font-medium text-center">
                            <span className="text-white font-bold">Quy luật phổ quát:</span>{" "}
                            Phát triển = Khẳng định → Phủ định → Phủ định của Phủ định → <span className="text-yellow-400">Chu kỳ mới ở trình độ cao hơn</span>
                        </p>
                        <RefreshCw className="text-red-500 animate-spin" size={18} style={{ animationDuration: '4s' }} />
                    </div>
                </div>
            </div>

            <style>{`
                .scale-102 {
                    transform: scale(1.02);
                }
            `}</style>
        </section>
    );
};

export default DialecticalFlow;