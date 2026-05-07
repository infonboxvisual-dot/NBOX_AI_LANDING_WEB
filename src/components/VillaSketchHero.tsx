import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

type VillaSketchHeroProps = {
  className?: string;
  imageSrc?: string;
  reducedMotion?: boolean;
};

const DEFAULT_IMAGE_SRC = '/landing_sketch_img.png';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? true;
}

function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
}

export default function VillaSketchHero({
  className,
  imageSrc = DEFAULT_IMAGE_SRC,
  reducedMotion,
}: VillaSketchHeroProps) {
  const sketchGroupRef = useRef<SVGGElement | null>(null);
  const sketchPathsRef = useRef<(SVGPathElement | null)[]>([]);
  const sketchWipeRectRef = useRef<SVGRectElement | null>(null);
  const sketchSweepRef = useRef<SVGRectElement | null>(null);
  const selectionGroupRef = useRef<SVGGElement | null>(null);
  const selectionRectRef = useRef<SVGRectElement | null>(null);
  const imageGroupRef = useRef<SVGGElement | null>(null);
  const shimmerRef = useRef<SVGRectElement | null>(null);

  const shouldReduceMotion = reducedMotion ?? prefersReducedMotion();
  const enableHeavyFilters = useMemo(() => !shouldReduceMotion && !isCoarsePointer(), [shouldReduceMotion]);
  const isDefaultImage = imageSrc === DEFAULT_IMAGE_SRC;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const paths = sketchPathsRef.current.filter(Boolean) as SVGPathElement[];
    // Timing targets:
    // - Draw: ~5s
    // - "Snapshot + sweep" (reveal + scan/wipe): ~2s total
    const SWEEP_DURATION = 1.45;
    const DEFAULT_IMAGE_REVEAL_DELAY = 0.0;

    // Prime stroke lengths for dash animation.
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = '1';
    });

    gsap.set(selectionGroupRef.current, { opacity: 0, scale: 0.98, transformOrigin: '50% 50%' });
    gsap.set(selectionRectRef.current, { opacity: 1, strokeDasharray: 10, strokeDashoffset: 80 });
    gsap.set(imageGroupRef.current, { opacity: 0 });
    gsap.set(shimmerRef.current, { x: -420, opacity: 0 });
    gsap.set(sketchSweepRef.current, { x: -420, opacity: 0 });
    gsap.set(sketchWipeRectRef.current, { x: 0, width: 1280 });

    const resetSketch = () => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDashoffset = `${length}`;
      });
      gsap.set(selectionGroupRef.current, { opacity: 0, scale: 0.98 });
      gsap.set(selectionRectRef.current, { strokeDashoffset: 80 });
      gsap.set(imageGroupRef.current, { opacity: 0 });
      gsap.set(shimmerRef.current, { x: -420, opacity: 0 });
      gsap.set(sketchSweepRef.current, { x: -420, opacity: 0 });
      gsap.set(sketchWipeRectRef.current, { x: 0, width: 1280 });
      gsap.set(sketchGroupRef.current, { opacity: 1, x: 0, y: 0, rotation: 0 });
    };

    resetSketch();

    const master = gsap.timeline({
      delay: 0.35,
      repeat: -1,
      repeatDelay: 0.35,
      onRepeat: resetSketch,
    });

    master
      // Phase 1: Draw sketch paths.
      .to(paths, {
        strokeDashoffset: 0,
        duration: 2.8,
        stagger: 0.08,
        ease: 'none',
      })
      // Phase 2: Slight hand tremble while drawing (keeps existing vibe).
      .to(
        sketchGroupRef.current,
        {
          x: 0.9,
          y: -0.4,
          rotation: 0.14,
          duration: 0.35,
          repeat: 5,
          yoyo: true,
          ease: 'sine.inOut',
        },
        0,
      )
      // Everything after this should start immediately when drawing completes.
      .addLabel('afterDraw')
      // Phase 3: Selection rectangle appears (overlaps with reveal/sweep).
      .to(
        selectionGroupRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: 'power2.out',
        },
        'afterDraw',
      )
      .to(
        selectionRectRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power1.out',
        },
        'afterDraw',
      )
      // Phase 4: Shimmer + reveal image (no wait).
      .to(imageGroupRef.current, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 'afterDraw')
      .to(
        shimmerRef.current,
        {
          opacity: 0.9,
          x: 1320,
          duration: SWEEP_DURATION,
          ease: 'power1.inOut',
        },
        'afterDraw+=0.05',
      )
      // Wipe sketch out with a light sweep (feels like "erase into render").
      .to(
        sketchSweepRef.current,
        {
          opacity: 0.85,
          x: 1320,
          duration: SWEEP_DURATION,
          ease: 'power1.inOut',
        },
        'afterDraw',
      )
      .to(
        sketchWipeRectRef.current,
        {
          x: 1280,
          width: 0,
          duration: SWEEP_DURATION,
          ease: 'power1.inOut',
        },
        'afterDraw',
      )
      .to(shimmerRef.current, { opacity: 0, duration: 0.2 }, '>-0.2')
      .to(sketchSweepRef.current, { opacity: 0, duration: 0.2 }, '<')
      // Keep reveal on screen longer.
      .to({}, { duration: 1.15 })
      // Phase 5: Retract sketch (clear) before restart.
      .to(paths, {
        strokeDashoffset: (index) => `${paths[index]?.getTotalLength() || 1}`,
        duration: 1.35,
        stagger: { each: 0.05, from: 'end' },
        ease: 'power1.inOut',
      })
      .to(imageGroupRef.current, { opacity: 0, duration: 0.22, ease: 'power1.inOut' }, '<0.25')
      .to(selectionGroupRef.current, { opacity: 0, duration: 0.18, ease: 'power1.inOut' }, '<');

    return () => {
      master.kill();
    };
  }, [shouldReduceMotion]);

  return (
    <svg
      viewBox="0 0 1280 760"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="villaSketchLine" x1="180" y1="120" x2="1120" y2="660" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4b4a45" />
          <stop offset="55%" stopColor="#25231f" />
          <stop offset="100%" stopColor="#615c55" />
        </linearGradient>

        <linearGradient id="villaShimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <linearGradient id="villaSketchSweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="42%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="58%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <filter id="villaSketchTremble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.015" numOctaves="1" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="villaSketchGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.3 0 1 0 0 0.25 0 0 1 0 0.22 0 0 0 0.45 0" result="color" />
          <feMerge>
            <feMergeNode in="color" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="villaClip">
          <rect x="80" y="86" width="1120" height="610" rx="44" ry="44" />
        </clipPath>

        <clipPath id="villaSketchWipe">
          <rect ref={sketchWipeRectRef} x="0" y="0" width="1280" height="760" />
        </clipPath>
      </defs>

      {/* Image reveal layer */}
      <g ref={imageGroupRef} clipPath="url(#villaClip)" opacity={shouldReduceMotion ? 1 : 0}>
        <image
          href={imageSrc}
          x="80"
          y="86"
          width="1120"
          height="610"
          preserveAspectRatio="xMidYMid slice"
          opacity={1}
        />
        <rect
          ref={shimmerRef}
          x="0"
          y="86"
          width="420"
          height="610"
          fill="url(#villaShimmer)"
          style={{ mixBlendMode: 'screen' }}
          opacity={0}
        />
        <rect x="80" y="86" width="1120" height="610" fill="rgba(0,0,0,0.08)" />
      </g>

      {/* Sketch layer */}
      <g
        ref={sketchGroupRef}
        clipPath="url(#villaSketchWipe)"
        filter={enableHeavyFilters ? 'url(#villaSketchGlow)' : undefined}
      >
        <g filter={enableHeavyFilters ? 'url(#villaSketchTremble)' : undefined}>
          {/* Background: mountains + horizon + sea lines */}
          <path ref={(el) => { sketchPathsRef.current[0] = el; }} d="M80 220 C170 170 270 150 360 168 C450 186 520 160 596 132 C690 98 780 90 872 122 C980 160 1088 182 1200 148" stroke="#7f786c" strokeOpacity="0.36" strokeWidth="1.35" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[1] = el; }} d="M90 252 C220 234 360 240 520 262 C660 280 820 278 1030 246 C1120 232 1180 220 1210 214" stroke="#8b8377" strokeOpacity="0.22" strokeWidth="1.05" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[2] = el; }} d="M82 288 L520 288" stroke="#6b655c" strokeOpacity="0.22" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[3] = el; }} d="M88 326 C170 324 260 332 350 352 C430 370 500 382 560 390" stroke="#6f685d" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

          {/* Coastline + cliff */}
          <path ref={(el) => { sketchPathsRef.current[4] = el; }} d="M102 560 C132 540 162 520 196 502 C232 482 264 468 292 456 C322 444 350 430 380 410 C410 390 432 372 450 350" stroke="#6f685d" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[5] = el; }} d="M118 600 C146 580 184 556 228 536 C276 512 324 496 374 470 C420 446 456 420 486 388" stroke="#665f55" strokeOpacity="0.34" strokeWidth="1.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

          {/* Main villa massing (closer to reference) */}
          <path ref={(el) => { sketchPathsRef.current[6] = el; }} d="M456 540 L456 326 L528 282 L648 254 L748 270 L856 322 L984 382 L984 540" stroke="url(#villaSketchLine)" strokeWidth="4.1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[7] = el; }} d="M456 326 L528 306 L528 540 M528 306 L648 278 L648 540 M648 278 L748 292 L748 540 M748 292 L856 326 L856 540 M856 326 L984 382" stroke="#332f29" strokeOpacity="0.86" strokeWidth="2.35" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

          {/* Tower on right */}
          <path ref={(el) => { sketchPathsRef.current[8] = el; }} d="M904 376 L904 196 L980 170 L1046 186 L1046 414" stroke="#2d2924" strokeOpacity="0.78" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[9] = el; }} d="M932 194 C946 176 966 168 990 172 C1014 176 1030 190 1032 210 C1034 228 1026 246 1010 256 C990 268 968 266 952 254 C938 244 930 228 930 212 C930 206 932 200 932 194" stroke="#4a443d" strokeOpacity="0.64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

          {/* Pool + terrace */}
          <path ref={(el) => { sketchPathsRef.current[10] = el; }} d="M340 550 L340 436 L540 398 L754 446 L754 550 Z" stroke="#3a342d" strokeOpacity="0.82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[11] = el; }} d="M356 520 L736 520 M356 498 L736 498 M356 476 L736 476" stroke="#6d6559" strokeOpacity="0.28" strokeWidth="1.05" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

          {/* Arches suggestion (less noisy) */}
          <path ref={(el) => { sketchPathsRef.current[12] = el; }} d="M520 418 C540 402 562 402 582 418 M612 406 C632 392 654 392 674 406 M706 422 C724 408 744 408 762 422" stroke="#5d574e" strokeOpacity="0.42" strokeWidth="1.35" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

          {/* Stairs and path to villa */}
          <path ref={(el) => { sketchPathsRef.current[13] = el; }} d="M760 548 L858 488 L936 452" stroke="#5f584f" strokeOpacity="0.46" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path ref={(el) => { sketchPathsRef.current[14] = el; }} d="M786 540 L886 482 M804 528 L904 470 M822 516 L922 458" stroke="#756e63" strokeOpacity="0.24" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
      </g>

      {/* Sketch sweep overlay (used to wipe sketch) */}
      <rect
        ref={sketchSweepRef}
        x="0"
        y="0"
        width="420"
        height="760"
        fill="url(#villaSketchSweep)"
        style={{ mixBlendMode: 'screen' }}
        opacity={0}
      />

      {/* Selection rectangle layer */}
      <g ref={selectionGroupRef} opacity={0}>
        <rect
          ref={selectionRectRef}
          x="76"
          y="82"
          width="1128"
          height="618"
          rx="46"
          ry="46"
          fill="rgba(0,0,0,0)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.3"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x="76"
          y="82"
          width="1128"
          height="618"
          rx="46"
          ry="46"
          fill="rgba(0,0,0,0)"
          stroke="rgba(203,123,62,0.45)"
          strokeWidth="2.1"
          opacity="0.28"
          vectorEffect="non-scaling-stroke"
        />
        {/* corner handles */}
        {[
          { x: 76, y: 82 },
          { x: 1204, y: 82 },
          { x: 76, y: 700 },
          { x: 1204, y: 700 },
        ].map((pt) => (
          <rect
            key={`${pt.x}-${pt.y}`}
            x={pt.x - 7}
            y={pt.y - 7}
            width="14"
            height="14"
            rx="4"
            fill="rgba(255,255,255,0.75)"
            opacity="0.35"
          />
        ))}
      </g>
    </svg>
  );
}

