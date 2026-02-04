import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Repeat, Cpu, Factory, Truck, Server, RefreshCcw, Search, Smartphone, X, BookOpen, Clock, Lightbulb, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

const mappings = [
  {
    id: 1,
    category: "Sự Tha Hóa",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=600",
    theory: {
      text: "Trong lao động, người công nhân không khẳng định mà phủ định mình... Lao động là bên ngoài, là sự ép buộc.",
      source: "C.Mác - Bản thảo KT-TH 1844",
      fullText: "Trong lao động, người công nhân không khẳng định mà phủ định mình, không cảm thấy sung sướng mà cảm thấy bất hạnh, không phát huy tự do năng lượng thể chất và tinh thần mà làm kiệt quệ thể xác và hủy hoại tinh thần của mình. Lao động là bên ngoài người công nhân, nghĩa là không thuộc về bản chất của anh ta. Do đó, trong lao động, anh ta không khẳng định mà phủ định mình."
    },
    reality19: {
      title: "Công xưởng Manchester",
      desc: "Công nhân bị gắn chặt vào cỗ máy hơi nước, làm việc 14-16h/ngày, trở thành một bộ phận của máy móc.",
      icon: <Factory size={24} />,
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600",
      details: [
        "Trẻ em từ 5 tuổi đã phải làm việc trong các nhà máy",
        "Điều kiện làm việc nguy hiểm, tai nạn lao động phổ biến",
        "Công nhân sống trong các khu ổ chuột quanh nhà máy",
        "Tuổi thọ trung bình của công nhân chỉ khoảng 30-40 tuổi"
      ]
    },
    reality21: {
      title: "Gig Economy & Thuật toán",
      desc: "Tài xế công nghệ (Shipper) bị quản lý bởi App. Không có sếp người, nhưng bị thúc ép bởi thuật toán vô hình.",
      icon: <Smartphone size={24} />,
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600",
      details: [
        "Thuật toán quyết định thu nhập, không có thương lượng",
        "Không được hưởng bảo hiểm, nghỉ phép như nhân viên chính thức",
        "Áp lực đánh giá 5 sao liên tục từ khách hàng",
        "Làm việc 12-14h/ngày để đạt mức thu nhập đủ sống"
      ]
    }
  },
  {
    id: 2,
    category: "Tích Tụ Tư Bản",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    theory: {
      text: "Cạnh tranh dẫn đến sự tập trung tư bản... Các nhà tư bản lớn nuốt chửng các nhà tư bản nhỏ.",
      source: "C.Mác - Tư Bản luận",
      fullText: "Cạnh tranh diễn ra tỷ lệ thuận với số lượng và tỷ lệ nghịch với độ lớn của các tư bản cạnh tranh. Cạnh tranh bao giờ cũng kết thúc bằng sự sụp đổ của nhiều nhà tư bản nhỏ, mà tư bản của họ một phần chuyển sang tay kẻ chiến thắng, một phần bị tiêu vong. Sự tập trung tư bản là kết quả tất yếu của cạnh tranh tự do."
    },
    reality19: {
      title: "Độc quyền Trust/Cartel",
      desc: "Sự hình thành các ông vua Thép, Vua Dầu mỏ (Rockefeller) kiểm soát toàn bộ chuỗi cung ứng.",
      icon: <Search size={24} />,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
      details: [
        "Rockefeller kiểm soát 90% ngành dầu mỏ Mỹ năm 1880",
        "Carnegie Steel độc quyền ngành thép Mỹ",
        "Các Trust thao túng giá cả thị trường",
        "Luật chống độc quyền Sherman ra đời năm 1890"
      ]
    },
    reality21: {
      title: "Big Tech Ecosystem",
      desc: "Amazon, Google thâu tóm thị trường. Thương mại điện tử nhỏ lẻ phụ thuộc hoàn toàn vào hạ tầng của Big Tech.",
      icon: <Server size={24} />,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      details: [
        "5 công ty Big Tech có giá trị vốn hóa > GDP nhiều quốc gia",
        "Amazon chiếm ~40% thương mại điện tử Mỹ",
        "Google chiếm 92% thị phần tìm kiếm toàn cầu",
        "Startup khó cạnh tranh, thường bị mua lại hoặc sao chép"
      ]
    }
  },
  {
    id: 3,
    category: "Máy Móc & Việc Làm",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    theory: {
      text: "Phương tiện lao động, khi mang hình thái máy móc, trở thành đối thủ cạnh tranh của chính người công nhân.",
      source: "C.Mác - Tư Bản luận",
      fullText: "Máy móc không chỉ là đối thủ cạnh tranh với sức mạnh vượt trội, luôn sẵn sàng biến người công nhân thành 'thừa'. Nó còn được tư bản công khai tuyên bố và sử dụng như một thế lực thù địch với công nhân. Máy móc trở thành vũ khí mạnh nhất để đàn áp các cuộc đình công."
    },
    reality19: {
      title: "Phong trào Luddite",
      desc: "Công nhân dệt Anh đập phá máy móc vì sợ bị thay thế và mất việc làm vào tay máy dệt hơi nước.",
      icon: <RefreshCcw size={24} />,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      details: [
        "Phong trào nổ ra 1811-1816 tại Anh",
        "Công nhân phá hủy máy dệt tự động",
        "Chính phủ Anh điều quân đội đàn áp",
        "Nhiều người bị xử tử hoặc đày đi Australia"
      ]
    },
    reality21: {
      title: "AI & Automation",
      desc: "Trí tuệ nhân tạo (ChatGPT, Robot) đe dọa thay thế không chỉ lao động chân tay mà cả lao động trí óc.",
      icon: <Cpu size={24} />,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      details: [
        "ChatGPT đạt 100 triệu người dùng chỉ trong 2 tháng",
        "Dự báo 300 triệu việc làm bị ảnh hưởng bởi AI (Goldman Sachs)",
        "Ngành dịch vụ khách hàng, kế toán, dịch thuật bị đe dọa",
        "Cuộc tranh luận về Universal Basic Income (UBI) nóng lên"
      ]
    }
  }
];

const TextRealityMapper: React.FC = () => {
  const [isModern, setIsModern] = useState(true);
  const [selectedMapping, setSelectedMapping] = useState<typeof mappings[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleEra = () => {
    // Glitch effect on transition
    const cards = document.querySelectorAll('.reality-card');
    gsap.to(cards, {
      skewX: 20,
      opacity: 0,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setIsModern(!isModern);
        gsap.to(cards, { skewX: 0, opacity: 1, duration: 0.2 });
      }
    });
  };

  return (
    <section className="py-24 border-t border-red-900/30 relative overflow-hidden">
      {/* Background Line Network */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef5350" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Repeat className="text-red-500 animate-spin-slow" />
                    <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Bản Đồ Đối Chiếu</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-glow">
                    Lý Luận <span className="text-red-600 px-2">&</span> Thực Tiễn
                </h2>
            </div>

            {/* Time Toggle Switch */}
            <div className="flex items-center gap-4 bg-black border border-red-900/50 p-1 rounded-full">
                <button 
                    onClick={() => !isModern || toggleEra()}
                    className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${!isModern ? 'bg-red-900 text-white shadow-[0_0_15px_#7f1d1d]' : 'text-red-700 hover:text-red-500'}`}
                >
                    Thế kỷ 19
                </button>
                <div 
                    onClick={toggleEra}
                    className="cursor-pointer w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <RefreshCcw size={16} className={`text-black transition-transform duration-500 ${isModern ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                <button 
                    onClick={() => isModern || toggleEra()}
                    className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${isModern ? 'bg-red-600 text-black shadow-[0_0_15px_#ef5350]' : 'text-red-700 hover:text-red-500'}`}
                >
                    Thế kỷ 21
                </button>
            </div>
        </div>

        <div className="space-y-8" ref={containerRef}>
            {mappings.map((item) => (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 group">
                    
                    {/* LEFT: THEORY (Constant) */}
                    <div className="lg:col-span-5 relative">
                         <div className="h-full bg-red-950/10 border-l-4 border-red-900 p-6 transition-colors group-hover:border-red-500 group-hover:bg-red-950/20">
                            {/* Image */}
                            {item.image && (
                                <div className="mb-4 rounded overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.category}
                                        className="w-full h-32 object-cover border border-red-900/30"
                                    />
                                </div>
                            )}
                            <span className="text-red-500 font-mono text-xs uppercase mb-2 block tracking-widest">
                                Lý thuyết: {item.category}
                            </span>
                            <p className="text-xl md:text-2xl font-serif text-white italic leading-relaxed mb-4">
                                "{item.theory.text}"
                            </p>
                            <div className="text-red-400 text-xs font-bold uppercase flex items-center gap-2">
                                <span className="w-4 h-px bg-red-600"></span> {item.theory.source}
                            </div>
                         </div>
                         {/* Connection Point (Desktop) */}
                         <div className="hidden lg:block absolute top-1/2 -right-4 w-3 h-3 bg-red-600 rounded-full box-glow z-20 group-hover:scale-150 transition-transform"></div>
                         <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-red-600/50 z-10"></div>
                    </div>

                    {/* CENTER: ARROW (Desktop) */}
                    <div className="lg:col-span-2 hidden lg:flex items-center justify-center relative">
                        <div className="w-full h-0.5 bg-gradient-to-r from-red-900/0 via-red-600/50 to-red-900/0"></div>
                        <div className="absolute bg-black p-2 border border-red-900 rounded-full group-hover:border-red-500 transition-colors">
                            <ArrowRight className="text-red-500 group-hover:translate-x-1 transition-transform" size={16} />
                        </div>
                    </div>

                    {/* RIGHT: REALITY (Variable) */}
                    <div className="lg:col-span-5 reality-card">
                         <div 
                            onClick={() => setSelectedMapping(item)}
                            className={`h-full border border-red-900/30 p-6 relative overflow-hidden transition-all duration-500 cursor-pointer hover:border-red-500 hover:scale-[1.02]
                            ${isModern ? 'bg-black shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'bg-[#1a0505] grayscale-[0.5]'}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded border ${isModern ? 'border-red-500 bg-red-900/20 text-red-500' : 'border-red-900 bg-black text-red-800'}`}>
                                    {isModern ? item.reality21.icon : item.reality19.icon}
                                </div>
                                <span className={`text-xs font-bold uppercase px-2 py-1 border rounded ${isModern ? 'border-red-600 text-red-500' : 'border-red-900 text-red-900'}`}>
                                    {isModern ? 'Hiện thực 2024' : 'Lịch sử 18xx'}
                                </span>
                            </div>

                            <h3 className={`text-xl font-bold uppercase mb-2 ${isModern ? 'text-white' : 'text-red-200'}`}>
                                {isModern ? item.reality21.title : item.reality19.title}
                            </h3>
                            <p className="text-red-100/70 text-sm leading-relaxed">
                                {isModern ? item.reality21.desc : item.reality19.desc}
                            </p>

                            {/* Click hint */}
                            <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                                <ExternalLink size={12} />
                                <span>Nhấn để xem chi tiết</span>
                            </div>
                            
                            {/* Decorative Corner */}
                            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isModern ? 'border-red-500' : 'border-red-900'}`}></div>
                         </div>
                    </div>

                    {/* Mobile Arrow Connector */}
                    <div className="lg:hidden flex justify-center py-2">
                        <ArrowRight className="text-red-800 rotate-90" />
                    </div>

                </div>
            ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMapping && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedMapping(null)}
        >
          <div 
            className="bg-gradient-to-br from-black via-red-950/20 to-black border border-red-900/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-red-900/30 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded border border-red-500 bg-red-900/20 text-red-500">
                  {isModern ? selectedMapping.reality21.icon : selectedMapping.reality19.icon}
                </div>
                <div>
                  <span className="text-red-500 font-mono text-xs uppercase tracking-widest block mb-1">
                    {selectedMapping.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    {isModern ? selectedMapping.reality21.title : selectedMapping.reality19.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMapping(null)}
                className="p-2 text-red-500 hover:text-white hover:bg-red-900/50 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={selectedMapping.image}
                    alt={selectedMapping.category}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <span className="text-red-500 text-xs font-bold uppercase">Khái niệm lý thuyết</span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={isModern ? selectedMapping.reality21.image : selectedMapping.reality19.image}
                    alt={isModern ? selectedMapping.reality21.title : selectedMapping.reality19.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <span className="text-red-500 text-xs font-bold uppercase">
                      {isModern ? 'Thực tiễn thế kỷ 21' : 'Thực tiễn thế kỷ 19'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Theory Section */}
              <div className="bg-red-950/20 border-l-4 border-red-600 p-6 rounded-r-lg">
                <div className="flex items-center gap-2 text-red-500 mb-3">
                  <BookOpen size={18} />
                  <span className="font-bold uppercase text-sm">Lý thuyết gốc</span>
                </div>
                <p className="text-xl font-serif text-white italic leading-relaxed mb-4">
                  "{selectedMapping.theory.fullText}"
                </p>
                <div className="text-red-400 text-xs font-bold uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-red-600"></span> {selectedMapping.theory.source}
                </div>
              </div>

              {/* Reality Details */}
              <div className="bg-black border border-red-900/30 p-6 rounded-lg">
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <Clock size={18} />
                  <span className="font-bold uppercase text-sm">
                    {isModern ? 'Thực tiễn thế kỷ 21' : 'Thực tiễn thế kỷ 19'}
                  </span>
                </div>
                
                <p className="text-red-100/80 mb-6">
                  {isModern ? selectedMapping.reality21.desc : selectedMapping.reality19.desc}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <Lightbulb size={16} />
                    <span className="font-bold uppercase text-xs">Chi tiết quan trọng</span>
                  </div>
                  {(isModern ? selectedMapping.reality21.details : selectedMapping.reality19.details).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-red-100/70">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Era Toggle in Modal */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModern(!isModern)}
                  className="flex items-center gap-3 bg-red-900/30 hover:bg-red-900/50 border border-red-900 px-6 py-3 rounded-full transition-colors"
                >
                  <RefreshCcw size={18} className="text-red-500" />
                  <span className="text-white font-bold">
                    Chuyển sang {isModern ? 'Thế kỷ 19' : 'Thế kỷ 21'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TextRealityMapper;