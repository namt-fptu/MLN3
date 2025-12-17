import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Trophy, RefreshCcw, Home, BarChart2 } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  total: number;
  categoryTitle: string;
  onRetry: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, categoryTitle, onRetry, onHome }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);

  const percentage = Math.round((score / total) * 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Entrance
        gsap.from(".result-item", {
            y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)"
        });

        // Circle Progress
        if (circleRef.current) {
            gsap.to(circleRef.current, {
                strokeDashoffset: strokeDashoffset,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5
            });
        }

        // Score Count Up
        if (scoreRef.current) {
            gsap.from(scoreRef.current, {
                textContent: 0,
                duration: 1.5,
                ease: "power1.out",
                snap: { textContent: 1 },
                stagger: 1,
            });
        }

    }, containerRef);
    return () => ctx.revert();
  }, [strokeDashoffset]);

  let message = "";
  if (percentage >= 80) message = "Xuất sắc! Bạn đã nắm vững kiến thức.";
  else if (percentage >= 50) message = "Khá tốt. Hãy ôn tập thêm để đạt điểm tối đa.";
  else message = "Cần cố gắng hơn. Hãy xem lại phần lý thuyết.";

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto px-4 py-12 text-center">
       <div className="result-item mb-8">
            <h3 className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2">Kết quả đánh giá</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">{categoryTitle}</h2>
       </div>

       <div className="result-item relative w-64 h-64 mx-auto mb-10 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <circle
                    cx="128" cy="128" r={radius}
                    stroke="#1a0505" strokeWidth="12" fill="none"
                />
                <circle
                    ref={circleRef}
                    cx="128" cy="128" r={radius}
                    stroke={percentage >= 50 ? "#dc2626" : "#7f1d1d"}
                    strokeWidth="12" fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference} // Start empty
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-white" ref={scoreRef}>{percentage}</span>
                <span className="text-red-500 text-xl font-bold">%</span>
            </div>
       </div>

       <div className="result-item mb-12 space-y-4">
            <div className="inline-block px-6 py-3 bg-red-950/20 border border-red-900 rounded-lg">
                <span className="text-red-400 font-bold uppercase text-sm">Điểm số: </span>
                <span className="text-white font-black text-xl ml-2">{score} / {total}</span>
            </div>
            <p className="text-red-200 text-lg italic max-w-md mx-auto">
                "{message}"
            </p>
       </div>

       <div className="result-item flex flex-col md:flex-row gap-4 justify-center">
            <button 
                onClick={onRetry}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-red-600 text-red-500 font-bold uppercase tracking-widest hover:bg-red-600 hover:text-black transition-all duration-300"
            >
                <RefreshCcw size={18} /> Thử lại
            </button>
            <button 
                onClick={onHome}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border border-white font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300"
            >
                <Home size={18} /> Chọn chủ đề khác
            </button>
       </div>
    </div>
  );
};

export default ResultScreen;