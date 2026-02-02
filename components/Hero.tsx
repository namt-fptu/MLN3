import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Demo images - thay thế bằng ảnh phù hợp
const heroImages = {
  marx: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg",
  workers: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
  revolution: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
};

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Resize handling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(${200 + Math.random() * 55}, 0, 0, ${Math.random() * 0.5 + 0.2})`;
      }

      update(mouse: { x: number; y: number }) {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse attraction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          this.vx += dx * 0.0001;
          this.vy += dy * 0.0001;
        }

        // Boundary bounce
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / 100})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(mouse);
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // GSAP Intro
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 })
      .fromTo(textRef.current, 
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' }, 
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
      );

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      
      <div ref={textRef} className="relative z-10 text-center px-4 max-w-5xl mix-blend-screen">
        {/* Gallery ảnh các nhà tư tưởng */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-110 transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg" alt="Karl Marx" className="w-full h-full object-cover" />
          </div>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:scale-110 transition-transform mt-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Friedrich_Engels_portrait_%28cropped%29.jpg" alt="Friedrich Engels" className="w-full h-full object-cover" />
          </div>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:scale-110 transition-transform mt-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQubjEAobczJywnFKGFeASTbcmt0EB0zrRvA&s" alt="V.I. Lenin" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-red-600 mb-6 tracking-tighter text-glow animate-pulse-fast font-condensed uppercase">
          Đấu Tranh <br /> Giai Cấp
        </h1>
        <p className="text-xl md:text-3xl text-red-400 font-light border-l-4 border-red-600 pl-6 text-left">
          "Lịch sử của mọi xã hội cho đến nay là lịch sử đấu tranh giai cấp."
        </p>
        <p className="mt-8 text-sm md:text-base text-red-800 tracking-widest uppercase opacity-80 animate-glitch">
          Khám phá xã hội vận động
        </p>
        
        {/* Ảnh minh họa phong trào công nhân */}
        <div className="mt-10 flex justify-center gap-3">
          <div className="w-32 h-20 md:w-48 md:h-28 overflow-hidden rounded-lg border border-red-900/50 opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" alt="Đoàn kết" className="w-full h-full object-cover" />
          </div>
          <div className="w-32 h-20 md:w-48 md:h-28 overflow-hidden rounded-lg border border-red-900/50 opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400" alt="Lao động" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-red-600 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;