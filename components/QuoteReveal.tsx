import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuoteReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const quote = "Không phải ý thức của con người quyết định tồn tại của họ, mà chính tồn tại xã hội quyết định ý thức của họ.";
  const words = quote.split(' ');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[50vh] bg-black flex items-center justify-center py-20 px-4 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center max-w-5xl">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordsRef.current[i] = el; }}
            className="inline-block mx-1 text-red-500 hover:text-red-300 hover:scale-110 transition-transform duration-300 cursor-default"
          >
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
};

export default QuoteReveal;