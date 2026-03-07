export default function Header({ onNewCountdown }) {
  return (
    <header style={{
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      padding:        '18px 32px',
      borderBottom:   '1px solid var(--border)',
      background:     'var(--bg)',
      position:       'sticky',
      top:            0,
      zIndex:         100,
    }}>
      <div style={{
        fontFamily:    'var(--font-display)',
        fontSize:      '18px',
        fontWeight:    800,
        color:         'var(--ink)',
        letterSpacing: '-0.03em',
      }}>
        time<span style={{ color: 'var(--indigo)' }}>ly</span>
      </div>

      <button
        onClick={onNewCountdown}
        style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '13px',
          fontWeight:  600,
          color:       'white',
          background:  'var(--indigo)',
          border:      'none',
          borderRadius:'100px',
          padding:     '10px 20px',
          cursor:      'pointer',
          boxShadow:   '0 4px 16px rgba(37,99,235,0.3)',
          transition:  'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.45)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.3)';
        }}
      >
        + New Countdown
      </button>
    </header>
  );
}
