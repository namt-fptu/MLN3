import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Smartphone, Cpu, Building, X, ChevronRight, Layers, DollarSign, Users, AlertTriangle, Target } from 'lucide-react';
import gsap from 'gsap';

const cases = [
  {
    id: 'gig',
    title: "Kinh Tế Nền Tảng",
    subtitle: "Grab, Uber, Food Delivery",
    icon: <Smartphone size={40} />,
    color: "text-green-500",
    border: "border-green-500",
    bg: "bg-green-950/20",
    analysis: {
      llsx: "Smartphone, Thuật toán định vị, Xe cá nhân của tài xế. Tính chất xã hội hóa rất cao (kết nối hàng triệu người).",
      qhsx: "Tư bản sở hữu thuật toán & dữ liệu. Tài xế là 'đối tác' nhưng không có quyền định giá, chịu rủi ro về phương tiện.",
      beneficiary: "Chủ sở hữu nền tảng (Shareholders) - Hưởng địa tô công nghệ.",
      exploited: "Tài xế công nghệ (Mất bảo hiểm, phúc lợi), Nhà hàng (Phí hoa hồng cao).",
      contradiction: "Sở hữu tư nhân về tư liệu sản xuất vô hình (Thuật toán) >< Tính chất xã hội hóa của dịch vụ vận chuyển."
    }
  },
  {
    id: 'ai',
    title: "AI & Tự Động Hóa",
    subtitle: "ChatGPT, Robotics",
    icon: <Cpu size={40} />,
    color: "text-blue-500",
    border: "border-blue-500",
    bg: "bg-blue-950/20",
    analysis: {
      llsx: "Trí tuệ nhân tạo, Big Data, Robot tự hành. Năng suất lao động tăng đột biến, tiệm cận vô hạn.",
      qhsx: "Tập đoàn Big Tech độc quyền Model & Hạ tầng tính toán. Người lao động bị tách khỏi tư liệu sản xuất trí tuệ.",
      beneficiary: "Giới tinh hoa công nghệ (Tech Moguls), Chủ sở hữu vốn.",
      exploited: "Lao động trí óc (bị thay thế), Lao động gán nhãn dữ liệu (lương thấp).",
      contradiction: "Năng lực sản xuất phi thường của AI >< Khả năng chi trả/tiêu dùng hữu hạn của người lao động mất việc."
    }
  },
  {
    id: 'realestate',
    title: "Bất Động Sản & Địa Tô",
    subtitle: "Đầu cơ, Giá nhà, Thuê trọ",
    icon: <Building size={40} />,
    color: "text-yellow-500",
    border: "border-yellow-500",
    bg: "bg-yellow-950/20",
    analysis: {
      llsx: "Kỹ thuật xây dựng hiện đại, Quy hoạch đô thị, Hạ tầng giao thông công cộng.",
      qhsx: "Sở hữu tư nhân về đất đai và nhà ở đầu cơ. Giá nhà được quyết định bởi dòng vốn đầu cơ thay vì giá trị thực.",
      beneficiary: "Địa chủ mới (Đầu cơ, Chủ đầu tư BĐS), Ngân hàng.",
      exploited: "Người thuê nhà, Người mua nhà (trả lãi cả đời), Gen Z (không thể mua nhà).",
      contradiction: "Nhu cầu ở là quyền thiết yếu của con người >< Mục đích tối đa hóa lợi nhuận từ địa tô."
    }
  }
];

const ContradictionAnalyzer: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCase]);

  const handleOpen = (id: string) => {
    setActiveCase(id);
    // Animate detail panel opening
    setTimeout(() => {
        if (detailRef.current) {
            gsap.fromTo(detailRef.current, 
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
            gsap.from(".analysis-item", {
                x: -20, opacity: 0, stagger: 0.1, duration: 0.3, delay: 0.2
            });
        }
    }, 10);
  };

  const handleClose = () => {
    gsap.to(detailRef.current, {
        opacity: 0, scale: 0.95, duration: 0.2, onComplete: () => setActiveCase(null)
    });
  };

  const activeData = cases.find(c => c.id === activeCase);

  return (
    <section ref={containerRef} className="py-24 bg-black relative border-t border-red-900/30 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                Phân Tích <span className="text-red-600">Mâu Thuẫn</span>
            </h3>
            <p className="text-red-400 font-mono text-sm tracking-widest uppercase opacity-80 border-l-2 border-red-600 pl-3">
                 // CASE STUDY: GIẢI PHẪU XÃ HỘI HIỆN ĐẠI
            </p>
        </div>

        {/* Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((item) => (
                <div 
                    key={item.id}
                    onClick={() => handleOpen(item.id)}
                    className={`group cursor-pointer border border-red-900/30 p-6 md:p-8 hover:bg-red-900/10 transition-all duration-300 relative overflow-hidden ${activeCase === item.id ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                        <div className={`${item.color}`}>{item.icon}</div>
                    </div>
                    
                    <div className="mt-8">
                        <span className={`text-xs font-bold uppercase tracking-widest border border-red-900/50 px-2 py-1 rounded ${item.color}`}>Case File 0{cases.indexOf(item) + 1}</span>
                        <h4 className="text-2xl font-black text-white uppercase mt-4 mb-1 group-hover:text-red-500 transition-colors">{item.title}</h4>
                        <p className="text-red-400 font-mono text-xs">{item.subtitle}</p>
                    </div>

                    <div className="mt-8 flex items-center text-red-600 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Phân tích <ChevronRight size={14} />
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
            ))}
        </div>

        {/* Detail Overlay/Modal - Portalled to body to avoid z-index/overflow issues */}
        {activeCase && activeData && createPortal(
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
                <div 
                    ref={detailRef}
                    className="w-full max-w-5xl bg-black border border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)] relative flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[80vh]"
                >
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-red-600 hover:bg-white hover:text-red-600 text-black transition-colors rounded-full"
                    >
                        <X size={20} />
                    </button>

                    {/* Left: Header Card */}
                    <div className={`md:w-1/3 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden ${activeData.bg}`}>
                        <div className="relative z-10">
                            <div className={`${activeData.color} mb-6`}>{activeData.icon}</div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none mb-4">{activeData.title}</h2>
                            <p className="text-white/70 font-mono border-l-2 border-white/30 pl-4">{activeData.subtitle}</p>
                        </div>
                        
                        <div className="relative z-10 mt-8">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Trạng thái mâu thuẫn</div>
                            <div className="text-2xl font-black text-white animate-pulse">GAY GẮT</div>
                        </div>

                        {/* Background Icon */}
                        <div className={`absolute -bottom-10 -right-10 opacity-10 ${activeData.color}`}>
                            {React.cloneElement(activeData.icon as React.ReactElement<any>, { size: 200 })}
                        </div>
                    </div>

                    {/* Right: Analysis Content */}
                    <div className="md:w-2/3 p-6 md:p-10 overflow-y-auto bg-black/90">
                        <div className="grid grid-cols-1 gap-8">
                            
                            {/* Row 1: LLSX vs QHSX */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="analysis-item">
                                    <div className="flex items-center gap-2 mb-3 text-red-500">
                                        <Layers size={18} />
                                        <h5 className="font-bold uppercase text-xs tracking-widest">Lực lượng sản xuất</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed border-l border-red-900 pl-3">
                                        {activeData.analysis.llsx}
                                    </p>
                                </div>
                                <div className="analysis-item">
                                    <div className="flex items-center gap-2 mb-3 text-red-500">
                                        <Target size={18} />
                                        <h5 className="font-bold uppercase text-xs tracking-widest">Quan hệ sản xuất</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed border-l border-red-900 pl-3">
                                        {activeData.analysis.qhsx}
                                    </p>
                                </div>
                            </div>

                            {/* Row 2: Classes */}
                            <div className="analysis-item bg-red-950/10 border border-red-900/30 p-4 rounded">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-green-500">
                                            <DollarSign size={16} />
                                            <span className="font-bold uppercase text-xs tracking-widest">Hưởng lợi</span>
                                        </div>
                                        <p className="text-white text-sm font-bold">{activeData.analysis.beneficiary}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-red-500">
                                            <Users size={16} />
                                            <span className="font-bold uppercase text-xs tracking-widest">Bị bóc lột</span>
                                        </div>
                                        <p className="text-white text-sm font-bold">{activeData.analysis.exploited}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Conclusion */}
                            <div className="analysis-item">
                                <div className="flex items-center gap-2 mb-3 text-red-600 animate-pulse">
                                    <AlertTriangle size={20} />
                                    <h5 className="font-black uppercase text-sm tracking-widest">Kết luận: Mâu thuẫn chủ yếu</h5>
                                </div>
                                <div className="p-5 border-l-4 border-red-600 bg-gradient-to-r from-red-950/30 to-transparent">
                                    <p className="text-white text-lg md:text-xl font-bold italic leading-relaxed">
                                        "{activeData.analysis.contradiction}"
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
      </div>
    </section>
  );
};

export default ContradictionAnalyzer;