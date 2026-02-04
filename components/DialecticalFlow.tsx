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
        image: "data:image/jpeg;base64,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",
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
        image: "https://media.istockphoto.com/id/146718378/photo/overcome-obstacle.jpg?s=612x612&w=0&k=20&c=uQ9A7aT9QWSM_5Kwgpa10GHKNv_C7KkypYy-Snx5ens=",
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
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
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
                    <div className="flex justify-center gap-3 flex-wrap mb-8">
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

                {/* Detail Panel */}
                <div className="detail-content max-w-4xl mx-auto">
                    <div className={`
                        rounded-2xl border-2 p-8 md:p-10 transition-all duration-500
                        ${currentStage.borderColor} ${currentStage.bgColor}
                    `}>
                        {/* Stage Image */}
                        {currentStage.image && (
                            <div className="mb-6 rounded-xl overflow-hidden">
                                <img 
                                    src={currentStage.image} 
                                    alt={currentStage.title}
                                    className="w-full h-48 md:h-56 object-cover"
                                />
                            </div>
                        )}
                        
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