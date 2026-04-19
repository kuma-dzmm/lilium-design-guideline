/* MarketView.jsx — turnip market: price chart + holdings + order book */

function MarketView() {
  // Sparkline data — normalized 0..1
  const data = [0.42, 0.38, 0.45, 0.52, 0.48, 0.55, 0.60, 0.58, 0.65, 0.72, 0.68, 0.74, 0.80, 0.76, 0.82, 0.88, 0.85, 0.92, 0.87, 0.93];
  const [tab, setTab] = React.useState('overview');

  const w = 560, h = 140, pad = 8;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => [pad + i * stepX, pad + (1 - d) * (h - pad * 2)]);
  const poly = pts.map(p => p.join(',')).join(' ');
  const fill = `${pad},${h - pad} ${poly} ${pad + (data.length - 1) * stepX},${h - pad}`;

  return (
    <div className="tb-main">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--success-tint)', color: 'var(--success)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>🌱</div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
          大头菜市场
        </h1>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 0' }}>
          <div className="muted" style={{ fontSize: 12 }}>当前价格</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div className="mono" style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.01em' }}>
              $128.4
            </div>
            <Badge tone="success">+ $8.20 (+6.82%)</Badge>
            <span className="muted" style={{ fontSize: 12 }}>/ 株</span>
          </div>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block', marginTop: 12 }}>
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={fill} fill="url(#spark)"/>
          <polyline points={poly} fill="none" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{
          display: 'flex', gap: 0, borderTop: '1px solid var(--border)',
          padding: '0 20px',
        }}>
          {['overview', 'orderbook', 'farm'].map(t => {
            const active = tab === t;
            const label = { overview: '概览', orderbook: '订单簿', farm: '农场' }[t];
            return (
              <button key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '12px 14px', fontSize: 13, fontWeight: 500,
                  background: 'transparent',
                  color: active ? 'var(--accent)' : 'var(--fg-secondary)',
                  border: 'none',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>{label}</button>
            );
          })}
        </div>
      </Card>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          <Stat label="今日高点" value="$132.8" tone="success"/>
          <Stat label="今日低点" value="$118.0" tone="danger"/>
          <Stat label="24h 成交" value="$3.2B" />
          <Stat label="持仓" value="128 株" tone="accent"/>
        </div>
      )}

      {tab === 'orderbook' && (
        <Card style={{ marginTop: 16, padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
            <div className="muted" style={{ padding: '10px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>买单</div>
            <div className="muted" style={{ padding: '10px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', borderLeft: '1px solid var(--border)' }}>卖单</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <OBSide side="buy"  rows={[['$128.1', '84'], ['$127.8', '120'], ['$127.4', '210'], ['$126.9', '80']]} />
            <OBSide side="sell" rows={[['$128.7', '64'], ['$129.0', '145'], ['$129.5', '200'], ['$130.2', '90']]} />
          </div>
        </Card>
      )}

      {tab === 'farm' && (
        <Card style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 64 }}>🌾</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>我的农场</div>
              <div className="muted" style={{ fontSize: 13 }}>4 块地 · 种植中 · 下次收获 12:42</div>
              <div style={{
                background: 'var(--bg-tertiary)', borderRadius: 999,
                height: 6, marginTop: 10, overflow: 'hidden',
              }}>
                <div style={{ width: '68%', height: '100%', background: 'var(--success)' }}/>
              </div>
            </div>
            <Button>浇水</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value, tone }) {
  const color = {
    success: 'var(--success)',
    danger: 'var(--danger)',
    accent: 'var(--accent)',
  }[tone] || 'var(--fg-primary)';
  return (
    <Card style={{ padding: 16 }}>
      <div className="muted" style={{ fontSize: 12 }}>{label}</div>
      <div className="mono" style={{ fontSize: 18, fontWeight: 600, color, marginTop: 2 }}>{value}</div>
    </Card>
  );
}

function OBSide({ side, rows }) {
  const color = side === 'buy' ? 'var(--success)' : 'var(--danger)';
  return (
    <div style={{ borderLeft: side === 'sell' ? '1px solid var(--border)' : 'none' }}>
      {rows.map(([price, qty], i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 13,
        }}>
          <span style={{ color }}>{price}</span>
          <span className="muted">{qty}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { MarketView });
