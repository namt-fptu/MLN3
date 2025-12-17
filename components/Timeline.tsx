import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pickaxe, Crown, Factory, Users, Rocket, Sword, History, ArrowRight, X, Quote, Lightbulb, Zap, BookOpen, ChevronRight, Hash } from 'lucide-react';

// Define Interface
interface StageData {
  id: string;
  title: string;
  year: string;
  icon: React.ReactNode;
  desc: string;
  struggle: string;
  color: string;
  glow: string;
  details: {
    quote: string;
    characteristics: string[];
    notableEvents: string[];
    funFact: string;
  };
}

const stages: StageData[] = [
  {
    id: "I",
    title: "Cộng Sản Nguyên Thủy",
    year: "TIỀN SỬ",
    icon: <Pickaxe size={24} />,
    desc: "Xã hội sơ khai. Bình đẳng dựa trên sự thiếu thốn. Chưa có tư hữu.",
    struggle: "Con người vs Thiên nhiên",
    color: "from-red-900/40 to-black",
    glow: "shadow-red-900/30",
    details: {
      quote: "Trong thời kỳ này, không có 'của tôi' và 'của anh', chỉ có 'của chúng ta'.",
      characteristics: [
        "Sở hữu chung về tư liệu sản xuất.",
        "Phân phối bình quân: Làm chung, hưởng chung.",
        "Tổ chức xã hội theo thị tộc, bộ lạc.",
        "Năng suất lao động cực thấp."
      ],
      notableEvents: [
        "Tìm ra lửa - bước ngoặt đầu tiên.",
        "Chế tác công cụ đá thô sơ.",
        "Săn bắt và hái lượm."
      ],
      funFact: "Đây là 'bình đẳng của sự nghèo nàn', khác hoàn toàn với sự thịnh vượng của CNXH hiện đại."
    }
  },
  {
    id: "II",
    title: "Chiếm Hữu Nô Lệ",
    year: "CỔ ĐẠI",
    icon: <Crown size={24} />,
    desc: "Tư hữu xuất hiện. Nhà nước ra đời. Nô lệ bị coi là 'công cụ biết nói'.",
    struggle: "Chủ nô vs Nô lệ",
    color: "from-yellow-900/40 to-black",
    glow: "shadow-yellow-700/30",
    details: {
      quote: "Nô lệ là những công cụ biết nói.",
      characteristics: [
        "Tư hữu triệt để về tư liệu sản xuất và con người.",
        "Bóc lột tàn bạo: Cưỡng bức lao động trực tiếp.",
        "Tách rời lao động trí óc và chân tay."
      ],
      notableEvents: [
        "Kim Tự Tháp (Ai Cập).",
        "Đế chế La Mã hưng thịnh.",
        "Khởi nghĩa Spartacus."
      ],
      funFact: "Sự bóc lột này trớ trêu thay lại tạo điều kiện cho khoa học và nghệ thuật cổ đại phát triển rực rỡ."
    }
  },
  {
    id: "III",
    title: "Phong Kiến",
    year: "TRUNG ĐẠI",
    icon: <Sword size={24} />,
    desc: "Nền kinh tế nông nghiệp. Nông dân lệ thuộc vào ruộng đất của địa chủ.",
    struggle: "Địa chủ vs Nông dân",
    color: "from-red-950/60 to-black",
    glow: "shadow-red-800/30",
    details: {
      quote: "Không có mảnh đất nào không có chúa đất.",
      characteristics: [
        "Sở hữu ruộng đất của địa chủ.",
        "Bóc lột qua địa tô (lao dịch, hiện vật, tiền).",
        "Kinh tế tự cung tự cấp, khép kín."
      ],
      notableEvents: [
        "Đêm trường Trung cổ Châu Âu.",
        "Các triều đại phong kiến phương Đông.",
        "Sự thống trị của thần quyền giáo hội."
      ],
      funFact: "Thương nhân thời kỳ này bị coi rẻ ('Sĩ, Nông, Công, Thương') nhưng chính họ đã phá vỡ trật tự này."
    }
  },
  {
    id: "IV",
    title: "Tư Bản Chủ Nghĩa",
    year: "CẬN - HIỆN ĐẠI",
    icon: <Factory size={24} />,
    desc: "Đại công nghiệp cơ khí. Bóc lột giá trị thặng dư dưới vỏ bọc tự do.",
    struggle: "Tư sản vs Vô sản",
    color: "from-blue-900/40 to-black",
    glow: "shadow-blue-900/30",
    details: {
      quote: "Tư bản đến thế gian, từ đầu đến chân, mọi lỗ chân lông đều rỉ máu và bùn nhơ.",
      characteristics: [
        "Sở hữu tư nhân TBCN về tư liệu sản xuất.",
        "Lao động làm thuê tự do về pháp lý.",
        "Bóc lột Giá trị thặng dư.",
        "Sản xuất hàng hóa, kinh tế thị trường."
      ],
      notableEvents: [
        "Các cuộc Cách mạng công nghiệp.",
        "Sự hình thành các tập đoàn đa quốc gia.",
        "Phong trào công nhân quốc tế."
      ],
      funFact: "CNTB tạo ra lượng của cải khổng lồ chưa từng có, nhưng cũng tạo ra hố sâu giàu nghèo lớn nhất lịch sử."
    }
  },
  {
    id: "V",
    title: "Cộng Sản Chủ Nghĩa",
    year: "TƯƠNG LAI",
    icon: <Rocket size={24} />,
    desc: "Xã hội không giai cấp. Làm theo năng lực, hưởng theo nhu cầu.",
    struggle: "Vương quốc Tự do",
    color: "from-red-600/40 to-black",
    glow: "shadow-red-500/50",
    details: {
      quote: "Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.",
      characteristics: [
        "Chế độ công hữu về tư liệu sản xuất.",
        "Nhà nước tự tiêu vong.",
        "Làm theo năng lực, hưởng theo nhu cầu.",
        "Con người giải phóng toàn diện."
      ],
      notableEvents: [
        "Dự báo khoa học về tương lai nhân loại.",
        "Cách mạng công nghiệp 4.0 và AI tạo tiền đề vật chất.",
        "Sự chuyển dịch dần dần sang kinh tế chia sẻ."
      ],
      funFact: "Lao động lúc này không còn là gánh nặng kiếm sống mà trở thành nhu cầu sáng tạo của con người."
    }
  },
];

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStage, setSelectedStage] = useState<StageData | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line Animation
      gsap.fromTo(".timeline-laser",
        { height: 0, opacity: 0 },
        {
          height: "100%",
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Card Stagger
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0, scale: 0.9 },
          {
            x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedStage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-red-900/30 -z-10"></div>
          <div className="inline-block bg-black px-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-red-500 font-bold tracking-[0.5em] text-xs uppercase animate-pulse">
                Lịch sử xã hội
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white text-glow">
                Hình Thái <span className="text-red-600">Vận Động</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Axis (Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-red-900/30"></div>
          <div className="timeline-laser absolute left-4 md:left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-red-600 via-red-500 to-red-900 shadow-[0_0_15px_#ff0000]"></div>

          <div className="space-y-16 md:space-y-24">
            {stages.map((stage, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={stage.id} className={`flex flex-col md:flex-row items-center w-full relative group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Card Content */}
                  <div className={`timeline-card w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div
                      onClick={() => setSelectedStage(stage)}
                      className={`relative p-6 md:p-8 border border-red-900/30 bg-black/60 backdrop-blur-sm cursor-pointer transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-950/10 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] rounded-sm overflow-hidden`}
                    >
                      {/* Decorative Corners */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                      {/* Scanline Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                      {/* Header Info */}
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className={`p-3 rounded border border-red-900 bg-black text-red-500 group-hover:text-white group-hover:bg-red-600 transition-colors duration-300 shadow-lg`}>
                          {stage.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-red-500 font-mono text-xs font-bold tracking-widest">
                            Giai đoạn {stage.id}
                          </span>
                          <span className="text-white font-bold uppercase tracking-tight text-xl">
                            {stage.year}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 group-hover:text-red-500 transition-colors">
                        {stage.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                        {stage.desc}
                      </p>

                      <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 group-hover:text-red-400 transition-colors ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        Chi tiết hồ sơ <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center top-0 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-4 h-4 bg-black border-2 border-red-600 rounded-full group-hover:scale-150 transition-transform duration-300 relative">
                      <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-1/2 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal / Terminal Overlay */}
      {selectedStage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedStage(null)}></div>

          <div className="relative w-full max-w-5xl bg-black border border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-red-900/50 bg-red-950/20">
              <div className="flex items-center gap-3">
                <Hash className="text-red-600" size={20} />
                <div>
                  <span className="text-red-500 font-mono text-xs uppercase tracking-[0.2em] block">
                    Hồ sơ dữ liệu: {selectedStage.id}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase">
                    {selectedStage.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="p-2 hover:bg-red-600 hover:text-black text-red-600 transition-colors rounded-full border border-red-900/30"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Left Column: Core Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-transparent"></div>
                  <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Bản chất xã hội
                  </h4>
                  <p className="text-white text-lg leading-relaxed font-light">
                    {selectedStage.desc}
                  </p>
                </div>

                <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-sm relative">
                  <Quote className="absolute top-4 right-4 text-red-800 opacity-50" size={40} />
                  <p className="text-red-200 italic font-serif text-lg relative z-10">
                    "{selectedStage.details.quote}"
                  </p>
                </div>

                <div>
                  <div className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                    <Zap size={16} /> Mâu thuẫn chủ yếu
                  </div>
                  <div className="p-3 bg-red-950/50 border border-red-600 text-white font-bold uppercase text-center shadow-[0_0_15px_rgba(220,38,38,0.2)] animate-pulse">
                    {selectedStage.struggle}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Specs */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h4 className="text-white font-bold uppercase text-sm border-b border-red-900/50 pb-2 mb-4">
                    Đặc điểm đặc trưng
                  </h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedStage.details.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-red-600 mt-1">▹</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-black border border-red-900/30 p-4">
                    <h4 className="text-red-500 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                      <History size={14} /> Sự kiện điển hình
                    </h4>
                    <ul className="space-y-2">
                      {selectedStage.details.notableEvents.map((e, i) => (
                        <li key={i} className="text-xs text-gray-400 border-l border-red-900 pl-2">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 p-4">
                    <h4 className="text-red-400 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                      <Lightbulb size={14} /> Góc nhìn thú vị
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {selectedStage.details.funFact}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-red-900/30 bg-black text-center">
              <span className="text-[10px] text-red-600 font-mono uppercase tracking-[0.5em] animate-pulse">
                System Analysis Complete
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Timeline;