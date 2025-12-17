import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    ArrowUp, 
    ArrowDown, 
    Database, 
    Cpu, 
    Landmark, 
    Activity, 
    GitCommit,
    Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: 'kttt',
    level: 4,
    title: "Kiến Trúc Thượng Tầng",
    sub: "Superstructure",
    icon: <Landmark className="w-8 h-8" />,
    short: "Nhà nước, Pháp luật, Hệ tư tưởng",
    desc: "Toàn bộ hệ thống quan điểm chính trị, pháp quyền, triết học, đạo đức... và các thiết chế tương ứng.",
    interaction: {
      passive: "Được sinh ra từ Cơ sở hạ tầng.",
      active: "Tác động trở lại mạnh mẽ: Bảo vệ hoặc kìm hãm kinh tế."
    }
  },
  {
    id: 'csht',
    level: 3,
    title: "Cơ Sở Hạ Tầng",
    sub: "Economic Base",
    icon: <Layers className="w-8 h-8" />,
    short: "Kết cấu kinh tế xã hội",
    desc: "Tổng hợp các Quan hệ sản xuất hợp thành cơ cấu kinh tế của một xã hội nhất định.",
    interaction: {
      passive: "Bị quy định bởi trình độ của Lực lượng sản xuất.",
      active: "Quyết định tính chất của Kiến trúc thượng tầng."
    }
  },
  {
    id: 'qhsx',
    level: 2,
    title: "Quan Hệ Sản Xuất",
    sub: "Relations of Production",
    icon: <Database className="w-8 h-8" />,
    short: "Sở hữu, Quản lý, Phân phối",
    desc: "Quan hệ giữa người với người trong quá trình sản xuất. Là hình thức xã hội của sản xuất.",
    interaction: {
      passive: "Phải phù hợp với trình độ phát triển của LLSX.",
      active: "Tạo động lực hoặc kìm hãm LLSX phát triển."
    }
  },
  {
    id: 'llsx',
    level: 1,
    title: "Lực Lượng Sản Xuất",
    sub: "Productive Forces",
    icon: <Cpu className="w-8 h-8" />,
    short: "Người lao động + Tư liệu SX",
    desc: "Yếu tố nền tảng, cách mạng nhất. Thể hiện năng lực thực tiễn của con người trong việc cải biến tự nhiên.",
    interaction: {
      passive: "Yếu tố gốc rễ, quyết định tất cả.",
      active: "Quyết định sự hình thành và biến đổi của QHSX."
    }
  }
];

const ConceptDependencyMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Initial entrance
        gsap.set(".map-card", { y: 100, opacity: 0 });
        gsap.to(".map-card", {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });

        // Center line animation
        gsap.fromTo(".central-line", 
            { height: 0 }, 
            { 
                height: "100%", 
                duration: 1.5, 
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%"
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleNodeToggle = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeToggle(id);
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-black relative flex flex-col items-center overflow-hidden border-t border-red-900/30">
      {/* Background Cyberpunk Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(transparent 95%, #500 95%),
                               linear-gradient(90deg, transparent 95%, #500 95%)`,
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/50 rounded-full bg-red-950/30 mb-4 animate-pulse">
            <Activity size={14} className="text-red-500" />
            <span className="text-[10px] text-red-400 font-mono uppercase tracking-widest">System Architecture</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-glow">
          Cấu Trúc <span className="text-red-600">Hệ Thống</span>
        </h3>
        <p className="text-red-400/70 font-mono text-xs md:text-sm mt-4 max-w-xl mx-auto">
          Mô hình hóa mối quan hệ biện chứng giữa các tầng cấu trúc xã hội.
          <br/>(Click vào từng tầng để xem cơ chế tác động)
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="relative flex flex-col gap-6 py-10">
            
            {/* The Central Nervous System Line */}
            <div className="central-line absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/0 via-red-600 to-red-500/0 -translate-x-1/2 z-0 hidden md:block shadow-[0_0_15px_#f00]"></div>

            {nodes.map((node, index) => {
                const isActive = activeNode === node.id;
                const isBase = node.id === 'llsx';
                
                return (
                    <div 
                        key={node.id}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isActive}
                        onClick={() => handleNodeToggle(node.id)}
                        onKeyDown={(e) => handleKeyDown(e, node.id)}
                        className={`map-card relative z-10 transition-all duration-500 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl ${isActive ? 'scale-105' : 'hover:scale-[1.02]'}`}
                    >
                        {/* The Card */}
                        <div className={`
                            flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-xl border-l-4 backdrop-blur-md transition-colors duration-300
                            ${isActive 
                                ? 'bg-red-950/40 border-l-red-500 border-y border-r border-white/10 shadow-[0_0_40px_rgba(220,38,38,0.2)]' 
                                : 'bg-black/80 border-l-red-900 border-y border-r border-red-900/30 hover:bg-red-900/10'
                            }
                        `}>
                            {/* Icon Column */}
                            <div className="relative shrink-0">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center border transition-all duration-300
                                    ${isActive ? 'bg-red-600 border-white text-white shadow-lg' : 'bg-black border-red-800 text-red-600'}
                                `}>
                                    {node.icon}
                                </div>
                                {isBase && !isActive && (
                                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                                )}
                            </div>

                            {/* Info Column */}
                            <div className="flex-1 text-center md:text-left w-full">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className={`text-xl md:text-3xl font-black uppercase tracking-tight transition-colors ${isActive ? 'text-white' : 'text-red-700 group-hover:text-red-500'}`}>
                                        {node.title}
                                    </h4>
                                    <span className="text-[10px] font-mono text-red-500/50 uppercase tracking-widest">{node.sub}</span>
                                </div>
                                
                                <p className={`text-sm md:text-base font-medium mb-2 ${isActive ? 'text-red-200' : 'text-gray-500'}`}>
                                    {node.short}
                                </p>

                                {/* Detailed Expansion */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out will-change-transform ${isActive ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-black/50 p-4 rounded border border-red-900/30 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-red-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                                                <ArrowUp size={12} /> Quyết định (Chiều xuôi)
                                            </div>
                                            <p className="text-white text-sm">{node.interaction.active}</p>
                                        </div>
                                        <div>
                                            <div className="text-yellow-600 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                                                <ArrowDown size={12} /> Tác động (Chiều ngược)
                                            </div>
                                            <p className="text-gray-300 text-sm">{node.interaction.passive}</p>
                                        </div>
                                        <div className="md:col-span-2 text-xs text-red-400 italic pt-2 border-t border-white/10">
                                            "{node.desc}"
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="hidden md:flex flex-col items-end justify-center gap-1 opacity-50">
                                <GitCommit size={14} className={isActive ? 'text-red-500' : 'text-red-900'} />
                                <div className={`w-1 h-8 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-red-950'}`}></div>
                            </div>
                        </div>

                        {/* Connection Arrows Visualization (Only when Active) */}
                        {isActive && (
                            <>
                                {node.level < 4 && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 animate-bounce hidden md:block">
                                        <ArrowUp size={24} />
                                    </div>
                                )}
                                {node.level > 1 && (
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-yellow-600 animate-pulse hidden md:block z-20">
                                        <ArrowDown size={24} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
            
            {/* Base Foundation Glow */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-red-600/20 blur-[100px] pointer-events-none rounded-full"></div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-red-500/60">
            <div className="flex items-center gap-2">
                <ArrowUp size={12} className="text-red-500" /> Quyết định
            </div>
            <div className="flex items-center gap-2">
                <ArrowDown size={12} className="text-yellow-600" /> Tác động trở lại
            </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptDependencyMap;