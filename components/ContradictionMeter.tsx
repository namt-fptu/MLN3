import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Activity, Lock, Flame } from 'lucide-react';
import gsap from 'gsap';

const ContradictionMeter: React.FC = () => {
  const [level, setLevel] = useState(25);
  const containerRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  // Determine the current phase of society based on tension level
  const getPhaseData = (val: number) => {
    if (val < 40) return {
      title: "Ổn Định Tạm Thời",
      desc: "Mâu thuẫn giữa Lực lượng sản xuất và Quan hệ sản xuất còn tiềm ẩn. Sự bóc lột tồn tại nhưng chưa dẫn đến xung đột công khai.",
      symptoms: ["Tích lũy tư bản", "Cạnh tranh ngầm", "Tha hóa lao động"],
      icon: <Lock className="w-8 h-8 text-red-800" />,
      color: "text-red-800",
      borderColor: "border-red-900",
      shake: false
    };
    if (val < 75) return {
      title: "Tích Tụ Mâu Thuẫn",
      desc: "Lực lượng sản xuất phát triển vượt quá khuôn khổ của Quan hệ sản xuất. Các cuộc đình công và khủng hoảng kinh tế bắt đầu xuất hiện.",
      symptoms: ["Khủng hoảng thừa", "Đình công bãi công", "Phân hóa giàu nghèo cực đại"],
      icon: <Activity className="w-8 h-8 text-red-500" />,
      color: "text-red-500",
      borderColor: "border-red-600",
      shake: false
    };
    return {
      title: "Tình Thế Cách Mạng",
      desc: "Giai cấp thống trị không thể cai trị như cũ. Giai cấp bị trị không chấp nhận sống như cũ. Bùng nổ cách mạng xã hội.",
      symptoms: ["Bạo động chính trị", "Sụp đổ thể chế", "Chuyển hóa chất lượng"],
      icon: <Flame className="w-8 h-8 text-white animate-pulse" />,
      color: "text-red-500 text-glow",
      borderColor: "border-red-500 box-glow",
      shake: true
    };
  };

  const phase = getPhaseData(level);

  useEffect(() => {
    // Shake effect intensity based on level
    if (level > 75) {
      const intensity = (level - 75) / 5; // 0 to 5
      gsap.to(containerRef.current, {
        x: () => (Math.random() - 0.5) * intensity,
        y: () => (Math.random() - 0.5) * intensity,
        duration: 0.05,
        repeat: -1,
        overwrite: true
      });
    } else {
      gsap.to(containerRef.current, { x: 0, y: 0, overwrite: true });
    }
  }, [level]);

  return (
    <section ref={containerRef} className="py-24 bg-black relative border-y border-red-900/20 overflow-hidden">
      {/* Background Pulse */}
      <div 
        className="absolute inset-0 bg-red-900/5 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: level / 200 }} 
      />
      
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: The Meter Interface */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tighter text-center">
            Thước Đo <br/><span className="text-white">Mâu Thuẫn Giai Cấp</span>
          </h3>

          <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-8">
            {/* SVG Gauge */}
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {/* Track */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#1a0505" strokeWidth="15" />
              {/* Progress */}
              <circle 
                cx="100" cy="100" r="90" fill="none" 
                stroke={level > 75 ? '#ff0000' : level > 40 ? '#b91c1c' : '#7f1d1d'} 
                strokeWidth="15" 
                strokeDasharray="565"
                strokeDashoffset={565 - (565 * level) / 100}
                className="transition-all duration-300 ease-out"
                strokeLinecap="butt"
              />
            </svg>
            
            {/* Inner Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span className={`text-6xl font-black font-condensed tracking-tighter transition-colors duration-200 ${level > 80 ? 'text-white animate-glitch' : 'text-red-600'}`}>
                {level}%
              </span>
              <span className="text-red-900 text-xs tracking-[0.3em] uppercase mt-2 font-bold">Cường độ</span>
            </div>

            {/* Orbiting Particles based on tension */}
            {level > 50 && (
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full blur-[2px]"></div>
                </div>
            )}
             {level > 80 && (
                <div className="absolute inset-0 animate-spin pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-white rounded-full box-glow"></div>
                </div>
            )}
          </div>

          {/* Slider Control */}
          <div className="w-full max-w-sm relative group">
            <div className="flex justify-between text-xs text-red-900 font-mono mb-2 uppercase">
                <span>Trật tự</span>
                <span>Hỗn loạn</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={level} 
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full h-8 appearance-none bg-transparent cursor-pointer z-20 relative"
            />
             {/* Custom Range Track Visuals */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-red-950 -translate-y-1/2 pointer-events-none rounded-full overflow-hidden">
                <div className="h-full bg-red-700" style={{ width: `${level}%` }}></div>
            </div>
            <p className="mt-4 text-xs text-red-500 font-mono text-center opacity-70 group-hover:opacity-100 transition-opacity">
              [ Kéo để gia tăng áp lực xã hội ]
            </p>
          </div>
        </div>

        {/* Right: Analysis Panel */}
        <div ref={meterRef} className={`border-l-4 ${phase.borderColor} pl-8 py-4 transition-all duration-500`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-3 rounded-full bg-black border ${phase.borderColor} ${phase.shake ? 'animate-bounce' : ''}`}>
                {phase.icon}
            </div>
            <div>
                <span className="text-red-900 text-xs font-bold uppercase tracking-widest block mb-1">Trạng thái hiện tại</span>
                <h4 className={`text-2xl md:text-4xl font-black uppercase ${phase.color}`}>
                {phase.title}
                </h4>
            </div>
          </div>
          
          <p className="text-red-200 text-lg leading-relaxed mb-8 border-b border-red-900/30 pb-6">
            {phase.desc}
          </p>

          <div>
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
               <AlertTriangle size={14} /> Biểu hiện xã hội
            </span>
            <ul className="space-y-3">
                {phase.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-center text-red-300 font-mono text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 mr-3"></span>
                        {level > 75 ? (
                             <span className="animate-glitch text-white">{symptom}</span>
                        ) : (
                             <span>{symptom}</span>
                        )}
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContradictionMeter;