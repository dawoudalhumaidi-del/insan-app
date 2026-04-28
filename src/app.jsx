// Interactive runtime — single phone, navigation stack, iOS transitions, swipe-back, persistence
const { useState, useRef, useEffect, useCallback, useMemo } = React;

const NavCtx = React.createContext(null);
const useNav = () => React.useContext(NavCtx);
window.useNav = useNav;

const TAB_ROOT = { home: 'home', path: 'skillTree', explore: 'instructors', library: 'library', profile: 'profile' };

// ─── persistence
const STORAGE_KEY = 'insan-app-v1';
const loadState = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
};
const saveState = (s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };

// ─── Splash
function Splash({ dark, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1400); return () => clearTimeout(t); }, []);
  const bg = dark ? '#0A0A0C' : '#FAFAFA';
  return (
    <Phone dark={dark} bg={bg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18, position:'relative'}}>
        <div style={{position:'absolute', inset:0, opacity:0.05, backgroundImage:"url('assets/patterns/insan-tile.svg')", backgroundSize:160}}/>
        <div className="splash-pop" style={{position:'relative'}}>
          <img src="assets/logo/insan-mark-square.svg" style={{width:120, height:144, borderRadius:16, boxShadow:'0 20px 50px rgba(174,31,36,0.4)'}}/>
        </div>
        <div className="splash-fade" style={{textAlign:'center'}}>
          <div style={{fontSize:22, fontWeight:800, color: dark?'#fff':'#1a1a1a', letterSpacing:'-0.01em'}}>إنسان</div>
          <div style={{fontSize:11, color: dark?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.5)', fontWeight:500, letterSpacing:'0.06em', marginTop:4}}>للعلوم الشرعية</div>
        </div>
        <div style={{position:'absolute', bottom:80, width:46, height:3, background:dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.08)', borderRadius:2, overflow:'hidden'}}>
          <div className="splash-loader" style={{height:'100%', background:'#AE1F24', borderRadius:2}}/>
        </div>
      </div>
    </Phone>
  );
}

function NavHost() {
  const persisted = loadState();
  const [dark, setDark] = useState(persisted.dark ?? false);
  const [tab, setTabState] = useState('home');
  const [stack, setStack] = useState([{ id: 'splash', screen: 'splash' }]);
  const [trans, setTrans] = useState({ kind: 'init', t: 0 });
  const [bookmarks, setBookmarks] = useState(persisted.bookmarks || {});
  const [seenOnboarding, setSeenOnboarding] = useState(persisted.seenOnboarding || false);
  const idRef = useRef(2);
  const dragRef = useRef(null);
  const [drag, setDrag] = useState(null);

  // persist
  useEffect(() => { saveState({ dark, bookmarks, seenOnboarding }); }, [dark, bookmarks, seenOnboarding]);

  const push = useCallback((screen, params) => {
    setStack(s => [...s, { id: 'n' + idRef.current++, screen, params }]);
    setTrans({ kind: 'push', t: Date.now() });
  }, []);

  const pop = useCallback(() => {
    setStack(s => s.length <= 1 ? s : s.slice(0, -1));
    setTrans({ kind: 'pop', t: Date.now() });
  }, []);

  const setTab = useCallback((t) => {
    setTabState(t);
    const root = TAB_ROOT[t] || 'home';
    setStack([{ id: 'tab-' + t + '-' + Date.now(), screen: root, params: { tab: t } }]);
    setTrans({ kind: 'fade', t: Date.now() });
  }, []);

  const replace = useCallback((screen, params) => {
    setStack([{ id: 'r' + idRef.current++, screen, params }]);
    setTrans({ kind: 'fade', t: Date.now() });
  }, []);

  const login = useCallback(() => {
    setTabState('home');
    // First-time: send through smart-path quiz; subsequent logins: home directly
    const game = window.__INSAN_GAME__;
    const hasProfile = game && game.profile;
    if (!hasProfile) {
      setStack([{ id: 'quiz-' + Date.now(), screen: 'pathQuiz' }]);
      setTrans({ kind: 'fade', t: Date.now() });
      setTimeout(() => window.toast?.('لنحدد مسارك في ٥ أسئلة', { icon:'🧭', tone:'success' }), 350);
    } else {
      setStack([{ id: 'home-root-' + Date.now(), screen: 'home' }]);
      setTrans({ kind: 'fade', t: Date.now() });
      setTimeout(() => window.toast?.('أهلاً بك مرة أخرى', { icon: '👋', tone: 'success' }), 350);
    }
  }, []);

  const toggleBookmark = useCallback((id) => {
    setBookmarks(b => ({ ...b, [id]: !b[id] }));
  }, []);

  const completeSplash = useCallback(() => {
    setStack([{ id: seenOnboarding ? 'login-after-splash' : 'onb', screen: seenOnboarding ? 'login' : 'onboarding' }]);
    setTrans({ kind: 'fade', t: Date.now() });
    if (!seenOnboarding) setSeenOnboarding(true);
  }, [seenOnboarding]);

  const nav = useMemo(() => ({
    push, pop, setTab, replace, login, toggleBookmark,
    tab, dark, bookmarks,
    toggleDark: () => setDark(d => !d),
    canPop: stack.length > 1,
  }), [push, pop, setTab, replace, login, toggleBookmark, tab, dark, bookmarks, stack.length]);

  useEffect(() => {
    document.body.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.setProperty('--sheet-bg', dark ? '#161618' : '#fff');
  }, [dark]);

  // Swipe-back gesture: dragging from right edge → pop
  const onPointerDown = (e) => {
    if (stack.length <= 1) return;
    const x = e.clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    if (x - rect.left < rect.width - 30) return; // RTL: from right edge
    dragRef.current = { startX: x, startY: e.clientY };
    setDrag({ dx: 0 });
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (dx < 0) setDrag({ dx: Math.max(dx, -rectWidthRef.current) });
  };
  const onPointerUp = () => {
    if (!dragRef.current) return;
    const dx = drag?.dx || 0;
    if (dx < -120) {
      // pop
      setDrag(null);
      dragRef.current = null;
      pop();
    } else {
      // snap back
      setDrag({ dx: 0, snap: true });
      setTimeout(() => { setDrag(null); dragRef.current = null; }, 240);
    }
  };
  const rectWidthRef = useRef(390);

  const allScreens = {
    ...(window.SCREENS || {}),
    ...(window.SCREENS_EXTRA || {}),
    ...(window.SCREENS_PATH || {}),
    splash: (props) => <Splash {...props} onDone={completeSplash}/>,
  };

  return (
    <NavCtx.Provider value={nav}>
      <div style={{
        position:'fixed', inset:0,
        background: dark ? 'radial-gradient(circle at 30% 20%, #1a1a1f 0%, #0a0a0c 70%)'
                         : 'radial-gradient(circle at 30% 20%, #f5f3f0 0%, #e6e3df 70%)',
        display:'flex', alignItems:'center', justifyContent:'center',
        overflow:'hidden', fontFamily:'var(--font-arabic)',
        transition:'background 0.6s ease',
      }}>
        {/* Floating header */}
        <div style={{
          position:'absolute', top:18, left:0, right:0,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'0 22px', pointerEvents:'none', zIndex:5,
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10, pointerEvents:'auto'}}>
            <img src="assets/logo/insan-logo-mark.svg" style={{width:22, height:28, opacity:0.85, filter: dark?'brightness(0) invert(1)':'none'}}/>
            <div style={{fontSize:11, color: dark?'rgba(255,255,255,0.55)':'rgba(0,0,0,0.55)', fontWeight:600, letterSpacing:'0.06em'}}>إنسان · أكاديمية</div>
          </div>
          <div style={{display:'flex', gap:8, pointerEvents:'auto'}}>
            {stack[0].screen !== 'splash' && stack[0].screen !== 'onboarding' && stack[0].screen !== 'login' && (
              <button
                onClick={() => nav.push('search')}
                style={{padding:'8px 12px', borderRadius:99, background: dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)', border:`1px solid ${dark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.08)'}`, color: dark?'#fff':'#1a1a1a', fontSize:12, cursor:'pointer'}}
              >🔍</button>
            )}
            {stack[0].screen !== 'splash' && stack[0].screen !== 'onboarding' && stack[0].screen !== 'login' && (
              <button
                onClick={() => nav.push('notifications')}
                style={{padding:'8px 12px', borderRadius:99, background: dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)', border:`1px solid ${dark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.08)'}`, color: dark?'#fff':'#1a1a1a', fontSize:12, cursor:'pointer', position:'relative'}}
              >🔔
                <span style={{position:'absolute', top:5, right:7, width:8, height:8, borderRadius:8, background:'#AE1F24', border:`2px solid ${dark?'#1a1a1f':'#f5f3f0'}`}}/>
              </button>
            )}
            <button
              onClick={nav.toggleDark}
              style={{padding:'8px 14px', borderRadius:99, background: dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)', border:`1px solid ${dark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.08)'}`, color: dark?'#fff':'#1a1a1a', fontFamily:'var(--font-arabic)', fontSize:12, fontWeight:600, cursor:'pointer'}}
            >
              {dark ? '☀︎' : '☾'}
            </button>
          </div>
        </div>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{position:'relative', width:390, height:844, touchAction:'pan-y'}}
        >
          <PhoneStage stack={stack} trans={trans} dark={dark} Screens={allScreens} drag={drag}/>
          {window.Toaster && <window.Toaster dark={dark}/>}
        </div>

        <div style={{
          position:'absolute', bottom:18, left:0, right:0, textAlign:'center', zIndex:5,
          fontSize:11, color: dark?'rgba(255,255,255,0.35)':'rgba(0,0,0,0.35)', fontWeight:500,
        }}>
          {stack.length>1 ? 'اسحب من الحافة اليمنى للرجوع · أو اضغط زر الرجوع' : 'اضغط على البطاقات للتنقّل'}
        </div>
      </div>
    </NavCtx.Provider>
  );
}

function PhoneStage({ stack, trans, dark, Screens, drag }) {
  const top = stack[stack.length - 1];
  const prev = stack.length > 1 ? stack[stack.length - 2] : null;

  const Cur = Screens[top.screen];
  const Prev = prev ? Screens[prev.screen] : null;

  const isPush = trans.kind === 'push';
  const isPop = trans.kind === 'pop';
  const isFade = trans.kind === 'fade';

  const dragging = drag && !drag.snap;
  const dx = drag?.dx || 0;
  const progress = Math.min(1, Math.abs(dx) / 390);

  const topStyle = dragging ? {
    transform: `translateX(${dx}px)`,
    transition: 'none',
  } : drag?.snap ? {
    transform: 'translateX(0)',
    transition: 'transform 240ms cubic-bezier(0.32, 0.72, 0, 1)',
  } : {};

  const prevStyle = (drag) ? {
    transform: `translateX(${28*(1-progress)}%) scale(${0.96 + 0.04*progress})`,
    filter: `brightness(${0.7 + 0.3*progress})`,
    transition: drag?.snap ? 'all 240ms cubic-bezier(0.32, 0.72, 0, 1)' : 'none',
    zIndex: 0,
  } : {};

  return (
    <>
      {Prev && (isPush || drag) && (
        <div className={'phone-layer ' + (isPush ? 'push-prev' : '')} style={{...layerStyle(), ...prevStyle}}>
          <Prev dark={dark} params={prev.params}/>
        </div>
      )}
      <div
        key={top.id}
        className={'phone-layer ' + (isPush && !drag ? 'push-in' : isPop && !drag ? 'pop-in' : isFade && !drag ? 'fade-in' : '')}
        style={{...layerStyle(), ...topStyle}}
      >
        {Cur ? <Cur dark={dark} params={top.params}/> : <Missing screen={top.screen}/>}
      </div>
    </>
  );
}

function layerStyle() {
  return { position:'absolute', inset:0, willChange:'transform, opacity' };
}

function Missing({screen}) {
  return <div style={{padding:40, color:'#888', fontFamily:'var(--font-arabic)', textAlign:'center'}}>شاشة "{screen}" غير متوفرة بعد.</div>;
}

function GameStateBridge({ children }) {
  const g = window.useGame?.();
  React.useEffect(() => { window.__INSAN_GAME__ = g; }, [g]);
  return children;
}

function Root() {
  const Provider = window.I18nProvider || React.Fragment;
  const GP = window.GameProvider || React.Fragment;
  return (
    <Provider>
      <GP>
        <GameStateBridge>
          <NavHost/>
        </GameStateBridge>
      </GP>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
