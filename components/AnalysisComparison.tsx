import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { History, AlertTriangle, CheckCircle2, BarChart3, Globe2, Shield, HeartHandshake, TrendingUp, Search, XCircle, Filter } from 'lucide-react';

type CaseStatus = 'failure' | 'success' | 'developing' | 'reference';

interface CaseStudy {
  id: string;
  name: string;
  type: string;
  period: string;
  status: CaseStatus;
  icon: React.ReactNode;
  desc: string;
  metrics: { label: string; value: number; color: string }[];
  matrix: {
    strengths: string;
    weaknesses: string;
  };
}

const cases: CaseStudy[] = [
  {
    id: 'ussr',
    name: "Liên Xô",
    type: "Mô hình Cũ",
    period: "1922 - 1991",
    status: "failure",
    icon: <History size={24} />,
    desc: "Mô hình đầu tiên, đạt thành tựu vĩ đại nhưng sụp đổ do chủ quan duy ý chí, cơ chế tập trung quan liêu bao cấp kéo dài.",
    metrics: [
      { label: "Vai trò Nhà nước", value: 100, color: "bg-red-600" },
      { label: "Động lực Kinh tế", value: 20, color: "bg-red-900" },
      { label: "Bình đẳng Xã hội", value: 85, color: "bg-red-500" },
    ],
    matrix: {
        strengths: "Công nghiệp hóa thần tốc, Chiến thắng phát xít, Giáo dục & Y tế miễn phí toàn dân.",
        weaknesses: "Triệt tiêu tư hữu cực đoan, thiếu hàng hóa tiêu dùng, kìm hãm sáng tạo cá nhân."
    }
  },
  {
    id: 'china',
    name: "Trung Quốc",
    type: "Đặc sắc TQ",
    period: "1978 - Nay",
    status: "success",
    icon: <Globe2 size={24} />,
    desc: "Kỳ tích kinh tế nhờ kết hợp Kinh tế thị trường với sự lãnh đạo tuyệt đối của Đảng (CNXH đặc sắc Trung Quốc).",
    metrics: [
      { label: "Vai trò Nhà nước", value: 90, color: "bg-red-600" },
      { label: "Động lực Kinh tế", value: 98, color: "bg-yellow-500" },
      { label: "Bình đẳng Xã hội", value: 50, color: "bg-red-800" },
    ],
    matrix: {
        strengths: "Tăng trưởng thần tốc, xóa đói giảm nghèo quy mô lớn, hạ tầng siêu hiện đại, KH-CN hàng đầu.",
        weaknesses: "Phân hóa giàu nghèo sâu sắc, ô nhiễm môi trường, áp lực dân số và việc làm."
    }
  },
  {
    id: 'vietnam',
    name: "Việt Nam",
    type: "Đổi Mới",
    period: "1986 - Nay",
    status: "success",
    icon: <TrendingUp size={24} />,
    desc: "Kinh tế thị trường định hướng XHCN. Mục tiêu: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
    metrics: [
      { label: "Vai trò Nhà nước", value: 85, color: "bg-red-600" },
      { label: "Động lực Kinh tế", value: 85, color: "bg-green-500" },
      { label: "Bình đẳng Xã hội", value: 75, color: "bg-green-600" },
    ],
    matrix: {
        strengths: "Chính trị ổn định, hội nhập quốc tế sâu rộng, đời sống nhân dân liên tục cải thiện.",
        weaknesses: "Nguy cơ tụt hậu kinh tế, tham nhũng lãng phí, nguy cơ 'chệch hướng' XHCN."
    }
  },
  {
    id: 'cuba',
    name: "Cuba",
    type: "Kiên định",
    period: "1959 - Nay",
    status: "developing",
    icon: <Shield size={24} />,
    desc: "Biểu tượng của sự kiên định. Giữ vững ngọn cờ đầu của CNXH ở Tây bán cầu bất chấp cấm vận bao vây.",
    metrics: [
      { label: "Vai trò Nhà nước", value: 95, color: "bg-red-600" },
      { label: "Động lực Kinh tế", value: 30, color: "bg-red-900" },
      { label: "Bình đẳng Xã hội", value: 95, color: "bg-blue-500" },
    ],
    matrix: {
        strengths: "Hệ thống Y tế & Giáo dục hàng đầu thế giới (xuất khẩu bác sĩ), tinh thần quốc tế vô sản.",
        weaknesses: "Kinh tế chậm phát triển do cấm vận và cơ chế cũ, thiếu thốn hàng hóa thiết yếu."
    }
  },
  {
    id: 'sweden',
    name: "Thụy Điển",
    type: "Tham chiếu",
    period: "Hiện đại",
    status: "reference",
    icon: <HeartHandshake size={24} />,
    desc: "Mô hình Bắc Âu (Social Democracy): Kinh tế tư bản nhưng phân phối theo định hướng phúc lợi xã hội cao.",
    metrics: [
      { label: "Vai trò Nhà nước", value: 40, color: "bg-blue-600" },
      { label: "Động lực Kinh tế", value: 90, color: "bg-green-500" },
      { label: "Bình đẳng Xã hội", value: 90, color: "bg-green-400" },
    ],
    matrix: {
        strengths: "Chỉ số hạnh phúc cao, minh bạch, tự do kinh doanh kết hợp an sinh toàn diện.",
        weaknesses: "Thuế thu nhập cá nhân rất cao (có thể >50%), già hóa dân số, áp lực quỹ phúc lợi."
    }
  }
];

const AnalysisComparison: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState('china');
  const [filter, setFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const activeData = cases.find(c => c.id === activeCaseId) || cases[1];

  const filteredCases = cases.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'success') return c.status === 'success';
    if (filter === 'failure') return c.status === 'failure';
    if (filter === 'other') return c.status === 'developing' || c.status === 'reference';
    return true;
  });

  const handleCaseChange = (id: string) => {
    if (id === activeCaseId) return;
    
    gsap.to(".case-detail", {
        opacity: 0,
        x: 20,
        duration: 0.2,
        onComplete: () => {
            setActiveCaseId(id);
            gsap.to(".case-detail", { opacity: 1, x: 0, duration: 0.3, clearProps: "all" });
            // Re-animate bars
            gsap.fromTo(".metric-bar-fill", 
                { width: 0 }, 
                { width: "var(--width-target)", duration: 0.6, ease: "power2.out", stagger: 0.1 }
            );
        }
    });
  };

  useEffect(() => {
     // Animate list items when filter changes
     gsap.fromTo(".case-item", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 }
     );
  }, [filter]);

  return (
    <section ref={containerRef} className="py-24 bg-black border-y border-red-900/30 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background World Map Effect */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #500000 0%, transparent 60%)' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="flex items-center gap-2 text-red-500 font-bold tracking-[0.3em] text-xs uppercase mb-2">
                    <Search size={12} /> Case Study Explorer
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-glow">
                    Mô Hình <span className="text-red-600">Thực Tiễn</span>
                </h3>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'success', label: 'Thành công' },
                    { id: 'failure', label: 'Bài học' },
                    { id: 'other', label: 'Khác' }
                ].map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-2 rounded border transition-colors text-xs font-bold uppercase tracking-wider
                            ${filter === f.id 
                                ? 'bg-red-600 border-red-600 text-black' 
                                : 'bg-transparent border-red-900 text-red-700 hover:border-red-500 hover:text-red-500'}
                        `}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Case List */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
                {filteredCases.map((c) => (
                    <div 
                        key={c.id}
                        onClick={() => handleCaseChange(c.id)}
                        className={`case-item p-4 border rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden group
                            ${activeCaseId === c.id 
                                ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                                : 'bg-black border-red-900/30 hover:bg-red-900/10 hover:border-red-700'}
                        `}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded ${activeCaseId === c.id ? 'bg-red-600 text-black' : 'bg-red-950 text-red-500'}`}>
                                    {c.icon}
                                </div>
                                <div>
                                    <h4 className={`font-bold uppercase leading-none ${activeCaseId === c.id ? 'text-white' : 'text-red-300'}`}>{c.name}</h4>
                                    <span className="text-[10px] text-red-500/70 font-mono">{c.type}</span>
                                </div>
                            </div>
                            {activeCaseId === c.id && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                        </div>
                        {activeCaseId === c.id && (
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Right: Detail View */}
            <div className="lg:col-span-8 bg-black border border-red-900/50 p-6 md:p-10 relative min-h-[500px] case-detail flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-red-900/30 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border
                                ${activeData.status === 'success' ? 'border-green-600 text-green-500 bg-green-900/20' :
                                  activeData.status === 'failure' ? 'border-red-600 text-red-500 bg-red-900/20' :
                                  'border-yellow-600 text-yellow-500 bg-yellow-900/20'}
                             `}>
                                {activeData.status === 'success' ? 'Thành công' : activeData.status === 'failure' ? 'Thất bại' : activeData.status === 'reference' ? 'Tham chiếu' : 'Đang phát triển'}
                             </span>
                             <span className="text-red-600 font-mono text-xs">{activeData.period}</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase">{activeData.name}</h2>
                    </div>
                    <div className="hidden md:block opacity-20 transform scale-150 text-red-600">
                        {activeData.icon}
                    </div>
                </div>

                {/* Description */}
                <p className="text-red-100 text-lg italic mb-10 border-l-4 border-red-600 pl-4">
                    "{activeData.desc}"
                </p>

                {/* Analysis Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-6">
                        <h5 className="text-red-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                            <BarChart3 size={14} /> Chỉ số đánh giá
                        </h5>
                        <div className="space-y-4">
                            {activeData.metrics.map((m, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs text-red-300 font-bold uppercase mb-1">
                                        <span>{m.label}</span>
                                        <span>{m.value}/100</span>
                                    </div>
                                    <div className="w-full h-2 bg-red-950 rounded-full overflow-hidden">
                                        <div 
                                            className={`metric-bar-fill h-full rounded-full ${m.color}`}
                                            style={{ width: `${m.value}%`, '--width-target': `${m.value}%` } as React.CSSProperties}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                         <div className="bg-green-950/10 border border-green-900/30 p-4 rounded">
                            <h5 className="text-green-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Điểm mạnh
                            </h5>
                            <p className="text-sm text-green-100/80 leading-relaxed">
                                {activeData.matrix.strengths}
                            </p>
                         </div>
                         
                         <div className="bg-red-950/10 border border-red-900/30 p-4 rounded">
                            <h5 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                <AlertTriangle size={14} /> Điểm yếu / Thách thức
                            </h5>
                            <p className="text-sm text-red-100/80 leading-relaxed">
                                {activeData.matrix.weaknesses}
                            </p>
                         </div>
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-red-600/30"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-red-600/30"></div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default AnalysisComparison;