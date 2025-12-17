import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pickaxe, Crown, Factory, Users, Rocket, Sword } from 'lucide-react';

const stages = [
  { 
    id: "I", 
    title: "Cộng Sản Nguyên Thủy", 
    icon: <Pickaxe size={32} />,
    desc: "Xã hội chưa có giai cấp. Tư liệu sản xuất thuộc về chung. Mọi người làm chung, hưởng chung.",
    struggle: "Không có đối kháng giai cấp",
    opponents: ["Con người", "Thiên nhiên"] 
  },
  { 
    id: "II", 
    title: "Chiếm Hữu Nô Lệ", 
    icon: <Crown size={32} />,
    desc: "Hình thái xã hội có giai cấp đầu tiên. Người nô lệ bị coi là 'công cụ biết nói'.",
    struggle: "Mâu thuẫn gay gắt về thân xác",
    opponents: ["Chủ nô", "Nô lệ"] 
  },
  { 
    id: "III", 
    title: "Phong Kiến", 
    icon: <Sword size={32} />,
    desc: "Nền kinh tế dựa trên ruộng đất. Người nông dân bị lệ thuộc vào đất đai của địa chủ.",
    struggle: "Chiếm hữu ruộng đất & tô thuế",
    opponents: ["Địa chủ", "Nông dân"] 
  },
  { 
    id: "IV", 
    title: "Tư Bản Chủ Nghĩa", 
    icon: <Factory size={32} />,
    desc: "Nền sản xuất đại công nghiệp. Người lao động tự do về thân thể nhưng phải bán sức lao động.",
    struggle: "Bóc lột Giá trị thặng dư",
    opponents: ["Tư sản", "Vô sản"] 
  },
  { 
    id: "V", 
    title: "Cộng Sản Chủ Nghĩa", 
    icon: <Rocket size={32} />,
    desc: "Xã hội phát triển cao. Xóa bỏ tư hữu. Làm theo năng lực, hưởng theo nhu cầu.",
    struggle: "Giải phóng toàn nhân loại",
    opponents: ["Tự do", "Tất cả"] 
  },
];

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Calculate the total width to scroll
      // We subtract window.innerWidth to stop exactly when the last card is in view
      const getScrollAmount = () => {
        let trackWidth = trackRef.current?.scrollWidth || 0;
        return -(trackWidth - window.innerWidth);
      };

      // 2. Create the horizontal scroll tween
      const tween = gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          start: "top top",
          end: () => `+=${trackRef.current?.scrollWidth || 3000}`, // Dynamic end point based on content width
          invalidateOnRefresh: true, // Recalculate on resize
        }
      });
      
      // 3. Animate cards individually as they enter the viewport horizontally
      // LINKING: containerAnimation property must point to the horizontal scrolling tween
      gsap.utils.toArray(".timeline-card").forEach((card: any, i) => {
        gsap.fromTo(card.querySelector('.card-content'), 
          { 
            scale: 0.8,
            opacity: 0.5,
            filter: 'blur(5px)'
          },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                containerAnimation: tween, // CRITICAL FIX: Link to the horizontal tween
                start: "left center+=200", // Trigger a bit earlier
                toggleActions: "play reverse play reverse",
                id: `card-${i}`
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-black overflow-hidden flex flex-col justify-center relative border-t border-red-900/30">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="absolute top-8 left-4 md:left-8 z-10 pointer-events-none">
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter text-glow">
           Tiến Trình <span className="text-red-600">Lịch Sử</span>
        </h3>
        <p className="text-red-500 font-mono text-[10px] md:text-xs tracking-widest mt-2">// SỰ THAY THẾ CÁC HÌNH THÁI KINH TẾ - XÃ HỘI</p>
      </div>
      
      {/* Scroll Track - Added will-change-transform for performance */}
      <div ref={trackRef} className="flex px-10 md:px-20 space-x-10 md:space-x-40 w-max items-center h-full pt-12 md:pt-0 will-change-transform">
        {stages.map((stage, i) => (
          <div key={i} className="timeline-card relative w-[85vw] md:w-[600px] group flex-shrink-0">
            {/* Connector Line */}
            {i < stages.length - 1 && (
                <div className="absolute top-1/2 left-[100%] w-10 md:w-40 h-0.5 bg-red-900 group-hover:bg-red-600 transition-colors duration-500 -z-10" />
            )}

            {/* Main Card Content - Targeted by GSAP */}
            <div className="card-content bg-black border border-red-900/50 p-6 md:p-12 relative overflow-hidden transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_50px_rgba(220,38,38,0.2)]">
               {/* Giant Background Number */}
               <span className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 text-[120px] md:text-[200px] font-black text-red-950/30 select-none transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">
                 {stage.id}
               </span>

               <div className="relative z-10">
                 {/* Header */}
                 <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-red-950 border-2 border-red-600 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-black transition-colors duration-300 shadow-lg">
                        {stage.icon}
                    </div>
                    <div>
                        <h4 className="text-2xl md:text-4xl font-black text-white uppercase leading-none mb-2">{stage.title}</h4>
                        <div className="w-12 md:w-20 h-1 bg-red-600"></div>
                    </div>
                 </div>

                 {/* Description */}
                 <p className="text-base md:text-xl text-red-200 font-light leading-relaxed mb-6 md:mb-8 border-l-4 border-red-900 pl-4 md:pl-6 group-hover:border-red-500 transition-colors">
                    {stage.desc}
                 </p>

                 {/* Analysis Box */}
                 <div className="bg-red-900/10 border border-red-900/30 p-4 md:p-6 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center justify-between">
                        <div>
                            <span className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1">Mâu thuẫn cơ bản</span>
                            <span className="text-white text-sm md:text-base font-bold">{stage.struggle}</span>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-red-900/50"></div>
                        <div>
                            <span className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1">Đối kháng giai cấp</span>
                            <div className="flex items-center gap-2 text-white text-sm md:text-base font-bold">
                                <span>{stage.opponents[0]}</span>
                                <Sword size={14} className="text-red-600" />
                                <span>{stage.opponents[1]}</span>
                            </div>
                        </div>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Timeline Node */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full box-glow group-hover:scale-150 transition-transform duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;