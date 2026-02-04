import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Bot, Users, Code, FileText, Brain, PenTool, Star, Target, Sparkles, X, BookOpen } from 'lucide-react';

// Thông tin thành viên
const teamMembers = [
  {
    id: 1,
    name: "Võ Thành Phát",
    mssv: "SE181767",
    role: "Frontend Developer",
    roleIcon: "code",
    image: "/anh/phat.jpg",
    isLeader: true,
    funFacts: [
      "🌙 Code đến 3h sáng là chuyện bình thường",
      "☕ Tiêu thụ 5 ly cà phê mỗi ngày trong quá trình làm dự án",
      "🎮 Vừa code vừa nghe nhạc Lo-Fi để tập trung",
      "💡 Nghĩ ra ý tưởng thiết kế web lúc... đang tắm"
    ],
    contribution: "Xây dựng toàn bộ giao diện web, animation GSAP, và tích hợp AI chatbot",
    quote: "Mỗi dòng code là một viên gạch xây nên ngôi nhà tri thức"
  },
  {
    id: 2,
    name: "Vy Anh",
    mssv: "SE181832",
    role: "Content Writer",
    roleIcon: "file",
    image: "/anh/vyanh.jpg",
    isLeader: false,
    funFacts: [
      "📚 Đọc hết 3 cuốn sách về triết học Mác-Lênin trong 1 tuần",
      "✍️ Viết lại nội dung 5 lần để đảm bảo chính xác",
      "🎯 Luôn đặt deadline trước 2 ngày để review",
      "🍵 Team trà sữa - không thể viết content mà không có trà sữa"
    ],
    contribution: "Biên soạn toàn bộ nội dung học thuật, câu hỏi quiz và giải thích khái niệm",
    quote: "Kiến thức chỉ có giá trị khi được truyền đạt dễ hiểu"
  },
  {
    id: 3,
    name: "Nguyễn Thái Nam",
    mssv: "SE181772",
    role: "UI/UX Designer",
    roleIcon: "pen",
    image: "/anh/nam.jpg",
    isLeader: false,
    funFacts: [
      "🎨 Thay đổi màu đỏ chủ đạo 15 lần trước khi chốt",
      "📱 Test giao diện trên 10 thiết bị khác nhau",
      "🖼️ Tìm kiếm hơn 200 hình ảnh để chọn ra những ảnh phù hợp nhất",
      "😴 Mơ thấy wireframe trong giấc ngủ"
    ],
    contribution: "Thiết kế UI/UX, chọn lựa hình ảnh và đảm bảo trải nghiệm người dùng mượt mà",
    quote: "Design tốt là khi người dùng không nhận ra có design"
  },
  {
    id: 4,
    name: "Lương Công Khoa",
    mssv: "SE181689",
    role: "Research & QA",
    roleIcon: "brain",
    image: "/anh/khoa.jpg",
    isLeader: false,
    funFacts: [
      "🔍 Fact-check mọi thông tin với ít nhất 3 nguồn tin cậy",
      "🐛 Tìm ra 47 bug trong quá trình test",
      "📊 Tạo spreadsheet theo dõi tiến độ chi tiết từng ngày",
      "🤓 Thành viên duy nhất đọc hết tài liệu hướng dẫn môn học"
    ],
    contribution: "Nghiên cứu tài liệu, kiểm tra độ chính xác nội dung và test toàn bộ chức năng",
    quote: "Chi tiết nhỏ tạo nên sự hoàn hảo lớn"
  }
];

interface TransparencyPageProps {
  onBack: () => void;
}

const TransparencyPage: React.FC<TransparencyPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".transparency-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".transparency-header", {
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
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 border border-red-900/50 text-red-500 hover:border-red-500 hover:text-white transition-all duration-300 rounded-full backdrop-blur-sm group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase text-xs tracking-wider">Quay lại</span>
      </button>

      {/* Header */}
      <header className="transparency-header text-center pt-20 pb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Bot size={400} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            Minh Bạch <span className="text-red-600">AI</span> & Tác Giả
          </h1>
          <p className="text-red-400/80 text-lg max-w-2xl mx-auto">
            Cam kết sử dụng AI có trách nhiệm và giới thiệu những người đứng sau dự án
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">

        {/* AI USAGE DECLARATION SECTION */}
        <section className="transparency-card grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 sticky top-32">
            <div className="text-6xl text-red-900/30 font-black absolute -top-10 -left-6 z-0">AI</div>
            <div className="relative z-10 border-l-4 border-red-600 pl-6">
              <div className="flex items-center gap-3 mb-2 text-red-400">
                <Bot size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">Minh Bạch</span>
              </div>
              <h2 className="text-3xl font-bold text-white uppercase leading-none mb-4">Sử Dụng AI</h2>
              <div className="text-xs text-red-500 font-mono">Cam kết có trách nhiệm</div>
            </div>
          </div>
          
          <div className="md:col-span-8 space-y-6">
            {/* Introduction */}
            <div className="bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Công cụ AI đã sử dụng</h3>
              <p className="text-red-100/80 leading-relaxed mb-6">
                Dự án này có sử dụng các công cụ AI hỗ trợ trong quá trình phát triển. Dưới đây là minh chứng chi tiết về việc sử dụng AI một cách có trách nhiệm và minh bạch.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Tool 1 */}
                <div className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-2">GitHub Copilot & Claude AI</strong>
                  <p className="text-red-100/70 text-sm mb-2">Hỗ trợ lập trình</p>
                  <ul className="text-sm text-stone-400 space-y-1">
                    <li>• Viết code React/TypeScript cho UI</li>
                    <li>• Debug và tối ưu hiệu suất</li>
                    <li>• Tích hợp animations GSAP</li>
                    <li>• Xây dựng chatbot với Groq API</li>
                  </ul>
                </div>
                
                {/* AI Tool 2 */}
                <div className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-red-400 block mb-2">ChatGPT & Gemini</strong>
                  <p className="text-red-100/70 text-sm mb-2">Hỗ trợ nội dung</p>
                  <ul className="text-sm text-stone-400 space-y-1">
                    <li>• Tổng hợp nội dung học thuật</li>
                    <li>• Tạo câu hỏi trắc nghiệm</li>
                    <li>• Giải thích khái niệm triết học</li>
                    <li>• Hiệu đính văn phong</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Ví dụ Prompt đã sử dụng</h3>
              
              <div className="space-y-4">
                <div className="bg-black/40 border border-red-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 text-xs font-bold uppercase">Prompt lập trình</span>
                  </div>
                  <p className="text-stone-300 text-sm font-mono bg-red-950/30 p-3 rounded border-l-2 border-red-600">
                    "Tạo component React Timeline hiển thị 5 hình thái kinh tế-xã hội với animation scroll, sử dụng GSAP và Tailwind CSS, phong cách dark theme đỏ-đen"
                  </p>
                </div>
                
                <div className="bg-black/40 border border-red-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 text-xs font-bold uppercase">Prompt nội dung</span>
                  </div>
                  <p className="text-stone-300 text-sm font-mono bg-red-950/30 p-3 rounded border-l-2 border-red-600">
                    "Giải thích ngắn gọn học thuyết giá trị thặng dư của Marx, bao gồm: định nghĩa, công thức, ý nghĩa lịch sử. Dùng ngôn ngữ dễ hiểu cho sinh viên đại học"
                  </p>
                </div>
                
                <div className="bg-black/40 border border-red-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 text-xs font-bold uppercase">Prompt quiz</span>
                  </div>
                  <p className="text-stone-300 text-sm font-mono bg-red-950/30 p-3 rounded border-l-2 border-red-600">
                    "Tạo 10 câu hỏi trắc nghiệm về chủ nghĩa duy vật biện chứng, mỗi câu 4 đáp án, có giải thích đáp án đúng. Độ khó: trung bình đến khó"
                  </p>
                </div>
              </div>
            </div>

            {/* Commitment Statement */}
            <div className="bg-red-950/10 border border-red-900/30 p-8 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-red-800 pb-2">Cam kết của nhóm</h3>
              <ul className="space-y-4 text-red-100/80 leading-relaxed">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-green-500 rounded-full"></span>
                  AI được sử dụng như <strong className="text-red-400">công cụ hỗ trợ</strong>, không thay thế tư duy sáng tạo và hiểu biết của nhóm
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-green-500 rounded-full"></span>
                  Tất cả nội dung đều được <strong className="text-red-400">kiểm tra, xác minh</strong> với tài liệu chính thống trước khi sử dụng
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-green-500 rounded-full"></span>
                  Nhóm <strong className="text-red-400">hiểu rõ code và nội dung</strong> được tạo ra, có khả năng giải thích và chỉnh sửa
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-green-500 rounded-full"></span>
                  <strong className="text-red-400">Minh bạch công khai</strong> việc sử dụng AI theo đúng quy định học thuật
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TEAM INFORMATION SECTION */}
        <section className="transparency-card">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl mb-6 border border-red-500/30">
              <Users className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Thành Viên <span className="text-red-500">Nhóm 4</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Những người đã cùng nhau xây dựng dự án học tập tương tác này. <span className="text-red-400">Nhấn vào ảnh để xem thêm!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`group relative cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 ${
                  member.isLeader 
                    ? 'bg-gradient-to-b from-red-950/40 to-black border border-red-900/50 hover:border-red-500/70 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
                    : 'bg-gradient-to-b from-stone-900/60 to-black border border-stone-800 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]'
                }`}
              >
                {member.isLeader && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase rounded-full border border-yellow-500/30">
                      Nhóm trưởng
                    </span>
                  </div>
                )}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 ${
                  member.isLeader ? 'shadow-lg shadow-red-900/50 border-red-600' : 'border-stone-600 group-hover:border-red-500'
                }`}>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-red-400 text-sm mb-3">MSSV: {member.mssv}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                  {member.roleIcon === 'code' && <Code className="w-3 h-3" />}
                  {member.roleIcon === 'file' && <FileText className="w-3 h-3" />}
                  {member.roleIcon === 'pen' && <PenTool className="w-3 h-3" />}
                  {member.roleIcon === 'brain' && <Brain className="w-3 h-3" />}
                  <span>{member.role}</span>
                </div>
                {/* Hover hint */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-red-400">Nhấn để xem chi tiết →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div className="mt-10 text-center p-6 bg-stone-950/50 rounded-xl border border-stone-800">
            <p className="text-stone-400 text-sm mb-2">
              <span className="text-white font-semibold">Môn học:</span> Chủ nghĩa xã hội khoa học
            </p>
            <p className="text-stone-400 text-sm mb-2">
              <span className="text-white font-semibold">Giảng viên hướng dẫn:</span> Thầy Hoàng Thắng - {' '}
              <a 
                href="mailto:thangh@fe.edu.vn" 
                className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
              >
                thangh@fe.edu.vn
              </a>
            </p>
            <p className="text-stone-400 text-sm">
              <span className="text-white font-semibold">Năm học:</span> 2025 - 2026
            </p>
          </div>
        </section>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="relative bg-gradient-to-b from-stone-900 to-black border border-red-900/50 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-900/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Leader badge */}
              {selectedMember.isLeader && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase rounded-full border border-yellow-500/30 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Nhóm trưởng
                </div>
              )}

              {/* Avatar large */}
              <div className="pt-12 pb-6 px-6 text-center border-b border-stone-800">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-600 shadow-xl shadow-red-900/30">
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-black text-white mb-1">{selectedMember.name}</h3>
                <p className="text-red-400 font-mono text-sm mb-2">MSSV: {selectedMember.mssv}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/50 rounded-full border border-red-900/50">
                  {selectedMember.roleIcon === 'code' && <Code className="w-4 h-4 text-red-400" />}
                  {selectedMember.roleIcon === 'file' && <FileText className="w-4 h-4 text-red-400" />}
                  {selectedMember.roleIcon === 'pen' && <PenTool className="w-4 h-4 text-red-400" />}
                  {selectedMember.roleIcon === 'brain' && <Brain className="w-4 h-4 text-red-400" />}
                  <span className="text-white font-semibold">{selectedMember.role}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Contribution */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Đóng góp cho dự án
                  </h4>
                  <p className="text-stone-300 leading-relaxed">{selectedMember.contribution}</p>
                </div>

                {/* Fun Facts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Chuyện hậu trường thú vị
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.funFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-stone-400 text-sm">
                        <span className="text-lg">{fact.split(' ')[0]}</span>
                        <span>{fact.substring(fact.indexOf(' ') + 1)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="pt-4 border-t border-stone-800">
                  <p className="text-center italic text-red-400">
                    "{selectedMember.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pb-12">
          <BookOpen size={48} className="mx-auto text-red-600 mb-6 animate-pulse" />
          <p className="text-red-400 italic">"Chủ nghĩa Mác không phải là một giáo điều, mà là kim chỉ nam cho hành động."</p>
        </div>

      </div>
    </div>
  );
};

export default TransparencyPage;
