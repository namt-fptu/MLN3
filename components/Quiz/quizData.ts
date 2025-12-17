import { Category } from './types';

export const quizCategories: Category[] = [
  {
    id: 'basic_theory',
    title: 'Lý Luận Cơ Bản',
    icon: 'Brain',
    description: 'Các khái niệm nền tảng của Chủ nghĩa Mác - Lênin.',
    questions: [
      {
        id: 101,
        type: 'multiple',
        question: "Đối tượng nghiên cứu của Chủ nghĩa xã hội khoa học là gì?",
        options: [
          "Những quy luật chính trị - xã hội của quá trình phát sinh, hình thành và phát triển hình thái KT-XH cộng sản chủ nghĩa.",
          "Những quy luật kinh tế của quá trình sản xuất và trao đổi hàng hóa.",
          "Những vấn đề cơ bản của tư duy và tồn tại.",
          "Lịch sử phát triển của các học thuyết xã hội."
        ],
        correctAnswer: 0,
        explanation: "CNXH Khoa học tập trung vào quy luật chính trị - xã hội của sự chuyển biến từ CNTB lên CNXH."
      },
      {
        id: 102,
        type: 'fillBlank',
        question: "Điền vào chỗ trống: 'Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của ______'.",
        correctAnswer: "tất cả mọi người",
        explanation: "Đây là câu nói nổi tiếng trong Tuyên ngôn của Đảng Cộng sản (1848)."
      },
      {
        id: 103,
        type: 'trueFalse',
        question: "Chủ nghĩa Mác - Lênin là hệ thống lý luận đóng, tuyệt đích, không cần bổ sung phát triển?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Đây là hệ thống lý luận mở, mang bản chất khoa học và cách mạng, cần không ngừng được bổ sung và phát triển dựa trên thực tiễn."
      },
      {
        id: 104,
        type: 'multiple',
        question: "Ba bộ phận cấu thành của Chủ nghĩa Mác - Lênin bao gồm?",
        options: [
          "Triết học Mác - Lênin, Kinh tế chính trị Mác - Lênin, Chủ nghĩa xã hội khoa học",
          "Triết học, Kinh tế học, Xã hội học",
          "Chủ nghĩa duy vật, Chủ nghĩa duy tâm, Chủ nghĩa hiện sinh",
          "Đạo đức học, Thẩm mỹ học, Logic học"
        ],
        correctAnswer: 0,
        explanation: "Đây là 3 trụ cột lý luận thống nhất, không thể tách rời của chủ nghĩa Mác - Lênin."
      },
      {
        id: 105,
        type: 'multiple',
        question: "Theo quan điểm duy vật biện chứng, vai trò của thực tiễn đối với nhận thức là gì?",
        options: [
          "Là cơ sở, động lực, mục đích và tiêu chuẩn của chân lý",
          "Chỉ là nơi kiểm nghiệm lý thuyết",
          "Không có vai trò quan trọng",
          "Là kết quả của tư duy trừu tượng"
        ],
        correctAnswer: 0,
        explanation: "Thực tiễn là điểm xuất phát và là mục đích cuối cùng của nhận thức. Ví dụ: Từ việc quan sát táo rơi (thực tiễn), Newton tìm ra định luật hấp dẫn (lý thuyết)."
      },
      {
        id: 106,
        type: 'multiple',
        question: "Trong mối quan hệ giữa vật chất và ý thức, Quan điểm của chủ nghĩa duy vật biện chứng là gì?",
        options: [
          "Vật chất quyết định ý thức, ý thức tác động trở lại vật chất",
          "Ý thức quyết định vật chất",
          "Vật chất và ý thức tồn tại độc lập",
          "Ý thức sinh ra vật chất"
        ],
        correctAnswer: 0,
        explanation: "Vật chất là nguồn gốc khách quan, ý thức là sự phản ánh năng động, sáng tạo."
      },
      {
        id: 107,
        type: 'fillBlank',
        question: "Điền vào chỗ trống: 'Trong tính hiện thực của nó, bản chất con người là ______ của toàn bộ các quan hệ xã hội'.",
        correctAnswer: "tổng hòa",
        explanation: "Luận điểm này của C.Mác khẳng định bản chất xã hội của con người."
      },
      {
        id: 108,
        type: 'fillBlank',
        question: "Phương pháp luận chung nhất của chủ nghĩa Mác - Lênin là chủ nghĩa ______.",
        correctAnswer: "duy vật biện chứng",
        explanation: "Đây là phương pháp luận khoa học để nhận thức và cải tạo thế giới."
      },
      {
        id: 109,
        type: 'trueFalse',
        question: "Triết học Mác - Lênin có nhiệm vụ nghiên cứu những quy luật chung nhất của tự nhiên, xã hội và tư duy?",
        options: ["Đúng", "Sai"],
        correctAnswer: 0,
        explanation: "Đúng. Đó là đối tượng nghiên cứu đặc thù của Triết học Mác - Lênin."
      },
      {
        id: 110,
        type: 'trueFalse',
        question: "Theo quan điểm Mác - Lênin, con người chỉ là sản phẩm thụ động của hoàn cảnh lịch sử?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Con người vừa là sản phẩm của lịch sử, vừa là chủ thể sáng tạo ra lịch sử."
      }
    ]
  },
  {
    id: 'dialectics',
    title: 'Quy Luật Biện Chứng',
    icon: 'Repeat',
    description: 'Sự vận động, mâu thuẫn và phủ định của phủ định.',
    questions: [
      {
        id: 201,
        type: 'multiple',
        question: "Theo phép biện chứng duy vật, nguồn gốc của sự phát triển là gì?",
        options: [
          "Sự tác động của các thế lực siêu nhiên.",
          "Sự đấu tranh giữa các mặt đối lập trong bản thân sự vật.",
          "Sự tăng lên đơn thuần về lượng.",
          "Sự thay đổi môi trường bên ngoài."
        ],
        correctAnswer: 1,
        explanation: "Mâu thuẫn là nguồn gốc và động lực của sự phát triển."
      },
      {
        id: 202,
        type: 'multiple',
        question: "Quy luật nào vạch ra cách thức của sự vận động và phát triển?",
        options: [
          "Quy luật mâu thuẫn",
          "Quy luật phủ định của phủ định",
          "Quy luật lượng - chất",
          "Quy luật quan hệ sản xuất"
        ],
        correctAnswer: 2,
        explanation: "Quy luật chuyển hóa từ những thay đổi về lượng dẫn đến sự thay đổi về chất."
      },
      {
        id: 203,
        type: 'trueFalse',
        question: "Phủ định biện chứng là sự xóa bỏ hoàn toàn cái cũ?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Phủ định biện chứng có tính kế thừa, giữ lại những hạt nhân hợp lý của cái cũ."
      },
      {
        id: 204,
        type: 'multiple',
        question: "Câu tục ngữ 'Góp gió thành bão' thể hiện quy luật biện chứng nào?",
        options: [
          "Lượng - Chất",
          "Mâu thuẫn",
          "Phủ định của phủ định",
          "Cơ sở hạ tầng - Kiến trúc thượng tầng"
        ],
        correctAnswer: 0,
        explanation: "Sự tích lũy dần về lượng đến một độ nhất định sẽ dẫn đến sự thay đổi về chất. Ví dụ: Nước đun đến 100 độ C (lượng đổi) sẽ hóa hơi (chất đổi)."
      },
      {
        id: 205,
        type: 'multiple',
        question: "Trong cặp phạm trù Tất nhiên và Ngẫu nhiên, cái Tất nhiên vạch đường đi cho mình thông qua cái gì?",
        options: [
          "Vô số cái Ngẫu nhiên",
          "Ý muốn chủ quan",
          "Sự sắp đặt của thượng đế",
          "Các quy luật kinh tế"
        ],
        correctAnswer: 0,
        explanation: "Cái tất nhiên bao giờ cũng tự vạch đường đi cho mình thông qua vô số cái ngẫu nhiên."
      },
      {
        id: 206,
        type: 'multiple',
        question: "Sự khác biệt căn bản giữa phép biện chứng duy vật (Mác) và phép biện chứng duy tâm (Hegel) nằm ở đâu?",
        options: [
          "Nền tảng thế giới quan (Vật chất vs Ý niệm)",
          "Số lượng các quy luật",
          "Đối tượng nghiên cứu",
          "Phương pháp suy luận"
        ],
        correctAnswer: 0,
        explanation: "Mác đã 'lật ngược' phép biện chứng của Hegel, đặt nó trên nền tảng duy vật thay vì ý niệm tuyệt đối."
      },
      {
        id: 207,
        type: 'fillBlank',
        question: "Điền vào chỗ trống: 'Mâu thuẫn biện chứng là sự thống nhất và ______ của các mặt đối lập'.",
        correctAnswer: "đấu tranh",
        explanation: "Hai mặt đối lập vừa nương tựa vào nhau (thống nhất), vừa bài trừ phủ định nhau (đấu tranh)."
      },
      {
        id: 208,
        type: 'fillBlank',
        question: "Trong mối quan hệ giữa Nội dung và Hình thức, ______ giữ vai trò quyết định.",
        correctAnswer: "nội dung",
        explanation: "Nội dung quyết định hình thức, hình thức tác động trở lại nội dung."
      },
      {
        id: 209,
        type: 'fillBlank',
        question: "Quy luật Phủ định của phủ định chỉ ra khuynh hướng của sự phát triển theo hình đường ______.",
        correctAnswer: "xoáy ốc",
        explanation: "Sự phát triển không phải là đường thẳng hay vòng tròn khép kín, mà là đường xoáy ốc đi lên."
      },
      {
        id: 210,
        type: 'trueFalse',
        question: "Mối liên hệ nhân quả có tính khách quan, phổ biến và tất yếu?",
        options: ["Đúng", "Sai"],
        correctAnswer: 0,
        explanation: "Đúng. Không có sự vật nào xuất hiện mà không có nguyên nhân, và nguyên nhân nhất định sẽ sinh ra kết quả."
      },
      {
        id: 211,
        type: 'trueFalse',
        question: "Quan điểm toàn diện yêu cầu chúng ta phải dàn trải bình quân, coi mọi mối liên hệ đều quan trọng như nhau?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Quan điểm toàn diện đòi hỏi xem xét tất cả các mặt nhưng phải biết phân biệt trọng tâm, trọng điểm."
      }
    ]
  },
  {
    id: 'economic_formations',
    title: 'Hình Thái KT-XH',
    icon: 'Layers',
    description: 'Lịch sử phát triển và thay thế của các xã hội.',
    questions: [
      {
        id: 301,
        type: 'fillBlank',
        question: "Yếu tố nào đóng vai trò quyết định nhất trong Lực lượng sản xuất?",
        correctAnswer: "người lao động",
        explanation: "Người lao động với kỹ năng và trí tuệ là chủ thể sáng tạo và sử dụng công cụ lao động."
      },
      {
        id: 302,
        type: 'multiple',
        question: "Cấu trúc của Hình thái kinh tế - xã hội bao gồm những yếu tố nào?",
        options: [
          "Lực lượng sản xuất, Quan hệ sản xuất, Kiến trúc thượng tầng",
          "Văn hóa, Chính trị, Xã hội",
          "Cơ sở hạ tầng, Kỹ thuật, Công nghệ",
          "Nhà nước, Đảng phái, Giáo hội"
        ],
        correctAnswer: 0,
        explanation: "Đây là 3 thành tố cơ bản cấu thành nên một hình thái KT-XH."
      },
      {
        id: 303,
        type: 'multiple',
        question: "Nguyên nhân sâu xa của sự thay đổi các hình thái kinh tế - xã hội là gì?",
        options: [
          "Sự phát triển của Lực lượng sản xuất",
          "Ý muốn của giai cấp thống trị",
          "Sự can thiệp của bên ngoài",
          "Sự suy đồi đạo đức"
        ],
        correctAnswer: 0,
        explanation: "Khi LLSX phát triển mâu thuẫn với QHSX lỗi thời, nó đòi hỏi phải thay đổi QHSX, kéo theo thay đổi KTTT."
      },
      {
        id: 304,
        type: 'multiple',
        question: "Lịch sử xã hội loài người đã và đang trải qua 5 hình thái kinh tế - xã hội nào theo trình tự?",
        options: [
          "Công xã nguyên thủy -> Chiếm hữu nô lệ -> Phong kiến -> TBCN -> CSCN",
          "Chiếm hữu nô lệ -> Phong kiến -> TBCN -> XHCN -> CSCN",
          "Công xã nguyên thủy -> Phong kiến -> Chiếm hữu nô lệ -> TBCN -> CSCN",
          "Thị tộc -> Bộ lạc -> Nhà nước -> Đế quốc -> Cộng đồng toàn cầu"
        ],
        correctAnswer: 0,
        explanation: "Đây là tuần tự phát triển tự nhiên của lịch sử nhân loại theo quan điểm của chủ nghĩa Mác."
      },
      {
        id: 305,
        type: 'multiple',
        question: "Trong mối quan hệ giữa Cơ sở hạ tầng (CSHT) và Kiến trúc thượng tầng (KTTT), yếu tố nào giữ vai trò quyết định?",
        options: [
          "Cơ sở hạ tầng quyết định Kiến trúc thượng tầng",
          "Kiến trúc thượng tầng quyết định Cơ sở hạ tầng",
          "Hai yếu tố độc lập, không tác động lẫn nhau",
          "Tùy thuộc vào từng giai đoạn lịch sử"
        ],
        correctAnswer: 0,
        explanation: "CSHT (kinh tế) sinh ra KTTT (chính trị, tư tưởng) tương ứng và quyết định tính chất của nó."
      },
      {
        id: 306,
        type: 'multiple',
        question: "C.Mác coi sự phát triển của các hình thái kinh tế - xã hội là một quá trình gì?",
        options: [
          "Quá trình lịch sử - tự nhiên",
          "Quá trình ngẫu nhiên, vô định",
          "Quá trình phụ thuộc vào ý chí của Chúa",
          "Quá trình đấu tranh giai cấp đơn thuần"
        ],
        correctAnswer: 0,
        explanation: "Sự thay thế các hình thái KT-XH tuân theo các quy luật khách quan, không phụ thuộc vào ý muốn chủ quan."
      },
      {
        id: 307,
        type: 'multiple',
        question: "Điểm khác biệt căn bản về phương thức bóc lột giữa Chủ nghĩa tư bản và Chế độ phong kiến là gì?",
        options: [
          "Phong kiến dựa trên địa tô và cưỡng bức siêu kinh tế; CNTB dựa trên giá trị thặng dư và hợp đồng lao động tự do.",
          "Phong kiến bóc lột nô lệ; CNTB bóc lột nông dân.",
          "Phong kiến bóc lột bằng máy móc; CNTB bóc lột bằng thủ công.",
          "Không có sự khác biệt về bản chất, chỉ khác về hình thức."
        ],
        correctAnswer: 0,
        explanation: "Trong CNTB, người lạo động được tự do về thân thể nhưng buộc phải bán sức lao động để sống."
      },
      {
        id: 308,
        type: 'multiple',
        question: "Mâu thuẫn cơ bản của phương thức sản xuất Tư bản chủ nghĩa là gì?",
        options: [
          "Mâu thuẫn giữa tính chất xã hội hóa của LLSX với chế độ chiếm hữu tư nhân TBCN về TLSX",
          "Mâu thuẫn giữa giai cấp tư sản và giai cấp quý tộc",
          "Mâu thuẫn giữa các nhà tư bản với nhau",
          "Mâu thuẫn giữa sản xuất và tiêu dùng"
        ],
        correctAnswer: 0,
        explanation: "Mâu thuẫn giữa LLSX mang tính xã hội hóa cao (sản xuất tập trung) với QHSX dựa trên chế độ chiếm hữu tư nhân (lợi nhuận rơi vào túi số ít nhà tư bản)."
      },
      {
        id: 309,
        type: 'trueFalse',
        question: "Sự khác biệt căn bản nhất giữa CNXH và CNTB là chế độ sở hữu tư liệu sản xuất?",
        options: ["Đúng", "Sai"],
        correctAnswer: 0,
        explanation: "Đúng. CNXH dựa trên chế độ công hữu về TLSX chủ yếu, còn CNTB dựa trên chế độ tư hữu."
      },
      {
        id: 310,
        type: 'fillBlank',
        question: "Nguyên tắc phân phối cơ bản trong giai đoạn thấp của xã hội cộng sản (giai đoạn xã hội chủ nghĩa) là: 'Làm theo năng lực, hưởng theo ______'.",
        correctAnswer: "lao động",
        explanation: "Trong giai đoạn này, sự phân phối dựa trên kết quả và hiệu quả lao động cống hiến."
      },
      {
        id: 311,
        type: 'multiple',
        question: "Đặc điểm nổi bật nhất của thời kỳ quá độ lên Chủ nghĩa xã hội là gì?",
        options: [
          "Sự đan xen, đấu tranh giữa những yếu tố của xã hội mới và tàn tích của xã hội cũ trên mọi lĩnh vực",
          "Nền kinh tế hoàn toàn là công hữu",
          "Không còn đấu tranh giai cấp",
          "Xã hội đã đạt đến sự giàu có tột đỉnh"
        ],
        correctAnswer: 0,
        explanation: "Thời kỳ quá độ là giai đoạn chuyển tiếp phức tạp, 'cái cũ chưa mất đi hoàn toàn, cái mới chưa thắng thế hoàn toàn'."
      },
      {
        id: 312,
        type: 'multiple',
        question: "C.Mác ví vai trò của các cuộc cách mạng xã hội trong lịch sử là gì?",
        options: [
          "Đầu tàu của lịch sử",
          "Cơn ác mộng của nhân loại",
          "Sự thụt lùi của văn minh",
          "Những tai nạn ngẫu nhiên"
        ],
        correctAnswer: 0,
        explanation: "Cách mạng xã hội là phương thức, động lực để thay thế hình thái KT-XH lỗi thời bằng hình thái cao hơn."
      }
    ]
  },
  {
    id: 'scientific_origins',
    title: 'Nguồn Gốc Khoa Học',
    icon: 'BookOpen',
    description: 'Tiền đề tư tưởng và sự ra đời của học thuyết.',
    questions: [
      {
        id: 401,
        type: 'multiple',
        question: "Ai là đại biểu xuất sắc của nền Triết học cổ điển Đức?",
        options: [
          "Adam Smith & David Ricardo",
          "Hegel & Feuerbach",
          "Saint-Simon & Fourier",
          "Plato & Aristotle"
        ],
        correctAnswer: 1,
        explanation: "Hegel (Phép biện chứng) và Feuerbach (Chủ nghĩa duy vật) là tiền đề cho Triết học Mác."
      },
      {
        id: 402,
        type: 'trueFalse',
        question: "Chủ nghĩa xã hội không tưởng Anh-Pháp đã phát hiện ra sứ mệnh lịch sử của giai cấp công nhân?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Đây là hạn chế lớn nhất của họ. Mác và Ăngghen mới là người phát hiện ra điều này."
      },
      {
        id: 403,
        type: 'multiple',
        question: "C.Mác đã kế thừa 'hạt nhân hợp lý' nào trong triết học của G.W.F. Hegel?",
        options: [
          "Phép biện chứng",
          "Chủ nghĩa duy vật",
          "Tư tưởng về nhà nước pháp quyền",
          "Đạo đức học"
        ],
        correctAnswer: 0,
        explanation: "C.Mác đã cải tạo phép biện chứng duy tâm của Hegel thành phép biện chứng duy vật."
      },
      {
        id: 404,
        type: 'multiple',
        question: "Học thuyết giá trị thặng dư của C.Mác được xây dựng trên cơ sở kế thừa trực tiếp từ di sản nào?",
        options: [
          "Kinh tế chính trị học cổ điển Anh (A.Smith, D.Ricardo)",
          "Chủ nghĩa trọng thương",
          "Chủ nghĩa trọng nông",
          "Kinh tế học tầm thường"
        ],
        correctAnswer: 0,
        explanation: "C.Mác kế thừa học thuyết giá trị lao động của A.Smith và D.Ricardo để phát triển thành học thuyết giá trị thặng dư."
      },
      {
        id: 405,
        type: 'multiple',
        question: "Ba nhà tư tưởng tiêu biểu của Chủ nghĩa xã hội không tưởng phê phán đầu thế kỷ XIX là ai?",
        options: [
          "H.Saint-Simon, C.Fourier, R.Owen",
          "C.Mác, Ph.Ăngghen, V.I.Lênin",
          "A.Smith, D.Ricardo, Petty",
          "Hegel, Feuerbach, Kant"
        ],
        correctAnswer: 0,
        explanation: "Đây là những người đã phê phán gay gắt CNTB và phác thảo về xã hội tương lai, nhưng chưa tìm ra con đường thực hiện đúng đắn."
      },
      {
        id: 406,
        type: 'multiple',
        question: "Phong trào đấu tranh nào sau đây KHÔNG thuộc về tiền đề thực tiễn cho sự ra đời của Chủ nghĩa Mác?",
        options: [
          "Cách mạng tháng Mười Nga (1917)",
          "Phong trào Hiến chương ở Anh (1836-1848)",
          "Khởi nghĩa của thợ dệt thành phố Lyon, Pháp (1831, 1834)",
          "Khởi nghĩa của thợ dệt vùng Silesia, Đức (1844)"
        ],
        correctAnswer: 0,
        explanation: "Cách mạng tháng Mười Nga diễn ra sau khi chủ nghĩa Mác đã ra đời rất lâu (1848)."
      },
      {
        id: 407,
        type: 'multiple',
        question: "Sự khác biệt căn bản giữa Chủ nghĩa xã hội khoa học và Chủ nghĩa xã hội không tưởng là gì?",
        options: [
          "Phát hiện ra sứ mệnh lịch sử của giai cấp công nhân",
          "Mong muốn xóa bỏ áp bức bóc lột",
          "Phê phán chế độ tư bản chủ nghĩa",
          "Đề xuất mô hình cộng đồng sở hữu chung"
        ],
        correctAnswer: 0,
        explanation: "Các nhà không tưởng không nhìn thấy được lực lượng xã hội (giai cấp công nhân) có khả năng thực hiện cuộc cách mạng."
      },
      {
        id: 408,
        type: 'multiple',
        question: "Tác phẩm nào đánh dấu sự hình thành cơ bản của Chủ nghĩa Mác và là cương lĩnh chính trị đầu tiên của phong trào công nhân?",
        options: [
          "Tuyên ngôn của Đảng Cộng sản (1848)",
          "Bộ Tư bản (1867)",
          "Hệ tư tưởng Đức (1846)",
          "Gia đình thần thánh (1845)"
        ],
        correctAnswer: 0,
        explanation: "Tác phẩm này công bố sự ra đời của CNXH khoa học, trang bị vũ khí lý luận cho giai cấp công nhân."
      },
      {
        id: 409,
        type: 'multiple',
        question: "Ba phát minh vĩ đại của khoa học tự nhiên thế kỷ XIX là tiền đề cho sự ra đời của Chủ nghĩa Mác?",
        options: [
          "Thuyết tế bào, Định luật bảo toàn & chuyển hóa năng lượng, Thuyết tiến hóa",
          "Thuyết tương đối, Cơ học lượng tử, Di truyền học",
          "Định luật vạn vật hấp dẫn, Máy hơi nước, Điện từ trường",
          "Hình học phi Euclid, Bảng tuần hoàn hóa học, Vi sinh vật học"
        ],
        correctAnswer: 0,
        explanation: "Những phát minh này đã chứng minh tính thống nhất vật chất của thế giới và sự phát triển biện chứng của tự nhiên."
      },
      {
        id: 410,
        type: 'multiple',
        question: "Tiền đề chính trị - xã hội quan trọng nhất cho sự ra đời của Chủ nghĩa Mác là gì?",
        options: [
          "Sự lớn mạnh của giai cấp công nhân và phong trào công nhân",
          "Sự thất bại của các cuộc cách mạng tư sản",
          "Sự suy tàn của chế độ phong kiến",
          "Sự ra đời của Đảng Cộng sản"
        ],
        correctAnswer: 0,
        explanation: "Giai cấp công nhân đã trở thành một lực lượng chính trị độc lập, đòi hỏi phải có lý luận tiên phong dẫn đường."
      }
    ]
  },
  {
    id: 'modern_practice',
    title: 'Thực Tiễn Hiện Đại',
    icon: 'Globe',
    description: 'Vận dụng lý luận vào bối cảnh thế kỷ 21.',
    questions: [
      {
        id: 501,
        type: 'multiple',
        question: "Đặc trưng của cuộc Cách mạng công nghiệp 4.0 là gì?",
        options: [
          "Động cơ hơi nước và cơ khí hóa",
          "Điện khí hóa và dây chuyền sản xuất",
          "Tự động hóa và máy tính",
          "Trí tuệ nhân tạo (AI), Big Data và kết nối vạn vật (IoT)"
        ],
        correctAnswer: 3,
        explanation: "4.0 là sự kết hợp giữa các hệ thống thực và ảo, dựa trên nền tảng kỹ thuật số."
      },
      {
        id: 502,
        type: 'fillBlank',
        question: "Mô hình kinh tế thị trường định hướng XHCN là sáng tạo của nước nào?",
        correctAnswer: "Việt Nam",
        explanation: "Đây là mô hình phát triển tổng quát của Việt Nam trong thời kỳ quá độ lên CNXH."
      },
      {
        id: 503,
        type: 'multiple',
        question: "Mục tiêu tổng quát của sự nghiệp xây dựng Chủ nghĩa xã hội ở Việt Nam là gì?",
        options: [
          "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
          "Dân giàu, nước mạnh, xã hội công bằng, văn minh",
          "Trở thành một cường quốc quân sự",
          "Đạt mức thu nhập cao vào năm 2030"
        ],
        correctAnswer: 0,
        explanation: "Đây là mục tiêu xuyên suốt được Đảng Cộng sản Việt Nam xác định trong Cương lĩnh xây dựng đất nước."
      },
      {
        id: 504,
        type: 'multiple',
        question: "Bản chất của Nhà nước pháp quyền Xã hội chủ nghĩa Việt Nam là gì?",
        options: [
          "Nhà nước của nhân dân, do nhân dân, vì nhân dân",
          "Nhà nước của giai cấp công nhân",
          "Nhà nước của riêng tầng lớp trí thức",
          "Nhà nước quản lý bằng mệnh lệnh hành chính"
        ],
        correctAnswer: 0,
        explanation: "Quyền lực nhà nước thuộc về nhân dân, phục vụ lợi ích của nhân dân."
      },
      {
        id: 505,
        type: 'trueFalse',
        question: "Trong bối cảnh Cách mạng công nghiệp 4.0, giai cấp công nhân sẽ dần biến mất và bị thay thế hoàn toàn bởi robot?",
        options: ["Đúng", "Sai"],
        correctAnswer: 1,
        explanation: "Sai. Giai cấp công nhân không mất đi mà biến đổi về cơ cấu, ngày càng trí thức hóa và nâng cao trình độ."
      },
      {
        id: 506,
        type: 'multiple',
        question: "Trong quá trình hội nhập quốc tế, Việt Nam thực hiện phương châm đối ngoại nào?",
        options: [
          "Đa phương hóa, đa dạng hóa quan hệ quốc tế",
          "Chỉ quan hệ với các nước xã hội chủ nghĩa",
          "Đóng cửa để tự cường",
          "Liên minh quân sự với các cường quốc"
        ],
        correctAnswer: 0,
        explanation: "Việt Nam là bạn, là đối tác tin cậy và là thành viên có trách nhiệm của cộng đồng quốc tế."
      },
      {
        id: 507,
        type: 'multiple',
        question: "Yếu tố nào được coi là trung tâm, là chủ thể, là nguồn lực chủ yếu và là mục tiêu của sự phát triển bền vững?",
        options: [
          "Con người",
          "Tài nguyên thiên nhiên",
          "Vốn đầu tư nước ngoài",
          "Công nghệ tiên tiến"
        ],
        correctAnswer: 0,
        explanation: "Phát triển vì con người, do con người, đảm bảo hài hòa kinh tế - xã hội - môi trường."
      },
      {
        id: 508,
        type: 'fillBlank',
        question: "Điền vào chỗ trống: 'Đổi mới không phải là thay đổi mục tiêu CNXH mà là làm cho mục tiêu ấy được thực hiện ______ hơn'.",
        correctAnswer: "hiệu quả",
        explanation: "Đổi mới là kiên định mục tiêu độc lập dân tộc và CNXH nhưng sáng tạo về phương pháp, cách thức thực hiện."
      },
      {
        id: 509,
        type: 'multiple',
        question: "Đặc trưng cơ bản của kinh tế thị trường định hướng Xã hội chủ nghĩa Việt Nam là gì?",
        options: [
          "Nền kinh tế nhiều thành phần, vận hành theo cơ chế thị trường, có sự quản lý của Nhà nước pháp quyền XHCN",
          "Nền kinh tế chỉ có thành phần kinh tế nhà nước và tập thể",
          "Nền kinh tế thị trường tư bản chủ nghĩa tự do hoàn toàn",
          "Nền kinh tế bao cấp, chỉ huy tập trung"
        ],
        correctAnswer: 0,
        explanation: "Vừa tuân thủ quy luật thị trường, vừa bảo đảm định hướng xã hội chủ nghĩa để phục vụ dân sinh."
      },
      {
        id: 510,
        type: 'multiple',
        question: "Nhiệm vụ then chốt, sống còn trong công tác xây dựng Đảng hiện nay là gì?",
        options: [
          "Kiên quyết ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống, 'tự diễn biến', 'tự chuyển hóa'",
          "Tăng cường số lượng đảng viên mới",
          "Mở rộng quan hệ với các đảng phái nước ngoài",
          "Tập trung vào phát triển kinh tế đơn thuần"
        ],
        correctAnswer: 0,
        explanation: "Xây dựng, chỉnh đốn Đảng để Đảng luôn trong sạch, vững mạnh, đủ sức lãnh đạo sự nghiệp cách mạng."
      }
    ]
  },
  {
    id: 'historical_figures',
    title: 'Nhân Vật Lịch Sử',
    icon: 'User',
    description: 'Cuộc đời và sự nghiệp các nhà tư tưởng lớn.',
    questions: [
      {
        id: 601,
        type: 'multiple',
        question: "Tác phẩm 'Tuyên ngôn của Đảng Cộng sản' được xuất bản năm nào?",
        options: ["1844", "1848", "1867", "1917"],
        correctAnswer: 1,
        explanation: "Tháng 2 năm 1848, đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học."
      },
      {
        id: 602,
        type: 'multiple',
        question: "Ai là người bạn chiến đấu thân thiết nhất của Karl Marx?",
        options: ["V.I. Lenin", "Friedrich Engels", "Hồ Chí Minh", "Joseph Stalin"],
        correctAnswer: 1,
        explanation: "F. Engels không chỉ là người bạn, người đồng chí mà còn là người đồng sáng lập chủ nghĩa Mác."
      },
      {
        id: 603,
        type: 'multiple',
        question: "V.I. Lênin đã phát triển Chủ nghĩa Mác trong giai đoạn nào của Chủ nghĩa tư bản?",
        options: [
          "Chủ nghĩa tư bản tự do cạnh tranh",
          "Chủ nghĩa đế quốc (Độc quyền)",
          "Chủ nghĩa tư bản nhà nước",
          "Thời kỳ tích lũy nguyên thủy"
        ],
        correctAnswer: 1,
        explanation: "Lênin là người đã vận dụng và phát triển sáng tạo CN Mác trong giai đoạn đế quốc chủ nghĩa và cách mạng vô sản."
      },
      {
        id: 604,
        type: 'multiple',
        question: "Tập 1 của bộ 'Tư bản' (Das Kapital) - tác phẩm vĩ đại nhất của C.Mác - được xuất bản lần đầu năm nào?",
        options: ["1848", "1859", "1867", "1883"],
        correctAnswer: 2,
        explanation: "Năm 1867. Đây là công trình đồ sộ nghiên cứu về phương thức sản xuất tư bản chủ nghĩa."
      },
      {
        id: 605,
        type: 'multiple',
        question: "Tổ chức quốc tế đầu tiên của giai cấp công nhân (Quốc tế I) được thành lập năm 1864 do ai lãnh đạo?",
        options: [
          "C.Mác",
          "Ph.Ăngghen",
          "V.I.Lênin",
          "Stalin"
        ],
        correctAnswer: 0,
        explanation: "C.Mác là linh hồn, là người sáng lập và lãnh đạo Quốc tế I."
      },
      {
        id: 606,
        type: 'multiple',
        question: "Sự kiện lịch sử nào đã mở ra thời đại mới - thời đại quá độ từ CNTB lên CNXH trên phạm vi toàn thế giới?",
        options: [
          "Công xã Paris (1871)",
          "Cách mạng Tháng Mười Nga (1917)",
          "Chiến tranh thế giới thứ nhất (1914-1918)",
          "Thành lập Quốc tế III (1919)"
        ],
        correctAnswer: 1,
        explanation: "Cách mạng Tháng Mười Nga thắng lợi đã hiện thực hóa lý luận CNXH khoa học vào đời sống."
      },
      {
        id: 607,
        type: 'trueFalse',
        question: "Công xã Paris (1871) là nhà nước chuyên chính vô sản đầu tiên trong lịch sử?",
        options: ["Đúng", "Sai"],
        correctAnswer: 0,
        explanation: "Đúng. Dù thất bại, nhưng nó là hình ảnh thu nhỏ của một chế độ xã hội mới do giai cấp công nhân làm chủ."
      },
      {
        id: 608,
        type: 'multiple',
        question: "Tác phẩm nào của Ph.Ăngghen được coi là 'bách khoa toàn thư' của Chủ nghĩa Mác?",
        options: [
          "Chống Đuy-rinh (Anti-Duhring)",
          "Biện chứng của tự nhiên",
          "Nguồn gốc của gia đình, của chế độ tư hữu và của nhà nước",
          "Tình cảnh giai cấp công nhân Anh"
        ],
        correctAnswer: 0,
        explanation: "Trong tác phẩm này, Ăngghen đã trình bày hệ thống 3 bộ phận cấu thành của CN Mác để bảo vệ lý luận trước sự xuyên tạc."
      },
      {
        id: 609,
        type: 'multiple',
        question: "Hãy sắp xếp các sự kiện sau theo trình tự thời gian đúng: (1) Cách mạng Tháng Mười, (2) Tuyên ngôn ĐCS, (3) Công xã Paris, (4) Thành lập Quốc tế I.",
        options: [
          "(2) -> (4) -> (3) -> (1)",
          "(2) -> (3) -> (4) -> (1)",
          "(4) -> (2) -> (3) -> (1)",
          "(1) -> (2) -> (3) -> (4)"
        ],
        correctAnswer: 0,
        explanation: "Tuyên ngôn (1848) -> Quốc tế I (1864) -> Công xã Paris (1871) -> CM Tháng Mười (1917)."
      },
      {
        id: 610,
        type: 'multiple',
        question: "Chính sách kinh tế mới (NEP) do V.I.Lênin đề xướng (1921) chủ trương điều gì?",
        options: [
          "Phát triển kinh tế hàng hóa nhiều thành phần có sự kiểm soát của nhà nước",
          "Xóa bỏ hoàn toàn thương mại tư nhân",
          "Thực hiện chế độ cộng sản thời chiến",
          "Quốc hữu hóa toàn bộ tư liệu sản xuất ngay lập tức"
        ],
        correctAnswer: 0,
        explanation: "NEP là bước ngoặt tư duy quan trọng, chấp nhận kinh tế thị trường trong thời kỳ quá độ."
      }
    ]
  }
];