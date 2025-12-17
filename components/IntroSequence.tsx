import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Activity, Terminal, ShieldAlert, ArrowRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Phase refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Intro finished naturally, waiting for user input at step 4
        }
      });
      tlRef.current = tl;

      // --- PHASE 1: SYSTEM BOOT ---
      tl.to(terminalRef.current, { opacity: 1, duration: 0.1 })
        .fromTo(".terminal-line",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.3, duration: 0.1 }
        )
        .to(".terminal-cursor", { opacity: 0, repeat: 3, yoyo: true, duration: 0.1 })
        .to(terminalRef.current, { opacity: 0, duration: 0.2, delay: 0.5, onComplete: () => setStep(2) });

      // --- PHASE 2: CONTRADICTION DETECTION ---
      tl.addLabel("phase2")
        .set(scanRef.current, { opacity: 1 })
        .fromTo(".scan-text", { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .fromTo(".scan-bar-fill",
          { width: "0%" },
          { width: "100%", duration: 1.5, ease: "power2.inOut" }
        )
        // Shake effect during scan
        .to(containerRef.current, {
          x: 2, y: 2, duration: 0.05, repeat: 20, yoyo: true, ease: "none"
        }, "<")
        .to(".scan-alert", { opacity: 1, duration: 0.1, repeat: 3, yoyo: true })
        .to(scanRef.current, { opacity: 0, scale: 1.1, duration: 0.3, delay: 0.2, onComplete: () => setStep(3) });

      // --- PHASE 3: QUOTE ASSEMBLY ---
      tl.addLabel("phase3")
        .set(quoteRef.current, { opacity: 1 })
        .from(".quote-word", {
          opacity: 0,
          scale: 3,
          x: () => (Math.random() - 0.5) * 500,
          y: () => (Math.random() - 0.5) * 500,
          rotation: () => (Math.random() - 0.5) * 90,
          stagger: 0.05,
          duration: 0.8,
          ease: "expo.out"
        })
        .to(".highlight-word", {
          color: "#ff0000",
          textShadow: "0 0 20px #ff0000",
          scale: 1.2,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
        .to(quoteRef.current, { opacity: 0, y: -50, duration: 0.5, delay: 1.5, onComplete: () => setStep(4) });

      // --- PHASE 4: ENTRY GATE ---
      tl.addLabel("phase4")
        .set(entryRef.current, { opacity: 1 })
        .fromTo(".entry-circle",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)" }
        )
        .from(".entry-text", { y: 20, opacity: 0, duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkip = () => {
    if (step < 4 && tlRef.current) {
      tlRef.current.seek("phase4"); // Jump to end of animation
      setStep(4);
    }
  };

  const handleEnter = () => {
    // Exit animation
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "power2.in",
      onComplete: onComplete
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black text-red-500 font-mono flex items-center justify-center overflow-hidden cursor-none">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #300 25%, #300 26%, transparent 27%, transparent 74%, #300 75%, #300 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #300 25%, #300 26%, transparent 27%, transparent 74%, #300 75%, #300 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
      </div>

      {/* --- PHASE 1: BOOT --- */}
      <div ref={terminalRef} className={`absolute inset-0 flex flex-col items-center justify-center ${step !== 1 ? 'hidden' : ''}`}>
        <div className="w-full max-w-lg p-8">
          <div className="flex items-center gap-2 mb-4 opacity-50">
            <Terminal size={16} />
            <span className="text-xs">SYSTEM_BOOT_SEQ_V.18.48</span>
          </div>
          <div className="space-y-2 text-sm md:text-base">
            <div className="terminal-line text-green-500">{'>'} KẾT NỐI MÁY CHỦ LỊCH SỬ... [OK]</div>
            <div className="terminal-line text-red-500">{'>'} KHỞI ĐỘNG CHỦ NGHĨA DUY VẬT... [OK]</div>
            <div className="terminal-line text-white">{'>'} ĐANG TẢI DỮ LIỆU ĐẤU TRANH GIAI CẤP...</div>
            <div className="terminal-line flex items-center gap-2">
              {'>'} KÍCH HOẠT MÔ-ĐUN PHÂN TÍCH <span className="w-2 h-4 bg-red-600 terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHASE 2: SCAN --- */}
      <div ref={scanRef} className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 ${step === 2 ? 'opacity-100' : 'pointer-events-none'}`}>
        <Activity size={64} className="text-red-600 animate-pulse mb-8" />
        <h2 className="scan-text text-2xl font-black uppercase tracking-widest mb-4">Đang Quét Cấu Trúc Xã Hội</h2>

        <div className="w-64 h-2 bg-red-950 rounded-full overflow-hidden mb-2 relative border border-red-900">
          <div className="scan-bar-fill h-full bg-red-600 absolute top-0 left-0"></div>
        </div>

        <div className="flex justify-between w-64 text-xs font-bold uppercase">
          <span>Ổn định</span>
          <span className="scan-alert text-red-500 opacity-0">Nguy cơ xung đột cao</span>
        </div>
      </div>

      {/* --- PHASE 3: QUOTE --- */}
      <div ref={quoteRef} className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 px-4 ${step === 3 ? 'opacity-100' : 'pointer-events-none'}`}>
        <div className="max-w-4xl text-center leading-snug">
          {"Các nhà triết học đã chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới.".split(" ").map((word, i) => (
            <span key={i} className={`quote-word inline-block mx-1 md:mx-2 text-2xl md:text-5xl font-black uppercase ${word.toLowerCase().includes('cải') || word.toLowerCase().includes('tạo') ? 'highlight-word text-white' : 'text-red-700'}`}>
              {word}
            </span>
          ))}
        </div>
        <div className="mt-8 text-red-500 font-mono text-xs opacity-50 tracking-[0.5em]">KARL MARX - 1845</div>
      </div>

      {/* --- PHASE 4: ENTRY --- */}
      <div ref={entryRef} className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 ${step === 4 ? 'opacity-100' : 'pointer-events-none'}`}>
        <div className="relative group cursor-pointer" onClick={handleEnter}>
          {/* Pulsing Circles */}
          <div className="entry-circle absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="entry-circle absolute inset-0 bg-red-600 rounded-full blur-md opacity-40 animate-ping"></div>

          <button className="entry-circle relative w-64 h-64 border border-red-600 bg-black rounded-full flex flex-col items-center justify-center gap-4 hover:bg-red-950/30 transition-colors duration-300 group">
            <ShieldAlert size={48} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-center">
              <div className="text-xs text-red-500 font-bold uppercase tracking-widest mb-1">Hệ thống sẵn sàng</div>
              <div className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-red-500 transition-colors text-glow">
                Truy Cập
              </div>
            </div>
          </button>
        </div>

        <div className="entry-text mt-12 flex items-center gap-2 text-red-500/50 text-xs uppercase tracking-[0.3em] animate-pulse">
          Click để bước vào cuộc đấu tranh <ArrowRight size={12} />
        </div>
      </div>

      {/* Skip Button */}
      {step < 4 && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-[10px] text-red-900 hover:text-red-500 uppercase tracking-widest font-bold border border-red-900/50 px-3 py-1 rounded hover:bg-red-900/20 transition-all z-50"
        >
          [ Skip Intro ]
        </button>
      )}
    </div>
  );
};

export default IntroSequence;