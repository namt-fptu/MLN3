import React, { useState } from 'react';
import { ChevronDown, Zap, Users, Building, Scale } from 'lucide-react';

const concepts = [
  {
    id: 'llsx',
    number: '01',
    term: "Lực Lượng Sản Xuất",
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Yếu tố động nhất, cách mạng nhất. Là sự kết hợp giữa người lao động (kỹ năng, trí tuệ) và tư liệu sản xuất (công cụ, máy móc).",
    highlight: "Quyết định năng suất lao động xã hội.",
    example: "Ví dụ: Sự chuyển dịch từ lao động thủ công sang tự động hóa, AI và kinh tế số.",
  },
  {
    id: 'qhsx',
    number: '02',
    term: "Quan Hệ Sản Xuất",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Quan hệ giữa người với người trong quá trình sản xuất. Bao gồm: Quan hệ sở hữu, Quan hệ tổ chức quản lý, và Quan hệ phân phối.",
    highlight: "Phải phù hợp với trình độ phát triển của Lực lượng sản xuất.",
    example: "Ví dụ: Chế độ công hữu về tư liệu sản xuất chủ yếu; Phân phối theo lao động.",
  },
  {
    id: 'csht',
    number: '03',
    term: "Cơ Sở Hạ Tầng",
    icon: <Building className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Toàn bộ những Quan hệ sản xuất hợp thành cơ cấu kinh tế của một hình thái xã hội nhất định.",
    highlight: "Quyết định tính chất của Kiến trúc thượng tầng.",
    example: "Ví dụ: Cơ cấu kinh tế nhiều thành phần định hướng XHCN (Kinh tế nhà nước giữ vai trò chủ đạo).",
  },
  {
    id: 'ktt',
    number: '04',
    term: "Kiến Trúc Thượng Tầng",
    icon: <Scale className="w-6 h-6 md:w-8 md:h-8" />,
    definition: "Hệ thống quan điểm (chính trị, pháp quyền, triết học...) và các thiết chế tương ứng (Nhà nước, Đảng, Giáo hội...).",
    highlight: "Tác động trở lại mạnh mẽ đối với Cơ sở hạ tầng.",
    example: "Ví dụ: Nhà nước pháp quyền XHCN Việt Nam; Hệ tư tưởng Mác - Lênin.",
  }
];

const ConceptDecoder: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
       {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#330000 1px, transparent 1px), linear-gradient(90deg, #330000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
             <h3 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">
              Giải Mã <span className="text-white">Cấu Trúc Xã Hội</span>
            </h3>
            <p className="text-red-400 font-mono text-sm tracking-widest uppercase opacity-80">
                 // CHẾ ĐỘ PHÂN TÍCH HỆ THỐNG
            </p>
        </div>
        
        <div className="space-y-6" role="list">
          {concepts.map((concept) => (
            <div 
              key={concept.id} 
              className={`border transition-all duration-500 overflow-hidden relative group rounded-sm
                ${activeId === concept.id 
                    ? 'bg-black border-red-500 box-glow' 
                    : 'bg-black border-red-900/50 hover:border-red-600'}`}
              role="listitem"
            >
               {/* Header */}
              <button
                onClick={() => toggle(concept.id)}
                aria-expanded={activeId === concept.id}
                aria-controls={`content-${concept.id}`}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-red-500 relative z-20 bg-gradient-to-r from-black via-black to-transparent"
              >
                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className={`text-3xl font-condensed font-bold opacity-30 transition-colors duration-300 ${activeId === concept.id ? 'text-red-500 opacity-100' : 'text-red-900'}`}>
                        {concept.number}
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className={`transition-colors duration-300 ${activeId === concept.id ? 'text-red-500' : 'text-red-800'}`}>
                            {concept.icon}
                        </span>
                        <span className={`text-xl md:text-2xl font-bold uppercase tracking-wide transition-all duration-300 ${activeId === concept.id ? 'text-white translate-x-2' : 'text-red-600 group-hover:text-red-400'}`}>
                            {concept.term}
                        </span>
                    </div>
                </div>
                <ChevronDown 
                  className={`text-red-600 transition-transform duration-500 ${activeId === concept.id ? 'rotate-180 text-white' : ''}`} 
                  size={24}
                />
              </button>
              
              {/* Content Panel */}
              <div 
                id={`content-${concept.id}`}
                className={`transition-[max-height,opacity] duration-500 ease-in-out will-change-transform ${activeId === concept.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={activeId !== concept.id}
              >
                <div className="px-6 pb-8 pt-2 relative border-t border-red-900/50">
                   {/* Scanner Animation Line */}
                  {activeId === concept.id && (
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_#ff0000] animate-[scanLine_2s_linear_infinite] opacity-50 pointer-events-none"></div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                      {/* Left: Definition */}
                      <div className="md:col-span-8 space-y-4">
                          <p className="text-lg text-red-100 leading-relaxed font-light">
                             <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-1">Định nghĩa</span>
                             {concept.definition}
                          </p>
                          <div className="bg-red-950/20 border-l-2 border-red-500 p-3">
                              <p className="text-red-400 italic text-sm font-medium">
                                "{concept.highlight}"
                              </p>
                          </div>
                      </div>

                      {/* Right: Example */}
                      <div className="md:col-span-4 bg-red-900/10 p-4 border border-red-900/30 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-1">
                              <div className="flex space-x-1">
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              </div>
                          </div>
                          <span className="text-red-500 font-bold uppercase text-xs tracking-widest block mb-2">Thực tiễn</span>
                          <p className="text-sm text-gray-300">
                             {concept.example}
                          </p>
                      </div>
                  </div>
                </div>
              </div>

              {/* Active Glow Borders */}
              {activeId === concept.id && (
                  <>
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-red-600"></div>
                  </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scanLine {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default ConceptDecoder;