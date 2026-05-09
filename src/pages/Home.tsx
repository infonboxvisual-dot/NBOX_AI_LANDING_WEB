import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLenis } from '../motion/lenisStore';
import VillaSketchHero from '../components/VillaSketchHero';
import { MaterialIcon } from '../components/MaterialIcon';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const monaPreconnectRef = useRef(false);

  const heroSketchCopy = useMemo(() => {
    if (language === 'vi') {
      return {
        eyebrow: 'AUTO SKETCH / VILLA FORM STUDY',
        title: 'BIỆT THỰ\nĐƯỢC VẼ TỰ ĐỘNG',
        caption: 'Từ khối nhà đến đường nét kiến trúc, sketch được dựng ngay trong hero để truyền tải ý tưởng trước khi render.',
      };
    }

    return {
      eyebrow: 'AUTO SKETCH / VILLA FORM STUDY',
      title: 'VILLA\nAUTO-DRAWN',
      caption:
        'From soft, hazy sketch lines to a polished villa vision, the hero transforms the drawing into crisp architecture as the final render fades in.',
    };
  }, [language]);

  useEffect(() => {
    // No-op: keep hero stable for LCP and reduce forced reflow risk.
  }, []);

  useEffect(() => {
    const hash = (location.hash || '').replace('#', '').trim();
    if (!hash) return;

    let frames = 0;
    const tick = () => {
      const el = document.getElementById(hash);
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      frames += 1;
      if (frames < 180) requestAnimationFrame(tick);
    };
    tick();
  }, [location.hash, location.key]);

  const demoCategories = [
    { 
      id: 'all', 
      label: language === 'vi' ? 'Tất cả' : 'All',
      title: language === 'vi' ? 'Toàn bộ Giải pháp' : 'All Solutions',
      desc: language === 'vi' ? 'Khám phá trọn bộ công cụ AI tối ưu cho quy trình thiết kế kiến trúc.' : 'Explore the full suite of AI tools optimized for architectural design workflows.',
      btn: language === 'vi' ? 'Khám phá ngay' : 'Explore Now',
      features: language === 'vi' ? ['Render 4K siêu thực', 'Video kiến trúc AI', 'Quy hoạch thông minh'] : ['Photorealistic 4K Render', 'AI Architecture Video', 'Smart Planning']
    },
    { 
      id: 'render', 
      label: language === 'vi' ? 'Render phối cảnh' : 'Rendering',
      title: language === 'vi' ? 'Từ phác thảo đến Render 4K' : 'From Sketch to 4K Render',
      desc: language === 'vi' ? 'Không cần dựng hình 3D phức tạp. Chỉ cần tải lên bản vẽ tay (sketch) hoặc mô hình khối (massing), AI sẽ tự động xử lý ánh sáng, vật liệu và bối cảnh để tạo ra bức ảnh phối cảnh hoàn thiện.' : 'No complex 3D modeling required. Just upload a hand sketch or massing model; AI automatically processes lighting, materials, and context to create a finished perspective.',
      btn: language === 'vi' ? 'Thử render ngay' : 'Try Rendering',
      features: language === 'vi' ? ['Render Ngoại thất & Nội thất', 'Đa dạng phong cách (Modern, Classic...)', 'Xuất ảnh độ phân giải 4K'] : ['Interior & Exterior Render', 'Diverse Styles (Modern, Classic...)', '4K Resolution Output']
    },
    { 
      id: 'video', 
      label: language === 'vi' ? 'Video kiến trúc' : 'Video',
      title: language === 'vi' ? 'Phim kiến trúc AI sống động' : 'Vivid AI Architecture Film',
      desc: language === 'vi' ? 'Biến những bức ảnh tĩnh hoặc mô hình thô thành đoạn phim diễn họa chuyên nghiệp với chuyển động camera mượt mà và hiệu ứng môi trường chân thực.' : 'Transform static images or raw models into professional visualization films with smooth camera movements and realistic environmental effects.',
      btn: language === 'vi' ? 'Tạo video ngay' : 'Create Video Now',
      features: language === 'vi' ? ['Camera cinematic 360 độ', 'Hiệu ứng ánh sáng động', 'Tối ưu cho TVC giới thiệu'] : ['360 Cinematic Camera', 'Dynamic Lighting Effects', 'Optimized for Product TVCs']
    },
    { 
      id: 'interior', 
      label: language === 'vi' ? 'Thiết kế Nội thất' : 'Interior',
      title: language === 'vi' ? 'Tự động hóa Không gian' : 'Space Automation',
      desc: language === 'vi' ? 'Gợi ý ngay lập tức các phương án bố trí nội thất, vật liệu và ánh sáng cho từng căn phòng dựa trên mặt bằng hoặc ảnh chụp hiện trạng.' : 'Instantly suggest interior layout options, materials, and lighting for each room based on floor plans or site photos.',
      btn: language === 'vi' ? 'Bố trí nội thất' : 'Design Interior',
      features: language === 'vi' ? ['Nhận diện không gian thông minh', 'Thư viện vật liệu PBR cao cấp', 'Thay đổi phong cách trong 1s'] : ['Smart Space Recognition', 'Premium PBR Materials', 'Change Style in 1s']
    },
    { 
      id: 'urban', 
      label: language === 'vi' ? 'Quy hoạch & Mặt bằng' : 'Urban & Plan',
      title: language === 'vi' ? 'Số hóa bản vẽ Kiến trúc' : 'Arch Drawing Digitization',
      desc: language === 'vi' ? 'Chuyển đổi bản vẽ CAD thô cứng thành những sơ đồ mặt bằng màu sống động hoặc mô phỏng quy hoạch đô thị với mật độ dân cư và cảnh quan tùy chỉnh.' : 'Convert rigid CAD drawings into vivid colored floor plans or simulate urban planning with custom population density and landscaping.',
      btn: language === 'vi' ? 'Xem quy hoạch' : 'View Planning',
      features: language === 'vi' ? ['Render mặt bằng 3D', 'Phân tích mật độ đô thị', 'Cảnh quan xanh tự động'] : ['3D Floor Plan Rendering', 'Urban Density Analysis', 'Automated Green Landscaping']
    },
  ];

  const designTips = [
    {
      id: 0,
      title: "Design\nReference\nBoard",
      icon: "dashboard_customize",
      bullets: language === 'vi' ? [
        "Một thách thức lớn trong thiết kế là tạo sự liên kết giữa ngoại thất và nội thất để tránh cảm giác rời rạc.",
        "Với sự hỗ trợ từ AI, chỉ cần một hình ảnh ngoại thất, hệ thống sẽ phân tích phong cách và đề xuất nội thất phù hợp.",
        "Kết quả là một thiết kế hài hòa, đồng nhất và tiết kiệm thời gian."
      ] : [
        "A major challenge in design is linking exterior and interior to avoid a fragmented feel.",
        "With AI, just one exterior image allows the system to analyze style and suggest matching interiors.",
        "The result is a harmonious, unified design that saves significant time."
      ],
      media: { type: 'video', url: "https://video.mona-cloud.com/api/video/?user=28065060&video=1743152133-bi-kip-01&protected=False&version=v2&token=gAAAAABn5mZR41IHRUShuRHTypXBu00l7H-HYNXqCFR4sLULhzAH6FRWKfhKMMOgpbGsOCBSb8Vl6MNAISaSx6NiaO8jAECFwkHUcujBTvkx158mHd0p0iI%3D&autoplay=true&fitVideo=true&draggable=true&controller=false&loop=true&muted=true" }
    },
    {
      id: 1,
      title: "Sketch\nTo Image",
      icon: "edit_note",
      bullets: language === 'vi' ? [
        "Khách hàng hay những người không chuyên thường thích nhìn hình ảnh chân thực hơn là bản phác thảo.",
        "Tuy nhiên, việc chuyển từ sketch sang hình ảnh hoàn chỉnh thường tốn thời gian và tiền bạc.",
        "Với AI, bạn chỉ cần tải lên bản sketch, hệ thống sẽ tự động tạo hình ảnh chi tiết, sống động."
      ] : [
        "Clients and non-professionals prefer realistic images over rough sketches.",
        "However, converting sketches to complete images is traditionally time-consuming and costly.",
        "With AI, simply upload a sketch and the system automatically generates detailed, vivid imagery."
      ],
      media: { type: 'video', url: "https://video.mona-cloud.com/api/video/?user=28065060&video=1743144576-bi-kip-02&protected=False&version=v2&token=gAAAAABn5mNZrjBMyrIHZmo9nkiMBuwYO0qAcjY5wE4FkzE6AWXpXbc7h439LjOSgGH9f9ZYqrqOe5SKbymOocp9aexEDzexKmVL1z0SQfz3779yM1_yhRU%3D&autoplay=true&fitVideo=true&draggable=true&controller=false&loop=true&muted=true" }
    },
    {
      id: 2,
      title: "Photo\nEnhance",
      icon: "auto_awesome",
      bullets: language === 'vi' ? [
        "Hình ảnh chất lượng thấp thường khiến dự án mất điểm trong mắt khách hàng.",
        "Với AI, bạn có thể nâng cấp ảnh dễ dàng: cải thiện độ nét, loại bỏ nhiễu và đồng bộ tông màu.",
        "Công cụ này tiết kiệm thời gian và đảm bảo hình ảnh đạt tiêu chuẩn chuyên nghiệp."
      ] : [
        "Low-quality images often cause projects to lose appeal to clients.",
        "With AI, upgrade photos easily: improve sharpness, remove noise, and sync color tones.",
        "This tool saves time and ensures images meet professional standards."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcbHGx3_ulsG9DjNHHiZGsVdMaoTqBNmWYh2Nn_m6-vbn0toA-Rv95pXJikbBGfHF039Z23L2NfYJmHbxhPNh4N7MNV9t37r8Aqto2KTJhn_gJvTxhkaFUO2tF_D9IHRbhDk2s5fzKboiBB5QkPu_-YobXLHKm4sJ3vFDasgvGwE8eix9vyjQW4idVvm0mkz46QVfYz2uP_Sq_CV7pV8ne48rEOIIpuVGfM0zGx-yVb01xD8oWO8lseIyl3ZpS5aJlES4TkLiO25g" }
    },
    {
      id: 3,
      title: "Design\nVariation",
      icon: "layers",
      bullets: language === 'vi' ? [
        "Việc thử nghiệm nhiều phương án để chọn ra thiết kế tốt nhất thường tốn rất nhiều công sức.",
        "Với AI, chỉ từ một hình gốc, bạn có thể tạo ra hàng trăm biến thể trong vài phút.",
        "Giải pháp này giúp tối ưu thời gian và mang lại nhiều lựa chọn chất lượng."
      ] : [
        "Testing multiple options to choose the best design typically takes immense effort.",
        "With AI, generate hundreds of variations in minutes from a single original image.",
        "This solution optimizes time and provides numerous high-quality options."
      ],
      // NOTE: Replace broken aida-public URL (400) with stable image.
      media: { type: 'image', url: "https://images.unsplash.com/photo-1529421308418-eab98863cee5?q=80&w=1600&auto=format&fit=crop" }
    },
    {
      id: 4,
      title: "Consistent\nDesign",
      icon: "sync",
      bullets: language === 'vi' ? [
        "AI thường chỉ tạo ra một góc nhìn cố định, khiến việc xoay các góc khác khó giữ được sự đồng nhất.",
        "Kỹ thuật đặc biệt của Nbox giúp tạo các góc nhìn khác với độ chính xác đến 90%.",
        "Hỗ trợ phân tích hình khối sâu hơn và đảm bảo tính hài hòa tổng thể."
      ] : [
        "AI often creates a fixed view, making it hard to maintain consistency across other angles.",
        "Nbox's special techniques generate alternative views with up to 90% accuracy.",
        "Supports deeper spatial analysis and ensures total project harmony."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXnAvFguPWsfDncIsiz_VTsRbZnLD-ijwKpsba8dgOpyZOwbvEPpw4IAIEephJnVt2IFPnCQlgPp2C8f5LPdx13rRLuUafk0h137sv7TUUoM5BkFhczENA-Hdd5l4LgoU7P8v-DBtzEsYnq7KGP1wBymFAmFKjifmjsVtFJadkj1lrN-ADv54kFiw6EerlDj1oTYSBUiUmGcKPLLGBLuT8d9YdZ7iEslxdmowi1tTNOtLesnq16RndHiXPrFubMHInhrzM366NE7o" }
    },
    {
      id: 5,
      title: "Realistic\nVideo",
      icon: "movie",
      bullets: language === 'vi' ? [
        "Việc tạo video kiến trúc thường tốn rất nhiều thời gian và kỹ thuật phức tạp.",
        "Với AI, chỉ từ một hình ảnh, bạn có thể tạo ra video sống động trong thời gian cực ngắn.",
        "Tự động thêm hiệu ứng chuyển động, ánh sáng và góc quay chuyên nghiệp."
      ] : [
        "Creating architectural videos is usually time-consuming and technically complex.",
        "With AI, generate vivid videos from a single image in extremely short time.",
        "Automatically adds movement effects, lighting, and professional camera angles."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQPetl3uK4hY15_JfiFUl1jkylIYwHfM1j3gdOVWBLb5e2kUJI-zMKEeyJt9Aqd7QtKCZW-XTsoFYBwuyanuFkx2sBHmh1OMF9W4HPR91c2qXEJhD-TxbhyGXgidclAVNGskg72Ok1TmdWm7Z9zbdsmuUKKJRAFcGNZm0_BCM5FG3vu3HDut9-p9gEMmi0UsRYMK1j1BeV_S60QJDHeOV5gw-5fPhwY4IcNhxcHzKfAuahwSItAk1VZY_AVQdTm6EoEXrAM5tPXqs" }
    },
    {
      id: 6,
      title: "Home\nRenovation",
      icon: "home_repair_service",
      bullets: language === 'vi' ? [
        "Cải tạo không gian thường đòi hỏi nhiều ý tưởng sáng tạo và thời gian để thử nghiệm.",
        "Với AI, chỉ cần hình ảnh hiện trạng, hệ thống sẽ tự động đưa ra các gợi ý cải tạo trọn gói.",
        "Tiết kiệm đáng kể thời gian và công sức trong quá trình lập kế hoạch."
      ] : [
        "Space renovation requires creative ideas and significant testing time.",
        "With AI, just provide current photos and the system suggests full renovation plans.",
        "Significantly saves time and effort during the planning phase."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcbHGx3_ulsG9DjNHHiZGsVdMaoTqBNmWYh2Nn_m6-vbn0toA-Rv95pXJikbBGfHF039Z23L2NfYJmHbxhPNh4N7MNV9t37r8Aqto2KTJhn_gJvTxhkaFUO2tF_D9IHRbhDk2s5fzKboiBB5QkPu_-YobXLHKm4sJ3vFDasgvGwE8eix9vyjQW4idVvm0mkz46QVfYz2uP_Sq_CV7pV8ne48rEOIIpuVGfM0zGx-yVb01xD8oWO8lseIyl3ZpS5aJlES4TkLiO25g" }
    },
    {
      id: 7,
      title: "Virtual\nStaging",
      icon: "chair",
      bullets: language === 'vi' ? [
        "Việc bố trí nội thất trong không gian trống thường tốn kém và mất thời gian.",
        "AI tự động thêm nội thất, trang trí và phối cảnh phù hợp chỉ từ một bức ảnh phòng trống.",
        "Dễ dàng thử nghiệm nhiều phong cách mà không tốn chi phí xây dựng thực tế."
      ] : [
        "Staging furniture in empty spaces is expensive and time-consuming.",
        "AI automatically adds furniture, decor, and context from a single empty room photo.",
        "Easily test multiple styles without actual construction costs."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXnAvFguPWsfDncIsiz_VTsRbZnLD-ijwKpsba8dgOpyZOwbvEPpw4IAIEephJnVt2IFPnCQlgPp2C8f5LPdx13rRLuUafk0h137sv7TUUoM5BkFhczENA-Hdd5l4LgoU7P8v-DBtzEsYnq7KGP1wBymFAmFKjifmjsVtFJadkj1lrN-ADv54kFiw6EerlDj1oTYSBUiUmGcKPLLGBLuT8d9YdZ7iEslxdmowi1tTNOtLesnq16RndHiXPrFubMHInhrzM366NE7o" }
    },
    {
      id: 8,
      title: "Post\nProduction",
      icon: "video_settings",
      bullets: language === 'vi' ? [
        "Hậu kỳ hình ảnh thường mất nhiều thời gian để chỉnh sửa ánh sáng và màu sắc.",
        "Với AI, mọi công việc này được tự động hóa: cân chỉnh màu, nâng cấp chất lượng chỉ trong vài giây.",
        "Kết quả là hình ảnh chuyên nghiệp mà không tốn quá nhiều công sức."
      ] : [
        "Image post-production usually takes ages to fix lighting and color.",
        "With AI, this is automated: color balance and quality upgrades in seconds.",
        "The result is professional-grade imagery with minimal effort."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQPetl3uK4hY15_JfiFUl1jkylIYwHfM1j3gdOVWBLb5e2kUJI-zMKEeyJt9Aqd7QtKCZW-XTsoFYBwuyanuFkx2sBHmh1OMF9W4HPR91c2qXEJhD-TxbhyGXgidclAVNGskg72Ok1TmdWm7Z9zbdsmuUKKJRAFcGNZm0_BCM5FG3vu3HDut9-p9gEMmi0UsRYMK1j1BeV_S60QJDHeOV5gw-5fPhwY4IcNhxcHzKfAuahwSItAk1VZY_AVQdTm6EoEXrAM5tPXqs" }
    },
    {
      id: 9,
      title: "Material\nMoodboard",
      icon: "grid_view",
      bullets: language === 'vi' ? [
        "Tạo moodboard vật liệu thủ công thường mất nhiều thời gian để chọn màu sắc và chất liệu.",
        "Chỉ cần nhập ý tưởng, AI tự động tạo một moodboard thẩm mỹ, đồng bộ.",
        "Tiết kiệm thời gian trong khi vẫn giữ được hiệu quả thẩm mỹ cao."
      ] : [
        "Manually creating material moodboards takes time to pick colors and textures.",
        "Just input an idea, and AI generates an aesthetic, synchronized moodboard.",
        "Saves time while maintaining high aesthetic efficiency."
      ],
      media: { type: 'image', url: "https://images.unsplash.com/photo-1529421308418-eab98863cee5?q=80&w=1600&auto=format&fit=crop" }
    },
    {
      id: 10,
      title: "Inpainting\nModification",
      icon: "brush",
      bullets: language === 'vi' ? [
        "Chỉnh sửa các hình ảnh bị lỗi hoặc thiếu chi tiết thường rất khó và tốn thời gian.",
        "AI Inpainting giúp chọn vùng cần chỉnh và tự động hoàn thiện theo phong cách ban đầu.",
        "Giúp xử lý hình ảnh nhanh chóng, tạo ra kết quả tự nhiên và ấn tượng."
      ] : [
        "Editing flawed or missing detail images is usually difficult and slow.",
        "AI Inpainting lets you select areas to fix and automates completion in the original style.",
        "Processes images quickly, creating natural and impressive results."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcbHGx3_ulsG9DjNHHiZGsVdMaoTqBNmWYh2Nn_m6-vbn0toA-Rv95pXJikbBGfHF039Z23L2NfYJmHbxhPNh4N7MNV9t37r8Aqto2KTJhn_gJvTxhkaFUO2tF_D9IHRbhDk2s5fzKboiBB5QkPu_-YobXLHKm4sJ3vFDasgvGwE8eix9vyjQW4idVvm0mkz46QVfYz2uP_Sq_CV7pV8ne48rEOIIpuVGfM0zGx-yVb01xD8oWO8lseIyl3ZpS5aJlES4TkLiO25g" }
    },
    {
      id: 11,
      title: "Image\nOutpainting",
      icon: "aspect_ratio",
      bullets: language === 'vi' ? [
        "Khi hình ảnh không phù hợp với tỷ lệ mong muốn cho dàn trang hoặc slide.",
        "AI Outpainting mở rộng hình ảnh dựa trên nội dung gốc, tạo phần bổ sung liền mạch.",
        "Đảm bảo sản phẩm hoàn hảo mà không thấy ranh giới giữa cũ và mới."
      ] : [
        "When an image doesn't fit the desired aspect ratio for layouts or slides.",
        "AI Outpainting expands the image based on original content, creating seamless additions.",
        "Ensures a perfect product with no visible borders between old and new."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXnAvFguPWsfDncIsiz_VTsRbZnLD-ijwKpsba8dgOpyZOwbvEPpw4IAIEephJnVt2IFPnCQlgPp2C8f5LPdx13rRLuUafk0h137sv7TUUoM5BkFhczENA-Hdd5l4LgoU7P8v-DBtzEsYnq7KGP1wBymFAmFKjifmjsVtFJadkj1lrN-ADv54kFiw6EerlDj1oTYSBUiUmGcKPLLGBLuT8d9YdZ7iEslxdmowi1tTNOtLesnq16RndHiXPrFubMHInhrzM366NE7o" }
    },
    {
      id: 12,
      title: "Visual\nStorytelling",
      icon: "auto_stories",
      bullets: language === 'vi' ? [
        "Hình render thông thường dễ bị khô cứng, thiếu cảm xúc.",
        "Với AI, thêm hoạt động, con người, ánh sáng để kể một câu chuyện trong không gian.",
        "Giúp khách hàng dễ cảm nhận và ra quyết định chốt dự án nhanh hơn."
      ] : [
        "Standard renders can often feel stiff and emotionless.",
        "With AI, add activities, people, and lighting to tell a story within the space.",
        "Helps clients connect emotionally and make project decisions faster."
      ],
      media: { type: 'image', url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQPetl3uK4hY15_JfiFUl1jkylIYwHfM1j3gdOVWBLb5e2kUJI-zMKEeyJt9Aqd7QtKCZW-XTsoFYBwuyanuFkx2sBHmh1OMF9W4HPR91c2qXEJhD-TxbhyGXgidclAVNGskg72Ok1TmdWm7Z9zbdsmuUKKJRAFcGNZm0_BCM5FG3vu3HDut9-p9gEMmi0UsRYMK1j1BeV_S60QJDHeOV5gw-5fPhwY4IcNhxcHzKfAuahwSItAk1VZY_AVQdTm6EoEXrAM5tPXqs" }
    }
  ];

  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const activeTip = designTips[activeTipIndex];
  const designTipsSectionRef = useRef<HTMLElement | null>(null);
  const [designTipsMediaReady, setDesignTipsMediaReady] = useState(false);
  const [designTipsVideoEnabled, setDesignTipsVideoEnabled] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const el = designTipsSectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setDesignTipsMediaReady(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDesignTipsMediaReady(true);
      },
      // Keep conservative so PSI doesn't eagerly pull 3rd-party video bundles.
      { rootMargin: '0px', threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ensureMonaPreconnect = () => {
    if (monaPreconnectRef.current) return;
    monaPreconnectRef.current = true;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://video.mona-cloud.com';
    document.head.appendChild(link);
  };

  return (
    <main className="overflow-hidden scroll-smooth">
      {/* Hero Section */}
      <section ref={heroSectionRef} id="home" className="editorial-grid relative overflow-hidden px-6 pb-20 pt-12 md:px-8 md:pb-32 md:pt-20">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/5 blur-[80px] md:blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 items-center lg:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <motion.div
            initial={false}
            ref={heroCopyRef}
            className="relative z-10 max-w-3xl"
          >
            <h1 className="mb-6 break-words whitespace-pre-line text-3xl font-headline font-extrabold uppercase leading-[1.05] tracking-tighter text-on-surface sm:text-4xl md:text-5xl lg:text-6xl">
              {language === 'vi' ? (
                <>NBOX AI -<br/><span className="italic">HỆ SINH THÁI AI DÀNH CHO KIẾN TRÚC</span></>
              ) : (
                <>NBOX AI -<br/>ARCHITECTURAL <span className="italic">ECOSYSTEM</span></>
              )}
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg lg:text-xl font-sans">
              {t('home.hero.desc')}
            </p>
            <div className="grid max-w-xl gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate('/services')}
                className="rounded-xl bg-primary px-8 py-4 text-center font-headline font-extrabold uppercase tracking-widest text-on-primary shadow-[0_0_40px_rgba(203,123,62,0.28)] transition-transform hover:scale-[1.01]"
              >
                {language === 'vi' ? 'XEM DỊCH VỤ' : 'VIEW SERVICES'}
              </button>
              <button 
                onClick={() => document.getElementById('design-in-action')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-card rounded-xl px-8 py-4 font-headline font-extrabold uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-variant"
              >
                {t('home.hero.cta.demo')}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            ref={heroVisualRef}
            className="relative perspective-grid lg:-ml-8 lg:-mt-6"
          >
            <div className="rotate-y-tilt glass-card group relative overflow-hidden rounded-2xl border border-outline-variant/20 p-2 shadow-2xl md:p-2.5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.16),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_42%)]" />
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#090909] px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-headline text-[10px] font-black uppercase tracking-[0.35em] text-primary md:text-xs">
                      {heroSketchCopy.eyebrow}
                    </p>
                    <h2 className="mt-3 whitespace-pre-line text-2xl font-headline font-black uppercase leading-[0.9] tracking-[-0.05em] text-on-surface sm:text-3xl md:text-4xl">
                      {heroSketchCopy.title}
                    </h2>
                  </div>
                  <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                    Sketch Auto
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-[1.5rem] border border-[#cdbfa8]/18 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.72),rgba(244,236,223,0.93)_42%,rgba(231,221,204,0.95)_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
                  <VillaSketchHero className="h-[360px] w-full md:h-[500px]" />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/92 to-transparent px-4 pb-4 pt-12 md:px-6 md:pb-6">
                    <div className="flex items-end justify-between gap-4">
                      <p className="max-w-xs text-[11px] leading-relaxed text-on-surface-variant md:text-sm">
                        {heroSketchCopy.caption}
                      </p>
                      <div className="text-right text-[10px] font-bold uppercase tracking-[0.28em] text-primary/75">
                        <span className="block">Villa Concept</span>
                        <span className="block text-white/45">Sketch pipeline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="editorial-grid bg-surface-container-low py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: t('home.stats.users'), value: '~1000+' },
              { label: t('home.stats.rate'), value: '100%' },
              { label: t('home.stats.support'), value: '24/7' },
              { label: t('home.stats.latency'), value: '0.4s' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-headline font-extrabold text-primary mb-2 drop-shadow-[0_0_10px_rgba(255,122,47,0.3)] transition-transform group-hover:scale-110">
                  {stat.value}
                </div>
                <p className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section (DESIGN IN ACTION) */}
      <section ref={designTipsSectionRef} id="design-in-action" className="editorial-grid overflow-hidden bg-surface-container px-6 py-16 md:px-8 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 px-4">
             <span className="text-primary font-headline font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-4 block">
                {t('home.demo.secrets')}
             </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-headline font-black uppercase tracking-tighter mb-4 text-on-surface">
              {language === 'vi' ? <>THIẾT KẾ <span className="italic">THỰC TẾ</span></> : <>DESIGN IN <span className="italic">ACTION</span></>}
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-lg leading-relaxed italic border-l-4 border-primary pl-4 md:pl-6 inline-block text-left">
              {t('home.demo.tagline')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-auto lg:h-[650px]">
             {/* Navigation List */}
             <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 lg:pr-4 custom-scrollbar snap-x">
                {designTips.map((tip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTipIndex(idx)}
                    className={`flex-shrink-0 w-64 lg:w-full group relative flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 text-left snap-center ${
                      activeTipIndex === idx 
                        ? 'bg-primary text-on-primary shadow-[0_10px_40px_rgba(255,122,47,0.3)]' 
                        : 'glass-card hover:bg-surface-variant'
                    }`}
                  >
                     <MaterialIcon
                       name={tip.icon}
                       className={`inline-block shrink-0 md:size-10 size-8 filter group-hover:scale-125 transition-transform duration-500 ${
                         activeTipIndex === idx ? 'text-on-primary' : 'text-primary'
                       }`}
                       strokeWidth={2}
                     />
                     <div>
                        <p className={`font-headline font-black uppercase leading-tight tracking-tight whitespace-pre-line text-xs md:text-sm ${
                          activeTipIndex === idx ? 'text-on-primary' : 'text-on-surface/60 group-hover:text-on-surface'
                        }`}>
                          {tip.title}
                        </p>
                        <div className={`h-1 transition-all duration-500 ${activeTipIndex === idx ? 'w-full bg-on-primary/30' : 'w-0'}`}></div>
                     </div>
                  </button>
                ))}
             </div>

             {/* Content View Side */}
             <div className="lg:col-span-8 h-full">
                <AnimatePresence mode='wait'>
                    <motion.div
                      key={activeTipIndex}
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="glass-card rounded-[2.5rem] p-10 border border-on-surface/10 shadow-2xl h-full flex flex-col lg:flex-row gap-12 overflow-hidden relative"
                    >
                       <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full"></div>
                       
                       <div className="lg:w-1/2 space-y-10 relative z-10 flex flex-col justify-center">
                          <div className="space-y-4">
                             <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30">
                               Insight #{activeTipIndex + 1}
                             </span>
                             <h3 className="text-4xl md:text-5xl font-headline font-black text-on-surface uppercase tracking-tighter leading-[1.1] whitespace-pre-line">
                               {activeTip.title}
                             </h3>
                          </div>

                          <ul className="space-y-6">
                            {activeTip.bullets.map((bullet, i) => (
                              <li key={i} className="flex gap-5 group">
                                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-container border border-on-surface/5 flex items-center justify-center text-primary text-sm font-black group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                                  {i + 1}
                                </span>
                                <p className="text-on-surface-variant text-lg leading-relaxed animate-in fade-in slide-in-from-left duration-700">
                                  {bullet}
                                </p>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-6">
                             <button 
                               onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                               className="inline-flex items-center gap-4 bg-on-surface text-surface px-8 py-4 rounded-xl font-headline font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-on-primary transition-all shadow-xl group"
                             >
                               {t('home.demo.try')}
                               <MaterialIcon name="bolt" className="inline-block size-5 shrink-0 group-hover:translate-x-2 transition-all" strokeWidth={2.25} />
                             </button>
                          </div>
                       </div>

                       <div className="lg:w-1/2 relative h-[400px] lg:h-full group">
                          {activeTip.media.type === 'video' ? (
                            <div className="w-full h-full rounded-2xl overflow-hidden glass-card border border-on-surface/5 relative shadow-inner">
                              {designTipsMediaReady && designTipsVideoEnabled[activeTip.id] ? (
                                <iframe
                                  className="w-full h-full scale-[1.01]"
                                  src={activeTip.media.url}
                                  title={activeTip.title}
                                  loading="lazy"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!designTipsVideoEnabled[activeTip.id]) ensureMonaPreconnect();
                                    setDesignTipsVideoEnabled((prev) => ({ ...prev, [activeTip.id]: true }));
                                  }}
                                  className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 bg-black/30 px-8 text-center"
                                >
                                  <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                                    {language === 'vi' ? 'Bấm để tải video demo' : 'Click to load demo video'}
                                  </div>
                                  <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                    {language === 'vi' ? 'Giảm tải trang ban đầu' : 'Keeps initial load lightweight'}
                                  </div>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="w-full h-full relative rounded-2xl overflow-hidden glass-card border border-on-surface/5 group-hover:border-primary/40 transition-colors">
                              <img 
                                src={activeTip.media.url} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                                alt={activeTip.title} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none"></div>
                            </div>
                          )}
                       </div>
                    </motion.div>
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="editorial-grid overflow-hidden bg-surface-container-low px-6 py-20 md:px-8 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter text-on-surface">
              {language === 'vi' ? <>Trần Minh Nhật Founder NboxAI <span className="italic">là ai?</span></> : <>Who is <span className="italic">Tran Minh Nhat</span>?</>}
            </h2>
          </div>

          <div className="relative glass-card rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-on-surface/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Content Side */}
              <div className="lg:w-7/12 p-8 md:p-16 lg:p-20 space-y-12 relative z-10">
                <div className="flex justify-between items-start border-b border-on-surface/10 pb-8">
                  <div className="space-y-2">
                    <span className="text-primary font-headline font-black uppercase tracking-widest text-sm md:text-base">
                      {language === 'vi' ? 'Concept Architect' : 'Concept Architect'}
                    </span>
                    <p className="text-on-surface-variant font-headline font-bold uppercase text-lg md:text-xl tracking-tighter">
                      Archviz Artist
                    </p>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                    <MaterialIcon name="psychology" className="inline-block size-8 md:size-10 text-primary shrink-0" strokeWidth={2} />
                  </div>
                </div>

                <div className="space-y-8">
                  <ul className="space-y-6">
                    {[
                      {
                        vi: "Trần Minh Nhật là Founder của NBOX AI – đơn vị tiên phong nghiên cứu, đào tạo và triển khai các giải pháp AI chuyên biệt cho lĩnh vực kiến trúc, nội thất, diễn họa và bất động sản.",
                        en: "Tran Minh Nhat is the Founder of NBOX AI – a pioneer in researching, training, and deploying specialized AI solutions for architecture, interior design, visualization, and real estate."
                      },
                      {
                        vi: "Xuất thân là 3D Artist, anh hiểu rõ áp lực deadline, khối lượng công việc và yêu cầu chất lượng cao. Từ đó định hướng AI phải giải quyết vấn đề thực tế, không chỉ là công nghệ trình diễn.",
                        en: "Starting as a 3D Artist, he understands deadline pressure, heavy workloads, and high-quality demands. This drives AI to solve practical problems, not just showcase technology."
                      },
                      {
                        vi: "AI không thay thế con người mà là công cụ khuếch đại năng lực sáng tạo. Mục tiêu là giảm thời gian render, tối ưu quy trình và nâng cao chất lượng đầu ra.",
                        en: "AI doesn't replace humans; it amplifies creative power. The goal is to reduce render time, optimize workflows, and enhance output quality."
                      },
                      {
                        vi: "Hệ sinh thái NBOX AI gồm 4 mảng chính: Đào tạo Render AI & Video AI; Phát triển app AI; Dịch vụ Render & nâng cấp hình ảnh; Sản xuất phim AI cho kiến trúc & BĐS.",
                        en: "The NBOX AI ecosystem consists of 4 main areas: AI Render & Video Training; AI App Development; Render & Image Upgrade Services; AI Film Production for Architecture & Real Estate."
                      },
                      {
                        vi: "Tầm nhìn của anh là xây dựng hệ sinh thái AI hoàn chỉnh cho ngành, đưa AI trở thành công cụ thực sự hữu ích cho Kiến trúc sư, Diễn họa viên và Doanh nghiệp BĐS.",
                        en: "His vision is to build a complete AI ecosystem for the industry, making AI a truly useful tool for Architects, Visualizers, and Real Estate businesses."
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 group">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary mt-2.5 shadow-[0_0_10px_rgba(255,122,47,0.8)] flex-shrink-0" />
                        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed group-hover:text-on-surface transition-colors duration-300">
                          {language === 'vi' ? item.vi : item.en}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-5/12 relative min-h-[400px] lg:min-h-full">
                <img 
                  src="https://images.unsplash.com/photo-1529421308418-eab98863cee5?q=80&w=1600&auto=format&fit=crop"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" 
                  alt="Founder of NBOX AI"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 lg:hidden"></div>
                <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-background lg:via-transparent lg:to-transparent lg:opacity-40 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </section>

    </main>
  );
}
