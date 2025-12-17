import React, { useState } from 'react';
import { User, Book, MapPin, Calendar, GitBranch, ExternalLink, Quote } from 'lucide-react';

const philosophers = [
  {
    id: 'hegel',
    name: "G.W.F. Hegel",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Hegel_portrait_by_Schlesinger_1831.jpg",
    era: "1770 - 1831",
    nation: "Đức",
    school: "Triết học Cổ điển Đức",
    coreIdea: "Phép biện chứng duy tâm",
    connection: "Mác kế thừa 'Hạt nhân hợp lý' (Phép biện chứng) nhưng lật ngược lại từ duy tâm sang duy vật.",
    quote: "Cái gì hợp lý thì tồn tại, cái gì tồn tại thì hợp lý."
  },
  {
    id: 'feuerbach',
    name: "Ludwig Feuerbach",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Ludwig_Feuerbach.jpg",
    era: "1804 - 1872",
    nation: "Đức",
    school: "Chủ nghĩa Duy vật Nhân bản",
    coreIdea: "Chủ nghĩa duy vật siêu hình",
    connection: "Mác kế thừa chủ nghĩa duy vật vô thần, loại bỏ tính siêu hình để xây dựng CNDV Biện chứng.",
    quote: "Con người là sản phẩm của tự nhiên, không phải của Chúa."
  },
  {
    id: 'smith',
    name: "Adam Smith",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Adam_Smith_The_Muir_portrait.jpg/800px-Adam_Smith_The_Muir_portrait.jpg",
    era: "1723 - 1790",
    nation: "Anh",
    school: "Kinh tế Chính trị Cổ điển",
    coreIdea: "Lý thuyết Giá trị Lao động & 'Bàn tay vô hình'",
    connection: "Cung cấp nền tảng để Mác xây dựng Học thuyết Giá trị thặng dư.",
    quote: "Lao động là nguồn gốc của mọi sự giàu có."
  },
  {
    id: 'owen',
    name: "Robert Owen",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Robert_owen.jpg",
    era: "1771 - 1858",
    nation: "Anh",
    school: "CNXH Không tưởng",
    coreIdea: "Xây dựng xã hội công bằng bằng thực nghiệm",
    connection: "Tiền đề tư tưởng cho CNXH Khoa học, dù còn hạn chế về phương pháp cách mạng.",
    quote: "Môi trường tạo nên tính cách con người."
  },
  {
    id: 'marx',
    name: "Karl Marx",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg",
    era: "1818 - 1883",
    nation: "Đức",
    school: "CNXH Khoa học",
    coreIdea: "CNDV Lịch sử & Giá trị thặng dư",
    connection: "Người sáng lập, tổng hợp và phát triển các trào lưu tư tưởng trước đó lên tầm cao mới.",
    quote: "Vô sản toàn thế giới, đoàn kết lại!"
  }
];

const PhilosopherWiki: React.FC = () => {
  const [activeId, setActiveId] = useState('marx');
  const activePhilosopher = philosophers.find(p => p.id === activeId) || philosophers[0];

  return (
    <section className="py-16 border-t border-red-900/30">
        <div className="flex items-center gap-4 mb-10">
            <Book className="text-red-600 animate-pulse" size={32} />
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Hồ Sơ <span className="text-red-600">Đại Biểu</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-black border border-red-900/50 p-1">
            
            {/* Sidebar List */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-red-900/30 bg-red-950/5">
                <div className="p-4 bg-red-950/20 text-red-500 font-bold uppercase text-xs tracking-widest border-b border-red-900/30 flex items-center justify-between">
                    <span>Danh sách</span>
                    <ExternalLink size={12} />
                </div>
                <div className="overflow-y-auto max-h-[300px] lg:max-h-[600px] scrollbar-thin scrollbar-thumb-red-900">
                    {philosophers.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveId(p.id)}
                            className={`w-full text-left p-4 border-b border-red-900/10 transition-all duration-200 flex items-center gap-3 hover:bg-red-900/20
                                ${activeId === p.id ? 'bg-red-900/30 text-white border-l-4 border-l-red-600' : 'text-red-400 border-l-4 border-l-transparent'}
                            `}
                        >
                            <User size={16} className={activeId === p.id ? 'text-red-500' : 'opacity-50'} />
                            <span className="font-bold text-sm uppercase">{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area - Wiki Style */}
            <div className="lg:col-span-3 p-6 md:p-8 animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Wiki Header & Text */}
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-serif font-black text-white mb-2 border-b-2 border-red-600 pb-2 inline-block">
                            {activePhilosopher.name}
                        </h1>
                        <div className="text-red-400 font-mono text-sm mb-6 flex flex-wrap gap-4">
                            <span className="flex items-center gap-1"><MapPin size={12}/> {activePhilosopher.nation}</span>
                            <span className="flex items-center gap-1"><Calendar size={12}/> {activePhilosopher.era}</span>
                        </div>

                        <div className="bg-red-950/10 p-6 border-l-2 border-red-600 italic text-red-200 mb-8 relative">
                             <Quote size={24} className="absolute -top-3 -left-3 text-red-600 bg-black p-1" />
                             "{activePhilosopher.quote}"
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                    <GitBranch size={16} /> Tư tưởng cốt lõi
                                </h4>
                                <p className="text-white text-lg font-light leading-relaxed">
                                    {activePhilosopher.coreIdea}
                                </p>
                            </div>
                            
                            <div className="bg-red-900/10 p-4 border border-red-900/30">
                                <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2">Mối liên hệ với CN Mác</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {activePhilosopher.connection}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Wiki InfoBox (Right Column) */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-red-950/10 border border-red-900/50 p-4 h-fit">
                        <div className="mb-4 overflow-hidden border border-red-900/30 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholder for image - using div for mock if image fails */}
                            <div className="w-full aspect-[3/4] bg-red-900/20 flex items-center justify-center relative overflow-hidden">
                                {activePhilosopher.image ? (
                                    <img src={activePhilosopher.image} alt={activePhilosopher.name} className="w-full h-full object-cover" />
                                ) : (
                                     <User size={64} className="text-red-900 opacity-50" />
                                )}
                                <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply"></div>
                            </div>
                            <div className="text-xs text-center text-red-500 mt-2 font-mono">{activePhilosopher.name}</div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                            <div className="flex flex-col border-b border-red-900/20 pb-2">
                                <span className="text-red-600 font-bold text-xs uppercase">Trường phái</span>
                                <span className="text-white">{activePhilosopher.school}</span>
                            </div>
                            <div className="flex flex-col border-b border-red-900/20 pb-2">
                                <span className="text-red-600 font-bold text-xs uppercase">Quốc gia</span>
                                <span className="text-white">{activePhilosopher.nation}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
  );
};

export default PhilosopherWiki;