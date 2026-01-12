import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    ChevronDown, 
    Zap, 
    Users, 
    Building, 
    Scale,
    ArrowUp, 
    ArrowDown, 
    Database, 
    Cpu, 
    Landmark, 
    Activity, 
    GitCommit,
    Layers,
    BookOpen,
    Network
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Data for Concept Decoder (Tab 1)
const concepts = [
  {
    id: 'llsx',
    number: '01',
    term: "Lực Lượng Sản Xuất",
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Yếu tố động nhất, cách mạng nhất. Là sự kết hợp giữa người lao động (kỹ năng, trí tuệ) và tư liệu sản xuất (công cụ, máy móc).",
    highlight: "Quyết định năng suất lao động xã hội.",
    example: "Ví dụ: Sự chuyển dịch từ lao động thủ công sang tự động hóa, AI và kinh tế số.",
  },
  {
    id: 'qhsx',
    number: '02',
    term: "Quan Hệ Sản Xuất",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Quan hệ giữa người với người trong quá trình sản xuất. Bao gồm: Quan hệ sở hữu, Quan hệ tổ chức quản lý, và Quan hệ phân phối.",
    highlight: "Phải phù hợp với trình độ phát triển của Lực lượng sản xuất.",
    example: "Ví dụ: Chế độ công hữu về tư liệu sản xuất chủ yếu; Phân phối theo lao động.",
  },
  {
    id: 'csht',
    number: '03',
    term: "Cơ Sở Hạ Tầng",
    icon: <Building className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Toàn bộ những Quan hệ sản xuất hợp thành cơ cấu kinh tế của một hình thái xã hội nhất định.",
    highlight: "Quyết định tính chất của Kiến trúc thượng tầng.",
    example: "Ví dụ: Cơ cấu kinh tế nhiều thành phần định hướng XHCN (Kinh tế nhà nước giữ vai trò chủ đạo).",
  },
  {
    id: 'ktt',
    number: '04',
    term: "Kiến Trúc Thượng Tầng",
    icon: <Scale className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Hệ thống quan điểm (chính trị, pháp quyền, triết học...) và các thiết chế tương ứng (Nhà nước, Đảng, Giáo hội...).",
    highlight: "Tác động trở lại mạnh mẽ đối với Cơ sở hạ tầng.",
    example: "Ví dụ: Nhà nước pháp quyền XHCN Việt Nam; Hệ tư tưởng Mác - Lênin.",
  }
];

// Data for Dependency Map (Tab 2)
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

type TabType = 'concepts' | 'system';

const SocialStructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('concepts');
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);

  const toggleConcept = (id: string) => {
    setActiveConceptId(activeConceptId === id ? null : id);
  };

  const handleNodeToggle = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, type: 'concept' | 'node') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (type === 'concept') toggleConcept(id);
      else handleNodeToggle(id);
    }
  };

  useLayoutEffect(() => {
    if (activeTab === 'system' && systemRef.current) {
      const ctx = gsap.context(() => {
        // Animate cards when switching to system tab
        gsap.fromTo(".map-card", 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out"
          }
        );

        // Center line animation
        gsap.fromTo(".central-line", 
          { height: 0 }, 
          { 
            height: "100%", 
            duration: 1, 
            ease: "power2.inOut"
          }
        );
      }, systemRef);
      return () => ctx.revert();
    }
  }, [activeTab]);

  return (
    <section ref={containerRef} className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#330000 1px, transparent 1px), linear-gradient(90deg, #330000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/50 rounded-full bg-red-950/30 mb-4">
            <Activity size={14} className="text-red-500 animate-pulse" />
            <span className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Social Architecture</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">
            Giải Mã <span className="text-white">Cấu Trúc Xã Hội</span>
          </h3>
          <p className="text-red-400 font-mono text-sm tracking-widest uppercase opacity-80">
            // CHẾ ĐỘ PHÂN TÍCH HỆ THỐNG
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-black border border-red-900/50 rounded-lg p-1 gap-1">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-xs tracking-widest transition-all duration-300 ${
                activeTab === 'concepts' 
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                  : 'text-red-600 hover:bg-red-900/20'
              }`}
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">Khái Niệm</span>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-xs tracking-widest transition-all duration-300 ${
                activeTab === 'system' 
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                  : 'text-red-600 hover:bg-red-900/20'
              }`}
            >
              <Network size={16} />
              <span className="hidden sm:inline">Mối Quan Hệ</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[600px]">
          
          {/* ===================== TAB 1: CONCEPTS ===================== */}
          <div className={`transition-all duration-500 ${activeTab === 'concepts' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="space-y-6" role="list">
              {concepts.map((concept) => (
                <div 
                  key={concept.id} 
                  className={`border transition-all duration-500 overflow-hidden relative group rounded-sm
                    ${activeConceptId === concept.id 
                        ? 'bg-black border-red-500 box-glow' 
                        : 'bg-black border-red-900/50 hover:border-red-600'}`}
                  role="listitem"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleConcept(concept.id)}
                    onKeyDown={(e) => handleKeyDown(e, concept.id, 'concept')}
                    aria-expanded={activeConceptId === concept.id}
                    aria-controls={`content-${concept.id}`}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-red-500 relative z-20 bg-gradient-to-r from-black via-black to-transparent"
                  >
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <div className={`text-3xl font-condensed font-bold opacity-30 transition-colors duration-300 ${activeConceptId === concept.id ? 'text-red-500 opacity-100' : 'text-red-900'}`}>
                        {concept.number}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`transition-colors duration-300 ${activeConceptId === concept.id ? 'text-red-500' : 'text-red-800'}`}>
                          {concept.icon}
                        </span>
                        <span className={`text-xl md:text-2xl font-bold uppercase tracking-wide transition-all duration-300 ${activeConceptId === concept.id ? 'text-white translate-x-2' : 'text-red-600 group-hover:text-red-400'}`}>
                          {concept.term}
                        </span>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`text-red-600 transition-transform duration-500 ${activeConceptId === concept.id ? 'rotate-180 text-white' : ''}`} 
                      size={24}
                    />
                  </button>
                  
                  {/* Content Panel */}
                  <div 
                    id={`content-${concept.id}`}
                    className={`transition-[max-height,opacity] duration-500 ease-in-out will-change-transform ${activeConceptId === concept.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    aria-hidden={activeConceptId !== concept.id}
                  >
                    <div className="px-6 pb-8 pt-2 relative border-t border-red-900/50">
                      {/* Scanner Animation Line */}
                      {activeConceptId === concept.id && (
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_#ff0000] animate-[scanLine_2s_linear_infinite] opacity-50 pointer-events-none"></div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                        {/* Left: Definition */}
                        <div className="md:col-span-8 space-y-4">
                          <p className="text-lg text-red-100 leading-relaxed font-light">
                            <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-1">Định nghĩa</span>
                            {concept.definition}
                          </p>
                          <div className="bg-red-950/20 border-l-2 border-red-500 p-3">
                            <p className="text-red-400 italic text-sm font-medium">
                              "{concept.highlight}"
                            </p>
                          </div>
                        </div>

                        {/* Right: Example */}
                        <div className="md:col-span-4 bg-red-900/10 p-4 border border-red-900/30 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-1">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            </div>
                          </div>
                          <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-2">Thực tiễn</span>
                          <p className="text-sm text-gray-300">
                            {concept.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Glow Borders */}
                  {activeConceptId === concept.id && (
                    <>
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                      <div className="absolute top-0 right-0 w-1 h-full bg-red-600"></div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Hint to switch tab */}
            <div className="text-center mt-8">
              <button 
                onClick={() => setActiveTab('system')}
                className="text-red-600 text-xs font-mono uppercase tracking-widest border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/20 transition-colors"
              >
                → Xem mối quan hệ giữa các khái niệm
              </button>
            </div>
          </div>

          {/* ===================== TAB 2: SYSTEM MAP ===================== */}
          <div 
            ref={systemRef}
            className={`transition-all duration-500 ${activeTab === 'system' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
          >
            <p className="text-red-400/70 font-mono text-xs md:text-sm mb-8 text-center max-w-xl mx-auto">
              Mô hình hóa mối quan hệ biện chứng giữa các tầng cấu trúc xã hội.
              <br/>(Click vào từng tầng để xem cơ chế tác động)
            </p>

            <div className="relative flex flex-col gap-6 py-6">
              {/* The Central Nervous System Line */}
              <div className="central-line absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/0 via-red-600 to-red-500/0 -translate-x-1/2 z-0 hidden md:block shadow-[0_0_15px_#f00]"></div>

              {nodes.map((node) => {
                const isActive = activeNode === node.id;
                const isBase = node.id === 'llsx';
                
                return (
                  <div 
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => handleNodeToggle(node.id)}
                    onKeyDown={(e) => handleKeyDown(e, node.id, 'node')}
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

            {/* Hint to switch tab */}
            <div className="text-center mt-8">
              <button 
                onClick={() => setActiveTab('concepts')}
                className="text-red-600 text-xs font-mono uppercase tracking-widest border border-red-900/50 px-4 py-2 rounded hover:bg-red-900/20 transition-colors"
              >
                ← Xem định nghĩa từng khái niệm
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes scanLine {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default SocialStructure;
