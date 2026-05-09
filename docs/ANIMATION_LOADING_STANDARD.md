# Chuẩn Animation Loading Render AI (Toàn Bộ Tabs)

Tài liệu này là chuẩn triển khai animation loading cho toàn bộ luồng render AI trong web app.

## 1. Mục tiêu

- Đồng bộ một ngôn ngữ animation duy nhất cho tất cả tab render AI.
- Loại bỏ spinner rời rạc theo từng file.
- Dùng chung component để dễ bảo trì, tránh lệch style khi thêm tính năng mới.

## 2. Component dùng chung

**File nguồn:** `components/FuturisticLoader.tsx`

### Component chính

- `FuturisticLoader`: spinner hiệu ứng futuristic (glow + spin + reverse spin + shimmer).
- `AILoadingPanel`: wrapper chuẩn cho trạng thái loading gồm loader + title + subtitle.

### Quy ước dùng

- Loading lớn (khung kết quả chính): `size="lg"`.
- Loading trung bình (card/sub-result): `size="md"`.
- Loading nhỏ (micro-loading trong luồng phụ): `size="sm"`.

## 3. Điều kiện animation toàn cục

Các keyframe/custom class đã có trong `index.html`:

- `spin-reverse`
- `shimmer`
- `.animate-spin-reverse`
- `.animate-shimmer`

## 4. Phạm vi đã áp dụng (không thiếu tab render AI)

### 4.1 Tab Render / Edit chính

- `components/ImageEditor.tsx`
- `components/AddObjectTab.tsx`
- `components/ChangeMaterialTab.tsx`
- `components/CropToEditTab.tsx`
- `components/ReplaceModelTab.tsx`
- `components/NoteEditTab.tsx`
- `components/CanvasTab.tsx`

### 4.2 Tab Cải Thiện / Upscale

- `components/ImproveRenderTab.tsx`
- `components/UpscaleTab.tsx`

### 4.3 Tab Utilities

- `components/InsertBuildingUtility.tsx`
- `components/MergeFurnitureTab.tsx`
- `components/ColorizeFloorplanUtility.tsx`
- `components/CharacterSyncUtility.tsx`
- `components/VirtualTourTab.tsx`
- `components/PerspectiveSyncUtility.tsx`
- `components/UtilitiesTab.tsx`

### 4.4 Preview luồng sync/render

- `components/Scene4x4Preview.tsx`
- `components/StoryboardPreview.tsx`

## 5. Ngoại lệ chủ động

- `components/GatewaySettings.tsx` giữ spinner hiện tại vì là trạng thái networking/config, không thuộc luồng render AI ảnh.
- `components/CanvasTab.tsx` giữ loading icon trong nút thao tác nhanh (không phải khung render preview loading).

## 6. Mẫu sử dụng chuẩn

```tsx
{isLoading ? (
  <AILoadingPanel
    title="AI đang xử lý..."
    subtitle="Vui lòng chờ trong giây lát."
    size="md"
  />
) : (
  <Result />
)}
```

## 7. Checklist cho tính năng mới

Khi thêm tab render AI mới:

1. Import `AILoadingPanel` từ `components/FuturisticLoader.tsx`.
2. Không tạo spinner local mới trong file tab.
3. Dùng `title/subtitle` mô tả đúng ngữ cảnh tác vụ AI.
4. Kiểm tra visual consistency với các tab hiện có.