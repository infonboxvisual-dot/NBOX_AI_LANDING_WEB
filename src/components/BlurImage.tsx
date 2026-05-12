import { useState } from 'react';
import { PLACEHOLDERS } from '../data/imagePlaceholders';

interface BlurImageProps {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
}

export function BlurImage({ src, alt, eager = false, className = '', imgClassName = '' }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const placeholder = PLACEHOLDERS[src];
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={
        placeholder
          ? {
              backgroundImage: `url(${placeholder})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}
