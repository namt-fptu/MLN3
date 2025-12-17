import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pickaxe, Crown, Factory, Users, Rocket, Sword, History, ArrowRight } from 'lucide-react';

const stages = [
  {
    id: "I",
    title: "Cộng Sản Nguyên Thủy",
    year: "Thời Tiền Sử",
    icon: <Pickaxe size={48} />,
    desc: "Xã hội sơ khai, mọi người cùng làm cùng hưởng. Chưa có tư hữu, chưa có giai cấp.",
    struggle: "Con người vs Thiên nhiên",
    color: "from-stone-500 to-stone-800"
  },
  {
    id: "II",
    title: "Chiếm Hữu Nô Lệ",
    year: "Cổ Đại",
    icon: <Crown size={48} />,
    desc: "Sự xuất hiện của tư hữu. Xã hội phân chia thành chủ nô và nô lệ. Bắt đầu cuộc đấu tranh giai cấp.",
    struggle: "Chủ nô vs Nô lệ",
    color: "from-yellow-600 to-yellow-900"
  },
  {
    id: "III",
    title: "Phong Kiến",
    year: "Trung Đại",
    icon: <Sword size={48} />,
    desc: "Kinh tế dựa trên ruộng đất. Nông dân lệ thuộc vào địa chủ phong kiến.",
    struggle: "Địa chủ vs Nông dân",
    color: "from-red-900 to-black"
  },
  {
    id: "IV",
    title: "Tư Bản Chủ Nghĩa",
    year: "Cận - Hiện Đại",
    icon: <Factory size={48} />,
    desc: "Nền đại công nghiệp cơ khí. Người lao động tự do nhưng bị bóc lột giá trị thặng dư.",
    struggle: "Tư sản vs Vô sản",
    color: "from-blue-900 to-slate-900"
  },
  {
    id: "V",
    title: "Cộng Sản Chủ Nghĩa",
    year: "Tương Lai",
    icon: <Rocket size={48} />,
    desc: "Xã hội không còn giai cấp. Làm theo năng lực, hưởng theo nhu cầu. Tự do hoàn toàn.",
    struggle: "Vương quốc của Tự do",
    color: "from-red-600 to-red-900"
  },
];

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const getScrollWidth = () => track.scrollWidth - window.innerWidth;

        // Main horizontal scroll tween
        const scrollTween = gsap.to(track, {
          x: () => -getScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollWidth() + 500}`,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });

        // Focus effect: Scale & Opacity linked to horizontal position
        const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
        const totalCards = cards.length;

        cards.forEach((card, index) => {
          const cardInner = card.querySelector(".card-inner") as HTMLElement;
          if (!cardInner) return;

          const isLastCard = index === totalCards - 1;

          // Create a scrubbed timeline for the "bell curve" effect
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: isLastCard ? "center center" : "right 20%", // Last card ends at center
              scrub: true,
            }
          });

          // Phase 1: Entering - Fade In & Scale Up
          tl.fromTo(cardInner,
            { scale: 0.75, opacity: 0.3, filter: 'blur(5px)' },
            { scale: 1.05, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power2.out" }
          );

          // Phase 2: Exiting - Only for non-last cards
          if (!isLastCard) {
            tl.to(cardInner,
              { scale: 0.75, opacity: 0.3, filter: 'blur(5px)', duration: 1, ease: "power2.in" }
            );
          }
        });
      });

      // Mobile: Vertical Stack (Default CSS handles this, GSAP mostly for simple fade-ins)
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col pt-20 md:pt-0">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Header */}
      <div className="md:absolute top-10 left-10 z-20 mb-10 px-6 md:px-0">
        <div className="flex items-center gap-3 mb-2 text-red-600">
          <History size={24} />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Lịch sử xã hội loài người</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-500">
          Tiến Trình <br /> <span className="text-red-600">Vận Động</span>
        </h2>
      </div>

      {/* Connection Line (Desktop) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-red-900/30 -translate-y-1/2 z-0"></div>

      {/* Scroll Track */}
      <div ref={trackRef} className="flex flex-col md:flex-row md:h-screen md:items-center px-6 md:px-0 pb-20 md:pb-0 gap-10 md:gap-0">
        {/* Padding-left for desktop to push first card */}
        <div className="hidden md:block w-[30vw] flex-shrink-0"></div>

        {stages.map((stage, i) => (
          <div key={i} className="timeline-card group relative flex-shrink-0 md:w-[70vw] lg:w-[60vw] md:px-10 w-full flex items-center justify-center">

            {/* Card Content */}
            <div className="card-inner relative bg-stone-950/80 backdrop-blur-xl border border-red-900/20 md:border-l border-t md:border-t-0 p-8 md:p-12 rounded-2xl md:rounded-none overflow-hidden transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_100px_rgba(220,38,38,0.15)]">
              {/* Decorative Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>

              {/* Top Meta */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="bg-red-950/50 border border-red-900/30 px-3 py-1 rounded-full text-xs font-mono text-red-400 uppercase tracking-widest">
                  Giai đoạn {stage.id}
                </div>
                <span className="text-4xl md:text-6xl font-black text-stone-800 group-hover:text-red-900/50 transition-colors duration-500">{stage.year}</span>
              </div>

              {/* Main Body */}
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                {/* Icon Area */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-black to-red-950 border border-red-900 flex items-center justify-center text-red-500 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {stage.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold uppercase mb-4 text-white group-hover:text-red-500 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-stone-400 text-lg leading-relaxed mb-6 border-l-2 border-stone-800 pl-4">
                    {stage.desc}
                  </p>

                  {/* Struggle Box */}
                  <div className="inline-flex items-center gap-3 bg-red-600/10 px-4 py-3 rounded border border-red-600/20">
                    <span className="text-xs uppercase text-red-500 font-bold tracking-wider">Mâu thuẫn:</span>
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      {stage.struggle} <ArrowRight size={14} className="text-red-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Node Point (Desktop) */}
            <div className="hidden md:absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-[50vh] bg-gradient-to-t from-transparent via-red-900/50 to-transparent -z-10 group-hover:via-red-600/50 transition-colors"></div>
            <div className="hidden md:block absolute top-[calc(50%-6px)] left-0 w-3 h-3 bg-stone-900 border border-red-900 rounded-full z-10 group-hover:bg-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,1)] transition-all"></div>
          </div>
        ))}

        {/* Padding-right for desktop - Extra space for last card to fully focus */}
        <div className="hidden md:block w-[50vw] flex-shrink-0"></div>
      </div>
    </section>
  );
};

export default Timeline;