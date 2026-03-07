import { useEffect, useRef } from 'react';

export default function EmptyState({ onCreateClick }) {
  const sandTopRef    = useRef(null);
  const sandBottomRef = useRef(null);
  const sandStreamRef = useRef(null);
  const timerGroupRef = useRef(null);
  const phaseRef      = useRef(0);
  const lastTimeRef   = useRef(null);
  const rafRef        = useRef(null);
  const isFlippedRef  = useRef(false);

  useEffect(() => {
    function animate(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      phaseRef.current += dt * 0.18;
      if (phaseRef.current >= 1) phaseRef.current = 0;

      const fill = isFlippedRef.current
        ? phaseRef.current
        : 1 - phaseRef.current;

      if (sandTopRef.current) {
        const y = 52 + (90 - 52) * (1 - fill);
        const w = fill * 12;
        sandTopRef.current.setAttribute('d',
          `M${40 + w} ${y} Q70 ${y} ${100 - w} ${y} Q92 ${90 + fill*5} 70 ${95 + fill*3} Q48 ${90 + fill*5} ${40 + w} ${y} Z`
        );
      }

      if (sandBottomRef.current && fill > 0.02) {
        const bFill = fill;
        const by    = 162 - bFill * 44;
        sandBottomRef.current.setAttribute('d',
          `M${44 + (1-bFill)*10} 162 Q70 162 ${96 - (1-bFill)*10} 162 Q90 ${by+20} 70 ${by} Q50 ${by+20} ${44 + (1-bFill)*10} 162 Z`
        );
      }

      if (sandStreamRef.current) {
        sandStreamRef.current.style.opacity = fill > 0.05 ? '1' : '0';
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    const flipInterval = setInterval(() => {
      isFlippedRef.current = !isFlippedRef.current;
      phaseRef.current     = 0;
      if (timerGroupRef.current) {
        timerGroupRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4,0,0.2,1)';
        timerGroupRef.current.style.transform  = isFlippedRef.current
          ? 'rotate(180deg) translate(-140px, -180px)'
          : 'rotate(0deg)';
      }
    }, 5500);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(flipInterval);
    };
  }, []);

  return (
    <div style={{
      minHeight:      'calc(100vh - 61px)',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '40px 20px 60px',
      gap:            '40px',
      position:       'relative',
      overflow:       'hidden',
    }}>
      {/* Sand Timer */}
      <div style={{ position: 'relative', width: '160px', height: '200px' }}>
        {/* Radial glow — blue */}
        <div style={{
          position:     'absolute',
          width:        '300px',
          height:       '300px',
          top:          '50%',
          left:         '50%',
          transform:    'translate(-50%, -50%)',
          background:   'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          animation:    'glow-breathe 4s ease-in-out infinite',
          pointerEvents:'none',
        }}/>

        <svg
          viewBox="0 0 140 180"
          style={{
            width:'140px', height:'180px', overflow:'visible',
            filter:'drop-shadow(0 16px 40px rgba(37,99,235,0.25))',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blue glass gradient */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA"/>
              <stop offset="100%" stopColor="#2563EB"/>
            </linearGradient>
            {/* Sand stays amber */}
            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B"/>
              <stop offset="100%" stopColor="#FBBF24"/>
            </linearGradient>
            <clipPath id="topClip">
              <path d="M35 18 Q70 18 105 18 L100 95 Q85 108 70 112 Q55 108 40 95 Z"/>
            </clipPath>
            <clipPath id="bottomClip">
              <path d="M40 118 Q55 108 70 112 Q85 108 100 118 L105 162 Q70 162 35 162 Z"/>
            </clipPath>
          </defs>

          <g ref={timerGroupRef}>
            {/* Top + bottom bars — deep navy blue */}
            <rect x="26" y="10" width="88" height="10" rx="5" fill="#1E3A8A"/>
            <rect x="26" y="160" width="88" height="10" rx="5" fill="#1E3A8A"/>

            {/* Spring legs — blue */}
            <path d="M34 20 C26 30,34 38,26 48 C18 58,26 66,18 76 C10 86,18 94,26 104 C34 114,26 122,34 132 C42 142,34 150,34 160"
              fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4"/>
            <path d="M106 20 C114 30,106 38,114 48 C122 58,114 66,122 76 C130 86,122 94,114 104 C106 114,114 122,106 132 C98 142,106 150,106 160"
              fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4"/>

            {/* Glass bulbs — blue tint */}
            <path d="M36 18 Q70 18 104 18 L98 95 Q84 110 70 114 Q56 110 42 95 Z"
              fill="url(#glassGrad)" opacity="0.18" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.5"/>
            <path d="M42 118 Q56 110 70 114 Q84 110 98 118 L104 162 Q70 162 36 162 Z"
              fill="url(#glassGrad)" opacity="0.18" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.5"/>

            {/* Sand top */}
            <g clipPath="url(#topClip)">
              <path ref={sandTopRef} d="M42 52 Q70 52 98 52 Q92 80 70 95 Q48 80 42 52 Z" fill="url(#sandGrad)" opacity="0.9"/>
            </g>

            {/* Sand stream */}
            <g ref={sandStreamRef}>
              <rect x="68" y="110" width="4" height="18" rx="2" fill="#FBBF24" opacity="0.8"/>
            </g>

            {/* Sand bottom */}
            <g clipPath="url(#bottomClip)">
              <path ref={sandBottomRef} d="M70 125 Q70 125 70 125 Z" fill="url(#sandGrad)" opacity="0.9"/>
            </g>

            {/* Glass shine */}
            <path d="M46 24 Q58 20 66 30 Q60 40 48 38 Z" fill="white" opacity="0.25"/>
            <path d="M46 130 Q56 124 64 132 Q58 144 46 140 Z" fill="white" opacity="0.18"/>
          </g>
        </svg>
      </div>

      {/* Copy */}
      <div style={{ textAlign:'center', maxWidth:'340px' }}>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(28px, 4vw, 38px)',
          fontWeight:    800,
          lineHeight:    1.15,
          letterSpacing: '-0.03em',
          marginBottom:  '12px',
        }}>
          Nothing&rsquo;s counting<br/>
          <em style={{ fontStyle:'normal', color:'var(--indigo)' }}>down yet</em>
        </h1>
        <p style={{
          fontSize:     '14px',
          color:        'var(--ink-2)',
          lineHeight:   1.7,
          fontWeight:   300,
          marginBottom: '24px',
        }}>
          Your sand is still. Add your first event —<br/>
          a trip, a deadline, a launch — and watch<br/>
          time start to move.
        </p>
        <button
          onClick={onCreateClick}
          style={{
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '8px',
            fontFamily:  'var(--font-body)',
            fontSize:    '14px',
            fontWeight:  600,
            color:       'white',
            background:  'var(--indigo)',
            border:      'none',
            borderRadius:'100px',
            padding:     '14px 28px',
            cursor:      'pointer',
            boxShadow:   '0 4px 20px rgba(37,99,235,0.35)',
          }}
        >
          + Create your first countdown
        </button>
      </div>
    </div>
  );
}
