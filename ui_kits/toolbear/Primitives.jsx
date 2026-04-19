/* Primitives.jsx
   Shared atomic building blocks — buttons, badges, inputs, icons. */

const { useState, useRef, useEffect } = React;

/* ---------- Button ---------- */
function Button({ variant = 'primary', size = 'md', leftIcon, rightIcon, children, disabled, ...rest }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 8,
    fontWeight: 500,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { padding: '6px 10px', fontSize: 12 },
    md: { padding: '10px 16px', fontSize: 13 },
    lg: { padding: '12px 20px', fontSize: 14 },
    xl: { padding: '14px 20px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--accent)',       color: '#fff' },
    secondary: { background: 'var(--bg-tertiary)',  color: 'var(--fg-primary)', borderColor: 'var(--border)' },
    danger:    { background: 'var(--danger)',       color: '#fff' },
    ghost:     { background: 'transparent',         color: 'var(--fg-secondary)' },
    tonal:     { background: 'var(--accent-tint)',  color: 'var(--accent)' },
  };
  return (
    <button
      {...rest}
      disabled={disabled}
      className={'tb-focus ' + (rest.className || '')}
      style={{ ...base, ...sizes[size], ...variants[variant], ...(rest.style || {}) }}
    >
      {leftIcon}{children}{rightIcon}
    </button>
  );
}

/* ---------- Badge ---------- */
function Badge({ tone = 'accent', children, style }) {
  const tones = {
    accent:  { bg: 'var(--accent-tint)',  fg: 'var(--accent)'  },
    success: { bg: 'var(--success-tint)', fg: 'var(--success)' },
    danger:  { bg: 'var(--danger-tint)',  fg: 'var(--danger)'  },
    info:    { bg: 'var(--info-tint)',    fg: 'var(--info)'    },
    warning: { bg: 'var(--warning-tint)', fg: 'var(--warning)' },
    neutral: { bg: 'var(--bg-tertiary)',  fg: 'var(--fg-secondary)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      background: t.bg, color: t.fg,
      ...style,
    }}>{children}</span>
  );
}

/* ---------- Input ---------- */
function Input({ style, prefix, suffix, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'var(--bg-tertiary)',
      border: `1px solid ${focus ? 'rgba(255,90,138,0.88)' : 'var(--border)'}`,
      boxShadow: focus ? '0 0 0 1px rgba(255,90,138,0.24)' : 'none',
      borderRadius: 8,
      padding: '8px 12px',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      ...style,
    }}>
      {prefix && <span style={{ color: 'var(--fg-secondary)' }}>{prefix}</span>}
      <input
        {...rest}
        onFocus={e => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={e => { setFocus(false); rest.onBlur?.(e); }}
        style={{
          flex: 1, minWidth: 0,
          background: 'transparent',
          border: 'none', outline: 'none',
          color: 'var(--fg-primary)',
          fontSize: 14,
          fontFamily: 'inherit',
        }}
      />
      {suffix && <span style={{ color: 'var(--fg-secondary)' }}>{suffix}</span>}
    </div>
  );
}

/* ---------- Card ---------- */
function Card({ children, style, interactive, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: interactive && hover ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 20,
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background-color 150ms ease',
        ...style,
      }}
    >{children}</div>
  );
}

/* ---------- Spinner ---------- */
function Spinner({ size = 14 }) {
  return <span className="tb-spin" style={{ width: size, height: size }} />;
}

/* ---------- Avatar ---------- */
function Avatar({ text = '?', size = 32, color = 'var(--accent)' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.42), fontWeight: 600,
      color,
    }}>{text}</div>
  );
}

/* ---------- StatusDot ---------- */
function StatusDot({ tone = 'success', label, size = 8 }) {
  const bg = {
    success: 'var(--success)',
    danger:  'var(--danger)',
    warning: 'var(--warning)',
    neutral: 'var(--fg-secondary)',
  }[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-secondary)' }}>
      <span style={{ width: size, height: size, borderRadius: '50%', background: bg }} />
      {label}
    </span>
  );
}

/* ---------- Icon (inline Lucide-style stroke SVG) ---------- */
function Icon({ name, size = 18, color = 'currentColor' }) {
  const paths = {
    sprout: <><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></>,
    trendingUp: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    wallet: <><path d="M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 1 0 0 4h3a1 1 0 0 0 1-1v-2"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    map: <><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894L8.106 3.447a2 2 0 0 1 1.788 0Z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></>,
    gamepad: <><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></>,
    egg: <><path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/></>,
    menu: <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    barChart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    shoppingBag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    check: <><path d="M20 6 9 17l-5-5"/></>,
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    logOut: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    moreHorizontal: <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

Object.assign(window, { Button, Badge, Input, Card, Spinner, Avatar, StatusDot, Icon });
