1. Security Access (Cổng bảo mật bằng Mã Truy Cập)

Vấn đề: Muốn bảo mật theo email nhưng không muốn làm hệ thống Login/Đăng ký phức tạp (giữ tính Lean).

UX Solution (Screen 0 - The Gatekeeper): Chúng ta thêm một màn hình chặn ngay từ đầu.

Giao diện cực kỳ minimal: "Welcome to Project X Survival Kit. Please enter your exclusive Access Code."

User điền mã (Code này được hệ thống tự động gửi qua email khi họ pass vòng form đăng ký). Nhập đúng -> Vào Screen 1. Nhập sai -> Báo lỗi. Rất gọn nhẹ cho Dev!

2. Guided Tour (Giải quyết việc User bị "Ngợp" khi vào Workspace)

Vấn đề: Đập vào mắt là 2 cột trái/phải nhiều chữ, user không biết phải bắt đầu từ đâu.

UX Solution (Spotlight Onboarding): Khi user lần đầu tiên bước vào Workspace, toàn bộ màn hình sẽ tối lại (Dimmed overlay), chỉ chừa lại các đốm sáng (Spotlight) hướng dẫn theo thứ tự:

Đốm sáng 1 (Chỉ vào tờ CV): "Bấm vào bất kỳ phần nào trên CV này để khám phá bí mật của HR." (Kèm nút Next).

Đốm sáng 2 (Chỉ lên thanh Top Bar): "Chuyển đổi Level tại đây để xem tiêu chuẩn của HR thay đổi như thế nào." (Kèm nút Next).

Đốm sáng 3 (Chỉ vào Checklist bên phải): "Tự kiểm tra CV của bạn và mở khóa phần quà đặc biệt." (Kèm nút Got it!).

=> Trải nghiệm này mất đúng 5 giây nhưng giúp user hiểu luật chơi 100%.

3. Mentor Validation (Tăng độ Trust bằng Logo)

UX Solution: Ngay tại cái HR Quote Block (Bảng chứa câu nói của HR), chúng ta thiết kế lại phần Avatar.

Thay vì chỉ để tên "Anh Duy - Tech Lead", chúng ta ghép thêm Logo công ty (Ví dụ: Shopee, VNG, Google) với kích thước tinh tế ngay cạnh tên.

User nhìn thấy logo công ty lớn sẽ tự động tin tưởng nội dung checklist bên dưới 100% mà không cần nghi ngờ.

4. Feedback Loop (Nút Thả tim / Hữu ích cho Growth)

UX Solution: Dưới cùng của mỗi bảng Insight/Checklist, thêm một Micro-interaction (Tương tác nhỏ).

Text: "Insight này có giúp ích cho bạn không?"

Nút bấm: [👍 Thích] hoặc [❤️ Tuyệt vời].

Khi user bấm, icon sáng lên và hiện hiệu ứng tung hoa nhỏ xíu, kèm text "Cảm ơn bạn đã phản hồi!". Data này bắn thẳng về hệ thống Tracking để Growth Team làm Content Recap.

5. Cực phẩm UX: Progressive Disclosure cho AI Prompt (Mở khóa phần thưởng)

Vấn đề: Không cho hiện ngay nút AI Prompt. Bắt user phải tick hết Checklist mới cho dùng.

UX Solution (Gamification): * Trạng thái khóa (0/3 ticks): Khu vực dưới cùng hiển thị một khung mờ, có icon 🔒 Ổ khóa và dòng chữ: "Hoàn thành 3/3 checklist ở trên để mở khóa Prompt AI bí mật."

Trạng thái mở (3/3 ticks): Ngay khi user tick vào ô số 3, ổ khóa vỡ ra (animation), khung mờ sáng rực lên màu Xanh/Tím gradient, và nút "✨ Copy AI Prompt" chính thức xuất hiện.

Tác dụng: Ép user CẦN PHẢI ĐỌC và TỰ ĐÁNH GIÁ (giữ đúng core value) rồi mới được đi đường tắt bằng AI.