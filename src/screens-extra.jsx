// Extra screens: Onboarding, Search, Library, Notifications, LessonPlayer,
// Certificate, Quiz, Live, plus BottomSheet and Confetti

const PHOTO_BY_CAT2 = {
  'العقيدة': 'assets/photos/aqeedah.svg',
  'الفقه': 'assets/photos/fiqh.svg',
  'التفسير': 'assets/photos/tafseer.svg',
  'الحديث': 'assets/photos/hadith.svg',
  'متنوع': 'assets/photos/seerah.svg',
  'تخصصي': 'assets/photos/professional.svg',
};
const photoFor = (cat) => PHOTO_BY_CAT2[cat] || 'assets/photos/aqeedah.svg';

// ─────────────────────────────────────────── Confetti
function Confetti({ run }) {
  if (!run) return null;
  const pieces = Array.from({length: 50}, (_,i) => i);
  const colors = ['#0B5FB0','#FFD700','#2E7D5B','#1a8fd9','#E84A50','#fff'];
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:200}}>
      {pieces.map(i => {
        const left = Math.random()*100;
        const dur = 1.6 + Math.random()*1.4;
        const delay = Math.random()*0.4;
        const rot = Math.random()*360;
        const w = 6 + Math.random()*8;
        const h = 8 + Math.random()*14;
        const color = colors[i % colors.length];
        return (
          <div key={i} className="confetti-piece" style={{
            left: left+'%', width: w, height: h, background: color,
            animationDuration: dur+'s', animationDelay: delay+'s',
            transform:`rotate(${rot}deg)`,
            borderRadius: i%3===0 ? '50%' : 2,
          }}/>
        );
      })}
    </div>
  );
}
window.Confetti = Confetti;

// ─────────────────────────────────────────── BottomSheet
function BottomSheet({ open, onClose, children, height = '70%', title }) {
  const [closing, setClosing] = React.useState(false);
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose && onClose(); }, 280);
  };
  if (!open && !closing) return null;
  return (
    <div style={{position:'absolute', inset:0, zIndex:90}}>
      <div
        onClick={handleClose}
        className={closing ? 'sheet-backdrop-out' : 'sheet-backdrop-in'}
        style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(2px)'}}
      />
      <div
        className={closing ? 'sheet-out' : 'sheet-in'}
        style={{
          position:'absolute', bottom:0, left:0, right:0, height,
          background:'var(--sheet-bg, #fff)', borderTopLeftRadius:24, borderTopRightRadius:24,
          padding:'10px 0 0', overflow:'hidden', display:'flex', flexDirection:'column',
        }}
      >
        <div style={{display:'flex', justifyContent:'center', padding:'4px 0 12px'}}>
          <div style={{width:40, height:5, borderRadius:3, background:'rgba(0,0,0,0.15)'}}/>
        </div>
        {title && <div style={{padding:'0 22px 14px', fontSize:16, fontWeight:700}}>{title}</div>}
        <div style={{flex:1, overflow:'auto', padding:'0 22px 30px'}}>{children}</div>
      </div>
    </div>
  );
}
window.BottomSheet = BottomSheet;

// ─────────────────────────────────────────── Onboarding
function Onboarding({ dark }) {
  const nav = window.useNav();
  const { ONBOARDING = [] } = window.APP_DATA || {};
  const [idx, setIdx] = React.useState(0);
  const startX = React.useRef(null);
  const trackRef = React.useRef(null);
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';

  const onTouchStart = (e) => { startX.current = (e.touches?e.touches[0]:e).clientX; };
  const onTouchEnd = (e) => {
    if (startX.current==null) return;
    const dx = (e.changedTouches?e.changedTouches[0]:e).clientX - startX.current;
    if (dx > 50 && idx > 0) setIdx(idx-1);                       // RTL: swipe right = previous
    else if (dx < -50 && idx < ONBOARDING.length-1) setIdx(idx+1); // swipe left = next
    startX.current = null;
  };

  const next = () => idx < ONBOARDING.length-1 ? setIdx(idx+1) : nav.replace('login');

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column', position:'relative'}}>
        <div style={{position:'absolute', top:54, left:24, zIndex:10}}>
          <button onClick={() => nav.replace('login')} style={{background:'transparent', border:'none', color: fg2, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:600, cursor:'pointer'}}>تخطّي</button>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onTouchStart}
          onPointerUp={onTouchEnd}
          style={{flex:1, display:'flex', overflow:'hidden', position:'relative'}}
        >
          {ONBOARDING.map((s, i) => (
            <div key={i} style={{
              minWidth:'100%', height:'100%',
              transform:`translateX(${(i - idx) * (i > idx ? -100 : i < idx ? 100 : 0)}%)`,
              transition:'transform 480ms cubic-bezier(0.32, 0.72, 0, 1)',
              position: 'absolute', inset: 0,
              opacity: i===idx ? 1 : 0,
              willChange:'transform, opacity',
            }}>
              <div style={{height:'62%', position:'relative', overflow:'hidden'}}>
                <CoursePhoto src={s.photo}/>
                <div style={{position:'absolute', inset:0, background:`linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, ${pageBg} 100%)`}}/>
                {/* parallax overlay shapes */}
                <div style={{
                  position:'absolute', top:'30%', right:'10%', width:120, height:120, borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
                  filter:'blur(20px)',
                  animation: i===idx ? 'float 6s ease-in-out infinite' : 'none',
                }}/>
              </div>
              <div style={{padding:'30px 30px 0', textAlign:'center'}}>
                <div style={{display:'inline-block', padding:'5px 12px', background:'rgba(11,95,176,0.1)', color:'#0B5FB0', borderRadius:99, fontSize:11, fontWeight:700, letterSpacing:'0.04em', marginBottom:14}}>
                  {s.tag}
                </div>
                <h1 style={{margin:0, fontSize:26, fontWeight:800, color:fg, lineHeight:1.25, letterSpacing:'-0.015em'}}>{s.title}</h1>
                <p style={{margin:'14px 0 0', fontSize:13.5, color:fg2, lineHeight:1.85, maxWidth:300, marginLeft:'auto', marginRight:'auto'}}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'0 30px 50px', display:'flex', flexDirection:'column', gap:22, alignItems:'center'}}>
          <div style={{display:'flex', gap:6}}>
            {ONBOARDING.map((_,i) => (
              <div key={i} onClick={() => setIdx(i)} style={{
                width: i===idx ? 26 : 8, height: 8, borderRadius:8,
                background: i===idx ? '#0B5FB0' : (dark?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.15)'),
                transition:'all 320ms cubic-bezier(0.32, 0.72, 0, 1)',
                cursor:'pointer',
              }}/>
            ))}
          </div>
          <button onClick={next} style={{
            width:'100%', padding:'16px', background:'#0B5FB0', color:'#fff',
            border:'none', borderRadius:16, fontFamily:'var(--font-arabic)', fontSize:15, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer',
            boxShadow:'0 10px 30px rgba(11,95,176,0.35)',
          }}>
            {idx === ONBOARDING.length-1 ? 'ابدأ الآن' : 'التالي'} {Icon.chevronL('#fff', 14)}
          </button>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Search
function Search({ dark }) {
  const nav = window.useNav();
  const { PACKAGES = [], INSTRUCTORS = [], CATEGORIES = [] } = window.APP_DATA || {};
  const [q, setQ] = React.useState('');
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  const matches = q.trim() ? {
    pkgs: PACKAGES.filter(p => p.title.includes(q) || p.cat.includes(q) || p.short.includes(q)),
    inst: INSTRUCTORS.filter(i => i.name.includes(q) || i.title.includes(q)),
  } : null;

  const popular = ['العقيدة', 'الفقه', 'التفسير', 'الحديث', 'النحو', 'الاقتصاد الإسلامي'];

  const highlight = (text) => {
    if (!q.trim()) return text;
    const i = text.indexOf(q);
    if (i < 0) return text;
    return <>{text.slice(0,i)}<mark style={{background:'rgba(255,215,0,0.4)', color:'inherit', borderRadius:3, padding:'0 2px'}}>{text.slice(i, i+q.length)}</mark>{text.slice(i+q.length)}</>;
  };

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{padding:'14px 16px 8px', display:'flex', gap:10, alignItems:'center'}}>
        <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</Press>
        <div style={{flex:1, display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:cardBg, border:`1px solid ${border}`, borderRadius:14}}>
          {Icon.search(fg2, 16)}
          <input
            autoFocus
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="ابحث عن دورة، شيخ، أو موضوع..."
            style={{flex:1, border:'none', outline:'none', background:'transparent', fontFamily:'var(--font-arabic)', fontSize:13.5, color:fg, direction:'rtl'}}
          />
          {q && <Press onClick={() => setQ('')} style={{padding:4, color:fg2, fontSize:14}}>✕</Press>}
        </div>
      </div>

      <div style={{height:'calc(100% - 70px - 34px)', overflow:'auto', padding:'8px 20px 30px'}}>
        {!matches && (
          <>
            <div style={{fontSize:11, color:fg2, fontWeight:700, letterSpacing:'0.06em', margin:'10px 0 12px'}}>الأكثر بحثاً</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:24}}>
              {popular.map(p => (
                <Press key={p} onClick={() => setQ(p)} style={{padding:'9px 14px', background:cardBg, border:`1px solid ${border}`, borderRadius:99, fontSize:12, fontWeight:600, color:fg}}>
                  {p}
                </Press>
              ))}
            </div>
            <div style={{fontSize:11, color:fg2, fontWeight:700, letterSpacing:'0.06em', margin:'10px 0 12px'}}>تصفّح بالموضوع</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              {CATEGORIES.map(c => (
                <Press key={c.id} onClick={() => nav.push('package')} style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:14, display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:36, height:36, borderRadius:10, background:'rgba(11,95,176,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {Icon[c.icon]?.('#0B5FB0', 18)}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:700, color:fg}}>{c.name}</div>
                    <div style={{fontSize:10, color:fg2}}>{c.count} دورة</div>
                  </div>
                </Press>
              ))}
            </div>
          </>
        )}

        {matches && (
          <>
            {matches.pkgs.length === 0 && matches.inst.length === 0 && (
              <div style={{textAlign:'center', padding:'60px 20px', color:fg2}}>
                <div style={{fontSize:48, marginBottom:14}}>🔍</div>
                <div style={{fontSize:14, fontWeight:600, color:fg, marginBottom:4}}>لا توجد نتائج لـ "{q}"</div>
                <div style={{fontSize:12}}>جرّب كلمات مختلفة أو تصفّح بالموضوع</div>
              </div>
            )}
            {matches.pkgs.length > 0 && (
              <>
                <div style={{fontSize:11, color:fg2, fontWeight:700, letterSpacing:'0.06em', margin:'10px 0 12px'}}>الباقات والدورات ({matches.pkgs.length})</div>
                <div style={{display:'flex', flexDirection:'column', gap:10, marginBottom:18}}>
                  {matches.pkgs.map((p, i) => (
                    <Press key={p.id} onClick={() => nav.push('package', { id: p.id })} className="stagger-item" style={{display:'flex', gap:12, padding:10, background:cardBg, border:`1px solid ${border}`, borderRadius:16, animationDelay: (i*0.04)+'s'}}>
                      <div style={{width:60, height:60, borderRadius:12, overflow:'hidden', flexShrink:0}}>
                        <CoursePhoto src={p.photo}/>
                      </div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.04em', marginBottom:3}}>{p.cat}</div>
                        <div style={{fontSize:13, fontWeight:700, color:fg, lineHeight:1.4}}>{highlight(p.title)}</div>
                        <div style={{fontSize:10, color:fg2, marginTop:4}}>{p.courses} دورات · {p.hours}س · {p.label}</div>
                      </div>
                    </Press>
                  ))}
                </div>
              </>
            )}
            {matches.inst.length > 0 && (
              <>
                <div style={{fontSize:11, color:fg2, fontWeight:700, letterSpacing:'0.06em', margin:'10px 0 12px'}}>المشايخ ({matches.inst.length})</div>
                <div style={{display:'flex', flexDirection:'column', gap:8}}>
                  {matches.inst.map((ins, i) => (
                    <Press key={ins.id} onClick={() => nav.push('instructors')} className="stagger-item" style={{display:'flex', gap:12, padding:12, background:cardBg, border:`1px solid ${border}`, borderRadius:14, animationDelay: (i*0.04)+'s', alignItems:'center'}}>
                      <Avatar name={ins.name} size={42}/>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:13, fontWeight:700, color:fg}}>{highlight(ins.name)}</div>
                        <div style={{fontSize:10, color:fg2, marginTop:3}}>{ins.title}</div>
                      </div>
                      <span style={{color:fg2, fontSize:14}}>›</span>
                    </Press>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Library (My Courses)
function Library({ dark }) {
  const nav = window.useNav();
  const { MY_COURSES = [], CERTIFICATES = [], ACHIEVEMENTS = [] } = window.APP_DATA || {};
  const [tab, setTab] = React.useState('inProgress');
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  const tabs = [
    { id:'inProgress', label:'مستمرة', count: MY_COURSES.length },
    { id:'certs', label:'شهاداتي', count: CERTIFICATES.length },
    { id:'achv', label:'إنجازات', count: ACHIEVEMENTS.filter(a=>a.earned).length },
  ];

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        <div style={{padding:'18px 20px 8px'}}>
          <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:2}}>LIBRARY</div>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, color:fg, letterSpacing:'-0.015em'}}>دوراتي</h1>
        </div>

        {/* Sliding pill tabs */}
        <div style={{padding:'10px 20px 16px'}}>
          {window.SegmentedTabs
            ? <window.SegmentedTabs items={tabs} value={tab} onChange={setTab} dark={dark}/>
            : <div style={{padding:14, color:fg2}}>tabs unavailable</div>}
        </div>

        <div style={{padding:'0 20px 24px'}}>
          {tab === 'inProgress' && (
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {MY_COURSES.map((c, i) => (
                <Press key={c.id} onClick={() => nav.push('lessonPlayer', { courseId: c.id })} className="stagger-item" style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:18, animationDelay:(i*0.06)+'s'}}>
                  <div style={{display:'flex', gap:14, marginBottom:12, alignItems:'center'}}>
                    {window.AnimatedRing ? (
                      <window.AnimatedRing progress={c.progress} size={64} stroke={4} color="#0B5FB0" track={dark?'rgba(255,255,255,0.12)':'rgba(0,0,0,0.08)'}>
                        <div style={{width:48, height:48, borderRadius:99, overflow:'hidden'}}>
                          <CoursePhoto src={c.photo}/>
                        </div>
                      </window.AnimatedRing>
                    ) : (
                      <div style={{width:64, height:64, borderRadius:14, overflow:'hidden', flexShrink:0}}><CoursePhoto src={c.photo}/></div>
                    )}
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:10, color:fg2, fontWeight:600, marginBottom:3}}>{c.cat}</div>
                      <div style={{fontSize:13.5, fontWeight:700, color:fg, lineHeight:1.4, letterSpacing:'-0.005em'}}>{c.title}</div>
                      <div style={{fontSize:10.5, color:fg2, marginTop:4}}>{c.last}</div>
                    </div>
                    <div style={{textAlign:'left'}}>
                      <div style={{fontSize:18, fontWeight:800, color:'#0B5FB0', fontFamily:'var(--font-latin)', letterSpacing:'-0.02em'}}>{Math.round(c.progress*100)}%</div>
                      <div style={{fontSize:9, color:fg2, fontWeight:500}}>{c.completed}/{c.lessons}</div>
                    </div>
                  </div>
                  <div style={{height:5, background:surface, borderRadius:3, overflow:'hidden'}}>
                    <div style={{height:'100%', width:`${c.progress*100}%`, background:'linear-gradient(90deg, #0B5FB0 0%, #E84A50 100%)', borderRadius:3, transition:'width 800ms cubic-bezier(0.32, 0.72, 0, 1)'}}/>
                  </div>
                </Press>
              ))}
            </div>
          )}

          {tab === 'certs' && (
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {CERTIFICATES.map((c, i) => (
                <Press key={c.id} onClick={() => nav.push('certificate', c)} className="stagger-item" style={{
                  padding:'20px 18px', borderRadius:18, position:'relative', overflow:'hidden',
                  background:'linear-gradient(135deg, #0B5FB0 0%, #6B1115 100%)', color:'#fff',
                  animationDelay:(i*0.07)+'s',
                }}>
                  <PatternBg color="#fff" opacity={0.07} scale={120}/>
                  <div style={{position:'relative', display:'flex', gap:14, alignItems:'center'}}>
                    <div style={{width:54, height:54, borderRadius:14, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      {Icon.cert('#fff', 28)}
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:9, opacity:0.8, fontWeight:700, letterSpacing:'0.06em', marginBottom:3}}>شهادة معتمدة</div>
                      <div style={{fontSize:15, fontWeight:700, lineHeight:1.35, letterSpacing:'-0.01em'}}>{c.title}</div>
                      <div style={{fontSize:11, opacity:0.85, marginTop:5}}>{c.date} · {c.cred}</div>
                    </div>
                    <div style={{width:30, height:30, borderRadius:99, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#fff', 12)}</div>
                  </div>
                </Press>
              ))}
            </div>
          )}

          {tab === 'achv' && (
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              {ACHIEVEMENTS.map((a, i) => (
                <div key={a.id} className="stagger-item" style={{
                  padding:14, background: a.earned?cardBg:surface, border:`1px solid ${a.earned?border:'transparent'}`, borderRadius:14,
                  textAlign:'center', opacity:a.earned?1:0.6, animationDelay:(i*0.04)+'s',
                }}>
                  <div style={{fontSize:36, marginBottom:8, filter:a.earned?'none':'grayscale(1)'}}>{a.icon}</div>
                  <div style={{fontSize:12, fontWeight:700, color:fg}}>{a.title}</div>
                  <div style={{fontSize:10, color:fg2, marginTop:3, lineHeight:1.5, height:28}}>{a.desc}</div>
                  {!a.earned && a.progress > 0 && (
                    <div style={{height:4, background:dark?'#252528':'#fff', borderRadius:2, overflow:'hidden', marginTop:8}}>
                      <div style={{height:'100%', width:`${a.progress*100}%`, background:'#0B5FB0', borderRadius:2}}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <window.TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
}

function ProgressRing({ progress, size = 64 }) {
  const r = size/2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{position:'absolute', top:0, left:0, transform:'rotate(-90deg)'}}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(0,0,0,0.15)" strokeWidth="3" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke="#0B5FB0" strokeWidth="3" fill="none"
              strokeDasharray={c} strokeDashoffset={c*(1-progress)} strokeLinecap="round"
              style={{transition:'stroke-dashoffset 1.2s cubic-bezier(0.32, 0.72, 0, 1)'}}/>
    </svg>
  );
}

// ─────────────────────────────────────────── Notifications
function Notifications({ dark }) {
  const nav = window.useNav();
  const { NOTIFICATIONS = [] } = window.APP_DATA || {};
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  const groups = NOTIFICATIONS.reduce((acc, n) => { (acc[n.group] = acc[n.group] || []).push(n); return acc; }, {});

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</Press>
        <div style={{flex:1, textAlign:'center'}}>
          <h1 style={{margin:0, fontSize:16, fontWeight:700, color:fg}}>الإشعارات</h1>
        </div>
        <Press style={{fontSize:11, color:'#0B5FB0', fontWeight:600}}>وضع الكل كمقروء</Press>
      </div>

      <div style={{height:'calc(100% - 60px - 34px)', overflow:'auto', padding:'10px 20px 30px'}}>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} style={{marginBottom:18}}>
            <div style={{fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em', margin:'10px 4px 12px'}}>{group}</div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {items.map((n,i) => (
                <Press
                  key={n.id}
                  onClick={() => n.action && nav.push(n.action === 'package' ? 'package' : n.action === 'course' ? 'course' : n.action === 'live' ? 'live' : n.action === 'certificate' ? 'certificate' : 'home', n.action === 'certificate' ? (window.APP_DATA?.CERTIFICATES || [])[0] : undefined)}
                  className="stagger-item"
                  style={{
                    display:'flex', gap:12, padding:14, background:cardBg, border:`1px solid ${n.unread?'rgba(11,95,176,0.25)':border}`, borderRadius:14,
                    position:'relative', animationDelay:(i*0.05)+'s',
                  }}
                >
                  {n.unread && <div style={{position:'absolute', top:14, left:14, width:8, height:8, borderRadius:8, background:'#0B5FB0'}}/>}
                  <div style={{width:42, height:42, borderRadius:12, background:surface, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0}}>{n.icon}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:fg, letterSpacing:'-0.005em'}}>{n.title}</div>
                    <div style={{fontSize:11.5, color:fg2, marginTop:3, lineHeight:1.55}}>{n.body}</div>
                    <div style={{fontSize:10, color:fg2, marginTop:6, fontWeight:500}}>{n.time}</div>
                  </div>
                </Press>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Lesson Player (immersive)
function LessonPlayer({ dark }) {
  const nav = window.useNav();
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0.34);
  const [speed, setSpeed] = React.useState(1.0);
  const [showNotes, setShowNotes] = React.useState(false);
  const [showSpeed, setShowSpeed] = React.useState(false);
  const [notes, setNotes] = React.useState([
    { time: '٠٢:١٤', text: 'الفرق بين توحيد الربوبية وتوحيد الألوهية' },
    { time: '٠٨:٤٢', text: 'أدلة من القرآن على وحدانية الله' },
  ]);
  const [newNote, setNewNote] = React.useState('');

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => Math.min(1, p + 0.003 * speed)), 200);
    return () => clearInterval(id);
  }, [playing, speed]);

  React.useEffect(() => {
    if (progress >= 1 && playing) { setPlaying(false); nav.push('quiz'); }
  }, [progress, playing]);

  const fg = '#fff';
  const fg2 = 'rgba(255,255,255,0.6)';
  const totalSec = 36*60 + 12;
  const curSec = Math.floor(progress * totalSec);
  const fmt = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <Phone dark={true} bg="#000">
      <div style={{height:'100%', position:'relative', background:'#000', overflow:'hidden'}}>
        {/* Video bg */}
        <div style={{position:'absolute', inset:0}}>
          <CoursePhoto src="assets/photos/aqeedah.svg"/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)'}}/>
          {/* animated waveform behind */}
          <div style={{position:'absolute', bottom:'40%', left:0, right:0, display:'flex', alignItems:'center', justifyContent:'center', gap:4, opacity:0.4}}>
            {Array.from({length:40}).map((_,i)=>(
              <div key={i} className={playing?'bar-pulse':''} style={{width:3, height:8+Math.abs(Math.sin(i*0.5))*30, background:'#fff', borderRadius:2, animationDelay:`${i*0.04}s`}}/>
            ))}
          </div>
        </div>

        {/* Top bar */}
        <div style={{position:'absolute', top:54, left:16, right:16, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:10}}>
          <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#fff', 18)}</Press>
          <div style={{padding:'6px 12px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(20px)', borderRadius:99, fontSize:10, color:fg, fontWeight:600}}>الدرس ٤ من ١٠</div>
          <Press onClick={() => setShowNotes(true)} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
            📝
            {notes.length > 0 && <span style={{position:'absolute', top:6, right:6, width:8, height:8, borderRadius:8, background:'#0B5FB0'}}/>}
          </Press>
        </div>

        {/* Center play */}
        <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:5}}>
          <Press onClick={() => setPlaying(p => !p)} style={{
            width:96, height:96, borderRadius:99, background:'rgba(255,255,255,0.95)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 16px 50px rgba(0,0,0,0.6)',
          }}>
            {playing
              ? <svg width="32" height="32" viewBox="0 0 24 24" fill="#0B5FB0"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              : Icon.play('#0B5FB0', 36)}
          </Press>
        </div>

        {/* Bottom controls */}
        <div style={{position:'absolute', bottom:50, left:0, right:0, padding:'0 24px', zIndex:10, color:fg}}>
          <div style={{fontSize:11, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:6}}>توحيد الألوهية</div>
          <h2 style={{margin:'0 0 16px', fontSize:20, fontWeight:700, lineHeight:1.3, letterSpacing:'-0.01em'}}>الأدلة العقلية والحسية</h2>

          {/* progress */}
          <div style={{height:4, background:'rgba(255,255,255,0.25)', borderRadius:2, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${progress*100}%`, background:'#fff', borderRadius:2, transition:'width 200ms linear'}}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:8, fontSize:11, fontFamily:'var(--font-latin)', fontWeight:600, opacity:0.9}}>
            <span>{fmt(curSec)}</span><span>{fmt(totalSec)}</span>
          </div>

          {/* control row */}
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18}}>
            <Press onClick={() => setShowSpeed(true)} style={{padding:'8px 14px', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(20px)', borderRadius:99, fontSize:12, fontWeight:700, color:fg, fontFamily:'var(--font-latin)'}}>
              {speed.toFixed(2)}×
            </Press>
            <div style={{display:'flex', gap:24, alignItems:'center'}}>
              <Press onClick={() => setProgress(p => Math.max(0, p-0.05))} style={{color:fg, fontSize:14}}>⏪ ١٠</Press>
              <Press onClick={() => setProgress(p => Math.min(1, p+0.05))} style={{color:fg, fontSize:14}}>١٠ ⏩</Press>
            </div>
            <Press style={{padding:'8px', color:fg}}>{Icon.bookmark('#fff', 18)}</Press>
          </div>
        </div>

        {/* Notes Sheet */}
        <BottomSheet open={showNotes} onClose={() => setShowNotes(false)} height="70%" title={`ملاحظاتي (${notes.length})`}>
          <div style={{display:'flex', flexDirection:'column', gap:10, marginBottom:18}}>
            {notes.map((n,i) => (
              <div key={i} style={{padding:12, background:'#f5f5f7', borderRadius:12, display:'flex', gap:10, alignItems:'flex-start'}}>
                <div style={{padding:'3px 8px', background:'#0B5FB0', color:'#fff', borderRadius:6, fontSize:10, fontFamily:'var(--font-latin)', fontWeight:700, flexShrink:0}}>{n.time}</div>
                <div style={{flex:1, fontSize:13, lineHeight:1.6, color:'#1a1a1a'}}>{n.text}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', gap:8}}>
            <input
              value={newNote}
              onChange={(e)=>setNewNote(e.target.value)}
              placeholder="أضف ملاحظة عند الوقت الحالي..."
              style={{flex:1, padding:'12px 14px', border:'1px solid #e3e3e6', borderRadius:12, fontFamily:'var(--font-arabic)', fontSize:13, direction:'rtl', outline:'none'}}
            />
            <button onClick={() => { if (newNote.trim()) { setNotes([...notes, {time: fmt(curSec), text:newNote}]); setNewNote(''); } }}
              style={{padding:'12px 18px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:12, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>
              حفظ
            </button>
          </div>
        </BottomSheet>

        {/* Speed Sheet */}
        <BottomSheet open={showSpeed} onClose={() => setShowSpeed(false)} height="40%" title="سرعة التشغيل">
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            {[0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map(s => (
              <Press key={s} onClick={() => { setSpeed(s); setShowSpeed(false); }} style={{
                padding:'14px 16px', borderRadius:12, background: speed===s?'#0B5FB0':'#f5f5f7',
                color: speed===s?'#fff':'#1a1a1a', fontWeight:700, fontFamily:'var(--font-latin)',
                display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <span>{s.toFixed(2)}×</span>
                {speed===s && Icon.check('#fff', 16)}
              </Press>
            ))}
          </div>
        </BottomSheet>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Certificate
function Certificate({ dark, params }) {
  const nav = window.useNav();
  const [confetti, setConfetti] = React.useState(true);
  const cert = params || (window.APP_DATA?.CERTIFICATES || [])[0];
  React.useEffect(() => { const t = setTimeout(() => setConfetti(false), 3500); return () => clearTimeout(t); }, []);
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';

  return (
    <Phone dark={dark} bg={pageBg}>
      <Confetti run={confetti}/>
      <div style={{height:'100%', overflow:'auto'}}>
        <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('profile')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</Press>
          <Press style={{padding:'8px 14px', background:'#0B5FB0', color:'#fff', borderRadius:99, fontSize:12, fontWeight:700}}>مشاركة ↗</Press>
        </div>

        <div style={{padding:'24px 20px 20px', textAlign:'center'}}>
          <div style={{fontSize:42, marginBottom:8, animation:'bounceIn 0.8s cubic-bezier(0.32, 0.72, 0, 1)'}}>🎉</div>
          <div style={{fontSize:11, color:'#0B5FB0', fontWeight:700, letterSpacing:'0.08em', marginBottom:6}}>مبارك عليك</div>
          <h1 style={{margin:0, fontSize:22, fontWeight:800, color:fg, letterSpacing:'-0.015em'}}>حصلت على شهادة جديدة!</h1>
        </div>

        {/* Certificate card */}
        <div style={{padding:'0 20px 24px'}}>
          <div style={{
            position:'relative', overflow:'hidden', borderRadius:20,
            background:'linear-gradient(135deg, #fff 0%, #FFF8E7 100%)',
            border:'1px solid #E8DCB8', padding:'30px 26px 26px',
            boxShadow:'0 25px 60px rgba(0,0,0,0.15)',
            animation:'certFlip 1.2s cubic-bezier(0.32, 0.72, 0, 1)',
          }}>
            <PatternBg color="#0B5FB0" opacity={0.04} scale={140}/>
            {/* Border ornament */}
            <div style={{position:'absolute', top:8, left:8, right:8, bottom:8, border:'2px solid #C68B14', borderRadius:14, pointerEvents:'none'}}/>
            <div style={{position:'absolute', top:14, left:14, right:14, bottom:14, border:'1px solid rgba(198,139,20,0.4)', borderRadius:10, pointerEvents:'none'}}/>

            <div style={{position:'relative', textAlign:'center'}}>
              <img src="assets/logo/insan-logo-mark.svg" style={{width:36, height:46, marginBottom:14}}/>
              <div style={{fontSize:9, color:'#0B5FB0', fontWeight:700, letterSpacing:'0.2em', marginBottom:14}}>CERTIFICATE OF COMPLETION</div>
              <div style={{fontSize:11, color:'#5A5A5A', fontWeight:500, marginBottom:8}}>تشهد أكاديمية إنسان أن</div>
              <div style={{fontSize:22, fontWeight:800, color:'#1a1a1a', letterSpacing:'-0.01em', marginBottom:8, fontFamily:'var(--font-arabic)'}}>عبدالرحمن السبيعي</div>
              <div style={{fontSize:11, color:'#5A5A5A', fontWeight:500, marginBottom:14}}>قد أتمّ بنجاح</div>
              <div style={{fontSize:16, fontWeight:700, color:'#0B5FB0', lineHeight:1.4, marginBottom:18, padding:'0 16px'}}>{cert.title}</div>

              <div style={{height:1, background:'rgba(198,139,20,0.4)', margin:'14px 0'}}/>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, fontSize:10, color:'#5A5A5A'}}>
                <div>
                  <div style={{fontSize:8, letterSpacing:'0.06em', marginBottom:3, color:'#888'}}>التاريخ</div>
                  <div style={{fontWeight:700, color:'#1a1a1a', fontSize:10}}>{cert.date}</div>
                </div>
                <div>
                  <div style={{fontSize:8, letterSpacing:'0.06em', marginBottom:3, color:'#888'}}>المعرّف</div>
                  <div style={{fontWeight:700, color:'#1a1a1a', fontSize:10, fontFamily:'var(--font-latin)'}}>{cert.cred}</div>
                </div>
                <div>
                  <div style={{fontSize:8, letterSpacing:'0.06em', marginBottom:3, color:'#888'}}>التحقق</div>
                  <div style={{fontWeight:700, color:'#1a1a1a', fontSize:10, fontFamily:'var(--font-latin)'}}>QR ▦</div>
                </div>
              </div>

              <div style={{marginTop:20, fontSize:10, color:'#888', fontStyle:'italic'}}>د. صالح العصيمي · مدير الأكاديمية</div>
            </div>
          </div>
        </div>

        <div style={{padding:'0 20px 30px', display:'flex', gap:10}}>
          <Press as="button" style={{flex:1, padding:'14px', background:cardBg, border:`1px solid ${border}`, color:fg, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            {Icon.download(fg, 16)} تنزيل PDF
          </Press>
          <Press as="button" onClick={() => nav.setTab('home')} style={{flex:1, padding:'14px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>
            تابع التعلّم
          </Press>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Quiz
function Quiz({ dark }) {
  const nav = window.useNav();
  const { QUIZ_QUESTIONS = [] } = window.APP_DATA || {};
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';

  const q = QUIZ_QUESTIONS[idx];
  const correct = q?.correct;

  const submit = () => {
    if (picked === correct) setScore(s => s+1);
    setTimeout(() => {
      if (idx === QUIZ_QUESTIONS.length-1) { setDone(true); }
      else { setIdx(idx+1); setPicked(null); }
    }, 1100);
  };

  if (done) {
    const pct = Math.round((score/QUIZ_QUESTIONS.length)*100);
    const passed = pct >= 70;
    return (
      <Phone dark={dark} bg={pageBg}>
        {passed && <Confetti run={true}/>}
        <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'30px', textAlign:'center'}}>
          <div style={{fontSize:64, marginBottom:14, animation:'bounceIn 0.8s cubic-bezier(0.32, 0.72, 0, 1)'}}>{passed?'🏆':'📚'}</div>
          <div style={{fontSize:11, color:passed?'#2E7D5B':'#0B5FB0', fontWeight:700, letterSpacing:'0.08em', marginBottom:8}}>{passed?'ممتاز!':'حاول مرة أخرى'}</div>
          <h1 style={{margin:'0 0 8px', fontSize:28, fontWeight:800, color:fg, letterSpacing:'-0.015em'}}>نتيجتك: {pct}%</h1>
          <p style={{margin:'0 0 28px', fontSize:13, color:fg2, lineHeight:1.7}}>أجبت بشكل صحيح على {score} من {QUIZ_QUESTIONS.length} أسئلة</p>
          <div style={{display:'flex', gap:10, width:'100%'}}>
            <Press as="button" onClick={() => { setIdx(0); setPicked(null); setScore(0); setDone(false); }} style={{flex:1, padding:'14px', background:cardBg, color:fg, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>إعادة الاختبار</Press>
            <Press as="button" onClick={() => passed ? nav.replace('certificate', (window.APP_DATA?.CERTIFICATES || [])[0]) : nav.setTab('home')} style={{flex:1, padding:'14px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>
              {passed?'استلم شهادتك':'العودة'}
            </Press>
          </div>
        </div>
      </Phone>
    );
  }

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</Press>
          <div style={{flex:1, padding:'0 16px'}}>
            <div style={{height:6, background:cardBg, borderRadius:3, overflow:'hidden', border:`1px solid ${border}`}}>
              <div style={{height:'100%', width:`${((idx+1)/QUIZ_QUESTIONS.length)*100}%`, background:'linear-gradient(90deg, #0B5FB0 0%, #E84A50 100%)', transition:'width 480ms cubic-bezier(0.32, 0.72, 0, 1)'}}/>
            </div>
          </div>
          <div style={{fontSize:12, color:fg2, fontWeight:700, fontFamily:'var(--font-latin)'}}>{idx+1}/{QUIZ_QUESTIONS.length}</div>
        </div>

        <div style={{flex:1, padding:'30px 24px', display:'flex', flexDirection:'column'}}>
          <div style={{fontSize:11, color:'#0B5FB0', fontWeight:700, letterSpacing:'0.08em', marginBottom:10}}>السؤال {idx+1}</div>
          <h2 key={idx} style={{margin:'0 0 30px', fontSize:22, fontWeight:700, color:fg, lineHeight:1.4, letterSpacing:'-0.005em', animation:'fadeUp 0.4s ease'}}>{q.q}</h2>

          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {q.options.map((o, i) => {
              const isPicked = picked === i;
              const showCorrect = picked != null && i === correct;
              const showWrong = isPicked && i !== correct;
              return (
                <Press
                  key={`${idx}-${i}`}
                  onClick={() => picked == null && setPicked(i)}
                  className="stagger-item"
                  style={{
                    padding:'16px 18px', borderRadius:14, textAlign:'right',
                    background: showCorrect ? 'rgba(46,125,91,0.12)' : showWrong ? 'rgba(11,95,176,0.12)' : isPicked ? 'rgba(11,95,176,0.06)' : cardBg,
                    border:`2px solid ${showCorrect ? '#2E7D5B' : showWrong ? '#0B5FB0' : isPicked ? '#0B5FB0' : border}`,
                    fontSize:13.5, color:fg, fontWeight:600, lineHeight:1.6,
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    animationDelay:(i*0.06)+'s',
                    transition:'all 200ms ease',
                  }}>
                  <span>{o}</span>
                  {showCorrect && <div style={{width:24, height:24, borderRadius:99, background:'#2E7D5B', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.check('#fff', 14)}</div>}
                  {showWrong && <div style={{width:24, height:24, borderRadius:99, background:'#0B5FB0', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>✕</div>}
                </Press>
              );
            })}
          </div>
        </div>

        <div style={{padding:'14px 20px 30px'}}>
          <Press as="button" onClick={() => picked != null && submit()} style={{
            width:'100%', padding:'16px', background: picked!=null?'#0B5FB0':'#ccc', color:'#fff',
            border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700,
            opacity: picked!=null?1:0.5, cursor: picked!=null?'pointer':'default',
            transition:'all 200ms ease',
          }}>
            {idx === QUIZ_QUESTIONS.length-1 ? 'إنهاء الاختبار' : 'التالي'}
          </Press>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────────────────────────────────── Live Session
function LiveSession({ dark }) {
  const nav = window.useNav();
  const { LIVE_SESSION = {} } = window.APP_DATA || {};
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  // Countdown
  const [target] = React.useState(() => new Date(Date.now() + 2*24*3600*1000 + 3600*1000 + 23*60*1000));
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff/86400000);
  const hours = Math.floor((diff%86400000)/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const secs = Math.floor((diff%60000)/1000);

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        <div style={{position:'relative', height:260, overflow:'hidden'}}>
          <CoursePhoto src="assets/photos/aqeedah.svg"/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, rgba(0,0,0,0.85) 100%)'}}/>
          <div style={{position:'absolute', top:50, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#0A0A0C', 18)}</Press>
            <div style={{padding:'6px 12px', background:'rgba(255,40,40,0.3)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,80,80,0.5)', borderRadius:99, fontSize:10, color:'#fff', fontWeight:700, letterSpacing:'0.06em', display:'flex', alignItems:'center', gap:6}}>
              <span className="pulse-dot" style={{width:7, height:7, borderRadius:99, background:'#ff4444'}}/>
              قادمة
            </div>
          </div>
          <div style={{position:'absolute', bottom:20, left:20, right:20, color:'#fff'}}>
            <div style={{fontSize:11, opacity:0.8, marginBottom:6, letterSpacing:'0.04em'}}>{LIVE_SESSION.isOnline?'حلقة أونلاين':'حلقة حضورية'}</div>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, lineHeight:1.3, letterSpacing:'-0.01em'}}>{LIVE_SESSION.title}</h1>
          </div>
        </div>

        <div style={{padding:'24px 20px 30px', display:'flex', flexDirection:'column', gap:20}}>
          {/* Countdown */}
          <div style={{padding:'20px 16px', background:'linear-gradient(135deg, #0B5FB0 0%, #6B1115 100%)', borderRadius:18, color:'#fff', textAlign:'center', position:'relative', overflow:'hidden'}}>
            <PatternBg color="#fff" opacity={0.06} scale={120}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:10, opacity:0.85, letterSpacing:'0.08em', marginBottom:14, fontWeight:600}}>تبدأ الحلقة بعد</div>
              <div style={{display:'flex', justifyContent:'center', gap:8}}>
                {[[days,'يوم'],[hours,'س'],[mins,'د'],[secs,'ث']].map(([n,l],i) => (
                  <div key={i} style={{minWidth:54}}>
                    <div style={{fontSize:32, fontWeight:800, fontFamily:'var(--font-latin)', letterSpacing:'-0.02em', lineHeight:1}}>{n.toString().padStart(2,'0')}</div>
                    <div style={{fontSize:9, opacity:0.7, marginTop:4}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div style={{display:'flex', gap:12, alignItems:'center', padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:14}}>
            <Avatar name={LIVE_SESSION.instructor} size={48}/>
            <div style={{flex:1}}>
              <div style={{fontSize:10, color:fg2, fontWeight:500, letterSpacing:'0.04em'}}>المحاضر</div>
              <div style={{fontSize:14, fontWeight:700, color:fg}}>{LIVE_SESSION.instructor}</div>
            </div>
            <Press style={{padding:'7px 12px', background:surface, border:`1px solid ${border}`, borderRadius:99, fontSize:11, color:fg, fontWeight:600}}>متابعة</Press>
          </div>

          {/* Details */}
          <div style={{padding:'14px 16px', background:cardBg, border:`1px solid ${border}`, borderRadius:14, display:'flex', flexDirection:'column', gap:14}}>
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(11,95,176,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>📅</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, color:fg2, fontWeight:600, marginBottom:2}}>التاريخ والوقت</div>
                <div style={{fontSize:13, fontWeight:700, color:fg}}>{LIVE_SESSION.date}</div>
                <div style={{fontSize:11, color:fg2, marginTop:2}}>{LIVE_SESSION.time}</div>
              </div>
            </div>
            <div style={{height:1, background:border}}/>
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(11,95,176,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.pin('#0B5FB0', 16)}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, color:fg2, fontWeight:600, marginBottom:2}}>الموقع</div>
                <div style={{fontSize:13, fontWeight:700, color:fg}}>{LIVE_SESSION.location}</div>
              </div>
              <Press style={{padding:'7px 11px', background:'rgba(11,95,176,0.1)', borderRadius:99, fontSize:10, color:'#0B5FB0', fontWeight:700}}>الخريطة ›</Press>
            </div>
            <div style={{height:1, background:border}}/>
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(11,95,176,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.users('#0B5FB0', 16)}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, color:fg2, fontWeight:600, marginBottom:2}}>الحضور</div>
                <div style={{fontSize:13, fontWeight:700, color:fg}}>{LIVE_SESSION.attendees} مسجّلون من {LIVE_SESSION.capacity}</div>
              </div>
            </div>
            <div style={{height:5, background:surface, borderRadius:3, overflow:'hidden'}}>
              <div style={{height:'100%', width:`${(LIVE_SESSION.attendees/LIVE_SESSION.capacity)*100}%`, background:'linear-gradient(90deg, #0B5FB0 0%, #E84A50 100%)', transition:'width 1s'}}/>
            </div>
          </div>

          <Press as="button" style={{width:'100%', padding:'16px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 12px 30px rgba(11,95,176,0.3)'}}>
            احجز مقعدك الآن {Icon.chevronL('#fff', 14)}
          </Press>
        </div>
      </div>
    </Phone>
  );
}

window.SCREENS_EXTRA = {
  onboarding: Onboarding,
  search: Search,
  library: Library,
  notifications: Notifications,
  lessonPlayer: LessonPlayer,
  certificate: Certificate,
  quiz: Quiz,
  live: LiveSession,
};
