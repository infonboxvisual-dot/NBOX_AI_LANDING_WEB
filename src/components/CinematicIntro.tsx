import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FRAME_COUNT = 240;
const FRAME_PREFIX = '/frame_video/ezgif-frame-';

const padFrame = (index: number) => String(index).padStart(3, '0');
const frameSrc = (index: number) => `${FRAME_PREFIX}${padFrame(index)}.png`;

function loadImageDecoded(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = async () => {
      try {
        if (typeof image.decode === 'function') {
          await image.decode();
        }
      } catch {
        // decode fails on some payloads; raster may still paint
      }
      resolve(image);
    };
    image.onerror = () => reject(new Error(`Failed to load ${src}`));
    image.src = src;
  });
}

type TitleLine2 = {
  /** Text before accent (e.g. "THỜI ĐẠI ") */
  before: string;
  /** Emphasized segment, usually AI */
  accent: string;
  /** Text after accent (e.g. " ERA"); keep empty when accent is last */
  after: string;
};

type OverlayCopy = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: TitleLine2;
  subtitle: string;
  cta: string;
};

type CinematicIntroProps = {
  onComplete?: () => void;
};

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const { language, toggleLanguage } = useLanguage();
  const [surfaceReady, setSurfaceReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array.from({ length: FRAME_COUNT }, () => null));
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const frameIndexRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const hasFirstFrameRef = useRef(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const hasCompletedRef = useRef(false);
  const bodyOverflowRef = useRef<string>('');

  const copy = useMemo<OverlayCopy>(() => {
    if (language === 'vi') {
      return {
        eyebrow: 'KỂ CHUYỆN ĐIỆN ẢNH',
        titleLine1: 'KIẾN TRÚC',
        titleLine2: {
          before: 'THỜI\u00A0ĐẠI\u00A0',
          accent: 'AI',
          after: '',
        },
        subtitle:
          'Cuộn để khám phá hành trình kiến trúc thời đại AI — nơi ý tưởng, vật liệu và ánh sáng được tái hiện qua từng khung hình điện ảnh chính xác đến từng chi tiết.',
        cta: 'Cuộn để khám phá',
      };
    }

    return {
      eyebrow: 'CINEMATIC SCROLLTELLING',
      titleLine1: 'ARCHITECTURE',
      titleLine2: {
        before: 'THE\u00A0',
        accent: 'AI',
        after: '\u00A0ERA',
      },
      subtitle:
        'Scroll to explore an AI-era architectural journey — where ideas, materials, and light unfold in cinematic frames, precise down to every detail.',
      cta: 'Scroll to explore',
    };
  }, [language]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ensureCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (index: number) => {
      const frame = framesRef.current[index - 1] ?? findNearestFrame(index);
      const rect = canvas.getBoundingClientRect();

      if (!frame || rect.width === 0 || rect.height === 0) {
        return;
      }

      const { width, height } = rect;
      const imageRatio = frame.width / frame.height;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
        offsetY = (height - drawHeight) / 2;
      }

      context.clearRect(0, 0, width, height);
      context.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
    };

    const findNearestFrame = (index: number) => {
      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const left = index - offset;
        const right = index + offset;

        if (left >= 1 && framesRef.current[left - 1]) {
          return framesRef.current[left - 1];
        }

        if (right <= FRAME_COUNT && framesRef.current[right - 1]) {
          return framesRef.current[right - 1];
        }
      }

      return null;
    };

    const updateTypography = (progress: number) => {
      const titleFade = Math.max(0, 1 - progress * 2.2);
      const subtitleFade = Math.max(0, 1 - Math.abs(progress - 0.42) * 2.8);
      const ctaFade = Math.max(0, Math.min(1, (progress - 0.68) * 3.2));
      const lineProgress = Math.min(1, progress * 1.2);

      if (titleRef.current) {
        titleRef.current.style.opacity = String(titleFade);
        titleRef.current.style.transform = `translate3d(0, ${-progress * 18}px, 0) scale(${1 - progress * 0.03})`;
        titleRef.current.style.filter = `blur(${Math.min(7, progress * 8)}px)`;
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = String(subtitleFade);
        subtitleRef.current.style.transform = `translate3d(0, ${progress * 14}px, 0)`;
        subtitleRef.current.style.filter = `blur(${Math.min(5, Math.abs(progress - 0.42) * 10)}px)`;
      }

      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(ctaFade);
        ctaRef.current.style.transform = `translate3d(0, ${20 - progress * 20}px, 0)`;
      }

      if (progressLineRef.current) {
        progressLineRef.current.style.transform = `scaleX(${lineProgress})`;
      }
    };

    const batchSize = 12;
    let cancelled = false;

    const pumpRemainingFrames = (nextIndex: number) => {
      const pump = () => {
        if (cancelled || nextIndex > FRAME_COUNT) {
          return;
        }

        const end = Math.min(FRAME_COUNT, nextIndex + batchSize - 1);

        for (let frameIndex = nextIndex; frameIndex <= end; frameIndex += 1) {
          if (framesRef.current[frameIndex - 1]) {
            continue;
          }

          const image = new Image();
          image.decoding = 'async';
          image.src = frameSrc(frameIndex);
          image.onload = () => {
            framesRef.current[frameIndex - 1] = image;
          };
        }

        nextIndex = end + 1;
        window.setTimeout(pump, 0);
      };

      pump();
    };

    const revealSurface = () => {
      if (cancelled) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!cancelled) {
            setSurfaceReady(true);
          }
        });
      });
    };

    const bootstrap = async () => {
      ensureCanvasSize();

      if (reducedMotion) {
        try {
          const image = await loadImageDecoded(frameSrc(FRAME_COUNT));
          if (cancelled) {
            return;
          }

          framesRef.current[FRAME_COUNT - 1] = image;
          hasFirstFrameRef.current = true;
          ensureCanvasSize();

          targetProgressRef.current = 1;
          progressRef.current = 1;
          drawFrame(FRAME_COUNT);
          updateTypography(1);

          revealSurface();

          if (onComplete && !hasCompletedRef.current && !cancelled) {
            hasCompletedRef.current = true;
            window.setTimeout(onComplete, 0);
          }
        } catch {
          if (!cancelled) {
            pumpRemainingFrames(1);
            targetProgressRef.current = 1;
            progressRef.current = 1;
            updateTypography(1);
            revealSurface();
            if (onComplete && !hasCompletedRef.current) {
              hasCompletedRef.current = true;
              window.setTimeout(onComplete, 160);
            }
          }
        }

        return;
      }

      try {
        const image = await loadImageDecoded(frameSrc(1));
        if (cancelled) {
          return;
        }

        framesRef.current[0] = image;
        hasFirstFrameRef.current = true;
        ensureCanvasSize();
        drawFrame(1);

        pumpRemainingFrames(2);
        revealSurface();
      } catch {
        if (!cancelled) {
          pumpRemainingFrames(1);

          window.setTimeout(() => {
            if (!cancelled) {
              if (framesRef.current[0] && !hasFirstFrameRef.current) {
                hasFirstFrameRef.current = true;
                ensureCanvasSize();
                drawFrame(1);
              }
            }
          }, 480);
          revealSurface();
        }
      }
    };

    const renderLoop = () => {
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.08;
      const nextFrame = Math.min(FRAME_COUNT, Math.max(1, Math.round(progressRef.current * (FRAME_COUNT - 1)) + 1));

      if (nextFrame !== frameIndexRef.current || !hasFirstFrameRef.current) {
        frameIndexRef.current = nextFrame;
        drawFrame(nextFrame);
      }

      updateTypography(progressRef.current);
      rafRef.current = window.requestAnimationFrame(renderLoop);
    };

    renderLoop();

    void bootstrap();

    const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

    const maybeComplete = () => {
      if (onComplete && !hasCompletedRef.current && targetProgressRef.current >= 0.995) {
        hasCompletedRef.current = true;
        onComplete();
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY;
      if (Math.abs(delta) < 1) {
        return;
      }

      targetProgressRef.current = clampProgress(targetProgressRef.current + delta / 2400);
      maybeComplete();
    };

    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touchY = event.touches[0]?.clientY ?? 0;
      const delta = touchStartY - touchY;
      touchStartY = touchY;
      targetProgressRef.current = clampProgress(targetProgressRef.current + delta / 3200);
      maybeComplete();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    const onResize = () => {
      ensureCanvasSize();
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel as EventListener);
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      document.body.style.overflow = bodyOverflowRef.current;

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onComplete]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#050505] text-white/90">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,122,24,0.16),transparent_40%),linear-gradient(to_bottom,#050505_0%,#090909_45%,#050505_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

        {/* Gate canvas + overlays until frame 001 is decoded and painted (avoid text-only flash). */}
        <div
          className={`absolute inset-0 overflow-hidden transition-[opacity] duration-500 ease-out ${
            surfaceReady ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="block h-full w-full translate-y-[2%] md:translate-y-[0.7%]"
              aria-hidden="true"
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between px-6 py-6 md:px-10 md:py-8">
          <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-white/45 md:text-xs">
            <span>{language === 'vi' ? 'NBOX AI / KIẾN TRÚC HIỆN ĐẠI SANG TRỌNG' : 'NBOX AI / MODERN LUXURY ARCHITECTURE'}</span>
            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <span className="hidden sm:inline">{language === 'vi' ? 'Cuộn để hé lộ cảnh' : 'Scroll to reveal'}</span>
              <span className="sm:hidden">{language === 'vi' ? 'Cuộn' : 'Scroll'}</span>
              <button
                type="button"
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
                aria-label={language === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 font-headline text-[11px] font-black text-white/80 transition-colors hover:bg-white/14 hover:text-primary md:h-10 md:w-10"
              >
                {language === 'en' ? 'E' : 'V'}
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-0 md:px-4">
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <p className="font-headline text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 md:text-sm">
                {copy.eyebrow}
              </p>
              <h1
                ref={titleRef}
                className="text-4xl font-headline font-black uppercase leading-[0.9] tracking-[-0.04em] text-white/92 sm:text-6xl md:text-7xl lg:text-[clamp(5rem,8vw,8.5rem)]"
              >
                <span className="block">{copy.titleLine1}</span>
                <span className="block whitespace-nowrap text-primary">
                  <span>{copy.titleLine2.before}</span>
                  <span
                    className="relative inline-block align-baseline text-[1.42em] leading-none tracking-[-0.06em] text-primary drop-shadow-[0_0_28px_rgba(255,122,47,0.55)] sm:text-[1.38em]"
                    style={{
                      paintOrder: 'stroke fill',
                      WebkitTextStroke: 'clamp(3px, 0.085em, 6px) rgba(255, 255, 255, 0.98)',
                    }}
                  >
                    {copy.titleLine2.accent}
                  </span>
                  <span>{copy.titleLine2.after}</span>
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg"
              >
                {copy.subtitle}
              </p>
              <div ref={ctaRef} className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/72 md:text-xs">
                <span className="h-px w-10 bg-primary" />
                {copy.cta}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              <span>Copyright NBOX AI - TRAN MINH NHAT</span>
              <span>{language === 'vi' ? 'Lăn chuột để tiếp tục' : 'Scroll here'}</span>
            </div>
            <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
              <div ref={progressLineRef} className="h-full origin-left bg-primary" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
