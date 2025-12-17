import React, { useEffect, useState, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import IntroSequence from './components/IntroSequence';
import MusicPlayer from './components/MusicPlayer';
import GuidingQuestion from './components/GuidingQuestion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ArrowUp } from 'lucide-react';

// Lazy load heavy components
const ScientificOrigins = lazy(() => import('./components/ScientificOrigins'));
const ConceptDecoder = lazy(() => import('./components/ConceptDecoder'));
const ConceptDependencyMap = lazy(() => import('./components/ConceptDependencyMap'));
const ContradictionMeter = lazy(() => import('./components/ContradictionMeter'));
const DialecticalFlow = lazy(() => import('./components/DialecticalFlow'));
const Timeline = lazy(() => import('./components/Timeline'));
const SocialSimulator = lazy(() => import('./components/SocialSimulator'));
const AnalysisComparison = lazy(() => import('./components/AnalysisComparison'));
const MythBreaker = lazy(() => import('./components/MythBreaker'));
const CollectiveFuture = lazy(() => import('./components/CollectiveFuture'));
const KnowledgeSummary = lazy(() => import('./components/KnowledgeSummary'));
const TextRealityMapper = lazy(() => import('./components/TextRealityMapper'));
const ContradictionAnalyzer = lazy(() => import('./components/ContradictionAnalyzer'));

// Register plugins globally
gsap.registerPlugin(ScrollTrigger);

const LoadingFallback = () => (
  <div className="w-full py-24 flex items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <Activity className="w-8 h-8 text-red-600 animate-pulse" />
      <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Đang tải dữ liệu...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'summary'>('home');
  const [showIntro, setShowIntro] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Global cursor effect for "Society in Motion" feel
    // Hide custom cursor on touch devices for performance and UX
    if (window.matchMedia("(pointer: fine)").matches) {
      const cursor = document.createElement('div');
      cursor.className = 'fixed w-4 h-4 bg-red-600 rounded-full pointer-events-none mix-blend-screen z-50 blur-sm hidden md:block transition-transform duration-75 will-change-transform';
      document.body.appendChild(cursor);

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 8,
          y: e.clientY - 8,
          duration: 0.1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', moveCursor);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        if (document.body.contains(cursor)) document.body.removeChild(cursor);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure scroll is reset when view changes
  useEffect(() => {
    if (!showIntro) {
      window.scrollTo(0, 0);
    }
  }, [view, showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasIntroRun', 'true');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  if (view === 'summary') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <KnowledgeSummary onBack={() => setView('home')} />
      </Suspense>
    );
  }

  return (
    <main className="bg-black min-h-screen text-red-500 font-sans selection:bg-red-900 selection:text-white relative">

      {/* 1. MỞ ĐẦU: ĐẶT VẤN ĐỀ (Eager Loaded) */}
      <Hero />

      <Suspense fallback={<LoadingFallback />}>
        {/* 2. NGUỒN GỐC: TẠI SAO CÓ LÝ LUẬN NÀY? */}
        <GuidingQuestion index={1} question="Những tư tưởng này bắt nguồn từ đâu?" />
        <ScientificOrigins />

        {/* 3. CẤU TRÚC: XÃ HỘI VẬN HÀNH THẾ NÀO? */}
        <GuidingQuestion index={2} question="Xã hội được cấu tạo bởi những yếu tố nào?" />
        <ConceptDecoder />

        {/* 3.1. HỆ THỐNG: MỐI QUAN HỆ BIỆN CHỨNG */}
        <GuidingQuestion index={3} question="Các yếu tố này tác động lẫn nhau ra sao?" />
        <ConceptDependencyMap />

        {/* 4. ĐỘNG LỰC: CÁI GÌ ĐẨY XÃ HỘI ĐI LÊN? */}
        <GuidingQuestion index={4} question="Đâu là động lực thúc đẩy sự thay đổi?" />
        <ContradictionMeter />

        {/* 5. QUY LUẬT: SỰ THAY ĐỔI DIỄN RA RA SAO? */}
        <GuidingQuestion index={5} question="Sự phát triển diễn ra theo con đường nào?" />
        <DialecticalFlow />

        {/* 6. LỊCH SỬ: CHỨNG MINH QUA THỜI GIAN */}
        <GuidingQuestion index={6} question="Lịch sử nhân loại đã chứng minh điều đó chưa?" />
        <Timeline />

        {/* 7. CƠ CHẾ: THỬ NGHIỆM */}
        <GuidingQuestion index={7} question="Cơ chế vận hành cụ thể là gì?" />
        <SocialSimulator />

        {/* 7.1. BÀI HỌC LỊCH SỬ: THÀNH CÔNG VÀ THẤT BẠI */}
        <GuidingQuestion index={8} question="Tại sao có nơi sụp đổ, có nơi đổi mới thành công?" />
        <AnalysisComparison />

        {/* 8. HIỆN ĐẠI: CÒN ĐÚNG KHÔNG? */}
        <GuidingQuestion index={9} question="Lý luận này có còn đúng trong kỷ nguyên số?" />
        <TextRealityMapper />

        {/* 9. PHÂN TÍCH SÂU: MÂU THUẪN MỚI */}
        <GuidingQuestion index={10} question="Mâu thuẫn ngày nay nằm ở đâu?" />
        <ContradictionAnalyzer />

        {/* 10. GIẢI ẢO: HIỂU ĐÚNG */}
        <GuidingQuestion index={11} question="Chúng ta có đang hiểu sai về nó?" />
        <MythBreaker />

        {/* 11. KẾT: ĐÍCH ĐẾN */}
        <GuidingQuestion index={12} question="Mục tiêu cuối cùng là gì?" />
        <CollectiveFuture onNavigate={() => setView('summary')} />
      </Suspense>

      {/* Back To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[60] w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group transition-all duration-500 ease-out ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ArrowUp className="text-white group-hover:text-red-600 transition-colors duration-300" size={24} />
      </button>

      {/* Music Player */}
      <MusicPlayer autoPlayTrigger={!showIntro} />

      {/* Floating Sticky Indicator */}
      <div className="fixed bottom-24 right-4 md:right-10 z-50 text-right opacity-80 mix-blend-difference pointer-events-none hidden md:block">
        <div className="text-xs text-red-500 uppercase tracking-widest mb-1">Trạng thái</div>
        <div className="text-sm font-bold text-white animate-pulse">ĐANG VẬN ĐỘNG</div>
      </div>
    </main>
  );
};

export default App;