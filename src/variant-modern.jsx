// Variant 2: Modern — premium contemporary aesthetic — INTERACTIVE
// Layered glass cards, big imagery, generous spacing, soft motion, micro-typography
const v2 = {};

const PHOTO_BY_CAT = {
  'العقيدة': 'assets/photos/aqeedah.svg',
  'الفقه': 'assets/photos/fiqh.svg',
  'التفسير': 'assets/photos/tafseer.svg',
  'الحديث': 'assets/photos/hadith.svg',
  'متنوع': 'assets/photos/seerah.svg',
  'تخصصي': 'assets/photos/professional.svg',
};
const photo = (cat) => PHOTO_BY_CAT[cat] || 'assets/photos/aqeedah.svg';

const ICON_TO_TAB = { home: 'home', compass: 'explore', bookmark: 'library', user: 'profile' };

// Pressable wrapper — adds tactile feedback
function Press({ children, onClick, style, as = 'div' }) {
  const [pressed, setPressed] = React.useState(false);
  const Tag = as;
  return (
    <Tag
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 140ms',
        opacity: pressed ? 0.9 : 1,
        ...style,
      }}
    >{children}</Tag>
  );
}

function TabBar({ dark, activeTab }) {
  const nav = window.useNav();
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const i18n = window.useT?.();
  const t = i18n?.t || ((k) => k);
  const items = [
    ['home','tab_home','home'],
    ['compass','tab_path','path', '🧭'],
    ['bookmark','tab_library','library'],
    ['user','tab_profile','profile'],
  ];
  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0,
      minHeight:84,
      paddingBottom:'max(8px, env(safe-area-inset-bottom))',
      background: dark?'rgba(10,10,12,0.85)':'rgba(255,255,255,0.85)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderTop:`1px solid ${border}`, display:'flex',
      justifyContent:'space-around', paddingTop:10, zIndex:30,
    }}>
      {items.map(([ic, lblKey, tabId, emoji]) => {
        const act = activeTab === tabId;
        return (
          <Press key={tabId} onClick={() => nav.setTab(tabId)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'2px 10px'}}>
            {emoji
              ? <div style={{fontSize:20, filter: act?'none':'grayscale(0.4)', opacity: act?1:0.55}}>{emoji}</div>
              : Icon[ic]( act?'#0B5FB0':fg2, 22, act?'#0B5FB0':'none')}
            <div style={{fontSize:10, color: act?'#0B5FB0':fg2, fontWeight: act?700:500}}>{t(lblKey)}</div>
          </Press>
        );
      })}
    </div>
  );
}

v2.Home = function({ dark, params }) {
  const nav = window.useNav();
  const game = window.useGame?.();
  const i18n = window.useT?.();
  const t = i18n?.t || ((k) => k);
  const [langOpen, setLangOpen] = React.useState(false);
  const { PACKAGES = [], CATEGORIES = [] } = window.APP_DATA || {};
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 34px)', overflow:'auto', paddingBottom:100}}>
        <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <Avatar name="عبدالرحمن" size={42}/>
            <div>
              <div style={{fontSize:11, color:fg2, fontWeight:500, display:'flex', alignItems:'center', gap:5}}><span>{(window.getGreeting?.()||{}).icon || '☀︎'}</span> {(window.getGreeting?.()||{}).ar || 'السلام عليكم'}</div>
              <div style={{fontSize:15, fontWeight:700, color:fg, marginTop:1, letterSpacing:'-0.005em'}}>أبا عبدالرحمن</div>
            </div>
          </div>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            {window.GameChips && <window.GameChips dark={dark} compact={true}/>}
            <Press onClick={() => setLangOpen(true)} style={{padding:'6px 10px', height:32, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700, color:fg}}>
              <span style={{fontSize:13}}>{(window.LANGUAGES||[]).find(l => l.code===i18n?.lang)?.flag || '🌐'}</span>
            </Press>
          </div>
        </div>
        {window.LangSheet && <window.LangSheet open={langOpen} onClose={() => setLangOpen(false)}/>}

        {/* Flagship quick-access ribbon */}
        <div style={{padding:'2px 16px 14px', display:'flex', gap:8, overflowX:'auto'}}>
          {[
            {id:'skillTree', icon:'🧭', label:'مساري الذكي', grad:'linear-gradient(135deg, #0B5FB0, #6B1115)'},
            {id:'tutor',     icon:'🕌', label:'الشيخ الذكي', grad:'linear-gradient(135deg, #2E7D5B, #1f5f43)', badge:'AI'},
            {id:'wird',      icon:'📿', label:'ورد اليوم', grad:'linear-gradient(135deg, #C68B14, #8B5E0C)'},
            {id:'duel',      icon:'⚔️', label:'تحدّي', grad:'linear-gradient(135deg, #7B1FA2, #4A0072)'},
            {id:'leaderboard',icon:'🏆',label:'الدوري', grad:'linear-gradient(135deg, #1a8fd9, #0c5e91)'},
            {id:'tajweed',   icon:'📖', label:'تجويد', grad:'linear-gradient(135deg, #FF8A00, #C63D00)'},
          ].map((f, i) => (
            <Press key={f.id} onClick={() => nav.push(f.id)} className="stagger-item" style={{
              flex:'0 0 90px', padding:'12px 8px', borderRadius:14, background: f.grad, color:'#fff',
              display:'flex', flexDirection:'column', alignItems:'center', gap:6, position:'relative',
              boxShadow:'0 8px 18px rgba(0,0,0,0.15)', animationDelay:(i*0.06)+'s',
            }}>
              {f.badge && <span style={{position:'absolute', top:6, right:6, padding:'2px 6px', background:'rgba(255,255,255,0.25)', backdropFilter:'blur(8px)', borderRadius:99, fontSize:8, fontWeight:800, fontFamily:'var(--font-latin)', letterSpacing:'0.06em'}}>{f.badge}</span>}
              <div style={{fontSize:26}}>{f.icon}</div>
              <div style={{fontSize:11, fontWeight:700, textAlign:'center', letterSpacing:'-0.005em'}}>{f.label}</div>
            </Press>
          ))}
        </div>

        {/* Streak + quick stats row */}
        <div style={{padding:'10px 20px 16px', display:'flex', flexDirection:'column', gap:10}}>
          {window.StreakCard && <window.StreakCard days={7} dark={dark} onClick={() => nav.setTab('library')}/>}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
            {[
              {n:12, l:'دورة', icon:'📚'},
              {n:84, l:'ساعة', icon:'⏱', suf:'س'},
              {n:3, l:'شهادة', icon:'🎓'},
            ].map((s,i) => (
              <div key={i} className="stagger-item" style={{padding:'12px 10px', background:cardBg, border:`1px solid ${border}`, borderRadius:14, textAlign:'center', animationDelay:(i*0.07)+'s'}}>
                <div style={{fontSize:18, marginBottom:4}}>{s.icon}</div>
                <div style={{fontSize:18, fontWeight:800, color:fg, fontFamily:'var(--font-latin)', letterSpacing:'-0.02em'}}>
                  {window.AnimatedNumber ? <window.AnimatedNumber to={s.n} duration={1200+i*200}/> : s.n}{s.suf||''}
                </div>
                <div style={{fontSize:10, color:fg2, fontWeight:500, marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:'14px 20px 24px'}}>
          <Press onClick={() => nav.push('package', { id: 'aqeedah-1' })} style={{borderRadius:24, overflow:'hidden', position:'relative', height:280}}>
            <CoursePhoto src="assets/photos/aqeedah.svg" h="100%"/>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)'}}/>
            <div style={{position:'absolute', top:18, right:18, padding:'7px 12px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderRadius:99, border:'1px solid rgba(255,255,255,0.25)', fontSize:10, fontWeight:600, color:'#fff', letterSpacing:'0.04em'}}>
              ✦ مميّز هذا الأسبوع
            </div>
            <div style={{position:'absolute', bottom:18, left:18, right:18, color:'#fff'}}>
              <div style={{fontSize:11, opacity:0.85, marginBottom:6, letterSpacing:'0.04em'}}>باقة العقيدة · ٥ دورات</div>
              <h2 style={{margin:0, fontSize:24, fontWeight:700, lineHeight:1.2, letterSpacing:'-0.01em'}}>أُسس العقيدة الإسلامية على منهج السلف</h2>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:16}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{width:24, height:24, borderRadius:99, background:`hsl(${i*40+20} 45% 60%)`, border:'2px solid rgba(0,0,0,0.6)', marginLeft:i?-8:0}}/>
                  ))}
                  <span style={{fontSize:11, opacity:0.85, marginRight:6}}>+١٢٤٠٠ طالب</span>
                </div>
                <div style={{padding:'10px 18px', background:'#fff', color:'#0A0A0C', borderRadius:99, fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:6}}>
                  ابدأ الآن {Icon.chevronL('#0A0A0C', 12)}
                </div>
              </div>
            </div>
          </Press>
        </div>

        <div style={{padding:'0 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div>
            <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:2}}>CONTINUE</div>
            <h3 style={{margin:0, fontSize:18, fontWeight:700, color:fg, letterSpacing:'-0.01em'}}>تابع رحلتك</h3>
          </div>
          <span style={{fontSize:12, color:fg2, fontWeight:600}}>عرض الكل ›</span>
        </div>
        <div style={{padding:'14px 20px 28px', display:'flex', flexDirection:'column', gap:10}}>
          {[
            {t:'الأدلة العقلية والحسية', sub:'توحيد الألوهية', p:0.4, dur:'٢٢ د. متبقية', img:'assets/photos/aqeedah.svg', n:'04'},
            {t:'فقه الطهارة — أحكام المياه', sub:'فقه العبادات', p:0.65, dur:'١٤ د. متبقية', img:'assets/photos/fiqh.svg', n:'02'},
          ].map((c,i) => (
            <Press key={i} onClick={() => nav.push('course', { lesson: c.n })} style={{display:'flex', gap:12, padding:10, background:cardBg, border:`1px solid ${border}`, borderRadius:18}}>
              <div style={{width:80, height:80, borderRadius:14, overflow:'hidden', flexShrink:0, position:'relative'}}>
                <CoursePhoto src={c.img}/>
                <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.25)'}}>
                  <div style={{width:30, height:30, borderRadius:99, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.play('#0A0A0C', 11)}</div>
                </div>
                <div style={{position:'absolute', top:6, right:6, padding:'2px 6px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', borderRadius:6, fontSize:9, fontWeight:700, color:'#fff', fontFamily:'var(--font-latin)'}}>{c.n}</div>
              </div>
              <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', justifyContent:'center', gap:6}}>
                <div>
                  <div style={{fontSize:10, color:fg2, marginBottom:3, fontWeight:500}}>{c.sub}</div>
                  <div style={{fontSize:14, fontWeight:700, color:fg, lineHeight:1.35, letterSpacing:'-0.005em'}}>{c.t}</div>
                </div>
                <div>
                  <div style={{height:4, background:surface, borderRadius:2, overflow:'hidden'}}>
                    <div style={{height:'100%', width:`${c.p*100}%`, background:'linear-gradient(90deg, #0B5FB0 0%, #E84A50 100%)', borderRadius:2, transition:'width 600ms ease'}}/>
                  </div>
                  <div style={{fontSize:10, color:fg2, marginTop:5, fontWeight:500}}>{c.dur}</div>
                </div>
              </div>
            </Press>
          ))}
        </div>

        <div style={{padding:'0 20px 12px'}}>
          <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:2}}>BROWSE</div>
          <h3 style={{margin:0, fontSize:18, fontWeight:700, color:fg, letterSpacing:'-0.01em'}}>تصفّح بالموضوع</h3>
        </div>
        <div style={{display:'flex', gap:8, overflowX:'auto', padding:'10px 20px 24px'}}>
          {CATEGORIES.map((c,i) => (
            <Press key={c.id} onClick={() => nav.push('instructors', { cat: c.id })} style={{flex:'0 0 auto', display:'flex', alignItems:'center', gap:8, padding:'12px 16px', background: i===0?fg:cardBg, border:`1px solid ${i===0?fg:border}`, borderRadius:99}}>
              <div style={{width:24, height:24, borderRadius:99, background: i===0?'rgba(255,255,255,0.15)':surface, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {Icon[c.icon]?.( i===0?'#fff':'#0B5FB0', 14)}
              </div>
              <span style={{fontSize:12, fontWeight:700, color: i===0?(dark?'#0A0A0C':'#fff'):fg}}>{c.name}</span>
            </Press>
          ))}
        </div>

        <div style={{padding:'0 20px 12px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div>
            <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:2}}>FREE</div>
            <h3 style={{margin:0, fontSize:18, fontWeight:700, color:fg, letterSpacing:'-0.01em'}}>باقات تأسيسية</h3>
          </div>
          <span style={{fontSize:12, color:fg2, fontWeight:600}}>الكل ›</span>
        </div>
        <div style={{padding:'14px 0 24px', display:'flex', gap:14, overflowX:'auto', paddingRight:20, paddingLeft:20}}>
          {PACKAGES.filter(p=>!p.premium).map(p => (
            <Press key={p.id} onClick={() => nav.push('package', { id: p.id })} style={{flex:'0 0 240px', borderRadius:20, overflow:'hidden', background:cardBg, border:`1px solid ${border}`}}>
              <div style={{height:160, position:'relative'}}>
                <CoursePhoto src={p.photo || photo(p.cat)}/>
                <div style={{position:'absolute', top:12, right:12, padding:'5px 10px', background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', borderRadius:99, fontSize:9, fontWeight:700, color:'#0A0A0C', letterSpacing:'0.04em'}}>{p.label}</div>
              </div>
              <div style={{padding:14}}>
                <div style={{fontSize:10, color:fg2, marginBottom:4, fontWeight:600, letterSpacing:'0.04em'}}>{p.cat}</div>
                <div style={{fontSize:14, fontWeight:700, color:fg, lineHeight:1.35, marginBottom:10, letterSpacing:'-0.005em', minHeight:38}}>{p.title}</div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:`1px solid ${border}`}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:10, color:fg2, fontWeight:500}}>
                    {Icon.clock(fg2, 11)} {p.hours}س · {p.courses} دورات
                  </div>
                  <div style={{width:28, height:28, borderRadius:99, background:'#0B5FB0', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#fff', 12)}</div>
                </div>
              </div>
            </Press>
          ))}
        </div>

        <div style={{padding:'0 20px 12px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div>
            <div style={{fontSize:10, color:'#C68B14', fontWeight:700, letterSpacing:'0.06em', marginBottom:2}}>✦ CERTIFIED</div>
            <h3 style={{margin:0, fontSize:18, fontWeight:700, color:fg, letterSpacing:'-0.01em'}}>برامج احترافية</h3>
          </div>
        </div>
        <div style={{padding:'14px 20px 0', display:'flex', flexDirection:'column', gap:10}}>
          {PACKAGES.filter(p=>p.premium).map(p => (
            <Press key={p.id} onClick={() => nav.push('package', { id: p.id })} style={{position:'relative', borderRadius:20, overflow:'hidden', background:'#0A0A0C', minHeight:140}}>
              <div style={{position:'absolute', inset:0}}>
                <CoursePhoto src={p.photo || photo(p.cat)}/>
                <div style={{position:'absolute', inset:0, background:'linear-gradient(110deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.55) 60%, transparent 100%)'}}/>
              </div>
              <div style={{position:'relative', padding:18, color:'#fff', display:'flex', flexDirection:'column', gap:8, minHeight:140, justifyContent:'space-between'}}>
                <div>
                  <div style={{display:'inline-block', padding:'3px 8px', background:'rgba(255,215,0,0.18)', border:'1px solid rgba(255,215,0,0.4)', color:'#FFD700', borderRadius:4, fontSize:9, fontWeight:700, letterSpacing:'0.04em', marginBottom:8}}>{p.label}</div>
                  <div style={{fontSize:15, fontWeight:700, lineHeight:1.35, letterSpacing:'-0.005em', maxWidth:240}}>{p.title}</div>
                  <div style={{fontSize:10, opacity:0.65, marginTop:4}}>{p.instructor}</div>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{fontSize:18, fontWeight:800, fontFamily:'var(--font-latin)'}}>{p.price.toLocaleString('en-US')} <span style={{fontSize:10, opacity:0.65, fontWeight:600}}>SAR</span></div>
                  <div style={{display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600}}>{Icon.star('#FFD700',12)} 4.9</div>
                </div>
              </div>
            </Press>
          ))}
        </div>
      </div>

      <TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
};

v2.Package = function({ dark, params }) {
  const nav = window.useNav();
  const { PACKAGES = [], COURSES_IN_AQEEDAH = [] } = window.APP_DATA || {};
  const p = PACKAGES.find(pk => pk.id === params?.id) || PACKAGES[0];
  const cardBg = dark ? '#161618' : '#fff';
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        <div style={{position:'relative', height:340, overflow:'hidden'}}>
          <CoursePhoto src={p.photo || photo(p.cat)}/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%, rgba(0,0,0,0.75) 100%)'}}/>
          <div style={{position:'absolute', top:50, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#0A0A0C', 18)}</Press>
            <div style={{display:'flex', gap:8}}>
              <div style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {window.HeartBtn ? <window.HeartBtn id={p.id} size={20} dark={true}/> : Icon.bookmark('#fff', 17)}
              </div>
            </div>
          </div>
          <div style={{position:'absolute', bottom:24, left:20, right:20, color:'#fff'}}>
            <div style={{display:'inline-block', padding:'5px 11px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:99, fontSize:10, fontWeight:600, marginBottom:12, letterSpacing:'0.04em'}}>باقة تدريبية · {p.cat}</div>
            <h1 style={{margin:0, fontSize:26, fontWeight:700, lineHeight:1.2, letterSpacing:'-0.015em'}}>{p.title}</h1>
            <div style={{display:'flex', gap:14, marginTop:14, fontSize:11, opacity:0.92}}>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.book('#fff',12)} {p.courses} دورات</span>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.clock('#fff',12)} {p.hours} ساعة</span>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.users('#fff',12)} {(p.students/1000).toFixed(1)}ك</span>
            </div>
          </div>
        </div>

        <div style={{padding:'24px 20px 120px', display:'flex', flexDirection:'column', gap:24}}>
          <Press onClick={() => nav.push('instructors')} style={{display:'flex', gap:12, alignItems:'center', padding:'14px', background:cardBg, border:`1px solid ${border}`, borderRadius:16}}>
            <Avatar name={p.instructor} size={48}/>
            <div style={{flex:1}}>
              <div style={{fontSize:10, color:fg2, fontWeight:500, letterSpacing:'0.04em'}}>المحاضر</div>
              <div style={{fontSize:14, fontWeight:700, color:fg, marginTop:2, letterSpacing:'-0.005em'}}>{p.instructor}</div>
            </div>
            <div style={{fontSize:11, color:fg2, display:'flex', alignItems:'center', gap:4}}>{Icon.star('#C68B14',12)} 4.9</div>
          </Press>

          <div>
            <h3 style={{margin:'0 0 10px', fontSize:16, fontWeight:700, color:fg, letterSpacing:'-0.005em'}}>عن الباقة</h3>
            <p style={{margin:0, fontSize:13, color:fg2, lineHeight:1.85}}>{p.desc}</p>
          </div>

          <div>
            <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:700, color:fg}}>ماذا ستتعلم؟</h3>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {['تأسيس قوي في علم العقيدة على منهج السلف','معرفة أنواع التوحيد الثلاثة وأدلتها','الرد على الشبهات المعاصرة بأدلة واضحة','حفظ متن العقيدة الواسطية مع شرحها'].map((o,i) => (
                <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start', padding:'10px 12px', background:cardBg, border:`1px solid ${border}`, borderRadius:12}}>
                  <div style={{width:22, height:22, borderRadius:99, background:'rgba(11,95,176,0.1)', color:'#0B5FB0', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{Icon.check('#0B5FB0', 13)}</div>
                  <div style={{fontSize:12.5, color:fg, lineHeight:1.6, fontWeight:500}}>{o}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14}}>
              <h3 style={{margin:0, fontSize:16, fontWeight:700, color:fg, letterSpacing:'-0.005em'}}>محتوى الباقة</h3>
              <span style={{fontSize:11, color:fg2, fontWeight:500}}>{p.courses} دورات · ٤٦ درس</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {COURSES_IN_AQEEDAH.map(c => (
                <Press
                  key={c.n}
                  onClick={c.status==='locked' ? undefined : () => nav.push('course', { courseN: c.n, title: c.title })}
                  style={{padding:14, background:cardBg, border:`1px solid ${c.status==='active'?'#0B5FB0':border}`, borderRadius:14, display:'flex', gap:12, alignItems:'center', opacity: c.status==='locked'?0.55:1}}
                >
                  <div style={{width:48, height:48, borderRadius:14, overflow:'hidden', flexShrink:0, position:'relative'}}>
                    <CoursePhoto src={photo(p.cat)}/>
                    <div style={{position:'absolute', inset:0, background: c.status==='done'?'rgba(46,125,91,0.7)' : c.status==='active'?'rgba(11,95,176,0.7)' : 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:14, fontFamily:'var(--font-latin)'}}>
                      {c.status==='done' ? Icon.check('#fff', 18) : c.status==='locked' ? Icon.lock('#fff', 16) : c.n}
                    </div>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:fg, lineHeight:1.4, letterSpacing:'-0.005em'}}>{c.title}</div>
                    <div style={{fontSize:11, color:fg2, marginTop:3}}>{c.lessons} درس · {c.dur}</div>
                  </div>
                  <span style={{color:fg2, fontSize:14}}>›</span>
                </Press>
              ))}
            </div>
          </div>
        </div>

        <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'14px 20px 28px', background: dark?'rgba(10,10,12,0.85)':'rgba(250,250,250,0.85)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:`1px solid ${border}`, display:'flex', gap:12, alignItems:'center', zIndex:20}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:fg2, fontWeight:500}}>الباقة الكاملة</div>
            <div style={{fontSize:18, fontWeight:800, color:'#0B5FB0', letterSpacing:'-0.01em'}}>{p.price ? `${p.price.toLocaleString('en-US')} SAR` : 'مجانية'}</div>
          </div>
          <Press onClick={() => { window.toast?.('تم التسجيل في الباقة', {icon:'✨', tone:'success'}); nav.push('lessonPlayer', { courseN: 1 }); }} as="button" style={{padding:'14px 26px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:99, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', gap:8, boxShadow:'0 10px 24px rgba(11,95,176,0.35)'}}>
            التحق الآن {Icon.chevronL('#fff', 14)}
          </Press>
        </div>
      </div>
    </Phone>
  );
};

v2.Course = function({ dark, params }) {
  const nav = window.useNav();
  const { LESSONS = [] } = window.APP_DATA || {};
  const cardBg = dark ? '#161618' : '#fff';
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0.34);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => Math.min(1, p + 0.005)), 200);
    return () => clearInterval(id);
  }, [playing]);

  const title = params?.title || 'الأدلة العقلية والحسية';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        <div style={{position:'relative', height:260, background:'#000', overflow:'hidden'}}>
          <CoursePhoto src="assets/photos/aqeedah.svg"/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, rgba(0,0,0,0.85) 100%)'}}/>
          <div style={{position:'absolute', top:50, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#0A0A0C', 18)}</Press>
            <div style={{display:'flex', gap:8}}>
              <Press style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.bookmark('#fff', 17)}</Press>
            </div>
          </div>
          <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Press
              onClick={() => setPlaying(p => !p)}
              style={{width:74, height:74, borderRadius:99, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 40px rgba(0,0,0,0.5)'}}
            >
              {playing
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="#0B5FB0"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                : Icon.play('#0B5FB0', 26)}
            </Press>
          </div>
          <div style={{position:'absolute', bottom:14, left:18, right:18}}>
            <div style={{height:3, background:'rgba(255,255,255,0.25)', borderRadius:2, overflow:'hidden'}}>
              <div style={{height:'100%', width:`${progress*100}%`, background:'#fff', transition:'width 200ms linear'}}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:10, color:'#fff', fontFamily:'var(--font-latin)', fontWeight:600, opacity:0.85}}>
              <span>{formatTime(progress*36*60+12*60)}</span><span>36:12</span>
            </div>
          </div>
        </div>

        <div style={{padding:'22px 20px'}}>
          <div style={{display:'inline-block', padding:'4px 10px', background:'rgba(11,95,176,0.1)', color:'#0B5FB0', borderRadius:99, fontSize:10, fontWeight:700, marginBottom:10, letterSpacing:'0.04em'}}>الدرس ٤ من ١٠</div>
          <h1 style={{margin:0, fontSize:22, fontWeight:700, color:fg, lineHeight:1.25, letterSpacing:'-0.01em'}}>{title}</h1>
          <p style={{margin:'10px 0 0', fontSize:13, color:fg2, lineHeight:1.85}}>دراسة الأدلة العقلية على وجود الله، والاستدلال بالحس والمشاهدة، مع الرد على شبهات المخالفين.</p>

          <div style={{display:'flex', gap:12, alignItems:'center', marginTop:18, paddingBottom:18, borderBottom:`1px solid ${border}`}}>
            <Avatar name="عبدالله الحميد" size={38}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:700, color:fg, letterSpacing:'-0.005em'}}>د. عبدالله الحميد</div>
              <div style={{fontSize:10, color:fg2}}>أستاذ العقيدة · ١٢ دورة</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <Press style={{width:38, height:38, borderRadius:99, background:surface, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.download(fg, 16)}</Press>
              <Press style={{width:38, height:38, borderRadius:99, background:surface, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.bookmark(fg, 16)}</Press>
            </div>
          </div>

          <div style={{display:'flex', gap:18, padding:'16px 0 0', borderBottom:`1px solid ${border}`, marginBottom:16}}>
            {[['دروس الدورة', true],['ملاحظاتي',false],['ملفات',false]].map(([t,a]) => (
              <div key={t} style={{padding:'0 0 12px', fontSize:13, fontWeight: a?700:500, color: a?fg:fg2, borderBottom: a?'2px solid #0B5FB0':'2px solid transparent', marginBottom:-1, letterSpacing:'-0.005em'}}>{t}</div>
            ))}
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {LESSONS.map(l => (
              <Press key={l.n} onClick={() => {/* could load this lesson */}} style={{
                display:'flex', gap:12, padding:'12px', alignItems:'center',
                background: l.current ? (dark?'rgba(11,95,176,0.12)':'rgba(11,95,176,0.05)') : 'transparent',
                border: `1px solid ${l.current?'rgba(11,95,176,0.3)':'transparent'}`,
                borderRadius:14,
              }}>
                <div style={{width:40, height:40, borderRadius:12, background: l.done?'rgba(46,125,91,0.12)' : l.current?'#0B5FB0':surface, color: l.done?'#2E7D5B': l.current?'#fff':fg2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  {l.done ? Icon.check(undefined, 16) : Icon.play(undefined, 14)}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight: l.current?700:600, color: l.current?'#0B5FB0':fg, lineHeight:1.4, letterSpacing:'-0.005em'}}>{l.title}</div>
                  <div style={{fontSize:10, color:fg2, marginTop:3, fontFamily:'var(--font-latin)', fontWeight:500}}>{l.dur}</div>
                </div>
                {l.current && playing && <div style={{display:'flex', gap:3, alignItems:'flex-end'}}>{[3,5,4].map((h,i)=><div key={i} className="bar-pulse" style={{width:3, height:h*2, background:'#0B5FB0', borderRadius:2, animationDelay: `${i*0.15}s`}}/>)}</div>}
              </Press>
            ))}
          </div>
        </div>
      </div>
    </Phone>
  );
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

v2.Login = function({ dark }) {
  const nav = window.useNav();
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#fff';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:280, position:'relative', overflow:'hidden'}}>
        <CoursePhoto src="assets/photos/aqeedah.svg"/>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(10,10,12,0.95) 100%)'}}/>
        <div style={{position:'absolute', bottom:30, left:24, right:24, color:'#fff'}}>
          <img src="assets/logo/insan-logo-mark.svg" style={{width:46, height:56, filter:'brightness(0) invert(1)', marginBottom:14}}/>
          <div style={{fontSize:24, fontWeight:700, lineHeight:1.2, letterSpacing:'-0.015em'}}>أكاديمية إنسان</div>
          <div style={{fontSize:12, opacity:0.75, marginTop:4}}>للعلوم الشرعية والتأهيل المهني</div>
        </div>
      </div>

      <div style={{padding:'28px 24px 24px', background:pageBg, borderTopLeftRadius:24, borderTopRightRadius:24, marginTop:-24, position:'relative'}}>
        <h1 style={{margin:'0 0 6px', fontSize:22, fontWeight:700, color:fg, letterSpacing:'-0.015em'}}>سجّل دخولك</h1>
        <p style={{margin:'0 0 22px', fontSize:13, color:fg2}}>تابع رحلتك التعليمية من حيث توقفت.</p>

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div style={{padding:'15px 16px', background:surface, border:`1px solid ${border}`, borderRadius:14, fontSize:13.5, color:fg, fontWeight:500}}>name@example.com</div>
          <div style={{padding:'15px 16px', background:surface, border:`1px solid ${border}`, borderRadius:14, fontSize:13.5, color:fg, letterSpacing:'4px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span>••••••••</span>
            <span style={{fontSize:11, color:fg2, letterSpacing:0, fontWeight:500}}>إظهار</span>
          </div>
          <div style={{textAlign:'left', fontSize:12, color:'#0B5FB0', fontWeight:600}}>نسيت كلمة المرور؟</div>
          <Press as="button" onClick={() => nav.login()} style={{padding:'15px', background:'#0B5FB0', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
            تسجيل الدخول {Icon.chevronL('#fff', 14)}
          </Press>
        </div>

        <div style={{display:'flex', alignItems:'center', gap:10, margin:'20px 0'}}>
          <div style={{flex:1, height:1, background:border}}/>
          <span style={{fontSize:11, color:fg2, fontWeight:500}}>أو تابع باستخدام</span>
          <div style={{flex:1, height:1, background:border}}/>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <Press as="button" onClick={() => nav.login()} style={{padding:'13px', background:surface, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:12.5, fontWeight:600, color:fg}}> Apple</Press>
          <Press as="button" onClick={() => nav.login()} style={{padding:'13px', background:surface, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:12.5, fontWeight:600, color:fg}}>🇸🇦 نفاذ</Press>
        </div>

        <div style={{textAlign:'center', fontSize:12, color:fg2, marginTop:22}}>
          جديد هنا؟ <span style={{color:'#0B5FB0', fontWeight:700, cursor:'pointer'}} onClick={() => nav.login()}>أنشئ حسابك</span>
        </div>
      </div>
    </Phone>
  );
};

v2.Profile = function({ dark }) {
  const nav = window.useNav();
  const cardBg = dark ? '#161618' : '#fff';
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const surface = dark ? '#1A1A1E' : '#F2F2F4';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto', paddingBottom:20}}>
        <div style={{position:'relative', height:180, overflow:'hidden'}}>
          <CoursePhoto src="assets/photos/aqeedah.svg"/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,10,12,0.85) 100%)'}}/>
          <div style={{position:'absolute', top:50, left:16, right:16, display:'flex', justifyContent:'flex-end', gap:8}}>
            <Press onClick={nav.toggleDark} style={{width:38, height:38, borderRadius:99, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>⚙</Press>
          </div>
        </div>

        <div style={{padding:'0 20px'}}>
          <div style={{marginTop:-44, position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{padding:4, borderRadius:99, background:pageBg}}>
              <Avatar name="عبدالرحمن" size={84}/>
            </div>
            <h1 style={{margin:'14px 0 4px', fontSize:20, fontWeight:700, color:fg, letterSpacing:'-0.01em'}}>عبدالرحمن السبيعي</h1>
            <div style={{fontSize:12, color:fg2}}>طالب علم منذ ربيع الأول ١٤٤٧ هـ</div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, background:cardBg, border:`1px solid ${border}`, borderRadius:18, padding:'18px 0', margin:'24px 0 18px'}}>
            {[{n:12,l:'دورة',suf:''},{n:84,l:'تعلّم',suf:'س'},{n:3,l:'شهادات',suf:''}].map((s,i) => (
              <div key={i} style={{textAlign:'center', borderLeft: i<2?`1px solid ${border}`:'none'}}>
                <div style={{fontSize:24, fontWeight:800, color:fg, fontFamily:'var(--font-latin)', letterSpacing:'-0.02em'}}>
                  {window.AnimatedNumber ? <window.AnimatedNumber to={s.n} duration={1200+i*200}/> : s.n}{s.suf}
                </div>
                <div style={{fontSize:10, color:fg2, marginTop:3, fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{padding:'16px 18px', background:'linear-gradient(135deg, #0B5FB0 0%, #6B1115 100%)', borderRadius:18, color:'#fff', marginBottom:18, position:'relative', overflow:'hidden'}}>
            <PatternBg color="#fff" opacity={0.08} scale={120}/>
            <div style={{position:'relative', display:'flex', gap:14, alignItems:'center'}}>
              <div style={{width:48, height:48, borderRadius:14, background:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {Icon.cert('#fff', 24)}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, letterSpacing:'-0.005em'}}>قارب على الإنجاز التالي</div>
                <div style={{fontSize:11, opacity:0.85, marginTop:3}}>أكمل ٢ دورة لتحصل على شارة "طالب مجتهد"</div>
              </div>
            </div>
            <div style={{height:5, background:'rgba(255,255,255,0.25)', borderRadius:3, marginTop:14, overflow:'hidden'}}>
              <div style={{height:'100%', width:'80%', background:'#fff', borderRadius:3}}/>
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:6, paddingBottom:30}}>
            {[
              ['🎓','شهاداتي','٣ شهادات معتمدة', () => nav.setTab('library')],
              ['📚','دوراتي المسجّلة','١٢ دورة', () => nav.setTab('library')],
              ['📍','الحلقات الحضورية','٢ قادمة', () => nav.push('live')],
              ['💳','الفواتير والاشتراكات','', () => nav.push('package', { id: 'sharia-audit' })],
              ['🌙','الوضع الليلي', dark?'مفعّل':'متوقف', nav.toggleDark],
              ['🔔','التذكيرات والإشعارات','', () => nav.push('notifications')],
              ['🌐','اللغة','العربية'],
              ['🚪','تسجيل الخروج','', () => nav.replace('login')],
            ].map(([e,t,v,handler],i) => (
              <Press key={i} onClick={handler} style={{display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:cardBg, border:`1px solid ${border}`, borderRadius:14}}>
                <div style={{width:36, height:36, borderRadius:10, background:surface, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17}}>{e}</div>
                <div style={{flex:1, fontSize:13, color:fg, fontWeight:600, letterSpacing:'-0.005em'}}>{t}</div>
                {v && <span style={{fontSize:11, color:fg2, fontWeight:500}}>{v}</span>}
                <span style={{color:fg2, fontSize:14}}>›</span>
              </Press>
            ))}
          </div>
        </div>
      </div>

      <TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
};

v2.Instructors = function({ dark }) {
  const nav = window.useNav();
  const { INSTRUCTORS = [] } = window.APP_DATA || {};
  const cardBg = dark ? '#161618' : '#fff';
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(10,10,12,0.06)';
  const [activeFilter, setActiveFilter] = React.useState(0);

  const featured = INSTRUCTORS[0];

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        <div style={{padding:'18px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:10, color:fg2, fontWeight:600, letterSpacing:'0.06em', marginBottom:2}}>FACULTY</div>
            <h1 style={{margin:0, fontSize:24, fontWeight:700, color:fg, letterSpacing:'-0.015em'}}>المشايخ والمدرّسون</h1>
          </div>
          {nav.canPop && (
            <Press onClick={() => nav.pop()} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</Press>
          )}
        </div>

        <div style={{padding:'18px 20px 14px'}}>
          <Press onClick={() => nav.push('package')} style={{borderRadius:20, overflow:'hidden', position:'relative', minHeight:200, color:'#fff'}}>
            <CoursePhoto src="assets/photos/tafseer.svg"/>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(11,95,176,0.5))'}}/>
            <div style={{position:'relative', padding:'22px 20px', display:'flex', flexDirection:'column', justifyContent:'flex-end', minHeight:200}}>
              <div style={{display:'inline-block', padding:'4px 10px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:99, fontSize:10, fontWeight:600, marginBottom:12, alignSelf:'flex-start'}}>✦ المحاضر المميّز</div>
              <h2 style={{margin:0, fontSize:20, fontWeight:700, letterSpacing:'-0.01em'}}>{featured.name}</h2>
              <div style={{fontSize:12, opacity:0.85, marginTop:4}}>{featured.title}</div>
              <div style={{display:'flex', gap:14, marginTop:12, fontSize:11}}>
                <span style={{display:'flex', alignItems:'center', gap:4}}>{Icon.star('#FFD700', 12)} {featured.rating}</span>
                <span style={{opacity:0.85}}>· {featured.courses} دورة</span>
                <span style={{opacity:0.85}}>· {(featured.students/1000).toFixed(0)}ك طالب</span>
              </div>
            </div>
          </Press>
        </div>

        <div style={{display:'flex', gap:8, padding:'4px 20px 18px', overflowX:'auto'}}>
          {['الكل','العقيدة','الفقه','التفسير','تخصصي'].map((c,i) => (
            <Press key={c} onClick={() => setActiveFilter(i)} style={{flex:'0 0 auto', padding:'8px 16px', borderRadius:99, fontSize:12, fontWeight:600, background: activeFilter===i?fg:cardBg, border:`1px solid ${activeFilter===i?fg:border}`, color: activeFilter===i?(dark?'#0A0A0C':'#fff'):fg}}>{c}</Press>
          ))}
        </div>

        <div style={{padding:'0 20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {INSTRUCTORS.map(i => (
            <Press key={i.id} onClick={() => nav.push('package')} style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:16}}>
              <Avatar name={i.name} size={50}/>
              <div style={{fontSize:13, fontWeight:700, color:fg, marginTop:10, lineHeight:1.4, letterSpacing:'-0.005em'}}>{i.name.replace('د. ','')}</div>
              <div style={{fontSize:10, color:fg2, marginTop:3, lineHeight:1.4, height:28, overflow:'hidden'}}>{i.title}</div>
              <div style={{display:'flex', gap:8, marginTop:10, fontSize:10, color:fg2, fontWeight:500}}>
                <span>{Icon.star('#C68B14',10)} {i.rating}</span>
                <span>· {i.courses}</span>
              </div>
            </Press>
          ))}
        </div>
      </div>
      <TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
};

window.V2 = v2;
window.TabBar = TabBar;
window.Press = Press;
window.SCREENS = {
  login: v2.Login,
  home: v2.Home,
  package: v2.Package,
  course: v2.Course,
  instructors: v2.Instructors,
  profile: v2.Profile,
};
