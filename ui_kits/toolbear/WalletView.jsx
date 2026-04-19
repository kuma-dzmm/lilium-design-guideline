/* WalletView.jsx — hero balance, quick actions, transaction list */

function WalletView() {
  const [range, setRange] = React.useState('24h');
  const txs = [
    { id: 1, tone: 'success', label: '大头菜卖出 × 128', date: '2026-04-18 14:32', amount: '+ $24,680' },
    { id: 2, tone: 'danger',  label: '转账 — @Koishi',     date: '2026-04-18 11:04', amount: '− $ 3,400' },
    { id: 3, tone: 'info',    label: '股票分红 · TBEAR',  date: '2026-04-17 00:00', amount: '+ $   842' },
    { id: 4, tone: 'success', label: 'UNO 游戏奖金',       date: '2026-04-16 21:17', amount: '+ $   250' },
    { id: 5, tone: 'danger',  label: '农场扩建',           date: '2026-04-16 08:45', amount: '− $12,000' },
    { id: 6, tone: 'info',    label: '帕鲁交易 · 火花兽',  date: '2026-04-15 19:02', amount: '+ $ 8,400' },
  ];

  return (
    <div className="tb-main tb-main--narrow">
      <h1 style={{ margin: '0 0 18px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
        我的钱包
      </h1>

      <Card style={{ padding: 24 }}>
        <div className="muted" style={{ fontSize: 12 }}>余额</div>
        <div className="mono" style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.01em', margin: '4px 0 8px' }}>
          $1,284,320
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge tone="success">+ 12,480</Badge>
          <span className="muted" style={{ fontSize: 12 }}>24h · +0.97%</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <Button size="md" leftIcon={<Icon name="arrowRight" size={14} />}>转账</Button>
          <Button size="md" variant="secondary" leftIcon={<Icon name="plus" size={14} />}>充值</Button>
          <Button size="md" variant="ghost" leftIcon={<Icon name="trophy" size={14} />}>排行榜</Button>
        </div>
      </Card>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 10px' }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>交易记录</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {['24h', '7d', '30d'].map(r => (
            <button key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '4px 10px', fontSize: 12,
                background: range === r ? 'var(--bg-tertiary)' : 'transparent',
                color: range === r ? 'var(--fg-primary)' : 'var(--fg-secondary)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>{r}</button>
          ))}
        </div>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {txs.map((tx, i) => (
          <TxRow key={tx.id} tx={tx} last={i === txs.length - 1} />
        ))}
      </Card>

      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <Button variant="ghost">加载更多</Button>
      </div>
    </div>
  );
}

function TxRow({ tx, last }) {
  const toneMap = {
    success: { bg: 'var(--success-tint)', fg: 'var(--success)', glyph: '↓' },
    danger:  { bg: 'var(--danger-tint)',  fg: 'var(--danger)',  glyph: '↑' },
    info:    { bg: 'var(--info-tint)',    fg: 'var(--info)',    glyph: '⇌' },
  };
  const t = toneMap[tx.tone];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px',
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: t.bg, color: t.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700,
      }}>{t.glyph}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{tx.label}</div>
        <div className="muted mono" style={{ fontSize: 12 }}>{tx.date}</div>
      </div>
      <div className="mono" style={{ color: t.fg, fontWeight: 500, whiteSpace: 'pre' }}>
        {tx.amount}
      </div>
    </div>
  );
}

Object.assign(window, { WalletView });
