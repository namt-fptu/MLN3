import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, BookOpen, Brain, TrendingUp, Globe } from 'lucide-react';
import QuizEngine from './Quiz/QuizEngine';
import PhilosopherWiki from './PhilosopherWiki';
import Dictionary from './Dictionary';

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
                  <strong className="text-red-400 block mb-1">Cải tạo Phép biện chứng (Hegel):</strong>
                  Mác loại bỏ "vỏ thần bí" (duy tâm khách quan) của Hegel, giữ lại "hạt nhân hợp lý" (tư tưởng biện chứng) để xây dựng <strong>Phép biện chứng duy vật</strong>. Ông coi biện chứng là quy luật vận động của bản thân vật chất, chứ không phải của "Ý niệm tuyệt đối".
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Cải tạo Chủ nghĩa duy vật (Feuerbach):</strong>
                  Khắc phục tính chất siêu hình và trực quan của Feuerbach. Mác xây dựng quan điểm duy vật triệt để: không chỉ giải thích thế giới (như các triết gia trước kia) mà vấn đề là <em>cải tạo thế giới</em> (Luận cương về Feuerbach).
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Sáng tạo CNDV Lịch sử:</strong>
                  Phát hiện vĩ đại nhất: Quy luật về sự phù hợp giữa QHSX và LLSX; Giác ngộ về vai trò quyết định của Tồn tại xã hội đối với Ý thức xã hội.
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
                  <strong className="text-red-400 block mb-1">Học thuyết giá trị lao động (Smith & Ricardo):</strong>
                  Kế thừa quan điểm: Lao động là thước đo giá trị hàng hóa. Tuy nhiên, Mác đã phát hiện ra <em className="text-white">Tính hai mặt của lao động sản xuất hàng hóa</em> (Lao động cụ thể & Lao động trừu tượng) - chìa khóa giải quyết các bế tắc mà Smith/Ricardo gặp phải.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Học thuyết Giá trị thặng dư (M):</strong>
                  "Hòn đá tảng" của học thuyết kinh tế Mác. Chứng minh: Lợi nhuận của nhà tư bản không sinh ra từ lưu thông, mà từ việc chiếm đoạt lao động không được trả công của công nhân. Vạch trần bản chất bóc lột tinh vi của CNTB.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-1">Quy luật kinh tế:</strong>
                  Phân tích các quy luật: Giá trị, Cung - Cầu, Cạnh tranh, và Xu hướng tỷ suất lợi nhuận giảm xuống, dự báo sự diệt vong tất yếu của phương thức sản xuất TBCN.
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
                    Không phát hiện ra lực lượng xã hội tiên phong (Giai cấp công nhân); chủ trương con đường ôn hòa, thuyết phục (kể cả thuyết phục giai cấp thống trị) thay vì đấu tranh cách mạng (Đường lối cải lương).
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4 border-t border-red-900/30 pt-4">
                <div className="text-sm text-red-100/80">
                  <strong className="text-red-400">Saint-Simon:</strong> Nhận ra lịch sử là quá trình quy luật; giai cấp là vấn đề kinh tế.
                </div>
                <div className="text-sm text-red-100/80">
                  <strong className="text-red-400">Charles Fourier:</strong> Phê phán gay gắt sự "vô chính phủ" của công nghiệp; dự báo về quyền phụ nữ.
                </div>
                <div className="text-sm text-red-100/80">
                  <strong className="text-red-400">Robert Owen:</strong> Thực nghiệm xã hội "công xưởng kiểu mẫu"; xóa bỏ tư hữu (dù còn hạn chế).
                </div>
                <div className="mt-6 pt-4 border-t border-red-900/30">
                  <strong className="text-white block mb-1">Đóng góp của Mác - Ăngghen:</strong>
                  Biến CNXH từ <em>Không tưởng</em> trở thành <em>Khoa học</em> bằng việc phát hiện ra Sứ mệnh lịch sử của giai cấp công nhân.
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Philosopher Wiki Section */}
        <div className="summary-card mb-24">
          <PhilosopherWiki />
        </div>

        {/* Dictionary Section */}
        <div className="max-w-7xl mx-auto px-6 pb-20 animate-fadeIn stagger-3">
          <Dictionary />
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