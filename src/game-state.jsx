// Game state — XP, streak, hearts, league, level. Hooks into NavCtx via window.

const GAME_STORAGE = 'insan-game-v1';

const LEAGUES = [
  { id: 'bronze',   nameKey: 'league_bronze',   color: '#CD7F32', minXp: 0,    icon: '🥉' },
  { id: 'silver',   nameKey: 'league_silver',   color: '#C0C0C0', minXp: 200,  icon: '🥈' },
  { id: 'gold',     nameKey: 'league_gold',     color: '#FFD700', minXp: 500,  icon: '🥇' },
  { id: 'sapphire', nameKey: 'league_sapphire', color: '#0F52BA', minXp: 1000, icon: '💙' },
  { id: 'ruby',     nameKey: 'league_ruby',     color: '#E0115F', minXp: 2000, icon: '💎' },
  { id: 'diamond',  nameKey: 'league_diamond',  color: '#B9F2FF', minXp: 4000, icon: '💠' },
];
window.LEAGUES = LEAGUES;

const leagueFor = (xp) => {
  let cur = LEAGUES[0];
  for (const l of LEAGUES) if (xp >= l.minXp) cur = l;
  return cur;
};
window.leagueFor = leagueFor;

const GameCtx = React.createContext(null);

function GameProvider({ children }) {
  const initial = (() => {
    try { return JSON.parse(localStorage.getItem(GAME_STORAGE) || '{}'); } catch { return {}; }
  })();

  const [xp, setXp] = React.useState(initial.xp ?? 1180);
  const [streak, setStreak] = React.useState(initial.streak ?? 7);
  const [hearts, setHearts] = React.useState(initial.hearts ?? 5);
  const [maxHearts] = React.useState(5);
  const [profile, setProfile] = React.useState(initial.profile || null);
  const [completedNodes, setCompletedNodes] = React.useState(initial.completedNodes || ['u1-1','u1-2','u1-3','u2-1']);
  const [crown, setCrown] = React.useState(initial.crown || { 'u1-1':3, 'u1-2':2, 'u1-3':2, 'u2-1':1 });
  const [lastActiveDate, setLastActiveDate] = React.useState(initial.lastActiveDate || new Date().toISOString().slice(0,10));
  const [wirdToday, setWirdToday] = React.useState(initial.wirdToday || { date: '', items: {} });

  React.useEffect(() => {
    try {
      localStorage.setItem(GAME_STORAGE, JSON.stringify({
        xp, streak, hearts, profile, completedNodes, crown, lastActiveDate, wirdToday,
      }));
    } catch {}
  }, [xp, streak, hearts, profile, completedNodes, crown, lastActiveDate, wirdToday]);

  const addXp = React.useCallback((amount, message) => {
    setXp(x => x + amount);
    if (window.toast) {
      window.toast(`+${amount} ${message ? '· ' + message : 'XP'}`, { tone:'success', icon:'⚡', duration: 1800 });
    }
  }, []);

  const useHeart = React.useCallback(() => {
    setHearts(h => Math.max(0, h - 1));
  }, []);

  const refillHearts = React.useCallback(() => setHearts(maxHearts), [maxHearts]);

  const completeNode = React.useCallback((nodeId, perfectScore = false) => {
    setCompletedNodes(s => s.includes(nodeId) ? s : [...s, nodeId]);
    setCrown(c => ({ ...c, [nodeId]: Math.min(5, (c[nodeId] || 0) + (perfectScore ? 2 : 1)) }));
  }, []);

  const setQuizProfile = React.useCallback((p) => {
    setProfile(p);
  }, []);

  const tickWird = React.useCallback((key) => {
    const today = new Date().toISOString().slice(0,10);
    setWirdToday(w => {
      const items = (w.date === today ? w.items : {});
      return { date: today, items: { ...items, [key]: !items[key] } };
    });
  }, []);

  const league = leagueFor(xp);

  const value = React.useMemo(() => ({
    xp, streak, hearts, maxHearts, profile, completedNodes, crown,
    league, wirdToday,
    addXp, useHeart, refillHearts, completeNode, setQuizProfile, tickWird,
  }), [xp, streak, hearts, maxHearts, profile, completedNodes, crown, league, wirdToday,
       addXp, useHeart, refillHearts, completeNode, setQuizProfile, tickWird]);

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

window.GameCtx = GameCtx;
window.GameProvider = GameProvider;
window.useGame = () => React.useContext(GameCtx);

// HeaderChip — XP / streak / hearts compact display for top of every screen
function GameChips({ dark, compact = false }) {
  const g = window.useGame?.();
  if (!g) return null;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const cardBg = dark ? 'rgba(28,28,32,0.85)' : 'rgba(255,255,255,0.85)';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';
  const chip = (children, color) => (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding: compact?'5px 9px':'7px 11px', borderRadius:99,
      background: cardBg, backdropFilter:'blur(10px)', border:`1px solid ${border}`,
      fontSize: compact?11:12, fontWeight:700,
      color: color || fg, fontFamily:'var(--font-latin)',
    }}>{children}</div>
  );
  return (
    <div style={{display:'flex', gap:6, alignItems:'center'}}>
      {chip(<><span style={{fontSize:13}}>🔥</span><span>{g.streak}</span></>, '#FF8A00')}
      {chip(<><span style={{fontSize:13}}>⚡</span><span>{g.xp >= 1000 ? (g.xp/1000).toFixed(1)+'k' : g.xp}</span></>, '#AE1F24')}
      {chip(<><span style={{fontSize:13}}>{g.hearts > 0 ? '❤️' : '💔'}</span><span>{g.hearts}</span></>, '#E0115F')}
    </div>
  );
}
window.GameChips = GameChips;
