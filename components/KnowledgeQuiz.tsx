import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCcw, BrainCircuit, AlertTriangle } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Ba nguồn gốc lý luận của Chủ nghĩa Mác là gì?",
    options: [
      "Triết học Cổ điển Đức, Kinh tế chính trị Anh, CNXH Không tưởng",
      "Triết học Khai sáng Pháp, Kinh tế học Mỹ, CNXH Khoa học",
      "Văn học Cổ điển Nga, Sử học Trung Hoa, Triết học Ấn Độ",
      "Chủ nghĩa Hiện sinh, Kinh tế vĩ mô, Chủ nghĩa Nhân đạo"
    ],
    answer: 0,
    explanation: "Đúng! C.Mác đã kế thừa có phê phán 3 trào lưu tư tưởng tinh hoa nhất của nhân loại thế kỷ 19."
  },
  {
    id: 2,
    question: "Mác đã kế thừa 'hạt nhân hợp lý' nào trong triết học của Hegel?",
    options: [
      "Chủ nghĩa duy tâm khách quan",
      "Phép biện chứng (tư tưởng về sự vận động)",
      "Quan điểm siêu hình",
      "Thuyết không thể biết (Bất khả tri)"
    ],
    answer: 1,
    explanation: "Chính xác. Mác giữ lại phép biện chứng nhưng loại bỏ vỏ bọc duy tâm thần bí của Hegel."
  },
  {
    id: 3,
    question: "Phát kiến vĩ đại nào của Mác đã vạch trần bản chất bóc lột của CNTB?",
    options: [
      "Quy luật Cung - Cầu",
      "Bàn tay vô hình",
      "Học thuyết Giá trị thặng dư",
      "Lý thuyết Tiền tệ"
    ],
    answer: 2,
    explanation: "Tuyệt vời. Giá trị thặng dư (m) là phần giá trị do công nhân làm ra bị nhà tư bản chiếm đoạt."
  },
  {
    id: 4,
    question: "Hạn chế lớn nhất của Chủ nghĩa xã hội Không tưởng là gì?",
    options: [
      "Không phê phán xã hội tư bản",
      "Không phát hiện ra sứ mệnh lịch sử của giai cấp công nhân",
      "Không muốn xây dựng xã hội tốt đẹp",
      "Chủ trương dùng bạo lực ngay từ đầu"
    ],
    answer: 1,
    explanation: "Đúng vậy. Họ muốn giải phóng xã hội nhưng không tìm ra lực lượng xã hội nào có thể thực hiện điều đó."
  },
  {
    id: 5,
    question: "Theo quan điểm Duy vật lịch sử, yếu tố nào quyết định Kiến trúc thượng tầng?",
    options: [
      "Tồn tại xã hội",
      "Ý thức xã hội",
      "Cơ sở hạ tầng",
      "Vĩ nhân và lãnh tụ"
    ],
    answer: 2,
    explanation: "Chính xác. Cơ sở hạ tầng (Kinh tế) quyết định Kiến trúc thượng tầng (Chính trị, Pháp luật...)."
  }
];

const KnowledgeQuiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedOpt !== null) return; // Prevent changing answer
    setSelectedOpt(index);
    setShowResult(true);
    if (index === questions[currentQ].answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <section className="py-16 border-t border-red-900/30">
        <div className="flex items-center gap-4 mb-10">
            <BrainCircuit className="text-red-600 animate-pulse" size={32} />
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Kiểm Tra <span className="text-red-600">Nhận Thức</span>
            </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-black border border-red-900/50 p-1 relative overflow-hidden group shadow-[0_0_50px_rgba(220,38,38,0.1)]">
            
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>

            <div className="bg-red-950/5 p-6 md:p-10 relative z-10">
                {!isFinished ? (
                    <>
                        {/* Progress Header */}
                        <div className="flex justify-between items-end mb-6 border-b border-red-900/30 pb-4">
                            <div>
                                <span className="text-red-500 font-bold text-xs uppercase tracking-widest">Câu hỏi {currentQ + 1} / {questions.length}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white mt-2 leading-tight">
                                    {questions[currentQ].question}
                                </h3>
                            </div>
                            <div className="text-4xl font-black text-red-900/20">
                                0{currentQ + 1}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQ].options.map((opt, idx) => {
                                let stateStyle = "border-red-900/30 text-red-100 hover:border-red-500 hover:bg-red-900/10";
                                if (selectedOpt !== null) {
                                    if (idx === questions[currentQ].answer) {
                                        stateStyle = "bg-green-900/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                                    } else if (idx === selectedOpt) {
                                        stateStyle = "bg-red-900/20 border-red-500 text-red-400 shake";
                                    } else {
                                        stateStyle = "opacity-50 border-transparent grayscale";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        disabled={selectedOpt !== null}
                                        className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between group/btn ${stateStyle}`}
                                    >
                                        <span className="font-medium text-sm md:text-base">{opt}</span>
                                        {selectedOpt !== null && idx === questions[currentQ].answer && <CheckCircle size={20} />}
                                        {selectedOpt !== null && idx === selectedOpt && idx !== questions[currentQ].answer && <XCircle size={20} />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation & Next Button */}
                        {showResult && (
                            <div className="mt-8 animate-fadeIn">
                                <div className={`p-4 border-l-4 ${selectedOpt === questions[currentQ].answer ? 'border-green-500 bg-green-900/10' : 'border-red-500 bg-red-900/10'} mb-6`}>
                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${selectedOpt === questions[currentQ].answer ? 'text-green-500' : 'text-red-500'}`}>
                                        {selectedOpt === questions[currentQ].answer ? 'Giải thích' : 'Đáp án đúng'}
                                    </h4>
                                    <p className="text-white text-sm">
                                        {questions[currentQ].explanation}
                                    </p>
                                </div>
                                <button 
                                    onClick={nextQuestion}
                                    className="w-full py-3 bg-red-600 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-lg"
                                >
                                    {currentQ === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                                </button>
                            </div>
                        )}
                        
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-950">
                            <div 
                                className="h-full bg-red-600 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </>
                ) : (
                    /* Final Result Screen */
                    <div className="text-center py-10">
                        <div className="mb-6 relative inline-block">
                             <Trophy size={64} className={`mx-auto ${score === questions.length ? 'text-yellow-500 animate-bounce' : 'text-red-600'}`} />
                             {score === questions.length && (
                                 <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
                             )}
                        </div>
                        
                        <h2 className="text-4xl font-black text-white uppercase mb-2">Hoàn Thành</h2>
                        <div className="text-6xl font-black text-red-500 mb-6 text-glow">
                            {score} / {questions.length}
                        </div>
                        
                        <p className="text-red-200 mb-10 max-w-md mx-auto">
                            {score === questions.length 
                                ? "Tuyệt vời! Bạn đã nắm vững các kiến thức cốt lõi của Chủ nghĩa Xã hội Khoa học." 
                                : score > questions.length / 2 
                                    ? "Kết quả khá tốt. Hãy ôn tập thêm các phần lý luận nền tảng."
                                    : "Cần cố gắng hơn. Hãy xem lại phần 'Hồ Sơ Đại Biểu' và '3 Nguồn Gốc Lý Luận'."}
                        </p>

                        <button 
                            onClick={restartQuiz}
                            className="inline-flex items-center gap-2 px-8 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-300 font-bold uppercase tracking-widest"
                        >
                            <RefreshCcw size={16} /> Làm lại
                        </button>
                    </div>
                )}
            </div>
        </div>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .shake { animation: shake 0.3s ease-in-out; }
        `}</style>
    </section>
  );
};

export default KnowledgeQuiz;