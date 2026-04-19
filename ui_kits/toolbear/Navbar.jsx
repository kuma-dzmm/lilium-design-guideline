/* Navbar.jsx — fixed 56px top bar + mobile bottom TabBar */

function Navbar({ route, setRoute, user, status = 'success', onSignOut }) {
  const navItems = [
    { id: 'market',  label: '大头菜', icon: 'sprout' },
    { id: 'stock',   label: '股票',   icon: 'trendingUp' },
    { id: 'wallet',  label: '钱包',   icon: 'wallet' },
    { id: 'pals',    label: '帕鲁',   icon: 'egg' },
    { id: 'board',   label: '交易行', icon: 'shoppingBag' },
    { id: 'games',   label: '游戏',   icon: 'gamepad' },
    { id: 'raid',    label: '逃离',   icon: 'map' },
  ];
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40,
        height: 56,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 12,
      }}>
        <button
          onClick={() => setRoute('market')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none',
            color: 'var(--fg-primary)', fontWeight: 600,
            cursor: 'pointer', padding: 0, fontSize: 15,
          }}>
          <span style={{ fontSize: 22 }}>🐻</span>
          <span>ToolBear</span>
        </button>

        {/* Desktop nav */}
        <div className="tb-nav-desktop" style={{ display: 'flex', gap: 2, marginLeft: 12 }}>
          {navItems.map(item => (
            <NavLink key={item.id} active={route === item.id}
              onClick={() => setRoute(item.id)} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <StatusDot tone={status} label={status === 'success' ? '正常' : '连接错误'} />
          {user ? (
            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{
                position: 'relative',
                background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
              }}>
              <Avatar text={user.initials} />
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  style={{
                    position: 'absolute', top: 40, right: 0,
                    width: 220,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    boxShadow: 'var(--shadow-popover)',
                    padding: 8,
                    textAlign: 'left',
                    zIndex: 50,
                  }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
                    <div className="muted mono" style={{ fontSize: 12 }}>{user.id}</div>
                  </div>
                  <MenuItem icon="settings" label="设置" onClick={() => { setMenuOpen(false); setRoute('settings'); }} />
                  <MenuItem icon="trophy" label="成就" onClick={() => { setMenuOpen(false); setRoute('achievements'); }} />
                  <MenuItem icon="logOut" label="退出当前账号" tone="danger"
                    onClick={() => { setMenuOpen(false); onSignOut?.(); }} />
                </div>
              )}
            </button>
          ) : (
            <Button size="sm" onClick={() => setRoute('login')}>登录</Button>
          )}
        </div>
      </nav>
    </>
  );
}

function NavLink({ active, icon, onClick, children }) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? 'var(--accent-tint)' : (hover ? 'var(--bg-tertiary)' : 'transparent');
  const color = active ? 'var(--accent)' : (hover ? 'var(--fg-primary)' : 'var(--fg-secondary)');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 10px', borderRadius: 8,
        background: bg, color, fontSize: 13,
        fontWeight: active ? 500 : 400,
        border: 'none', cursor: 'pointer',
      }}>
      <Icon name={icon} size={15} />
      {children}
    </button>
  );
}

function MenuItem({ icon, label, tone, onClick }) {
  const [hover, setHover] = React.useState(false);
  const color = tone === 'danger' ? 'var(--danger)' : 'var(--fg-primary)';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '10px 12px', borderRadius: 8,
        background: hover ? 'var(--bg-tertiary)' : 'transparent',
        color, border: 'none', cursor: 'pointer',
        fontSize: 13, fontFamily: 'inherit',
        textAlign: 'left',
      }}>
      <Icon name={icon} size={15} />
      {label}
    </button>
  );
}

function TabBar({ route, setRoute }) {
  const items = [
    { id: 'market',  label: '大头菜', icon: 'sprout' },
    { id: 'stock',   label: '股票',   icon: 'trendingUp' },
    { id: 'wallet',  label: '钱包',   icon: 'wallet' },
    { id: 'games',   label: '游戏',   icon: 'gamepad' },
    { id: 'more',    label: '更多',   icon: 'menu' },
  ];
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 30,
      height: 56,
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'stretch',
      padding: '0 4px',
    }}>
      {items.map(item => {
        const active = route === item.id;
        return (
          <button key={item.id}
            onClick={() => setRoute(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: active ? 'var(--accent)' : 'var(--fg-secondary)',
              fontSize: 10, padding: 0,
            }}>
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { Navbar, TabBar });
