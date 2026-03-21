KIẾN TRÚC LOGIC CỦA WORKSPACE (MÀN HÌNH 3)
Màn hình này sẽ được chia làm 2 nửa (50/50 Split Screen) trên nền tảng Web Desktop.

1. NỬA BÊN TRÁI: "Bảo tàng CV" (The Dummy CV Canvas)
Nó là gì: Một tờ CV A4 mô phỏng (Dummy CV) đã được điền FULL thông tin mẫu cực kỳ xịn xò. Tờ CV này có thể cuộn lên xuống (Scroll).

UX Tương tác (The Menu): Bản thân tờ CV chính là một cái Menu khổng lồ. Không cần cột Sidebar nào cả. Khi rê chuột (Hover) vào phần Summary, khối đó sáng lên. Rê vào Experience, khối đó sáng lên.

Logic Động (Cực kỳ quan trọng): Nội dung text trên tờ Dummy CV này SẼ THAY ĐỔI tùy thuộc vào việc người dùng đang chọn Level nào ở Top Bar.

Nếu Top Bar là Beginner: Tờ CV bên trái sẽ hiện mẫu kinh nghiệm kiểu sinh viên (VD: "Làm project môn học, quản lý nhóm 3 người").

Nếu Top Bar là Mid-level: Tờ CV tự động đổi text thành mẫu của người đi làm (VD: "Tối ưu hóa quy trình X, tăng 15% revenue").

=> Trải nghiệm chạm: User nhìn vào bản mẫu bên trái là tự "ngộ" ra ngay sự khác biệt của các level.

2. NỬA BÊN PHẢI: "Bộ não HR & AI" (The Dynamic Insight Panel)
Nửa này chỉ thay đổi nội dung khi user Click vào một khối cụ thể trên tờ CV bên trái.
Nó chứa 3 tầng giá trị (Core Value của bạn):

Tầng 1 - HR Quote: Lời khuyên thẳng thắn từ người trong ngành (Có hình Avatar Tech Lead).

Tầng 2 - Audit Checklist: 3 gạch đầu dòng siêu ngắn gọn để user tự soi lại CV của mình ở nhà.

Tầng 3 - The GenAI Prompt: Nút bấm thần thánh "Copy ChatGPT Prompt" để dùng AI sửa lỗi.

🎬 KỊCH BẢN NGƯỜI DÙNG (USER FLOW SCENARIO)
Để bạn dễ hình dung sự "thay đổi rõ ràng" khi trải nghiệm, hãy tưởng tượng ứng viên tên Alex (Track: Product Management) vừa vượt qua Màn hình 2 với kết quả là Mid-level.

Bước 1: Vừa bước vào Workspace

Top Bar: Thanh Level Switcher tự động focus vào nút [🚀 Mid-level].

Bên trái: Hiện tờ CV mẫu của một Mid-level PM.

Bên phải: Bảng chào mừng: "Bấm vào bất kỳ phần nào trên CV bên trái để khám phá bí mật của HR."

Bước 2: Alex click vào khối "Experience" trên tờ CV

Bên trái: Khối Experience được đóng khung xanh nổi bật.

Bên phải: Bảng thông tin trượt ra với nội dung:

HR Quote: 🙎‍♂️ (Ảnh Tech Lead) "Ở level Mid, tôi không có thời gian đọc bạn làm task gì hàng ngày. Tôi quét tìm con số (%), tiền ($), và impact kinh doanh trong 6 giây đầu."

Checklist: [ ] Mọi bullet bắt đầu bằng Action Verb mạnh | [ ] Có ít nhất 1 con số minh chứng | [ ] Thể hiện được tư duy Product (Why, not just What).

AI Prompt: Nút "Tạo Prompt viết lại Experience 🪄".

Bước 3: Alex tò mò bấm thử sang tab [🌱 Beginner] trên Top Bar

Bên trái (CV thay đổi): Mẫu Experience trên tờ CV lập tức đổi thành các project sinh viên/câu lạc bộ.

Bên phải (Tips thay đổi):

HR Quote: 👩‍💼 (Ảnh HR) "Chưa có kinh nghiệm đi làm? Không sao. Hãy đưa bài tập lớn hoặc hoạt động ngoại khóa vào, miễn là cho tôi thấy bạn có Ownership (tinh thần làm chủ)."

Checklist: Đổi thành các checklist cơ bản cho sinh viên.

Bước 4: Sử dụng GenAI Prompt

Alex thấy khó viết quá, kéo xuống dưới cùng bên phải, bấm nút "Copy Prompt".

Một dòng thông báo hiện lên: "Đã copy! Hãy dán vào ChatGPT cùng với mô tả công việc thô của bạn." (Nội dung prompt ngầm bên dưới sẽ là: "Act as an expert Tech Recruiter. Rewrite my following raw experience into 3 bullet points using the XYZ Google formula...").