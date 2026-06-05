import clsx from 'clsx';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export default function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { outer: 32, inner: 28, text: 10, subtext: 4 },
    md: { outer: 48, inner: 42, text: 16, subtext: 6 },
    lg: { outer: 64, inner: 56, text: 22, subtext: 8 },
    xl: { outer: 96, inner: 84, text: 32, subtext: 11 },
  };
  const s = sizes[size];

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <svg width={s.outer} height={s.outer} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="logoGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e8c97a" />
            <stop offset="100%" stopColor="#7a5a1a" />
          </radialGradient>
          <radialGradient id="bgGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3d2000" />
            <stop offset="100%" stopColor="#1a0a00" />
          </radialGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" stroke="#c9a84c" strokeWidth="3" />
        {/* Wheel spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line
            key={i}
            x1="50" y1="50"
            x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}
        {/* Inner hub */}
        <circle cx="50" cy="50" r="10" fill="url(#logoGrad)" />
        {/* Car silhouette */}
        <path
          d="M22 58 L24 50 L32 44 L50 42 L68 44 L76 50 L78 58 L74 60 Q68 63 62 61 L38 61 Q32 63 26 60 Z"
          fill="url(#logoGrad)"
          opacity="0.9"
        />
        <path
          d="M32 50 L36 45 L50 43 L64 45 L68 50 Z"
          fill="#1a0a00"
          opacity="0.6"
        />
        {/* Wheels */}
        <circle cx="34" cy="60" r="5" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1.5" />
        <circle cx="66" cy="60" r="5" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1.5" />
        <circle cx="34" cy="60" r="2" fill="#c9a84c" />
        <circle cx="66" cy="60" r="2" fill="#c9a84c" />
      </svg>
      <div className="flex flex-col">
        <span
          className="font-bold tracking-widest leading-none"
          style={{ fontSize: s.text, color: '#c9a84c', fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}
        >
          VCCP
        </span>
        <span
          className="tracking-wider leading-none mt-0.5"
          style={{ fontSize: s.subtext, color: '#e8c97a', fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}
        >
          Vintage Car Collector Portal
        </span>
      </div>
    </div>
  );
}
