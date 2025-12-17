import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen } from 'lucide-react';

interface CollectiveFutureProps {
  onNavigate: () => void;
}

const CollectiveFuture: React.FC<CollectiveFutureProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {x: number, y: number, r: number, tx: number, ty: number}[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for(let i=0; i<800; i++) {
        // Start randomly
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            // Target center in a circle
            tx: centerX + (Math.random() - 0.5) * 300,
            ty: centerY + (Math.random() - 0.5) * 300
        });
    }

    let frameId: number;
    let progress = 0; // 0 to 1 based on scroll

    const render = () => {
        if(!ctx) return;
        ctx.fillStyle = 'rgba(0,0,0,0.1)'; // Trail effect
        ctx.fillRect(0,0, canvas.width, canvas.height);

        ctx.fillStyle = '#ef5350';
        
        particles.forEach(p => {
            // Lerp towards target based on global progress
            const currentTx = p.x + (p.tx - p.x) * (progress * 0.1);
            const currentTy = p.y + (p.ty - p.y) * (progress * 0.1);
            
            // Jitter for life
            p.x += (Math.random() - 0.5) + (p.tx - p.x) * 0.02 * progress;
            p.y += (Math.random() - 0.5) + (p.ty - p.y) * 0.02 * progress;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        frameId = requestAnimationFrame(render);
    }

    render();

    const ctxGsap = gsap.context(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            onUpdate: (self) => {
                progress = self.progress;
            }
        });

        gsap.from(textRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "center 70%",
            },
            scale: 2,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "expo.out"
        });

    }, containerRef);

    return () => {
        cancelAnimationFrame(frameId);
        ctxGsap.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div ref={textRef} className="relative z-10 max-w-4xl text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter text-glow">
            Tương Lai <span className="text-red-600">Tập Thể</span>
        </h2>
        <p className="text-xl md:text-2xl text-red-200 font-light leading-relaxed mb-10">
          “Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.”
        </p>
        
        <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <button 
                onClick={onNavigate}
                className="relative flex items-center gap-3 px-8 py-4 bg-black border border-red-600 text-red-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
            >
                <BookOpen size={20} className="animate-pulse" />
                Tổng Hợp Kiến Thức Lý Luận
            </button>
        </div>
      </div>
    </section>
  );
};

export default CollectiveFuture;