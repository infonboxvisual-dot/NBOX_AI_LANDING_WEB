import React from 'react';

export const FuturisticLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const containerSize = size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';

  return (
    <div className={`relative flex items-center justify-center ${containerSize}`}>
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
      <div className="absolute inset-0 rounded-full border border-transparent border-r-primary border-t-primary animate-spin"></div>
      <div className="absolute inset-2 rounded-full border border-b-white/40 border-l-white/40 border-transparent opacity-50 animate-spin-reverse"></div>
      <div className="relative flex h-1/2 w-1/2 animate-bounce items-center justify-center overflow-hidden rounded-xl bg-primary shadow-[0_0_25px_rgba(203,123,62,0.65)]">
        <span className="font-black text-white">N</span>
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export const AILoadingPanel: React.FC<{
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ title, subtitle, size = 'lg' }) => (
  <div className="flex flex-col items-center justify-center p-4 text-center">
    <FuturisticLoader size={size} />
    <p className="mt-4 animate-pulse font-black text-sm uppercase tracking-widest text-primary">{title}</p>
    {subtitle && <p className="mt-2 text-xs text-on-surface-variant">{subtitle}</p>}
  </div>
);
