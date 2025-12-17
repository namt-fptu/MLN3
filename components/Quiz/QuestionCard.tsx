import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { Question } from './types';

interface QuestionCardProps {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentNumber, totalQuestions, onAnswer }) => {
  const [selected, setSelected] = useState<string | number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<boolean | null>(null); // New state to store result
  const cardRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setIsSubmitted(false);
    setInputValue('');
    setResult(null);

    // Entrance animation
    gsap.fromTo(cardRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // Stagger options
    gsap.fromTo(".option-btn",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, delay: 0.2 }
    );
  }, [question]);

  const handleSubmit = () => {
    if (isSubmitted) return;

    let isCorrect = false;

    if (question.type === 'fillBlank') {
      const normalize = (str: string) => str.toLowerCase().trim().replace(/[.,]/g, '');
      isCorrect = normalize(inputValue) === normalize(question.correctAnswer as string);
    } else {
      isCorrect = selected === question.correctAnswer;
    }

    setIsSubmitted(true);
    setResult(isCorrect); // Store the result

    // If incorrect fill-blank, show correct answer
    if (!isCorrect && question.type === 'fillBlank') {
      setInputValue(question.correctAnswer as string);
    }

    // Feedback Animation
    if (feedbackRef.current) {
      gsap.fromTo(feedbackRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    // Delay calling parent to allow user to read feedback
    // Parent will handle "Next" logic via a button in Feedback area or auto
  };

  const handleNext = () => {
    // use stored result if available, otherwise recalculate (fallback)
    let isCorrect = result;
    if (isCorrect === null) {
      if (question.type === 'fillBlank') {
        const normalize = (str: string) => str.toLowerCase().trim().replace(/[.,]/g, '');
        // Note: inputValue might have been replaced by correct answer, so this check might return true on next
        // That's why we MUST use the stored 'result' state which captured the logic at the moment of submission
        isCorrect = normalize(inputValue) === normalize(question.correctAnswer as string);
      } else {
        isCorrect = selected === question.correctAnswer;
      }
    }
    onAnswer(!!isCorrect);
  };

  // Render options based on type
  const renderOptions = () => {
    if (question.type === 'fillBlank') {
      return (
        <div className="mt-6 mb-8">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitted}
              placeholder="Nhập câu trả lời..."
              className={`w-full bg-black border-b-2 p-4 text-xl md:text-2xl font-mono focus:outline-none transition-colors
                  ${isSubmitted
                  ? (result /* Use stored result to color */ ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500')
                  : 'border-red-900 text-white focus:border-red-500'
                }
                `}
            />
            {/* Show label if corrected */}
            {isSubmitted && !result && (
              <span className="absolute right-0 top-0 text-xs text-red-500 font-bold uppercase tracking-wider">
                Đã hiển thị đáp án đúng
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3 mt-6 mb-8">
        {question.options?.map((opt, idx) => {
          let stateClass = "border-red-900/30 bg-black/50 hover:bg-red-900/10 hover:border-red-500 text-red-100";

          if (isSubmitted) {
            if (idx === question.correctAnswer) {
              stateClass = "bg-green-900/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
            } else if (idx === selected) {
              stateClass = "bg-red-900/20 border-red-500 text-red-400 opacity-50";
            } else {
              stateClass = "opacity-30 border-transparent";
            }
          } else if (selected === idx) {
            stateClass = "bg-red-600 border-red-600 text-black shadow-lg font-bold";
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && setSelected(idx)}
              disabled={isSubmitted}
              className={`option-btn w-full text-left p-4 md:p-5 border rounded-lg transition-all duration-200 flex items-center justify-between group ${stateClass}`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold uppercase
                    ${isSubmitted && idx === question.correctAnswer ? 'border-green-500 text-green-500' : 'border-red-900/50 text-red-500'}
                 `}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm md:text-base">{opt}</span>
              </div>
              {isSubmitted && idx === question.correctAnswer && <CheckCircle2 size={20} className="text-green-500" />}
              {isSubmitted && idx === selected && idx !== question.correctAnswer && <XCircle size={20} className="text-red-500" />}
            </button>
          );
        })}
      </div>
    );
  };

  const isBtnDisabled = !isSubmitted && (question.type === 'fillBlank' ? !inputValue.trim() : selected === null);

  return (
    <div ref={cardRef} className="w-full max-w-3xl mx-auto px-4 relative">
      {/* Card Container */}
      <div className="bg-black border border-red-900/50 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)] rounded-sm">
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600"></div>

        <div className="p-6 md:p-10 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-red-500 font-mono text-xs uppercase tracking-widest block mb-1">
                Câu hỏi {currentNumber} / {totalQuestions}
              </span>
              <div className="w-12 h-1 bg-red-600"></div>
            </div>
            {question.difficulty && (
              <span className={`text-[10px] uppercase px-2 py-1 rounded border font-bold
                       ${question.difficulty === 'easy' ? 'border-green-800 text-green-600' :
                  question.difficulty === 'medium' ? 'border-yellow-800 text-yellow-600' :
                    'border-red-800 text-red-600'}
                    `}>
                {question.difficulty}
              </span>
            )}
          </div>

          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
            {question.question}
          </h3>

          {/* Options */}
          {renderOptions()}

          {/* Action Button */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={isBtnDisabled}
              className={`w-full py-4 uppercase font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2
                        ${isBtnDisabled
                  ? 'bg-red-950/20 text-red-900 cursor-not-allowed border border-red-900/30'
                  : 'bg-red-600 text-black hover:bg-white border border-red-600 hover:shadow-[0_0_20px_#ef5350]'}
                    `}
            >
              Xác nhận
            </button>
          ) : (
            <div ref={feedbackRef} className="overflow-hidden">
              <div className={`p-4 border-l-4 mb-6 ${(result === true)
                ? 'border-green-500 bg-green-900/10'
                : 'border-red-500 bg-red-900/10'
                }`}>
                <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-widest">
                  <HelpCircle size={16} /> Giải thích
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {question.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Tiếp tục <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;