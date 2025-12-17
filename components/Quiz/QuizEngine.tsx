import React, { useState, useEffect, useRef } from 'react';
import CategorySelector from './CategorySelector';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import { quizCategories } from './quizData';
import { QuizState, UserProgress } from './types';
import { LayoutDashboard } from 'lucide-react';

const STORAGE_KEY = 'cnxh_quiz_progress_v1';

const QuizEngine: React.FC = () => {
  // --- STATE ---
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [view, setView] = useState<'categories' | 'quiz' | 'result'>('categories');
  const containerRef = useRef<HTMLDivElement>(null);

  // --- EFFECTS ---
  
  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUserProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Save progress helper
  const saveProgress = (catId: string, finalScore: number) => {
    setUserProgress(prev => {
        const current = prev[catId] || { attempts: 0, bestScore: 0, lastAttempt: '', completed: false };
        const updated = {
            ...prev,
            [catId]: {
                attempts: current.attempts + 1,
                bestScore: Math.max(current.bestScore, finalScore),
                lastAttempt: new Date().toISOString(),
                completed: finalScore === quizCategories.find(c => c.id === catId)?.questions.length
            }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    });
  };

  // --- HANDLERS ---

  const handleSelectCategory = (catId: string) => {
    setActiveCatId(catId);
    setQIndex(0);
    setScore(0);
    setView('quiz');
    
    // Scroll to container view with offset adjustment instead of top of page
    setTimeout(() => {
        if (containerRef.current) {
            const yOffset = -100; // Offset for fixed header/breathing room
            const element = containerRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, 100);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
        setScore(prev => prev + 1);
    }

    const activeCategory = quizCategories.find(c => c.id === activeCatId);
    if (!activeCategory) return;

    if (qIndex < activeCategory.questions.length - 1) {
        // Move to next question after delay is handled by QuestionCard's "Next" button click
        // But here we simply update index instantly as QuestionCard calls this on "Next"
        setQIndex(prev => prev + 1);
    } else {
        // Finish
        const finalScore = isCorrect ? score + 1 : score;
        saveProgress(activeCatId!, finalScore);
        setView('result');
    }
  };

  const handleRetry = () => {
    setQIndex(0);
    setScore(0);
    setView('quiz');
  };

  const handleHome = () => {
    setActiveCatId(null);
    setView('categories');
  };

  // --- RENDER ---

  const activeCategory = quizCategories.find(c => c.id === activeCatId);

  return (
    <div ref={containerRef} className="w-full min-h-[600px] bg-black/50 border border-red-900/30 rounded-xl relative overflow-hidden backdrop-blur-sm transition-all duration-500">
      {/* Top Bar Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>
      
      {view === 'categories' && (
        <CategorySelector 
            categories={quizCategories}
            userProgress={userProgress}
            onSelect={handleSelectCategory}
        />
      )}

      {view === 'quiz' && activeCategory && (
        <div className="py-8 animate-fadeIn">
            <div className="flex justify-between items-center px-4 max-w-3xl mx-auto mb-6">
                 <button onClick={handleHome} className="text-red-500 text-xs font-bold uppercase hover:text-white transition-colors">
                    &larr; Thoát
                 </button>
                 <div className="text-red-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                    <LayoutDashboard size={14} /> {activeCategory.title}
                 </div>
            </div>
            
            {/* Progress Bar Top */}
            <div className="w-full h-1 bg-red-950 absolute top-0 left-0 z-50">
                <div 
                    className="h-full bg-red-600 transition-all duration-300 ease-out"
                    style={{ width: `${((qIndex) / activeCategory.questions.length) * 100}%` }}
                ></div>
            </div>

            <QuestionCard 
                question={activeCategory.questions[qIndex]}
                currentNumber={qIndex + 1}
                totalQuestions={activeCategory.questions.length}
                onAnswer={handleAnswer}
            />
        </div>
      )}

      {view === 'result' && activeCategory && (
        <ResultScreen 
            score={score}
            total={activeCategory.questions.length}
            categoryTitle={activeCategory.title}
            onRetry={handleRetry}
            onHome={handleHome}
        />
      )}
    </div>
  );
};

export default QuizEngine;