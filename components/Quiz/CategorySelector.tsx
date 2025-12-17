import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Brain, Repeat, Layers, BookOpen, Globe, User, Lock, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Category, UserProgress } from './types';

interface CategorySelectorProps {
  categories: Category[];
  userProgress: UserProgress;
  onSelect: (categoryId: string) => void;
}

const iconMap: Record<string, any> = {
  Brain, Repeat, Layers, BookOpen, Globe, User
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, userProgress, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".category-card", 
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "back.out(1.2)" 
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 text-glow">
          Trung Tâm <span className="text-red-600">Huấn Luyện</span>
        </h2>
        <p className="text-red-400 font-mono text-sm max-w-2xl mx-auto opacity-80">
          // CHỌN MÔ-ĐUN KIẾN THỨC ĐỂ BẮT ĐẦU KIỂM TRA NĂNG LỰC
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const progress = userProgress[cat.id] || { attempts: 0, bestScore: 0, completed: false };
          const Icon = iconMap[cat.icon] || Brain;
          const isMastered = progress.bestScore >= cat.questions.length && progress.bestScore > 0;
          const percent = Math.round((progress.bestScore / cat.questions.length) * 100) || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="category-card group relative overflow-hidden bg-black border border-red-900/50 p-6 rounded-xl hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] text-left flex flex-col h-full"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className={`p-4 rounded-lg bg-red-950/30 border border-red-900/50 group-hover:bg-red-600 group-hover:text-black transition-colors duration-300 ${isMastered ? 'text-green-500 border-green-900' : 'text-red-500'}`}>
                  <Icon size={32} />
                </div>
                {isMastered ? (
                  <div className="flex items-center gap-1 text-green-500 text-xs font-bold uppercase tracking-wider bg-green-950/30 px-2 py-1 rounded border border-green-900">
                    <CheckCircle2 size={14} /> Mastered
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500/50 text-xs font-bold uppercase tracking-wider group-hover:text-red-500 transition-colors">
                    {progress.attempts > 0 ? 'In Progress' : 'Locked'}
                  </div>
                )}
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold text-white uppercase mb-2 group-hover:text-red-500 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className={isMastered ? 'text-green-500' : 'text-red-400'}>
                    Hoàn thành: {percent}%
                  </span>
                  <span className="text-gray-500">{cat.questions.length} Questions</span>
                </div>
                <div className="w-full h-1.5 bg-red-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isMastered ? 'bg-green-500' : 'bg-red-600'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>

              {/* Hover Effect: Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full bg-red-600/20 hover:bg-red-600 hover:border-red-600 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <PlayCircle /> Bắt đầu
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;