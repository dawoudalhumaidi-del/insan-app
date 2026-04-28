// Premium UI primitives — used across screens for consistency

// ─────────────── Toast system (global)
const ToastBus = (() => {
  const listeners = new Set();
  return {
    emit: (toast) => listeners.forEach(l => l(toast)),
    on: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
  };
})();
window.toast = (message, opts = {}) => ToastBus.emit({ id: Date.now()+Math.random(), message, ...opts });

function Toaster({ dark }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => ToastBus.on((t) => {
    setItems(s => [...s, t]);
    setTimeout(() => setItems(s => s.filter(i => i.id !== t.id)), t.duration || 2600);
  }), []);
  return (
    <div style={{position:'absolute', top:84, left:0, right:0, display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:80, pointerEvents:'none'}}>
      {items.map(t => (
        <div key={t.id} className="toast-pop" style={{
          padding:'12px 18px', minWidth:200, maxWidth:340,
          background: t.tone==='success' ? 'linear-gradient(135deg, #2E7D5B, #1f5f43)' :
                      t.tone==='error'   ? 'linear-gradient(135deg, #AE1F24, #6B1115)' :
                                            (dark ? 'rgba(28,28,32,0.95)' : 'rgba(20,20,24,0.94)'),
          backdropFilter: 'blur(20px)',
          color:'#fff', borderRadius:14,
          fontSize:13, fontWeight:600, fontFamily:'var(--font-arabic)',
          textAlign:'center', boxShadow:'0 12px 40px rgba(0,0,0,0.3)',
          pointerEvents:'auto', display:'flex', alignItems:'center', gap:10, justifyContent:'center',
          border: `1px solid ${t.tone==='success' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
        }}>
          {t.icon && <span style={{fontSize:18}}>{t.icon}</span>}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
window.Toaster = Toaster;

// ─────────────── Animated Number — counts up on mount
function AnimatedNumber({ to, duration = 1200, format = (n) => n.toLocaleString('en-US'), style }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span style={style}>{format(v)}</span>;
}
window.AnimatedNumber = AnimatedNumber;

// ─────────────── Animated Progress Ring — animates from 0 to progress on mount
function AnimatedRing({ progress = 0, size = 64, stroke = 4, color = '#AE1F24', track = 'rgba(0,0,0,0.12)', children }) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setP(progress), 60);
    return () => clearTimeout(t);
  }, [progress]);
  const r = size/2 - stroke/2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{position:'relative', width:size, height:size, display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
      <svg width={size} height={size} style={{position:'absolute', inset:0, transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
                strokeDasharray={c} strokeDashoffset={c*(1-p)} strokeLinecap="round"
                style={{transition:'stroke-dashoffset 1.4s cubic-bezier(0.32, 0.72, 0, 1)'}}/>
      </svg>
      {children}
    </div>
  );
}
window.AnimatedRing = AnimatedRing;

// ─────────────── Heart / Bookmark with pop animation
function HeartBtn({ id, size = 22, dark, onChange }) {
  const nav = window.useNav?.();
  const filled = !!(nav?.bookmarks?.[id]);
  const [pop, setPop] = React.useState(false);
  const handle = (e) => {
    e?.stopPropagation?.();
    nav?.toggleBookmark(id);
    setPop(true);
    setTimeout(() => setPop(false), 420);
    if (!filled) window.toast?.('تمت الإضافة للمحفوظات', { icon: '💝', tone: 'success', duration: 1800 });
    onChange?.(!filled);
  };
  return (
    <button onClick={handle} style={{
      background:'transparent', border:'none', padding:6, cursor:'pointer', display:'inline-flex',
      transform: pop ? 'scale(1.35)' : 'scale(1)', transition:'transform 280ms cubic-bezier(0.32, 0.72, 0, 1)',
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{transition:'fill 240ms ease'}}>
        <path
          d="M12 21s-7-4.5-9.5-9.2C0.7 8 2.4 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4.1 0 5.8 4 4 7.8C19 16.5 12 21 12 21z"
          fill={filled ? '#AE1F24' : 'none'}
          stroke={filled ? '#AE1F24' : (dark ? '#fff' : '#1a1a1a')}
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}
window.HeartBtn = HeartBtn;

// ─────────────── Skeleton box for loading states
function Skeleton({ w = '100%', h = 14, r = 6, dark = false, style }) {
  return <div style={{
    width: w, height: h, borderRadius: r, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    backgroundImage: `linear-gradient(90deg, transparent 0%, ${dark?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.6)'} 50%, transparent 100%)`,
    backgroundSize:'200% 100%', backgroundRepeat:'no-repeat',
    animation:'shimmer 1.4s ease-in-out infinite',
    ...style,
  }}/>;
}
window.Skeleton = Skeleton;

// ─────────────── Greeting (time-based) + Streak card
function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return { ar: 'بارك الله ليلتك', en: 'Late night', icon: '🌙' };
  if (h < 12) return { ar: 'صباح النور', en: 'Good morning', icon: '☀︎' };
  if (h < 17) return { ar: 'مساء الخير', en: 'Good afternoon', icon: '🌤' };
  if (h < 20) return { ar: 'مساء الورد', en: 'Good evening', icon: '🌅' };
  return { ar: 'بارك الله مساءك', en: 'Evening', icon: '✨' };
}
window.getGreeting = getGreeting;

function StreakCard({ days = 7, dark, onClick }) {
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  return (
    <button onClick={onClick} style={{
      all:'unset', cursor:'pointer',
      padding:'14px 16px', borderRadius:18,
      background: 'linear-gradient(135deg, #FF8A00 0%, #E84A50 100%)',
      color:'#fff', display:'flex', alignItems:'center', gap:12,
      boxShadow:'0 12px 30px rgba(232,74,80,0.25)',
      position:'relative', overflow:'hidden',
      width:'100%', boxSizing:'border-box',
    }}>
      <div style={{position:'absolute', inset:0, opacity:0.15, backgroundImage:"url('assets/patterns/insan-tile.svg')", backgroundSize:120}}/>
      <div style={{fontSize:32, position:'relative'}} className="flame-pulse">🔥</div>
      <div style={{flex:1, position:'relative', textAlign:'right'}}>
        <div style={{fontSize:11, opacity:0.85, fontWeight:600, letterSpacing:'0.04em'}}>سلسلة تعلّم</div>
        <div style={{fontSize:18, fontWeight:800, letterSpacing:'-0.01em', marginTop:2}}><AnimatedNumber to={days} duration={1000}/> أيام متتالية</div>
      </div>
      <span style={{fontSize:14, opacity:0.85, position:'relative'}}>›</span>
    </button>
  );
}
window.StreakCard = StreakCard;

// ─────────────── Mini-player (floating, persistent)
function MiniPlayer({ dark, lesson, playing, onPlay, onClose, onOpen }) {
  if (!lesson) return null;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const cardBg = dark ? 'rgba(28,28,32,0.92)' : 'rgba(255,255,255,0.92)';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  return (
    <div className="mini-player-in" style={{
      position:'absolute', bottom: 96, left:12, right:12,
      background: cardBg, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      border: `1px solid ${border}`, borderRadius:14,
      display:'flex', alignItems:'center', gap:10, padding:8,
      boxShadow:'0 12px 30px rgba(0,0,0,0.18)', zIndex:35,
    }}>
      <button onClick={onOpen} style={{flex:1, display:'flex', alignItems:'center', gap:10, background:'transparent', border:'none', padding:0, cursor:'pointer', textAlign:'right'}}>
        <div style={{width:42, height:42, borderRadius:10, overflow:'hidden', flexShrink:0, position:'relative'}}>
          <CoursePhoto src={lesson.photo || 'assets/photos/aqeedah.svg'}/>
          <div className={playing?'bar-pulse':''} style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{display:'flex', gap:2, alignItems:'flex-end'}}>{[3,5,4].map((h,i)=><div key={i} className={playing?'bar-pulse':''} style={{width:2.5, height:h*2.4, background:'#fff', borderRadius:1.5, animationDelay:`${i*0.15}s`}}/>)}</div>
          </div>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12, fontWeight:700, color:fg, lineHeight:1.3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{lesson.title}</div>
          <div style={{fontSize:10, color:fg2, marginTop:2}}>{lesson.sub || 'يُشغّل الآن'}</div>
        </div>
      </button>
      <button onClick={onPlay} style={{
        width:36, height:36, borderRadius:99, background:'#AE1F24', border:'none',
        display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0,
      }}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8V4z"/></svg>}
      </button>
      <button onClick={onClose} style={{width:30, height:30, borderRadius:99, background:'transparent', border:'none', color:fg2, cursor:'pointer', flexShrink:0}}>✕</button>
    </div>
  );
}
window.MiniPlayer = MiniPlayer;

// ─────────────── Segmented tabs with sliding pill
function SegmentedTabs({ items, value, onChange, dark }) {
  const refs = React.useRef({});
  const [pill, setPill] = React.useState({ left: 0, width: 0 });
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const el = refs.current[value];
    if (el && containerRef.current) {
      const r = el.getBoundingClientRect();
      const cr = containerRef.current.getBoundingClientRect();
      setPill({ left: r.left - cr.left, width: r.width });
    }
  }, [value, items]);

  return (
    <div ref={containerRef} style={{
      position:'relative', display:'flex', gap:0, padding:4,
      background: dark ? '#161618' : '#fff',
      border: `1px solid ${dark?'rgba(255,255,255,0.07)':'rgba(10,10,12,0.06)'}`,
      borderRadius:14,
    }}>
      <div style={{
        position:'absolute', top:4, bottom:4, left: pill.left, width: pill.width,
        background:'#AE1F24', borderRadius:10,
        transition:'all 360ms cubic-bezier(0.32, 0.72, 0, 1)',
        boxShadow:'0 6px 16px rgba(174,31,36,0.25)',
      }}/>
      {items.map(it => (
        <button
          key={it.id}
          ref={(r) => refs.current[it.id] = r}
          onClick={() => onChange(it.id)}
          style={{
            position:'relative', flex:1, padding:'10px 12px', borderRadius:10,
            background:'transparent', border:'none', cursor:'pointer',
            color: value===it.id ? '#fff' : (dark?'#fff':'#0A0A0C'),
            transition:'color 280ms ease', fontFamily:'var(--font-arabic)',
            zIndex:1,
          }}
        >
          <div style={{fontSize:12.5, fontWeight:700}}>{it.label}</div>
          {it.count != null && <div style={{fontSize:10, opacity:0.75, marginTop:1}}>{it.count}</div>}
        </button>
      ))}
    </div>
  );
}
window.SegmentedTabs = SegmentedTabs;

// ─────────────── FAB
function FAB({ icon = '✦', onClick, label }) {
  return (
    <button onClick={onClick} className="fab-pop" style={{
      position:'absolute', bottom:104, right:18, zIndex:34,
      width:56, height:56, borderRadius:99,
      background:'linear-gradient(135deg, #AE1F24 0%, #6B1115 100%)',
      color:'#fff', border:'none', cursor:'pointer',
      fontSize:22, fontWeight:700,
      display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow:'0 14px 30px rgba(174,31,36,0.45), 0 0 0 0 rgba(174,31,36,0.6)',
      animation:'fabRing 2.6s ease-out infinite',
    }}>{icon}</button>
  );
}
window.FAB = FAB;

// ─────────────── Empty state
function EmptyState({ icon = '🌱', title, body, action }) {
  return (
    <div style={{padding:'60px 24px', textAlign:'center'}}>
      <div style={{fontSize:56, marginBottom:14, animation:'bounceIn 0.7s cubic-bezier(0.32, 0.72, 0, 1)'}}>{icon}</div>
      <div style={{fontSize:15, fontWeight:700, marginBottom:6}}>{title}</div>
      <div style={{fontSize:12, color:'#888', marginBottom:18, lineHeight:1.7}}>{body}</div>
      {action}
    </div>
  );
}
window.EmptyState = EmptyState;
