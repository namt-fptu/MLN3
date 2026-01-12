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
        <div className="flex flex-col items-center mb-12">
          <p className="text-red-500/70 text-xs font-mono uppercase tracking-widest mb-4 animate-pulse">
            ▼ Chọn chế độ xem ▼
          </p>
          <div className="inline-flex bg-red-950/50 border-2 border-red-600/50 rounded-xl p-1.5 gap-2 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-2 px-6 py-4 rounded-lg font-bold uppercase text-sm tracking-widest transition-all duration-300 ${
                activeTab === 'concepts' 
                  ? 'bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.6)] scale-105' 
                  : 'text-red-400 hover:bg-red-900/40 hover:text-white'
              }`}
            >
              <BookOpen size={20} />
              <span>Khái Niệm</span>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-2 px-6 py-4 rounded-lg font-bold uppercase text-sm tracking-widest transition-all duration-300 ${
                activeTab === 'system' 
                  ? 'bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.6)] scale-105' 
                  : 'text-red-400 hover:bg-red-900/40 hover:text-white'
              }`}
            >
              <Network size={20} />
              <span>Mối Quan Hệ</span>
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
            <div className="text-center mt-10 pt-8 border-t border-red-900/30">
              <p className="text-gray-500 text-xs mb-3">Đã hiểu các khái niệm? Hãy xem cách chúng tương tác:</p>
              <button 
                onClick={() => setActiveTab('system')}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-600 hover:to-red-700 text-white font-bold uppercase text-sm tracking-widest px-8 py-4 rounded-xl border border-red-500/50 hover:border-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105"
              >
                <Network size={20} />
                Xem Bản Đồ Mối Quan Hệ
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
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

            {/* ===== PYRAMID CHART ===== */}
            <div className="relative max-w-4xl mx-auto">
              
              {/* Pyramid Container */}
              <div className="relative flex flex-col items-center gap-0">
                
                {/* Animated Connection Lines - Left Side */}
                <div className="absolute left-[10%] md:left-[15%] top-0 bottom-0 w-px hidden md:block">
                  <div className="h-full w-full bg-gradient-to-b from-transparent via-red-600/50 to-red-600 relative">
                    {/* Animated particles going up */}
                    <div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ff0000] animate-[floatUp_3s_ease-in-out_infinite]" style={{left: '-3px'}}></div>
                    <div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ff0000] animate-[floatUp_3s_ease-in-out_infinite_1s]" style={{left: '-3px'}}></div>
                  </div>
                  <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-red-500 text-[10px] font-mono uppercase tracking-widest rotate-[-90deg] whitespace-nowrap hidden lg:block">
                    <ArrowUp size={12} className="inline mr-1" />
                    Quyết định
                  </div>
                </div>

                {/* Animated Connection Lines - Right Side */}
                <div className="absolute right-[10%] md:right-[15%] top-0 bottom-0 w-px hidden md:block">
                  <div className="h-full w-full bg-gradient-to-t from-transparent via-yellow-600/50 to-yellow-600 relative">
                    {/* Animated particles going down */}
                    <div className="absolute w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308] animate-[floatDown_3s_ease-in-out_infinite]" style={{left: '-3px'}}></div>
                    <div className="absolute w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308] animate-[floatDown_3s_ease-in-out_infinite_1.5s]" style={{left: '-3px'}}></div>
                  </div>
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-yellow-500 text-[10px] font-mono uppercase tracking-widest rotate-90 whitespace-nowrap hidden lg:block">
                    <ArrowDown size={12} className="inline mr-1" />
                    Tác động trở lại
                  </div>
                </div>

                {nodes.map((node, index) => {
                  const isActive = activeNode === node.id;
                  const isBase = node.id === 'llsx';
                  // Pyramid width calculation - wider at bottom
                  const widthPercent = 40 + (4 - node.level) * 15; // 40%, 55%, 70%, 85%
                  
                  return (
                    <div 
                      key={node.id}
                      className="relative w-full flex justify-center"
                      style={{ zIndex: 10 - index }}
                    >
                      {/* Connecting Arrow Between Layers */}
                      {index > 0 && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                          <div className="flex flex-col items-center">
                            <ArrowUp size={16} className="text-red-500 animate-bounce" />
                          </div>
                          <div className="flex flex-col items-center">
                            <ArrowDown size={16} className="text-yellow-500 animate-pulse" />
                          </div>
                        </div>
                      )}
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        aria-expanded={isActive}
                        onClick={() => handleNodeToggle(node.id)}
                        onKeyDown={(e) => handleKeyDown(e, node.id, 'node')}
                        className={`map-card relative transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 group
                          ${isActive ? 'z-30' : 'hover:z-20'}
                        `}
                        style={{ width: `${widthPercent}%`, minWidth: '280px' }}
                      >
                        {/* Pyramid Block */}
                        <div 
                          className={`
                            relative p-4 md:p-6 transition-all duration-500 overflow-hidden
                            ${isActive 
                              ? 'bg-gradient-to-r from-red-950 via-red-900/80 to-red-950 shadow-[0_0_60px_rgba(220,38,38,0.4)] scale-105' 
                              : 'bg-gradient-to-r from-black via-red-950/30 to-black hover:from-red-950/50 hover:via-red-900/40 hover:to-red-950/50'
                            }
                            ${index === 0 ? 'rounded-t-2xl' : ''}
                            ${index === nodes.length - 1 ? 'rounded-b-2xl' : ''}
                            border-x-2 border-t-2 ${index === nodes.length - 1 ? 'border-b-2' : ''}
                            ${isActive ? 'border-red-500' : 'border-red-900/50 group-hover:border-red-700'}
                          `}
                          style={{
                            clipPath: index === 0 
                              ? 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' 
                              : index === nodes.length - 1 
                                ? 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                                : 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                        >
                          {/* Glow Effect */}
                          {isActive && (
                            <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none"></div>
                          )}
                          
                          {/* Base indicator */}
                          {isBase && !isActive && (
                            <div className="absolute bottom-2 right-4">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                              <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full"></div>
                            </div>
                          )}

                          {/* Content Row */}
                          <div className="flex items-center gap-4 relative z-10">
                            {/* Icon */}
                            <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                              ${isActive 
                                ? 'bg-red-600 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                                : 'bg-black/50 border-red-800 text-red-500 group-hover:border-red-600 group-hover:text-red-400'
                              }
                            `}>
                              {node.icon}
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border
                                  ${isActive ? 'bg-white/10 border-white/30 text-white' : 'bg-red-950/50 border-red-900/50 text-red-600'}
                                `}>
                                  Tầng {5 - node.level}
                                </span>
                              </div>
                              <h4 className={`text-lg md:text-2xl font-black uppercase tracking-tight transition-colors truncate
                                ${isActive ? 'text-white' : 'text-red-600 group-hover:text-red-400'}
                              `}>
                                {node.title}
                              </h4>
                              <p className={`text-xs md:text-sm font-medium truncate
                                ${isActive ? 'text-red-200' : 'text-gray-500'}
                              `}>
                                {node.short}
                              </p>
                            </div>

                            {/* Level Indicator */}
                            <div className={`hidden md:flex flex-col items-center gap-1 shrink-0
                              ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}
                            `}>
                              {[...Array(4)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    i < node.level 
                                      ? isActive ? 'bg-white shadow-[0_0_5px_#fff]' : 'bg-red-600' 
                                      : 'bg-red-950'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <div className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-red-500/30">
                              {/* Quyết định */}
                              <div className="bg-black/40 rounded-lg p-4 border border-red-900/30">
                                <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase mb-2">
                                  <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                                    <ArrowUp size={14} />
                                  </div>
                                  Quyết định
                                </div>
                                <p className="text-white text-sm leading-relaxed">{node.interaction.active}</p>
                              </div>
                              
                              {/* Tác động trở lại */}
                              <div className="bg-black/40 rounded-lg p-4 border border-yellow-900/30">
                                <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase mb-2">
                                  <div className="w-6 h-6 rounded-full bg-yellow-600/20 flex items-center justify-center">
                                    <ArrowDown size={14} />
                                  </div>
                                  Tác động trở lại
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{node.interaction.passive}</p>
                              </div>
                              
                              {/* Description */}
                              <div className="md:col-span-2 bg-red-950/20 rounded-lg p-3 border-l-2 border-red-500">
                                <p className="text-red-300 text-sm italic">"{node.desc}"</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Foundation Glow */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-32 bg-red-600/30 blur-[80px] pointer-events-none rounded-full"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-10 left-0 w-20 h-20 bg-red-600/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full pointer-events-none"></div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 text-xs md:text-sm font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse"></div>
                <ArrowUp size={14} />
                <span>Chiều quyết định</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] animate-pulse"></div>
                <ArrowDown size={14} />
                <span>Chiều tác động ngược</span>
              </div>
            </div>

            {/* Hint to switch tab */}
            <div className="text-center mt-10 pt-8 border-t border-red-900/30">
              <p className="text-gray-500 text-xs mb-3">Muốn ôn lại định nghĩa?</p>
              <button 
                onClick={() => setActiveTab('concepts')}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-600 hover:to-red-700 text-white font-bold uppercase text-sm tracking-widest px-8 py-4 rounded-xl border border-red-500/50 hover:border-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105"
              >
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                Xem Định Nghĩa Khái Niệm
                <BookOpen size={20} />
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
        @keyframes floatUp {
            0% { top: 100%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 0%; opacity: 0; }
        }
        @keyframes floatDown {
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
