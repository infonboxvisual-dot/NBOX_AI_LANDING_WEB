# NBOX AI - Phase Implementation Plan

Tài liệu này mô tả lộ trình nâng cấp website lên phong cách Dark Luxury + Editorial. Mỗi phase chỉ được triển khai sau khi bạn duyệt phase đó. Mục tiêu là giữ nguyên nội dung cốt lõi hiện tại, chỉ nâng cấp hệ thiết kế, bố cục, motion và hiệu năng.

## Mục tiêu tổng quát

Chuyển website sang ngôn ngữ thị giác đen carbon sâu + cam amber trầm + trắng xám dịu, điểm xuyết accent nhẹ để tạo cảm giác hiện đại, cao cấp và chuyên nghiệp.
- Giữ nguyên nội dung chính hiện có ở Home, Partners, Academy, Workspace, Services, Contact.
- Nâng cấp Hero thành điểm nhấn signature với hiệu ứng sketch, scroll zoom-out và motion có chủ đích.
- Làm website có cảm giác cao cấp, editorial, rộng thoáng và ít “ồn” hơn hiện tại.

## Quy tắc triển khai

- Chỉ triển khai phase tiếp theo sau khi bạn duyệt phase hiện tại.
- Không viết lại nội dung marketing nếu không cần thiết, chỉ thay presentation và interaction.
- Ưu tiên thay đổi từ nền tảng trước: token màu, typography, spacing, rồi mới đến motion.
- Mọi animation mới phải có fallback cho mobile và reduced-motion.

## Phase 1 - Foundation: màu sắc, font, spacing, nền

**Trạng thái:** Đã xong, chờ bạn duyệt Phase 2.

### Mục tiêu

- Đặt lại toàn bộ design system để website có chất luxury/editorial nhất quán.

### Việc sẽ làm

1. Cập nhật hệ màu trong [src/index.css](../src/index.css): nền đen carbon sâu, accent cam amber trầm, text trắng xám dịu, điểm xuyết accent nhẹ cho shimmer và hover states.
2. Chuẩn hóa typography scale: heading đậm, body nhẹ, nhấn italic cho keyword hoặc statement quan trọng.
3. Tăng khoảng thở cho layout: container rộng hơn, spacing lớn hơn, nhịp section rõ hơn.
4. Thêm global grid pattern opt-in cho các section cần cảm giác kỹ thuật/editorial.
5. Tinh chỉnh glassmorphism: giảm blur quá mạnh, tăng border contrast, thêm inner highlight nhẹ.

### Cần bạn cung cấp

- Chốt font heading: giữ Inter hay đổi sang Satoshi/Geist.
- Nếu có brand guideline, bảng màu hoặc reference site, gửi để mình bám tone chính xác.

### Điều kiện để triển khai được

- Chỉ cần bạn xác nhận phong cách màu và font là đủ để bắt đầu.

### Rủi ro

- Nếu đổi font lớn, phải tune lại line-height và spacing trên mobile.
- Không nên vừa đổi màu vừa đổi layout quá sâu trong cùng một nhịp nếu muốn kiểm soát chất lượng.

### Kết quả mong đợi

- Website thoát khỏi cảm giác quá sáng hoặc quá gắt hiện tại và có nền visual thống nhất hơn theo palette đen carbon + amber.

## Phase 2 - Structural Refactor: giữ nội dung, đổi bố cục

**Trạng thái:** Đã xong, chờ bạn duyệt Phase 3.

### Mục tiêu

- Không thay thông điệp, chỉ thay cách sắp xếp và trình bày.
- Chuyển các khu vực dày nội dung sang Bento/Grid + editorial hierarchy.

### Việc sẽ làm

1. Tái cấu trúc Hero trong [src/pages/Home.tsx](../src/pages/Home.tsx) theo thứ tự: lead line, statement, support text, CTA cluster, visual block.
2. Chuyển các cụm card lớn sang Bento layout tại [src/pages/Home.tsx](../src/pages/Home.tsx), [src/pages/Partners.tsx](../src/pages/Partners.tsx), [src/pages/Workspace.tsx](../src/pages/Workspace.tsx), [src/pages/Services.tsx](../src/pages/Services.tsx).
3. Làm lại Header/Footer theo hướng editorial minimal tại [src/components/Header.tsx](../src/components/Header.tsx) và [src/components/Footer.tsx](../src/components/Footer.tsx).
4. Tối giản Theme handling trong [src/context/ThemeContext.tsx](../src/context/ThemeContext.tsx) theo định hướng Dark-only nếu được chốt.
5. Rà lại container, section spacing và độ dày của các khối để tránh cảm giác block nối block.

### Cần bạn cung cấp

- Chốt có bỏ Light mode hay giữ toggle ở mức kỹ thuật.
- Nếu muốn giữ nguyên phần nào của layout hiện tại, hãy chỉ rõ section nào được giữ form cũ.

### Điều kiện để triển khai được

- Phase này triển khai tốt nhất sau khi Phase 1 đã ổn để tránh phải chỉnh lại layout nhiều lần.

### Rủi ro

- Các section nhiều media như Partners và Workspace có thể lệch cân bằng nếu đổi card layout quá gấp.

### Kết quả mong đợi

- Site cao cấp hơn, dễ đọc hơn, và các khu vực nhiều thông tin bớt nặng thị giác.

## Phase 3 - Motion Core: Lenis + GSAP + ScrollTrigger

**Trạng thái:** Đã xong, chờ bạn duyệt Phase 4.

### Mục tiêu

- Dùng motion như lớp dẫn hướng, không phải lớp trang trí.
- Chỉ dùng GSAP cho Hero và các đoạn timeline phức tạp.

### Việc sẽ làm

1. Thêm GSAP, ScrollTrigger và Lenis vào dự án.
2. Tạo motion bootstrap layer ở [src/main.tsx](../src/main.tsx) hoặc module riêng.
3. Triển khai scroll zoom-out cho Hero trong [src/pages/Home.tsx](../src/pages/Home.tsx) bằng transform/opacity.
4. Làm cursor orchestration bằng lerp cho desktop, có reduced-motion fallback.
5. Giữ motion/react cho animation cơ bản ở section phụ để hạn chế refactor lan rộng.

### Cần bạn cung cấp

- Chốt feel của smooth scroll: mượt mạnh hay mềm vừa phải.
- Nếu có ràng buộc hiệu năng trên máy yếu, báo trước để mình giảm cường độ motion.

### Điều kiện để triển khai được

- Phù hợp nhất khi Phase 2 đã xong, vì Hero và layout mới cần đồng bộ với motion.

### Rủi ro

- Lenis và ScrollTrigger cần setup cẩn thận để tránh xung đột.
- Cursor ảo chỉ nên bật trên desktop.

### Kết quả mong đợi

- Website có cảm giác “có lực”, chuyển động có chủ đích và sang hơn rõ rệt.

## Phase 4 - Hero Sketch Pipeline

**Trạng thái:** Đã xong, chờ bạn duyệt Phase 5.

### Mục tiêu

- Tạo hero signature effect ngay trên landing page: phác thảo -> hiện khung -> shimmer reveal.

### Việc sẽ làm

1. Tạo component sketch hero bằng SVG path animation với stroke-dasharray / stroke-dashoffset ở hero landing.
2. Dựng timeline 3 chặng: 0-2000ms sketch draw, 2000-3000ms selection rect, 3000-4000ms shimmer reveal.
3. Thiết kế nguồn dữ liệu cho hero để sau này thay asset thật không phải sửa logic animation.
4. Thêm fallback nếu asset không đủ chất lượng.

### Cần bạn cung cấp

- 1 ảnh/phác thảo đen trắng tương phản cao, contour rõ.
- Nếu chưa có ảnh thật, gửi 1 ảnh demo có subject rõ để dựng prototype.
- Nếu muốn hero bám brand hơn, gửi reference image bạn thích.

### Điều kiện để triển khai được

- Có thể làm demo trước với asset tạm, nhưng để ra đúng chất thì cần input từ bạn.

### Rủi ro

- Không có input tốt thì sketch effect chỉ dừng ở mức minh họa.

### Kết quả mong đợi

- Hero có một khoảnh khắc rất riêng, đáng nhớ và khác landing page phổ thông.

## Phase 5 - Media + Micro-interactions

### Mục tiêu

- Tăng độ tinh xảo ở cấp chi tiết nhưng vẫn giữ site nhẹ.

### Việc sẽ làm

1. Dùng IntersectionObserver để lazy load video/ảnh nặng trong [src/pages/Home.tsx](../src/pages/Home.tsx), [src/pages/Services.tsx](../src/pages/Services.tsx), [src/pages/Workspace.tsx](../src/pages/Workspace.tsx), [src/pages/Partners.tsx](../src/pages/Partners.tsx).
2. Thêm magnetic button cho CTA chính trong [src/pages/Home.tsx](../src/pages/Home.tsx), [src/pages/Services.tsx](../src/pages/Services.tsx), [src/pages/Academy.tsx](../src/pages/Academy.tsx).
3. Tinh chỉnh glassmorphism cho navbar, pill badge và card states trong [src/index.css](../src/index.css) và [src/components/Header.tsx](../src/components/Header.tsx).
4. Làm hover states tinh tế hơn, tránh glow quá mạnh để không mất cảm giác luxury.

### Cần bạn cung cấp

- Chỉ rõ CTA nào là ưu tiên chuyển đổi chính để mình gắn magnetic effect trước.
- Nếu có video/ảnh nào rất nặng hoặc chưa muốn tải sớm, đánh dấu để loại khỏi lazy strategy đầu tiên.

### Điều kiện để triển khai được

- Có thể triển khai sau khi các layout chính đã ổn định.

### Rủi ro

- Làm quá tay sẽ thành “trưng diễn kỹ thuật”, trái với hướng luxury.

### Kết quả mong đợi

- Người dùng cảm nhận site mượt và tinh xảo hơn ở từng tương tác nhỏ.

## Phase 6 - Optimization + QA

### Mục tiêu

- Giữ site mượt, ổn định và dễ bảo trì khi mở rộng sau này.

### Việc sẽ làm

1. Rà animation về transform/opacity/translate3d và kiểm soát will-change hợp lý.
2. Dồn logic scroll/mousemove vào requestAnimationFrame thay vì xử lý trực tiếp trong event listener.
3. Test responsive cho các section lớn: Hero, Partners, Academy, Workspace, Services, Footer.
4. Kiểm tra contrast, reduced-motion fallback, focus state và khả năng đọc trên nền dark carbon.
5. Chuẩn hóa asset format nếu có quyền chuyển đổi: WebP/AVIF cho ảnh, MP4/WebM nhẹ cho video.

### Cần bạn cung cấp

- Nếu có quy chuẩn hiệu năng tối đa hoặc thiết bị mục tiêu, gửi để mình đặt ngưỡng QA phù hợp.
- Nếu muốn ưu tiên desktop hay mobile trước, hãy chốt để tối ưu đúng thứ tự.

### Điều kiện để triển khai được

- Nên làm sau khi mọi phase chính đã xong để tránh validate lặp lại nhiều lần.

### Rủi ro

- Nếu asset chưa tối ưu, motion tốt đến đâu vẫn có thể bị chậm bởi media.

### Kết quả mong đợi

- Website đủ đẹp để nâng cấp thương hiệu, nhưng vẫn giữ được độ ổn định và khả năng bảo trì.

## Danh sách đầu vào cần bạn chốt trước khi code sâu

1. Font: giữ Inter hay đổi sang Satoshi/Geist.
2. Theme: bỏ hẳn Light mode hay giữ toggle Light/Dark.
3. Hero: có ảnh/phác thảo thật hay dùng demo asset ở giai đoạn đầu.
4. CTA ưu tiên: nút nào là mục tiêu chuyển đổi chính.
5. Reference: nếu có brand guideline hoặc site tham chiếu, gửi để bám tone.

## Cách duyệt phase

- Bạn chỉ cần nhắn tên phase muốn làm, ví dụ: `duyệt phase 1`.
- Mình sẽ chỉ triển khai đúng phase đó, rồi dừng lại chờ bạn duyệt tiếp.