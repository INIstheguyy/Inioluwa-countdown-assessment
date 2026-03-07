export default function Toast({ message, onHide }) {
  return (
    <div
      className="toast-enter"
      style={{
        position:     'fixed',
        bottom:       '32px',
        right:        '32px',
        zIndex:       300,
        background:   'var(--ink)',
        color:        'white',
        borderRadius: '12px',
        padding:      '12px 18px',
        display:      'flex',
        alignItems:   'center',
        gap:          '10px',
        fontFamily:   'var(--font-body)',
        fontSize:     '13px',
        fontWeight:   500,
        boxShadow:    '0 8px 32px rgba(26,26,46,0.25)',
        maxWidth:     '320px',
        cursor:       'pointer',
      }}
      onClick={onHide}
    >
      <span style={{ fontSize:'16px' }}>🎉</span>
      <span>{message}</span>
    </div>
  );
}
