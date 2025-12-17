import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Lock, AlertOctagon } from 'lucide-react';

const SocialSimulator: React.FC = () => {
  const [forces, setForces] = useState(50); // Lực lượng sản xuất (Technology/Productivity)
  const [relations, setRelations] = useState(50); // Quan hệ sản xuất (Private Ownership/Inequality)

  // Marxist Logic:
  // Revolution happens when Productive Forces (Forces) grow high, but Relations (Private Ownership) remain high (constraining development).
  // Ideal Socialism is High Forces + Low Private Ownership (Public Ownership).
  const tension = Math.max(0, forces - (100 - relations)); 
  
  // Calculate stability state
  const getSocialState = () => {
    if (forces < 30 && relations < 30) return { text: "CỘNG SẢN NGUYÊN THỦY", color: "text-gray-400", desc: "Năng suất thấp, công bằng tuyệt đối." };
    if (forces < 50 && relations > 60) return { text: "PHONG KIẾN TRÌ TRỆ", color: "text-amber-700", desc: "Kìm hãm phát triển bởi quan hệ cũ." };
    if (forces > 70 && relations > 70) return { text: "KHỦNG HOẢNG TƯ BẢN", color: "text-red-500 animate-glitch", desc: "LLSX mâu thuẫn gay gắt với QHSX." };
    if (forces > 80 && relations < 30) return { text: "XÃ HỘI CHỦ NGHĨA", color: "text-green-500 text-glow", desc: "QHSX phù hợp thúc đẩy LLSX phát triển." };
    return { text: "ỔN ĐỊNH TẠM THỜI", color: "text-red-300", desc: "Mâu thuẫn đang tích tụ dần." };
  };

  const state = getSocialState();
  const isCritical = forces > 70 && relations > 70;

  return (
    <section className="py-24 bg-black px-4 border-y border-red-900/30 relative overflow-hidden">
      {/* Critical Alert Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${isCritical ? 'bg-red-900/20 opacity-100' : 'opacity-0'}`}>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Mô Phỏng <span className="text-red-600">Quy Luật</span>
            </h3>
            <p className="text-red-400 font-mono text-sm max-w-2xl mx-auto">
                Điều chỉnh các biến số để thấy sự vận động của lịch sử. Quy luật: "Quan hệ sản xuất phải phù hợp với trình độ phát triển của Lực lượng sản xuất".
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black border border-red-800 p-8 shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          
          {/* Controls */}
          <div className="space-y-10">
            {/* Input 1 */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <label className="flex items-center gap-2 text-white font-bold text-lg uppercase">
                    <Zap className="text-yellow-500" /> Lực Lượng Sản Xuất
                </label>
                <span className="font-mono text-red-500 text-xl">{forces}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={forces}
                onChange={(e) => setForces(Number(e.target.value))}
                className="w-full h-3 bg-red-950 rounded-full appearance-none cursor-pointer accent-yellow-500 relative z-20"
              />
              <p className="text-gray-500 text-xs mt-2 italic">Trình độ công nghệ, kỹ năng lao động, công cụ...</p>
            </div>

            {/* Input 2 */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <label className="flex items-center gap-2 text-white font-bold text-lg uppercase">
                    <Lock className="text-red-600" /> Tư Hữu Hóa (QHSX)
                </label>
                <span className="font-mono text-red-500 text-xl">{relations}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={relations}
                onChange={(e) => setRelations(Number(e.target.value))}
                className="w-full h-3 bg-red-950 rounded-full appearance-none cursor-pointer accent-red-600 relative z-20"
              />
               <p className="text-gray-500 text-xs mt-2 italic">Mức độ tập trung tư liệu sản xuất, phân hóa giàu nghèo...</p>
            </div>
          </div>

          {/* Monitor */}
          <div className="relative border border-red-900/50 bg-black p-6 flex flex-col items-center justify-center text-center">
            {isCritical && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-red-500 animate-pulse font-bold text-xs uppercase tracking-widest">
                    <AlertOctagon size={14} /> Cảnh báo
                </div>
            )}
            
            <div className="mb-6 relative">
                 <Gauge size={64} className={`transition-colors duration-300 ${isCritical ? 'text-red-500' : 'text-red-900'}`} />
                 {/* Needle Simulation */}
                 <div 
                    className="absolute top-1/2 left-1/2 w-1 h-8 bg-red-500 origin-bottom transition-transform duration-500"
                    style={{ transform: `translateX(-50%) translateY(-100%) rotate(${(forces + relations) * 1.8 - 90}deg)` }}
                 ></div>
            </div>

            <div className="space-y-2">
                <div className="text-red-500 text-xs font-mono uppercase tracking-[0.2em]">Trạng thái xã hội</div>
                <h4 className={`text-3xl md:text-4xl font-black uppercase transition-all duration-300 ${state.color}`}>
                    {state.text}
                </h4>
                <p className="text-white font-light mt-4 border-t border-red-900/30 pt-4">
                    {state.desc}
                </p>
            </div>

            {/* Tension Bar */}
            <div className="w-full mt-8">
                <div className="flex justify-between text-xs text-red-700 font-bold uppercase mb-1">
                    <span>Áp lực cách mạng</span>
                    <span>{Math.round(tension + (relations * 0.5))}%</span>
                </div>
                <div className="w-full h-2 bg-red-950 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-300 ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-red-800'}`}
                        style={{ width: `${Math.min(100, tension + (relations * 0.5))}%` }}
                    ></div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSimulator;