import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Repeat, Cpu, Factory, Truck, Server, RefreshCcw, Search, Smartphone } from 'lucide-react';
import gsap from 'gsap';

const mappings = [
  {
    id: 1,
    category: "Sự Tha Hóa",
    theory: {
      text: "Trong lao động, người công nhân không khẳng định mà phủ định mình... Lao động là bên ngoài, là sự ép buộc.",
      source: "C.Mác - Bản thảo KT-TH 1844"
    },
    reality19: {
      title: "Công xưởng Manchester",
      desc: "Công nhân bị gắn chặt vào cỗ máy hơi nước, làm việc 14-16h/ngày, trở thành một bộ phận của máy móc.",
      icon: <Factory size={24} />
    },
    reality21: {
      title: "Gig Economy & Thuật toán",
      desc: "Tài xế công nghệ (Shipper) bị quản lý bởi App. Không có sếp người, nhưng bị thúc ép bởi thuật toán vô hình.",
      icon: <Smartphone size={24} />
    }
  },
  {
    id: 2,
    category: "Tích Tụ Tư Bản",
    theory: {
      text: "Cạnh tranh dẫn đến sự tập trung tư bản... Các nhà tư bản lớn nuốt chửng các nhà tư bản nhỏ.",
      source: "C.Mác - Tư Bản luận",
    },
    reality19: {
      title: "Độc quyền Trust/Cartel",
      desc: "Sự hình thành các ông vua Thép, Vua Dầu mỏ (Rockefeller) kiểm soát toàn bộ chuỗi cung ứng.",
      icon: <Search size={24} />
    },
    reality21: {
      title: "Big Tech Ecosystem",
      desc: "Amazon, Google thâu tóm thị trường. Thương mại điện tử nhỏ lẻ phụ thuộc hoàn toàn vào hạ tầng của Big Tech.",
      icon: <Server size={24} />
    }
  },
  {
    id: 3,
    category: "Máy Móc & Việc Làm",
    theory: {
      text: "Phương tiện lao động, khi mang hình thái máy móc, trở thành đối thủ cạnh tranh của chính người công nhân.",
      source: "C.Mác - Tư Bản luận",
    },
    reality19: {
      title: "Phong trào Luddite",
      desc: "Công nhân dệt Anh đập phá máy móc vì sợ bị thay thế và mất việc làm vào tay máy dệt hơi nước.",
      icon: <RefreshCcw size={24} />
    },
    reality21: {
      title: "AI & Automation",
      desc: "Trí tuệ nhân tạo (ChatGPT, Robot) đe dọa thay thế không chỉ lao động chân tay mà cả lao động trí óc.",
      icon: <Cpu size={24} />
    }
  }
];

const TextRealityMapper: React.FC = () => {
  const [isModern, setIsModern] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleEra = () => {
    // Glitch effect on transition
    const cards = document.querySelectorAll('.reality-card');
    gsap.to(cards, {
      skewX: 20,
      opacity: 0,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsModern(!isModern);
        gsap.to(cards, { skewX: 0, opacity: 1, duration: 0.2 });
      }
    });
  };

  return (
    <section className="py-24 border-t border-red-900/30 relative overflow-hidden">
      {/* Background Line Network */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef5350" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Repeat className="text-red-500 animate-spin-slow" />
                    <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Bản Đồ Đối Chiếu</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-glow">
                    Lý Luận <span className="text-red-600 px-2">&</span> Thực Tiễn
                </h2>
            </div>

            {/* Time Toggle Switch */}
            <div className="flex items-center gap-4 bg-black border border-red-900/50 p-1 rounded-full">
                <button 
                    onClick={() => !isModern || toggleEra()}
                    className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${!isModern ? 'bg-red-900 text-white shadow-[0_0_15px_#7f1d1d]' : 'text-red-700 hover:text-red-500'}`}
                >
                    Thế kỷ 19
                </button>
                <div 
                    onClick={toggleEra}
                    className="cursor-pointer w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <RefreshCcw size={16} className={`text-black transition-transform duration-500 ${isModern ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                <button 
                    onClick={() => isModern || toggleEra()}
                    className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${isModern ? 'bg-red-600 text-black shadow-[0_0_15px_#ef5350]' : 'text-red-700 hover:text-red-500'}`}
                >
                    Thế kỷ 21
                </button>
            </div>
        </div>

        <div className="space-y-8" ref={containerRef}>
            {mappings.map((item) => (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 group">
                    
                    {/* LEFT: THEORY (Constant) */}
                    <div className="lg:col-span-5 relative">
                         <div className="h-full bg-red-950/10 border-l-4 border-red-900 p-6 transition-colors group-hover:border-red-500 group-hover:bg-red-950/20">
                            <span className="text-red-500 font-mono text-xs uppercase mb-2 block tracking-widest">
                                Lý thuyết: {item.category}
                            </span>
                            <p className="text-xl md:text-2xl font-serif text-white italic leading-relaxed mb-4">
                                "{item.theory.text}"
                            </p>
                            <div className="text-red-400 text-xs font-bold uppercase flex items-center gap-2">
                                <span className="w-4 h-px bg-red-600"></span> {item.theory.source}
                            </div>
                         </div>
                         {/* Connection Point (Desktop) */}
                         <div className="hidden lg:block absolute top-1/2 -right-4 w-3 h-3 bg-red-600 rounded-full box-glow z-20 group-hover:scale-150 transition-transform"></div>
                         <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-red-600/50 z-10"></div>
                    </div>

                    {/* CENTER: ARROW (Desktop) */}
                    <div className="lg:col-span-2 hidden lg:flex items-center justify-center relative">
                        <div className="w-full h-0.5 bg-gradient-to-r from-red-900/0 via-red-600/50 to-red-900/0"></div>
                        <div className="absolute bg-black p-2 border border-red-900 rounded-full group-hover:border-red-500 transition-colors">
                            <ArrowRight className="text-red-500 group-hover:translate-x-1 transition-transform" size={16} />
                        </div>
                    </div>

                    {/* RIGHT: REALITY (Variable) */}
                    <div className="lg:col-span-5 reality-card">
                         <div className={`h-full border border-red-900/30 p-6 relative overflow-hidden transition-all duration-500 
                            ${isModern ? 'bg-black shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'bg-[#1a0505] grayscale-[0.5]'}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded border ${isModern ? 'border-red-500 bg-red-900/20 text-red-500' : 'border-red-900 bg-black text-red-800'}`}>
                                    {isModern ? item.reality21.icon : item.reality19.icon}
                                </div>
                                <span className={`text-xs font-bold uppercase px-2 py-1 border rounded ${isModern ? 'border-red-600 text-red-500' : 'border-red-900 text-red-900'}`}>
                                    {isModern ? 'Hiện thực 2024' : 'Lịch sử 18xx'}
                                </span>
                            </div>

                            <h3 className={`text-xl font-bold uppercase mb-2 ${isModern ? 'text-white' : 'text-red-200'}`}>
                                {isModern ? item.reality21.title : item.reality19.title}
                            </h3>
                            <p className="text-red-100/70 text-sm leading-relaxed">
                                {isModern ? item.reality21.desc : item.reality19.desc}
                            </p>
                            
                            {/* Decorative Corner */}
                            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isModern ? 'border-red-500' : 'border-red-900'}`}></div>
                         </div>
                    </div>

                    {/* Mobile Arrow Connector */}
                    <div className="lg:hidden flex justify-center py-2">
                        <ArrowRight className="text-red-800 rotate-90" />
                    </div>

                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TextRealityMapper;