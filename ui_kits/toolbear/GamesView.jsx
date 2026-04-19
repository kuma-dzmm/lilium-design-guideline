/* GamesView.jsx — 游戏 lobby. Game tiles + active rooms. */

function GamesView({ onOpenGame }) {
  const games = [
    { id: 'poker', glyph: '♠️', tint: 'rgba(255,90,138,0.15)', fg: '#ff5a8a',
      title: '德州扑克', players: '3 / 8',
      desc: '经典无限注德州扑克，支持锦标赛与现金桌。' },
    { id: 'uno',   glyph: '🎴', tint: 'rgba(88,166,255,0.15)', fg: '#58a6ff',
      title: 'UNO',   players: '2 / 10',
      desc: '经典 UNO 卡牌游戏，支持各种功能牌和万能牌，创建房间后分享链接邀请好友加入。' },
    { id: 'raid',  glyph: '⚔️', tint: 'rgba(255,56,96,0.15)', fg: '#ff3860',
      title: '逃离魅魔谷', players: '单人',
      desc: '文字探索 MUD，含地图、技能、战斗和背包系统。' },
    { id: 'slots', glyph: '🎰', tint: 'rgba(210,153,34,0.15)', fg: '#d29922',
      title: '老虎机', players: '单人',
      desc: '经典三轴老虎机，豪赌一把，小心上瘾。' },
  ];
  const rooms = [
    { id: 'rm-1', game: '德州扑克', host: '@Koishi',  players: '4 / 8', status: '进行中' },
    { id: 'rm-2', game: 'UNO',     host: '@Reimu',   players: '2 / 6', status: '等待中' },
    { id: 'rm-3', game: 'UNO',     host: '@Marisa',  players: '3 / 4', status: '进行中' },
  ];

  return (
    <div className="tb-main">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>游戏</h1>
        <div style={{ marginLeft: 'auto' }}>
          <Button leftIcon={<Icon name="plus" size={14} />}>创建游戏</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {games.map(g => (
          <Card key={g.id} interactive onClick={() => onOpenGame?.(g.id)} style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: g.tint, color: g.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{g.glyph}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{g.title}</div>
                <div className="muted" style={{ fontSize: 11 }}>{g.players}</div>
              </div>
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 10, lineHeight: 1.55 }}>{g.desc}</div>
          </Card>
        ))}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 600, margin: '28px 0 10px' }}>活跃房间</h2>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {rooms.map((r, i) => (
          <div key={r.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderBottom: i === rooms.length - 1 ? 'none' : '1px solid var(--border)',
          }}>
            <div className="mono muted" style={{ fontSize: 11, width: 54 }}>#{r.id.slice(-3)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{r.game} · {r.host}</div>
              <div className="muted mono" style={{ fontSize: 12 }}>{r.players}</div>
            </div>
            <Badge tone={r.status === '进行中' ? 'success' : 'warning'}>{r.status}</Badge>
            <Button size="sm" variant="secondary">加入</Button>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* Poker table — shown when user opens a poker game */
function PokerTable({ onClose }) {
  const hand = [
    '../../assets/poker/AS.svg',
    '../../assets/poker/KH.svg',
  ];
  const community = [
    '../../assets/poker/QD.svg',
    '../../assets/poker/JC.svg',
    '../../assets/poker/TS.svg',
    '../../assets/poker/9H.svg',
    null,
  ];
  const seats = [
    { name: '@Reimu',  chips: '$ 14,200', you: false, fold: false },
    { name: '@Marisa', chips: '$  8,600', you: false, fold: true  },
    { name: 'You',     chips: '$ 12,480', you: true,  fold: false },
    { name: '@Sanae',  chips: '$ 22,100', you: false, fold: false },
  ];

  return (
    <div className="tb-main tb-main--wide">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Button variant="ghost" size="sm" leftIcon={<Icon name="arrowLeft" size={14} />} onClick={onClose}>返回大厅</Button>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, marginLeft: 4 }}>德州扑克 · #rm-1</h1>
        <div style={{ marginLeft: 'auto' }}>
          <Badge tone="success">进行中</Badge>
        </div>
      </div>

      <Card style={{
        padding: 28, background: 'var(--bg-secondary)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        {/* Seats top row */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', width: '100%' }}>
          {seats.slice(0, 2).map(s => <Seat key={s.name} seat={s} />)}
        </div>

        {/* Community cards */}
        <div style={{ display: 'flex', gap: 10 }}>
          {community.map((src, i) => src
            ? <img key={i} src={src} alt="" style={{ height: 120, background: '#fff', borderRadius: 6 }}/>
            : <div key={i} style={{
                height: 120, width: 86, borderRadius: 6,
                border: '1px dashed var(--border)',
                background: 'rgba(255,255,255,0.02)',
              }}/>
          )}
        </div>

        <div className="mono" style={{
          padding: '6px 14px', borderRadius: 999,
          background: 'var(--bg-tertiary)', fontSize: 13,
          border: '1px solid var(--border)',
        }}>
          底池 <span style={{ color: 'var(--accent)' }}>$ 2,400</span>
        </div>

        {/* Seats bottom row */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', width: '100%' }}>
          {seats.slice(2, 4).map(s => <Seat key={s.name} seat={s} />)}
        </div>

        {/* Your hand */}
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border)',
          borderRadius: 12, padding: '14px 18px',
        }}>
          {hand.map(src => <img key={src} src={src} alt="" style={{ height: 110, background: '#fff', borderRadius: 6 }}/>)}
          <div style={{ width: 20 }}/>
          <Button variant="secondary" size="lg">弃牌</Button>
          <Button variant="secondary" size="lg">跟注 $400</Button>
          <Button size="lg">加注 $1,200</Button>
        </div>
      </Card>
    </div>
  );
}

function Seat({ seat }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 14px',
      background: seat.you ? 'var(--accent-tint)' : 'var(--bg-tertiary)',
      border: `1px solid ${seat.you ? 'rgba(255,90,138,0.4)' : 'var(--border)'}`,
      borderRadius: 12,
      opacity: seat.fold ? 0.4 : 1,
    }}>
      <Avatar text={seat.name.replace('@', '').slice(0, 2).toUpperCase()} size={28}/>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: seat.you ? 'var(--accent)' : 'var(--fg-primary)' }}>
          {seat.name}{seat.fold && <span className="muted" style={{ fontWeight: 400, marginLeft: 6 }}>· 已弃牌</span>}
        </div>
        <div className="mono muted" style={{ fontSize: 12 }}>{seat.chips}</div>
      </div>
    </div>
  );
}

Object.assign(window, { GamesView, PokerTable });
