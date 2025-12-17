export type QuestionType = 'multiple' | 'trueFalse' | 'fillBlank' | 'matching';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // Cho multiple choice
  correctAnswer: string | number; // Index cho multiple, string cho fillBlank
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Category {
  id: string;
  title: string;
  icon: string; // Emoji hoặc Lucide icon name
  description: string;
  questions: Question[];
}

export interface UserProgress {
  [categoryId: string]: {
    attempts: number;
    bestScore: number;
    lastAttempt: string; // ISO Date string
    completed: boolean;
  }
}

export interface QuizState {
  view: 'categories' | 'quiz' | 'result';
  activeCategory: string | null;
  currentQuestionIndex: number;
  score: number;
  answers: boolean[]; // Mảng lưu kết quả đúng/sai của từng câu
  showFeedback: boolean; // Hiển thị giải thích sau khi trả lời
  selectedAnswer: string | number | null; // Câu trả lời tạm thời của user
}