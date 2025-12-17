import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle } from 'lucide-react';

const myths = [
  {
    id: 1,
    myth: "CNXH là 'cào bằng', ai cũng hưởng như nhau?",
    fact: "SAI. Nguyên tắc là 'Làm theo năng lực, hưởng theo lao động'.",
    detail: "Người làm nhiều, đóng góp nhiều sẽ hưởng nhiều hơn. Cào bằng triệt tiêu động lực, còn CNXH khuyến khích sáng tạo."
  },
  {
    id: 2,
    myth: "Bỏ qua chế độ Tư bản là bỏ qua tất cả?",
    fact: "KHÔNG. 'Bỏ qua' là bỏ qua quan hệ bóc lột thống trị.",
    detail: "Ta vẫn KẾ THỪA thành tựu khoa học, công nghệ và lực lượng sản xuất tiên tiến của nhân loại."
  },
  {
    id: 3,
    myth: "Đấu tranh giai cấp đồng nghĩa với bạo lực?",
    fact: "KHÔNG CHỈ VẬY. Đấu tranh diễn ra trên các mặt trận: Kinh tế, Chính trị, Tư tưởng.",
    detail: "Bạo lực cách mạng chỉ là phương tiện bắt buộc cuối cùng khi giai cấp thống trị dùng bạo lực đàn áp."
  }
];

const MythBreaker: React.FC = () => {
  // Support for click-to-flip on mobile/touch
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(id);
    }
  };

  return (
    <section className="py-24 bg-black px-4 relative overflow-hidden">
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #b91c1c 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black text-red-600 mb-4 uppercase tracking-tighter text-glow animate-pulse">
                Phá Vỡ <span className="text-white">Định Kiến</span>
            </h3>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {myths.map((item) => (
            <div 
                key={item.id} 
                className="group h-[450px] [perspective:1000px] cursor-pointer"
                onClick={() => handleCardClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                role="button"
                tabIndex={0}
                aria-label={`Lật thẻ: ${item.myth}`}
            >
              {/* Card Container with Preserve 3D - Flips on hover OR click state */}
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] shadow-[0_0_30px_rgba(185,28,28,0.1)] hover:shadow-[0_0_50px_rgba(220,38,38,0.4)] ${flippedCardId === item.id ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}>
                
                {/* --- FRONT SIDE --- */}
                <div 
                  className="absolute inset-0 bg-black border border-red-800 p-8 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-50">
                      <ShieldAlert size={48} className="text-red-600" />
                  </div>
                  
                  <div className="relative z-10">
                     <span className="text-red-900 font-black text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20 select-none">?</span>
                     <h4 className="text-red-500 font-bold text-sm uppercase tracking-widest mb-4">Lầm tưởng phổ biến #{item.id}</h4>
                     <p className="text-2xl md:text-3xl font-black text-white uppercase leading-tight group-hover:animate-glitch">
                        "{item.myth}"
                     </p>
                  </div>

                  {/* Footer hint */}
                  <div className="absolute bottom-6 left-0 w-full text-center">
                      <span className="text-red-600 text-[10px] font-mono uppercase border border-red-900 px-2 py-1 rounded hover:bg-red-900/30 transition-colors">
                          Lật để tìm sự thật
                      </span>
                  </div>

                  {/* Glitch Overlay */}
                  <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"></div>
                </div>

                {/* --- BACK SIDE --- */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-red-950 to-black p-8 flex flex-col items-center justify-center text-center border-2 border-red-600"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)' 
                  }}
                >
                  <div className="absolute top-4 left-4">
                      <ShieldCheck size={32} className="text-green-500" />
                  </div>

                  <h4 className="text-green-500 font-black text-2xl uppercase mb-6 flex items-center gap-2">
                     <CheckCircle size={24} /> Sự thật
                  </h4>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6">
                      {item.fact}
                    </p>

                    <div className="bg-black/60 p-4 rounded border border-red-900/50 shadow-inner">
                        <p className="text-red-300 text-sm md:text-base italic font-light">
                            "{item.detail}"
                        </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MythBreaker;