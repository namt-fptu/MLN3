import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, BookOpen, Brain, TrendingUp, Globe, Calendar, AlertTriangle, Flag, Star, Milestone, Shield, Users, Target, Sparkles } from 'lucide-react';
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

          {/* Section 4: Historical Events */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">04</div>
              <div className="relative z-10 border-l-4 border-yellow-500 pl-6">
                <div className="flex items-center gap-3 mb-2 text-yellow-400">
                  <Calendar size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Lịch Sử</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Sự Kiện Quan Trọng</h2>
                <div className="text-xs text-yellow-500 font-mono">Các mốc son của phong trào XHCN</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-yellow-950/10 border border-yellow-900/30 p-8 hover:border-yellow-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-yellow-800 pb-2">Dòng thời gian lịch sử</h3>
              <div className="space-y-6">
                {/* Timeline Event */}
                <div className="relative pl-8 border-l-2 border-yellow-600/50 pb-6">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -translate-x-[9px] shadow-[0_0_10px_#eab308]"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 font-black text-lg">1848</span>
                    <span className="text-white font-bold">Tuyên ngôn của Đảng Cộng sản</span>
                  </div>
                  <p className="text-red-100/70 text-sm">Mác và Ăngghen công bố văn kiện lịch sử, <strong className="text-white">đánh dấu sự ra đời của CNXH khoa học</strong>. Khẩu hiệu: <strong className="text-yellow-300">"Vô sản toàn thế giới, liên hiệp lại!"</strong></p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-yellow-600/50 pb-6">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -translate-x-[9px] shadow-[0_0_10px_#eab308]"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 font-black text-lg">1871</span>
                    <span className="text-white font-bold">Công xã Paris</span>
                  </div>
                  <p className="text-red-100/70 text-sm"><strong className="text-white">Nhà nước vô sản đầu tiên trong lịch sử</strong> (tồn tại 72 ngày). Bài học quý: <strong className="text-yellow-300">đập tan bộ máy nhà nước tư sản</strong> và xây dựng chính quyền kiểu mới.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-yellow-600/50 pb-6">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-red-500 rounded-full -translate-x-[9px] shadow-[0_0_10px_#ef4444]"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-red-400 font-black text-lg">1917</span>
                    <span className="text-white font-bold">Cách mạng Tháng Mười Nga</span>
                  </div>
                  <p className="text-red-100/70 text-sm">Lênin lãnh đạo giai cấp công nhân Nga giành chính quyền. <strong className="text-white">Mở ra thời đại mới</strong> - <strong className="text-red-300">thời đại quá độ từ CNTB lên CNXH trên phạm vi toàn thế giới</strong>.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-yellow-600/50 pb-6">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -translate-x-[9px] shadow-[0_0_10px_#eab308]"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 font-black text-lg">1930</span>
                    <span className="text-white font-bold">Đảng Cộng sản Việt Nam ra đời</span>
                  </div>
                  <p className="text-red-100/70 text-sm"><strong className="text-white">Nguyễn Ái Quốc</strong> sáng lập Đảng, mở ra bước ngoặt của cách mạng Việt Nam: <strong className="text-yellow-300">kết hợp chủ nghĩa Mác-Lênin với phong trào công nhân và phong trào yêu nước</strong>.</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-yellow-600/50">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full -translate-x-[9px] shadow-[0_0_10px_#eab308]"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 font-black text-lg">1945</span>
                    <span className="text-white font-bold">Cách mạng Tháng Tám</span>
                  </div>
                  <p className="text-red-100/70 text-sm">Nhân dân Việt Nam dưới sự lãnh đạo của Đảng giành chính quyền, lập nên <strong className="text-white">nước Việt Nam Dân chủ Cộng hòa</strong> - <strong className="text-yellow-300">nhà nước công nông đầu tiên ở Đông Nam Á</strong>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Criticism of Wrong Views */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">05</div>
              <div className="relative z-10 border-l-4 border-orange-500 pl-6">
                <div className="flex items-center gap-3 mb-2 text-orange-400">
                  <Shield size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Phê Phán</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Quan Điểm Sai Trái</h2>
                <div className="text-xs text-orange-500 font-mono">Bảo vệ nền tảng tư tưởng</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-orange-950/10 border border-orange-900/30 p-8 hover:border-orange-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-orange-800 pb-2">Luận điểm phản bác</h3>
              <div className="space-y-6">
                
                {/* Wrong View 1 */}
                <div className="bg-black/40 rounded-lg p-5 border border-orange-900/30">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-orange-400 font-bold mb-1">"Chủ nghĩa Mác đã lỗi thời"</h4>
                      <p className="text-gray-500 text-xs italic">Quan điểm phủ nhận giá trị của CNMLN</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <p className="text-red-100/80 text-sm mb-2"><strong className="text-green-400">Phản bác:</strong></p>
                    <ul className="text-red-100/70 text-sm space-y-1 list-disc list-inside">
                      <li><strong className="text-white">Phương pháp luận biện chứng duy vật</strong> vẫn là công cụ nhận thức khoa học</li>
                      <li>Các mâu thuẫn mà Mác phân tích (<strong className="text-white">bất bình đẳng, khủng hoảng kinh tế</strong>...) vẫn tồn tại</li>
                      <li>Học thuyết được <strong className="text-white">bổ sung, phát triển</strong> (Lênin, Hồ Chí Minh) phù hợp thời đại mới</li>
                    </ul>
                  </div>
                </div>

                {/* Wrong View 2 */}
                <div className="bg-black/40 rounded-lg p-5 border border-orange-900/30">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-orange-400 font-bold mb-1">"CNXH sụp đổ ở Liên Xô chứng minh CNXH thất bại"</h4>
                      <p className="text-gray-500 text-xs italic">Quan điểm phủ nhận con đường XHCN</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <p className="text-red-100/80 text-sm mb-2"><strong className="text-green-400">Phản bác:</strong></p>
                    <ul className="text-red-100/70 text-sm space-y-1 list-disc list-inside">
                      <li>Sụp đổ do <strong className="text-white">sai lầm chủ quan</strong> (giáo điều, quan liêu), <strong className="text-orange-300">không phải bản chất CNXH</strong></li>
                      <li><strong className="text-white">Trung Quốc, Việt Nam, Cuba</strong>... vẫn kiên định và phát triển thành công</li>
                      <li>Bài học: <strong className="text-white">Đổi mới sáng tạo</strong>, tránh giáo điều và cải lương</li>
                    </ul>
                  </div>
                </div>

                {/* Wrong View 3 */}
                <div className="bg-black/40 rounded-lg p-5 border border-orange-900/30">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-orange-400 font-bold mb-1">"Đấu tranh giai cấp là kích động thù hận"</h4>
                      <p className="text-gray-500 text-xs italic">Quan điểm xuyên tạc lý luận đấu tranh giai cấp</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <p className="text-red-100/80 text-sm mb-2"><strong className="text-green-400">Phản bác:</strong></p>
                    <ul className="text-red-100/70 text-sm space-y-1 list-disc list-inside">
                      <li>Đấu tranh giai cấp là <strong className="text-white">quy luật khách quan</strong> của xã hội có giai cấp, không phải "kích động"</li>
                      <li>Mục đích: <strong className="text-white">xóa bỏ áp bức bóc lột</strong>, hướng tới xã hội không còn giai cấp</li>
                      <li>Trong thời kỳ quá độ ở VN: đấu tranh chủ yếu thông qua <strong className="text-white">phát triển kinh tế, hoàn thiện pháp luật</strong></li>
                    </ul>
                  </div>
                </div>

                {/* Wrong View 4 */}
                <div className="bg-black/40 rounded-lg p-5 border border-orange-900/30">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-orange-400 font-bold mb-1">"Việt Nam nên đa nguyên đa đảng"</h4>
                      <p className="text-gray-500 text-xs italic">Quan điểm đòi xóa bỏ vai trò lãnh đạo của Đảng</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <p className="text-red-100/80 text-sm mb-2"><strong className="text-green-400">Phản bác:</strong></p>
                    <ul className="text-red-100/70 text-sm space-y-1 list-disc list-inside">
                      <li>Sự lãnh đạo của Đảng là <strong className="text-white">sự lựa chọn của lịch sử</strong>, được nhân dân tín nhiệm</li>
                      <li><strong className="text-orange-300">Đa đảng không đồng nghĩa với dân chủ</strong> (nhiều nước đa đảng vẫn độc tài)</li>
                      <li>Dân chủ XHCN: <strong className="text-white">"Dân biết, dân bàn, dân làm, dân kiểm tra, dân thụ hưởng"</strong></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 6: Vietnam's Path to Socialism */}
          <section className="summary-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">06</div>
              <div className="relative z-10 border-l-4 border-red-500 pl-6">
                <div className="flex items-center gap-3 mb-2 text-red-400">
                  <Flag size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Việt Nam</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Con Đường CNXH</h2>
                <div className="text-xs text-red-500 font-mono">Đặc sắc Việt Nam trong thời đại mới</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-red-950/20 border border-red-700/50 p-8 hover:border-red-500 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-red-600 pb-2 flex items-center gap-3">
                <Star className="text-yellow-400" size={20} />
                Mô hình CNXH Việt Nam
              </h3>
              
              {/* Core Characteristics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-red-400" size={18} />
                    <span className="text-white font-bold text-sm">Mục tiêu</span>
                  </div>
                  <p className="text-red-100/70 text-sm"><strong className="text-yellow-300">Dân giàu, nước mạnh, dân chủ, công bằng, văn minh</strong></p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-red-400" size={18} />
                    <span className="text-white font-bold text-sm">Động lực</span>
                  </div>
                  <p className="text-red-100/70 text-sm"><strong className="text-white">Đại đoàn kết toàn dân tộc</strong>, kết hợp sức mạnh dân tộc với sức mạnh thời đại</p>
                </div>
              </div>

              {/* 8 Characteristics */}
              <h4 className="text-red-400 font-bold uppercase text-xs tracking-widest mb-4">8 Đặc trưng của CNXH ở Việt Nam</h4>
              <div className="space-y-3 mb-8">
                {[
                  "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
                  "Do nhân dân làm chủ",
                  "Có nền kinh tế phát triển cao dựa trên LLSX hiện đại và QHSX tiến bộ phù hợp",
                  "Có nền văn hóa tiên tiến, đậm đà bản sắc dân tộc",
                  "Con người có cuộc sống ấm no, tự do, hạnh phúc, phát triển toàn diện",
                  "Các dân tộc trong cộng đồng VN bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển",
                  "Có Nhà nước pháp quyền XHCN của dân, do dân, vì dân do Đảng Cộng sản lãnh đạo",
                  "Có quan hệ hữu nghị và hợp tác với các nước trên thế giới"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">{idx + 1}</span>
                    <span className="text-red-100/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Key Policies */}
              <h4 className="text-red-400 font-bold uppercase text-xs tracking-widest mb-4">Đường lối Đổi mới (từ 1986)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-b from-red-950/50 to-black/50 rounded-lg border border-red-900/30">
                  <Milestone className="text-yellow-400 mx-auto mb-2" size={28} />
                  <h5 className="text-white font-bold text-sm mb-1">Kinh tế thị trường</h5>
                  <p className="text-red-100/60 text-xs">Định hướng XHCN, nhiều thành phần kinh tế</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-red-950/50 to-black/50 rounded-lg border border-red-900/30">
                  <Globe className="text-yellow-400 mx-auto mb-2" size={28} />
                  <h5 className="text-white font-bold text-sm mb-1">Hội nhập quốc tế</h5>
                  <p className="text-red-100/60 text-xs">Đa phương hóa, đa dạng hóa quan hệ</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-red-950/50 to-black/50 rounded-lg border border-red-900/30">
                  <Sparkles className="text-yellow-400 mx-auto mb-2" size={28} />
                  <h5 className="text-white font-bold text-sm mb-1">Xây dựng Đảng</h5>
                  <p className="text-red-100/60 text-xs">Trong sạch, vững mạnh, chống tham nhũng</p>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-6 p-5 bg-gradient-to-r from-yellow-950/30 to-red-950/30 rounded-lg border border-yellow-700/30">
                <p className="text-yellow-200 italic text-center">
                  "Đi lên chủ nghĩa xã hội là khát vọng của nhân dân ta, là sự lựa chọn đúng đắn của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh, phù hợp với xu thế phát triển của lịch sử."
                </p>
                <p className="text-yellow-500 text-xs text-center mt-2 font-mono">— Văn kiện Đại hội XIII</p>
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