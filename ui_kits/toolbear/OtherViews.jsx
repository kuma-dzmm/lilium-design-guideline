/* StockView.jsx · PalsView.jsx · ConfirmDialog.jsx */

function StockView() {
  const stocks = [
    { ticker: 'TBEAR', name: '工具熊控股',   price: '$ 482.10', change: '+2.14%', tone: 'success' },
    { ticker: 'TURNP', name: '大头菜期货',   price: '$ 128.40', change: '+6.82%', tone: 'success' },
    { ticker: 'PALZ',  name: '帕鲁繁育所',   price: '$  64.20', change: '−1.08%', tone: 'danger'  },
    { ticker: 'UNOX',  name: '皇牌娱乐集团', price: '$  22.80', change: '−3.40%', tone: 'danger'  },
    { ticker: 'RAID',  name: '逃离股份',     price: '$ 108.50', change: '+0.42%', tone: 'success' },
    { ticker: 'MIN3',  name: '煤矿工坊',     price: '$  14.06', change: '+0.00%', tone: 'neutral' },
  ];
  return (
    <div className="tb-main">
      <h1 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>股票</h1>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '88px 1fr 120px 100px 80px',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          fontSize: 11, color: 'var(--fg-secondary)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          <div>代码</div><div>名称</div><div style={{ textAlign: 'right' }}>现价</div><div style={{ textAlign: 'right' }}>涨跌</div><div></div>
        </div>
        {stocks.map((s, i) => (
          <div key={s.ticker} style={{
            display: 'grid',
            gridTemplateColumns: '88px 1fr 120px 100px 80px',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: i === stocks.length - 1 ? 'none' : '1px solid var(--border)',
          }}>
            <div className="mono" style={{ fontWeight: 600, fontSize: 14 }}>{s.ticker}</div>
            <div style={{ fontSize: 14 }}>{s.name}</div>
            <div className="mono" style={{ textAlign: 'right', fontSize: 14 }}>{s.price}</div>
            <div className="mono" style={{ textAlign: 'right', fontSize: 13,
              color: s.tone === 'success' ? 'var(--success)' : s.tone === 'danger' ? 'var(--danger)' : 'var(--fg-secondary)' }}>
              {s.change}
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button size="sm" variant="secondary">交易</Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function PalsView() {
  const pals = [
    { name: '火花兽',   species: '火属性', lvl: 24, glyph: '🔥', tint: 'rgba(255,90,138,0.15)',  fg: '#ff5a8a' },
    { name: '绒毛鼠',   species: '土属性', lvl: 12, glyph: '🐹', tint: 'rgba(210,153,34,0.15)',  fg: '#d29922' },
    { name: '水灵',     species: '水属性', lvl: 31, glyph: '💧', tint: 'rgba(88,166,255,0.15)',  fg: '#58a6ff' },
    { name: '翠叶',     species: '草属性', lvl:  8, glyph: '🌿', tint: 'rgba(63,185,80,0.15)',   fg: '#3fb950' },
    { name: '雷鳞',     species: '雷属性', lvl: 19, glyph: '⚡', tint: 'rgba(210,153,34,0.15)',  fg: '#d29922' },
    { name: '夜羽',     species: '暗属性', lvl: 27, glyph: '🦇', tint: 'rgba(142,142,157,0.15)', fg: '#8e8e9d' },
  ];
  return (
    <div className="tb-main">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>帕鲁</h1>
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="secondary" leftIcon={<Icon name="plus" size={14} />}>孵化蛋</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {pals.map(p => (
          <Card key={p.name} interactive style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: p.tint, color: p.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{p.glyph}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.species}</div>
              </div>
              <div className="mono" style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--accent)' }}>Lv {p.lvl}</div>
            </div>
            <div style={{
              marginTop: 12, height: 6, borderRadius: 999,
              background: 'var(--bg-tertiary)', overflow: 'hidden',
            }}>
              <div style={{ width: `${(p.lvl / 40) * 100}%`, height: '100%', background: p.fg }}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ConfirmDialog({ title, body, confirmLabel = '确认', danger, onConfirm, onCancel }) {
  return (
    <div className="tb-scrim" onClick={onCancel}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 24,
          width: '92%', maxWidth: 400,
          boxShadow: 'var(--shadow-modal)',
        }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{title}</div>
        <div className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{body}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <Button variant="secondary" onClick={onCancel}>取消</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="tb-main" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>🌙</div>
      <div style={{ fontSize: 16, fontWeight: 500 }}>{title}</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>{body}</div>
    </div>
  );
}

Object.assign(window, { StockView, PalsView, ConfirmDialog, EmptyState });
