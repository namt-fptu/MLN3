import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

interface GuidingQuestionProps {
  question: string;
  index: number;
}

const GuidingQuestion: React.FC<GuidingQuestionProps> = ({ question, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(".connector-line", 
        { height: 0, opacity: 0 },
        { 
          height: "100%", 
          opacity: 1, 
          duration: 1, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Text reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-24 md:py-32 bg-black flex flex-col items-center justify-center relative z-20 overflow-hidden">
       {/* Narrative Axis Line */}
       <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-red-900/50 to-transparent h-full"></div>
       
       {/* Animated Connector */}
       <div className="connector-line absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-red-600 to-transparent h-0 shadow-[0_0_10px_#ff0000]"></div>

       <div className="relative z-10 text-center px-4 max-w-4xl bg-black/80 backdrop-blur-sm py-8 border-y border-red-900/10">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block animate-pulse">
             Câu hỏi dẫn đường 0{index}
          </span>
          
          <h3 ref={textRef} className="text-2xl md:text-4xl font-light text-white leading-tight">
             "{question}"
          </h3>

          <div className="mt-6 flex justify-center">
             <ChevronDown className="text-red-600 animate-bounce opacity-50" size={20} />
          </div>
       </div>
    </div>
  );
};

export default GuidingQuestion;