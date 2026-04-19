/* LoginView.jsx — code-based login. User pastes /login CODE into bot chat. */

function LoginView({ onSignIn }) {
  const [stage, setStage] = React.useState('code'); // code | waiting
  const [code, setCode] = React.useState('482193');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (stage !== 'waiting') return;
    const t = setTimeout(() => {
      onSignIn?.({
        name: '@Koishi',
        id: 'U-00128473',
        initials: 'KS',
      });
    }, 1800);
    return () => clearTimeout(t);
  }, [stage]);

  const copy = () => {
    navigator.clipboard?.writeText(`/login ${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="tb-main tb-main--narrow" style={{ paddingTop: 72 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🐻</div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
          登录 ToolBear
        </h1>
        <p className="muted" style={{ margin: '8px 0 0', fontSize: 13 }}>
          请在聊天窗口输入下面的指令以完成登录
        </p>
      </div>

      <Card style={{ padding: 28 }}>
        <div style={{ textAlign: 'center' }}>
          <div className="muted" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Login code
          </div>
          <div className="mono" style={{
            fontSize: 40, fontWeight: 700, letterSpacing: '0.06em',
            margin: '8px 0 18px',
          }}>
            {code.split('').map((c, i) => (
              <span key={i} style={{ display: 'inline-block', minWidth: 22 }}>{c}</span>
            ))}
          </div>

          <div
            onClick={copy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 14px',
              cursor: 'pointer',
            }}>
            <span className="mono" style={{ fontSize: 14 }}>/login {code}</span>
            <Icon name={copied ? 'check' : 'copy'} size={14} color="var(--fg-secondary)" />
          </div>

          <div className="muted" style={{ fontSize: 12, marginTop: 20, lineHeight: 1.6 }}>
            复制上面的指令，发送给 <span className="mono">@ToolBearBot</span><br/>
            完成后点击下方「等待验证」。
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Button variant="secondary" onClick={() => setCode(Math.floor(100000 + Math.random() * 900000).toString())}>
              换一个
            </Button>
            <Button onClick={() => setStage('waiting')} disabled={stage === 'waiting'}>
              {stage === 'waiting' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Spinner /> 等待验证中...
                </span>
              ) : '等待验证'}
            </Button>
          </div>
        </div>
      </Card>

      <div className="muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 16 }}>
        也支持 <span className="mono">JWT</span> · <span className="mono">Passkey</span>
      </div>
    </div>
  );
}

Object.assign(window, { LoginView });
