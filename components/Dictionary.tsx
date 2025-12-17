import React, { useState, useEffect, useRef } from 'react';
import { Book, Terminal, Cpu } from 'lucide-react';

const terms = [
    {
        term: "Vật chất",
        def: "Thực tại khách quan đem lại cho con người trong cảm giác, tồn tại không lệ thuộc vào cảm giác."
    },
    {
        term: "Ý thức",
        def: "Hình ảnh chủ quan của thế giới khách quan; là sự phản ánh tích cực, sáng tạo hiện thực khách quan."
    },
    {
        term: "Thực tiễn",
        def: "Toàn bộ hoạt động vật chất có mục đích, mang tính lịch sử - xã hội của con người nhằm cải tạo thế giới."
    },
    {
        term: "Biện chứng",
        def: "Phương pháp xem xét sự vật trong trạng thái vận động, biến đổi và trong mối liên hệ qua lại lẫn nhau."
    },
    {
        term: "Mâu thuẫn",
        def: "Sự thống nhất và đấu tranh của các mặt đối lập; là nguồn gốc và động lực của sự phát triển."
    },
    {
        term: "Phủ định",
        def: "Sự thay thế sự vật cũ bằng sự vật mới. Phủ định biện chứng có tính khách quan và kế thừa."
    },
    {
        term: "Hình thái KT-XH",
        def: "Một xã hội ở nấc thang lịch sử nhất định, với một kiểu Quan hệ sản xuất đặc trưng."
    },
    {
        term: "Giá trị thặng dư",
        def: "Phần giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra, bị nhà tư bản chiếm đoạt."
    }
];

const TERMINAL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

const ScrambleText = ({ text, active }: { text: string; active: boolean }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterationRef = useRef(0);

    useEffect(() => {
        if (active) {
            iterationRef.current = 0;

            clearInterval(intervalRef.current as NodeJS.Timeout);

            intervalRef.current = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iterationRef.current) {
                                return text[index];
                            }
                            return TERMINAL_CHARS[Math.floor(Math.random() * TERMINAL_CHARS.length)];
                        })
                        .join("")
                );

                if (iterationRef.current >= text.length) {
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                }

                iterationRef.current += 1; // Speed of decoding
            }, 20); // ms per frame
        } else {
            setDisplayText(text.split("").map(() => TERMINAL_CHARS[Math.floor(Math.random() * TERMINAL_CHARS.length)]).join("").substring(0, Math.min(text.length, 10)) + "...");
        }

        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [active, text]);

    return <span className="font-mono">{displayText}</span>;
};

const Dictionary = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-12 border-t border-red-900/30">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-600 rounded">
                    <Terminal className="text-black" size={24} />
                </div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tighter">
                    Từ Điển <span className="text-red-600">Biện Chứng</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {terms.map((item, idx) => (
                    <div
                        key={idx}
                        className="group relative h-40 bg-black/50 border border-red-900/30 hover:border-red-500 overflow-hidden transition-all duration-300 rounded-sm cursor-help"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Static Overlay (Scanlines) */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

                        <div className="absolute inset-0 p-4 z-10 flex flex-col justify-center">
                            {/* Term Title */}
                            <h3 className={`text-xl font-bold uppercase tracking-widest transition-all duration-300
                                ${hoveredIndex === idx ? 'text-red-500 -translate-y-8 scale-75 opacity-50' : 'text-gray-300'}
                            `}>
                                {item.term}
                            </h3>

                            {/* Definition with Scramble Effect */}
                            <div className={`absolute left-0 top-10 p-4 text-xs md:text-sm text-red-100 leading-relaxed
                                transition-all duration-300
                                ${hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                            `}>
                                {hoveredIndex === idx && <ScrambleText text={item.def} active={true} />}
                            </div>
                        </div>

                        {/* Interactive Corner */}
                        <div className={`absolute bottom-0 right-0 p-2 transition-opacity duration-300 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                            <Cpu size={16} className="text-red-600 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dictionary;
