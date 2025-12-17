import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, BookOpen, Brain, TrendingUp, Globe } from 'lucide-react';
import QuizEngine from './Quiz/QuizEngine';
import PhilosopherWiki from './PhilosopherWiki';

interface KnowledgeSummaryProps {
  onBack: () => void;
}

const KnowledgeSummary: React.FC<KnowledgeSummaryProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for sections
      gsap.from(".summary-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // Header animation
      gsap.from(".summary-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-red-500 p-6 md:p-12 relative overflow-x-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #500000 0%, transparent 70%)' }} 
      />

      {/* Navigation - Fixed Position */}
      <button 
        onClick={onBack}
        className="summary-header fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md border border-red-600 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm group shadow-[0_0_20px_rgba(220,38,38,0.2)] rounded-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Quay về trải nghiệm
      </button>

      <div className="max-w-6xl mx-auto pt-16 md:pt-12">
        <header className="summary-header mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 text-glow">
            Tổng Hợp <span className="text-red-600">Kiến Thức</span>
          </h1>
          <p className="text-xl text-red-400 font-mono border-y border-red-900/50 py-4 inline-block">
            // HỆ THỐNG LÝ LUẬN & ĐÁNH GIÁ NĂNG LỰC
          </p>
        </header>

        <div className="space-y-24 mb-24">
          
          {/* Section 1: German Philosophy */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">01</div>
              <div className="relative z-10 border-l-4 border-red-600 pl-6">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <Brain size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Triết học</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Cổ Điển Đức</h2>
                <div className="text-xs text-red-500 font-mono">Đại biểu: Hegel & Feuerbach</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Nội dung kế thừa & cải tạo</h3>
              <ul className="space-y-6 text-red-100/80 leading-relaxed">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Phép biện chứng của Hegel:</strong>
                  Mác kế thừa "hạt nhân hợp lý" là tư tưởng về sự vận động và phát triển thông qua các mâu thuẫn. Mác loại bỏ "vỏ thần bí" (duy tâm) để xây dựng nên <em className="text-white">Phép biện chứng duy vật</em>.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Chủ nghĩa duy vật của Feuerbach:</strong>
                  Mác kế thừa chủ nghĩa duy vật vô thần, nhưng khắc phục tính chất siêu hình và thụ động, từ đó xây dựng quan điểm duy vật triệt để về cả tự nhiên và xã hội.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: British Economy */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">02</div>
              <div className="relative z-10 border-l-4 border-red-600 pl-6">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <TrendingUp size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Kinh tế</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Chính Trị Anh</h2>
                <div className="text-xs text-red-500 font-mono">Đại biểu: Adam Smith & David Ricardo</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Bước chuyển cách mạng</h3>
              <ul className="space-y-6 text-red-100/80 leading-relaxed">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Học thuyết giá trị lao động:</strong>
                  Các nhà kinh tế cổ điển đã chứng minh lao động là nguồn gốc của giá trị. Tuy nhiên, họ chưa thấy được tính hai mặt của lao động sản xuất hàng hóa.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Học thuyết Giá trị thặng dư (Mác):</strong>
                  Trên cơ sở kế thừa, Mác đã tìm ra quy luật kinh tế tuyệt đối của CNTB. Ông chỉ rõ: Tư bản không chỉ là tiền, mà là quan hệ xã hội. Sự bóc lột không phải do gian lận thương mại, mà nằm ngay trong quá trình sản xuất.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Utopian Socialism */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">03</div>
              <div className="relative z-10 border-l-4 border-red-600 pl-6">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <Globe size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Xã Hội</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">CNXH Không Tưởng</h2>
                <div className="text-xs text-red-500 font-mono">Đại biểu: Saint-Simon, Fourier, Owen</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Giá trị & Hạn chế lịch sử</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">Giá trị lịch sử</h4>
                   <p className="text-red-100/80 text-sm">
                     Phê phán sâu sắc xã hội tư bản đầy bất công; dự báo thiên tài về xã hội tương lai (xóa bỏ sự đối lập giữa lao động trí óc và chân tay, giải phóng phụ nữ...).
                   </p>
                </div>
                <div>
                   <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">Hạn chế căn bản</h4>
                   <p className="text-red-100/80 text-sm">
                     Không phát hiện ra lực lượng xã hội tiên phong (Giai cấp công nhân); chủ trương con đường ôn hòa, thuyết phục thay vì đấu tranh cách mạng.
                   </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-red-900/30">
                 <strong className="text-white block mb-1">Đóng góp của Mác - Ăngghen:</strong>
                 Biến CNXH từ <em>Không tưởng</em> trở thành <em>Khoa học</em> bằng việc phát hiện ra Sứ mệnh lịch sử của giai cấp công nhân.
              </div>
            </div>
          </section>

        </div>

        {/* Philosopher Wiki Section */}
        <div className="summary-card mb-24">
            <PhilosopherWiki />
        </div>
        
        {/* NEW QUIZ SYSTEM INTEGRATION */}
        <div className="summary-card mt-24">
            <QuizEngine />
        </div>

        <div className="mt-24 text-center">
            <BookOpen size={48} className="mx-auto text-red-600 mb-6 animate-pulse" />
            <p className="text-red-400 italic">"Chủ nghĩa Mác không phải là một giáo điều, mà là kim chỉ nam cho hành động."</p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSummary;