import React, { useState } from 'react';
import { User, Book, MapPin, Calendar, GitBranch, ExternalLink, Quote, Lightbulb, Library } from 'lucide-react';

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
        quote: "Cái gì hợp lý thì tồn tại, cái gì tồn tại thì hợp lý.",
        majorWorks: ["Hiện tượng học tinh thần", "Khoa học logic"],
        funFact: "Ông từng nói 'Chỉ có một người hiểu tôi', nhưng sau đó lại thêm 'và người đó cũng không hiểu nốt'."
    },
    {
        id: 'feuerbach',
        name: "Ludwig Feuerbach",
        image: "data:image/jpeg;base64,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",
        era: "1804 - 1872",
        nation: "Đức",
        school: "Chủ nghĩa Duy vật Nhân bản",
        coreIdea: "Chủ nghĩa duy vật siêu hình",
        connection: "Mác kế thừa chủ nghĩa duy vật vô thần, loại bỏ tính siêu hình để xây dựng CNDV Biện chứng.",
        quote: "Con người là sản phẩm của tự nhiên, không phải của Chúa.",
        majorWorks: ["Bản chất của Cơ đốc giáo"],
        funFact: "Ông nổi tiếng với câu chơi chữ trong tiếng Đức: 'Der Mensch ist, was er isst' (Con người là những gì họ ăn)."
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
        quote: "Lao động là nguồn gốc của mọi sự giàu có.",
        majorWorks: ["Của cải của các dân tộc", "Lý thuyết về các tình cảm luân lý"],
        funFact: "Ông đãng trí đến mức từng nướng bánh mì bằng bơ thay vì phết bơ lên bánh mì và phàn nàn rằng trà có vị lạ."
    },
    {
        id: 'owen',
        name: "Robert Owen",
        image: "data:image/jpeg;base64,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",
        era: "1771 - 1858",
        nation: "Anh",
        school: "CNXH Không tưởng",
        coreIdea: "Xây dựng xã hội công bằng bằng thực nghiệm",
        connection: "Tiền đề tư tưởng cho CNXH Khoa học, dù còn hạn chế về phương pháp cách mạng.",
        quote: "Môi trường tạo nên tính cách con người.",
        majorWorks: ["Quan điểm mới về xã hội"],
        funFact: "Ông đã mua cả một thị trấn ở Mỹ (New Harmony) để thử nghiệm xã hội chủ nghĩa của mình, nhưng nó đã thất bại sau 2 năm."
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
        quote: "Vô sản toàn thế giới, đoàn kết lại!",
        majorWorks: ["Tư bản", "Tuyên ngôn của Đảng Cộng sản", "Hệ tư tưởng Đức"],
        funFact: "Mác từng muốn làm nhà thơ lãng mạn trước khi chuyển sang triết học. Ông có biệt danh là 'Moor' vì nước da ngăm đen."
    },
    {
        id: 'engels',
        name: "Friedrich Engels",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Friedrich_Engels_portrait_%28cropped%29.jpg",
        era: "1820 - 1895",
        nation: "Đức",
        school: "CNXH Khoa học",
        coreIdea: "Hệ thống hóa học thuyết Mác & CNDV Biện chứng",
        connection: "Người bạn vĩ đại của Mác. 'Cây vĩ cầm thứ hai' xuất sắc. Hoàn thiện các tác phẩm của Mác sau khi Mác qua đời.",
        quote: "Sự vận động là phương thức tồn tại của vật chất.",
        majorWorks: ["Biện chứng của tự nhiên", "Nguồn gốc của gia đình, của chế độ tư hữu và của nhà nước"],
        funFact: "Ông là một doanh nhân thành đạt, thích cưỡi ngựa săn cáo và uống rượu sâm banh, trái ngược với hình ảnh khắc khổ thường thấy."
    },
    {
        id: 'lenin',
        name: "V.I. Lenin",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQubjEAobczJywnFKGFeASTbcmt0EB0zrRvA&s",
        era: "1870 - 1924",
        nation: "Nga (Liên Xô)",
        school: "Chủ nghĩa Mác - Lênin",
        coreIdea: "Lý luận về CN Đế quốc & Đảng kiểu mới",
        connection: "Vận dụng sáng tạo và phát triển toàn diện CN Mác trong thời đại Đế quốc chủ nghĩa. Người hiện thực hóa CN Mác bằng CMT10 Nga.",
        quote: "Học, học nữa, học mãi.",
        majorWorks: ["Nhà nước và Cách mạng", "Làm gì?", "Chủ nghĩa đế quốc - giai đoạn tột cùng của CNTB"],
        funFact: "Ông từng bị đuổi học khỏi Đại học Kazan vì tham gia biểu tình sinh viên khi mới 17 tuổi."
    },
    {
        id: 'ricardo',
        name: "David Ricardo",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/David_Ricardo_%28grey%29.jpg/250px-David_Ricardo_%28grey%29.jpg",
        era: "1772 - 1823",
        nation: "Anh",
        school: "Kinh tế Chính trị Cổ điển",
        coreIdea: "Quy luật Sắt về Tiền lương",
        connection: "Mác đánh giá là nhà kinh tế học vĩ đại nhất thời đại ông. Đặt nền móng quan trọng cho học thuyết giá trị lao động.",
        quote: "Lợi nhuận tỉ lệ nghịch với tiền lương.",
        majorWorks: ["Những nguyên lý của kinh tế chính trị và thuế khóa"],
        funFact: "Ông kiếm được gia tài khổng lồ từ thị trường chứng khoán trước khi trở thành nhà kinh tế học và nghỉ hưu ở tuổi 42."
    },
    {
        id: 'saintsimon',
        name: "Saint-Simon",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Portrait_de_Claude-Henri_de_Rouvroy_comte_de_Saint-Simon.jpg",
        era: "1760 - 1825",
        nation: "Pháp",
        school: "CNXH Không tưởng",
        coreIdea: "Xã hội công nghiệp & Giai cấp",
        connection: "Mác coi ông là cha đẻ của CNXH Pháp. Dự báo thiên tài về sự thay thế của các hình thái xã hội.",
        quote: "Mọi người phải lao động.",
        majorWorks: ["Hệ thống công nghiệp", "Cơ đốc giáo mới"],
        funFact: "Ông từng ra lệnh cho người hầu đánh thức mình mỗi sáng bằng câu: 'Dậy đi ngài bá tước, ngài còn những việc lớn phải làm'."
    },
    {
        id: 'fourier',
        name: "Charles Fourier",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Fran%C3%A7oise_Foliot_-_Jean_Gigoux_-_Portrait_de_Charles_Fourrier_%28cropped%29_%281%29.jpg/960px-Fran%C3%A7oise_Foliot_-_Jean_Gigoux_-_Portrait_de_Charles_Fourrier_%28cropped%29_%281%29.jpg",
        era: "1772 - 1837",
        nation: "Pháp",
        school: "CNXH Không tưởng",
        coreIdea: "Phê phán văn minh tư bản",
        connection: "Sự phê phán xã hội tư sản của Fourier là mẫu mực mà Mác đánh giá rất cao. Ý tưởng về giải phóng phụ nữ.",
        quote: "Trình độ giải phóng phụ nữ là thước đo giải phóng xã hội.",
        majorWorks: ["Lý thuyết về bốn sự vận động", "Thế giới công nghiệp và xã hội mới"],
        funFact: "Ông đã đợi ở nhà mỗi trưa trong 10 năm để chờ một 'nhà hảo tâm' đến tài trợ cho dự án xã hội của mình, nhưng không ai đến."
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
                    <div className="overflow-y-auto max-h-[400px] lg:max-h-[700px] scrollbar-thin scrollbar-thumb-red-900">
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
                                <span className="flex items-center gap-1"><MapPin size={12} /> {activePhilosopher.nation}</span>
                                <span className="flex items-center gap-1"><Calendar size={12} /> {activePhilosopher.era}</span>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-red-900/10 p-4 border border-red-900/30">
                                        <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                            <Library size={14} /> Tác phẩm tiêu biểu
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                            {/* @ts-ignore */}
                                            {activePhilosopher.majorWorks?.map((work: string, idx: number) => (
                                                <li key={idx}>{work}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-yellow-900/10 p-4 border border-yellow-900/30">
                                        <h4 className="text-yellow-500 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                            <Lightbulb size={14} /> Sự thật thú vị
                                        </h4>
                                        <p className="text-yellow-100/80 text-sm leading-relaxed italic">
                                            {/* @ts-ignore */}
                                            "{activePhilosopher.funFact}"
                                        </p>
                                    </div>
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