import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, Terminal, Cpu, Database } from 'lucide-react';

const terms = [
    { id: 1, term: "Vật chất", def: "Thực tại khách quan, tồn tại độc lập với ý thức, được ý thức phản ánh.", type: "core" },
    { id: 2, term: "Ý thức", def: "Hình ảnh chủ quan của thế giới khách quan. Là sự phản ánh tích cực, sáng tạo.", type: "core" },
    { id: 3, term: "Biện chứng", def: "Nghệ thuật tranh luận. Xem xét sự vật trong trạng thái vận động và liên hệ lẫn nhau.", type: "method" },
    { id: 4, term: "Thực tiễn", def: "Hoạt động vật chất có mục đích, mang tính lịch sử - xã hội của con người.", type: "core" },
    { id: 5, term: "Giai cấp", def: "Tập đoàn người to lớn, khác nhau về địa vị trong hệ thống sản xuất xã hội.", type: "social" },
    { id: 6, term: "Giá trị thặng dư", def: "Phần giá trị dôi ra ngoài giá trị sức lao động, bị nhà tư bản chiếm đoạt.", type: "economy" },
    { id: 7, term: "Tha hóa", def: "Quá trình sản phẩm của con người trở thành lực lượng xa lạ, thống trị lại con người.", type: "social" },
    { id: 8, term: "Phủ định của phủ định", def: "Sự phát triển dường như quay lại điểm xuất phát nhưng ở trình độ cao hơn.", type: "law" },
    { id: 9, term: "Lượng - Chất", def: "Tích lũy về lượng đến điểm nút sẽ dẫn đến sự thay đổi về chất (Bước nhảy).", type: "law" },
    { id: 10, term: "Tồn tại xã hội", def: "Phương diện sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội.", type: "social" },
];

const GlitchText: React.FC<{ text: string, active: boolean }> = ({ text, active }) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    // Initialize with scrambled text
    const [display, setDisplay] = useState(() =>
        text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("").substring(0, Math.min(text.length, 20)) + "..."
    );
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (active) {
            let iterations = 0;

            window.clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(() => {
                setDisplay(prev => text.split("").map((char, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));

                iterations += 1 / 3; // Speed of decode
                if (iterations >= text.length) window.clearInterval(intervalRef.current);
            }, 30);
        } else {
            // Revert to scrambled text when not active
            setDisplay(
                text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("").substring(0, Math.min(text.length, 20)) + "..."
            );
        }
        return () => window.clearInterval(intervalRef.current);
    }, [active, text]);

    return <span>{display}</span>;
};

const Dictionary: React.FC = () => {
    const [filter, setFilter] = useState('');
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

    const filteredTerms = terms.filter(t => t.term.toLowerCase().includes(filter.toLowerCase()));

    const handleMouseEnter = (id: number) => {
        setHoveredId(id);
        setRevealedIds(prev => new Set(prev).add(id));
    };

    return (
        <section className="py-24 bg-black border-t border-red-900/30 font-sans relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#330000 1px, transparent 1px), linear-gradient(90deg, #330000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-red-500 font-bold tracking-[0.3em] text-xs uppercase mb-2 animate-pulse">
                            <Terminal size={14} /> System Lexicon
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-glow mb-2">
                            Từ Điển <span className="text-red-600">Biện Chứng</span>
                        </h3>
                        <p className="text-red-500 font-mono text-xs uppercase tracking-widest border-l-2 border-red-600 pl-3">
                        // DECODING MARXIST TERMINOLOGY
                        </p>
                    </div>

                    {/* Command Line Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute -top-5 left-0 text-[10px] text-red-600 font-mono uppercase tracking-widest">
                            {'>'} Input_Query
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full bg-black border-b-2 border-red-900 p-3 pl-10 text-red-100 focus:outline-none focus:border-red-500 transition-colors font-mono text-sm uppercase placeholder-red-900/50"
                                placeholder="NHẬP TỪ KHÓA..."
                            />
                            <Search className="absolute left-0 top-3 text-red-600" size={18} />
                            <div className="absolute right-0 top-3 w-2 h-4 bg-red-600 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTerms.map((item) => (
                        <div
                            key={item.id}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`group relative bg-black/50 border p-6 h-60 hover:border-red-500 transition-all duration-300 flex flex-col justify-between overflow-hidden
                                ${revealedIds.has(item.id) ? 'border-red-900/60' : 'border-red-900/30'}
                            `}
                        >
                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Background Pulse */}
                            <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-red-950/30 border border-red-900/50 rounded group-hover:bg-red-600 group-hover:text-black transition-colors">
                                        <Hash size={16} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-red-700 border border-red-900/30 px-2 py-0.5 rounded group-hover:text-red-400 group-hover:border-red-500 transition-all">
                                        {item.type}
                                    </span>
                                </div>

                                <h4 className={`text-xl font-bold uppercase transition-all duration-300 ${hoveredId === item.id ? 'text-white translate-x-2' : 'text-red-600'}`}>
                                    {item.term}
                                </h4>
                            </div>

                            {/* Definition Area */}
                            <div className="relative z-10 min-h-[80px] mt-4">
                                <div className="text-sm text-gray-400 font-mono leading-relaxed">
                                    <span className={hoveredId === item.id || revealedIds.has(item.id) ? 'text-red-200' : ''}>
                                        <GlitchText text={item.def} active={hoveredId === item.id || revealedIds.has(item.id)} />
                                    </span>
                                </div>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute bottom-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Cpu size={16} className={`text-red-600 ${hoveredId === item.id ? 'animate-pulse' : ''}`} />
                            </div>

                            {/* Bottom Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-900/30 group-hover:bg-red-600 transition-colors duration-300"></div>
                        </div>
                    ))}

                    {filteredTerms.length === 0 && (
                        <div className="col-span-full py-16 text-center border border-red-900/30 border-dashed bg-red-950/5">
                            <Database className="mx-auto text-red-900 mb-4" size={48} />
                            <div className="text-red-500 font-mono uppercase tracking-widest">
                                ERROR: DATA NOT FOUND
                            </div>
                            <p className="text-red-900 text-xs mt-2">Vui lòng thử từ khóa khác</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dictionary;