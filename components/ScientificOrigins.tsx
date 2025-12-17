import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, TrendingUp, Globe, ArrowRight, ArrowDown, Sparkles, BookOpen } from 'lucide-react';

const origins = [
  {
    id: 'philosophy',
    title: "Triết Học Cổ Điển Đức",
    reps: "Hegel & Feuerbach",
    icon: <Brain className="w-8 h-8 md:w-12 md:h-12" />,
    shortDesc: "Thế giới quan",
    inheritance: {
      label: "Hạt nhân hợp lý",
      items: ["Phép biện chứng (Sự vận động)", "Chủ nghĩa duy vật (Thế giới là vật chất)"]
    },
    innovation: {
      label: "Bước chuyển cách mạng",
      items: ["Tạo ra CNDV Biện chứng", "Sáng tạo CNDV Lịch sử"]
    }
  },
  {
    id: 'economy',
    title: "Kinh Tế Chính Trị Anh",
    reps: "Smith & Ricardo",
    icon: <TrendingUp className="w-8 h-8 md:w-12 md:h-12" />,
    shortDesc: "Cấu trúc kinh tế",
    inheritance: {
      label: "Thành tựu kế thừa",
      items: ["Lao động là nguồn gốc giá trị", "Các quy luật kinh tế thị trường"]
    },
    innovation: {
      label: "Phát kiến vĩ đại",
      items: ["Học thuyết Giá trị thặng dư", "Vạch trần bản chất bóc lột TBCN"]
    }
  },
  {
    id: 'socialism',
    title: "CNXH Không Tưởng",
    reps: "Saint-Simon, Fourier, Owen",
    icon: <Globe className="w-8 h-8 md:w-12 md:h-12" />,
    shortDesc: "Lý luận xã hội",
    inheritance: {
      label: "Tinh thần nhân văn",
      items: ["Phê phán sâu sắc TBCN", "Dự báo về xã hội tương lai"]
    },
    innovation: {
      label: "Khoa học hóa",
      items: ["Phát hiện sứ mệnh lịch sử GCCN", "Con đường cách mạng vô sản"]
    }
  }
];

const ScientificOrigins: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>('philosophy');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robust entrance animation using fromTo to ensure visibility
      gsap.fromTo(".origin-card", 
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
      
      gsap.fromTo(".origin-title",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="origin-title text-center mb-16">
           <div className="flex items-center justify-center gap-2 text-red-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 animate-pulse">
              <Sparkles size={12} /> Tiền đề lý luận
           </div>
           <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter text-glow leading-none">
             Ba Nguồn Gốc <br className="md:hidden" /><span className="text-red-600">Lý Luận</span>
           </h3>
        </div>

        {/* Responsive Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[650px]">
          {origins.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`origin-card relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer
                  ${isActive 
                    ? 'lg:flex-[2.5] bg-red-950/20 border border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
                    : 'lg:flex-[0.5] bg-black border border-red-900/30 hover:bg-red-900/10 hover:border-red-700'}
                  rounded-xl flex flex-col
                `}
              >
                
                {/* Inactive State (Vertical on Desktop) */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex flex-row lg:flex-col items-center gap-4 p-6 w-full lg:w-auto">
                        <div className="text-red-600 opacity-80">{item.icon}</div>
                        <div className="lg:rotate-[-90deg] lg:whitespace-nowrap">
                            <h4 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">{item.title}</h4>
                        </div>
                    </div>
                </div>

                {/* Active Content */}
                <div className={`flex flex-col h-full relative z-10 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
                    
                    {/* Header Area */}
                    <div className="p-6 md:p-8 bg-gradient-to-b from-red-900/20 to-transparent border-b border-red-900/30">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-600 text-black rounded-lg shadow-lg shadow-red-900/50">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase leading-none mb-1">{item.title}</h4>
                                    <p className="text-red-400 font-mono text-xs uppercase tracking-wider">Đại biểu: {item.reps}</p>
                                </div>
                            </div>
                            <div className="hidden md:block text-right">
                                <span className="inline-block px-3 py-1 border border-red-600 text-red-500 text-xs font-bold uppercase rounded-full">
                                    {item.shortDesc}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto custom-scrollbar">
                        
                        {/* Left: Inheritance */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-red-500 mb-2">
                                <BookOpen size={18} />
                                <h5 className="font-bold uppercase text-xs tracking-widest">{item.inheritance.label}</h5>
                            </div>
                            <div className="bg-black/40 border-l-2 border-red-800 p-4 rounded-r-lg space-y-3">
                                {item.inheritance.items.map((txt, i) => (
                                    <div key={i} className="flex items-start gap-3 text-red-300/80 text-sm">
                                        <ArrowDown size={14} className="mt-1 shrink-0 opacity-50" />
                                        <span>{txt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Innovation */}
                        <div className="space-y-4">
                             <div className="flex items-center gap-2 text-white mb-2">
                                <Sparkles size={18} className="text-yellow-500 animate-pulse" />
                                <h5 className="font-bold uppercase text-xs tracking-widest text-glow">{item.innovation.label}</h5>
                            </div>
                            <div className="bg-red-900/20 border-l-2 border-red-500 p-4 rounded-r-lg space-y-3 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 blur-xl rounded-full group-hover:bg-red-600/20 transition-colors"></div>
                                {item.innovation.items.map((txt, i) => (
                                    <div key={i} className="flex items-start gap-3 text-white font-medium text-sm md:text-base">
                                        <ArrowRight size={16} className="mt-1 shrink-0 text-red-500" />
                                        <span>{txt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

                {/* Active Indicator Bar */}
                <div className={`absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-700 ${isActive ? 'w-full' : 'w-0'}`}></div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
            <p className="text-red-700 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] animate-pulse">
                [ Click để so sánh Kế thừa & Cách mạng ]
            </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7f1d1d;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default ScientificOrigins;