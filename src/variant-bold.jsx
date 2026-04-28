// Variant 3: Bold — editorial, large display type, full-bleed maroon, more pattern
const v3 = {};

v3.Home = function({ dark }) {
  const { PACKAGES, CATEGORIES } = window.APP_DATA;
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 34px)', overflow:'auto', paddingBottom:100}}>
        {/* Bold maroon top with verse */}
        <div style={{position:'relative', background:'#AE1F24', padding:'18px 24px 32px', overflow:'hidden'}}>
          <PatternBg color="#fff" opacity={0.1} scale={120}/>
          <div style={{position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, color:'#fff'}}>
            <img src="assets/logo/insan-logo-mark.svg" style={{width:30, height:36, filter:'brightness(0) invert(1)'}}/>
            <div style={{display:'flex', gap:10}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.search('#fff', 17)}</div>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
                {Icon.bell('#fff', 17)}
                <span style={{position:'absolute', top:8, right:8, width:7, height:7, borderRadius:7, background:'#FFD700'}}/>
              </div>
            </div>
          </div>

          <div style={{position:'relative', color:'#fff'}}>
            <div style={{fontSize:11, opacity:0.85, letterSpacing:'0.06em', marginBottom:6}}>﷽</div>
            <h1 style={{margin:0, fontSize:34, fontWeight:800, lineHeight:1.15, letterSpacing:'-0.01em'}}>اطلب العلم<br/>من المهد إلى اللحد</h1>
            <p style={{margin:'12px 0 0', fontSize:13, opacity:0.85, maxWidth:300, lineHeight:1.7}}>أكاديمية إنسان · علومٌ شرعيةٌ مؤصّلة، ومسارات احترافيةٌ معتمدة.</p>
          </div>
        </div>

        {/* Floating stats */}
        <div style={{margin:'-22px 20px 0', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, background:cardBg, border:`1px solid ${border}`, borderRadius:14, padding:'14px 0', position:'relative', boxShadow:'0 8px 24px rgba(0,0,0,0.06)'}}>
          {[['١٢٠+','دورة'],['٤٠ك','طالب'],['١٨','شيخ']].map(([n,l],i) => (
            <div key={i} style={{textAlign:'center', borderLeft: i<2?`1px solid ${border}`:'none'}}>
              <div style={{fontSize:18, fontWeight:800, color:'#AE1F24', fontFamily:'var(--font-latin)'}}>{n}</div>
              <div style={{fontSize:10, color:fg2, marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Section header — editorial */}
        <div style={{padding:'32px 24px 14px'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'var(--font-latin)'}}>01 — Aqeedah · Fiqh</div>
          <h2 style={{margin:'4px 0 0', fontSize:26, fontWeight:800, color:fg, lineHeight:1.2}}>الباقات التأسيسية</h2>
          <div style={{height:2, width:30, background:'#AE1F24', marginTop:10}}/>
        </div>

        {/* Big package cards */}
        <div style={{padding:'4px 24px 28px', display:'flex', flexDirection:'column', gap:14}}>
          {PACKAGES.filter(p=>!p.premium).slice(0,2).map((p,i) => (
            <div key={p.id} style={{position:'relative', borderRadius:16, overflow:'hidden', background:'#1A1A1A'}}>
              <div style={{height:160, position:'relative'}}>
                <CourseThumb seed={i+1} color="#AE1F24" h={160}/>
                <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)'}}/>
                <div style={{position:'absolute', top:14, right:14, fontSize:9, fontWeight:700, color:'#1A1A1A', background:'#fff', padding:'4px 10px', borderRadius:4, letterSpacing:'0.06em'}}>{p.label}</div>
                <div style={{position:'absolute', top:14, left:14, fontSize:42, fontWeight:900, color:'rgba(255,255,255,0.18)', fontFamily:'var(--font-latin)', lineHeight:1}}>0{i+1}</div>
                <div style={{position:'absolute', bottom:14, left:18, right:18, color:'#fff'}}>
                  <div style={{fontSize:10, opacity:0.85, letterSpacing:'0.04em', marginBottom:4}}>{p.cat} · {p.courses} دورات · {p.hours} ساعة</div>
                  <h3 style={{margin:0, fontSize:18, fontWeight:800, lineHeight:1.3}}>{p.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{padding:'8px 24px 32px'}}>
          <div style={{padding:'24px', background:'#1A1A1A', borderRadius:16, color:'#fff', position:'relative', overflow:'hidden'}}>
            <PatternBg color="#AE1F24" opacity={0.18} scale={140}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:42, color:'#AE1F24', fontWeight:900, lineHeight:0.5, marginBottom:8}}>"</div>
              <div style={{fontSize:17, fontWeight:600, lineHeight:1.7, marginBottom:12}}>من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنّة.</div>
              <div style={{fontSize:11, opacity:0.7, letterSpacing:'0.06em'}}>— رواه مسلم</div>
            </div>
          </div>
        </div>

        {/* Premium row — editorial */}
        <div style={{padding:'0 24px 14px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
            <div>
              <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', fontFamily:'var(--font-latin)'}}>02 — Certified</div>
              <h2 style={{margin:'4px 0 0', fontSize:24, fontWeight:800, color:fg, lineHeight:1.2}}>شهادات احترافية</h2>
            </div>
            <span style={{fontSize:11, color:'#AE1F24', fontWeight:700}}>عرض الكل ›</span>
          </div>
          <div style={{height:2, width:30, background:'#AE1F24', marginTop:10}}/>
        </div>
        <div style={{padding:'14px 24px 28px', display:'flex', flexDirection:'column', gap:12}}>
          {PACKAGES.filter(p=>p.premium).map(p => (
            <div key={p.id} style={{padding:18, background:cardBg, border:`1px solid ${border}`, borderRadius:14, display:'flex', gap:14}}>
              <div style={{width:60, minWidth:60, padding:'14px 6px', textAlign:'center', background:'#1A1A1A', color:'#fff', borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <div style={{fontSize:9, opacity:0.7, letterSpacing:'0.06em', fontFamily:'var(--font-latin)'}}>SAR</div>
                <div style={{fontSize:14, fontWeight:800, marginTop:2, fontFamily:'var(--font-latin)'}}>{p.price.toLocaleString('en-US')}</div>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'inline-block', fontSize:9, fontWeight:700, color:'#AE1F24', background:'rgba(174,31,36,0.1)', padding:'2px 8px', borderRadius:4, marginBottom:6, letterSpacing:'0.04em'}}>{p.label}</div>
                <div style={{fontSize:14, fontWeight:800, color:fg, lineHeight:1.4}}>{p.title}</div>
                <div style={{fontSize:11, color:fg2, marginTop:4}}>{p.instructor}</div>
                <div style={{display:'flex', gap:14, marginTop:8, fontSize:10, color:fg2}}>
                  <span>{p.courses} دورة</span><span>·</span><span>{p.hours} ساعة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:10}}>
        {[['home','الرئيسية',true],['compass','استكشف',false],['bookmark','دوراتي',false],['user','حسابي',false]].map(([ic, lbl, act]) => (
          <div key={lbl} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:3}}>
            {Icon[ic]( act?'#AE1F24':fg2, 22, act?'#AE1F24':'none')}
            <div style={{fontSize:10, color: act?'#AE1F24':fg2, fontWeight: act?700:500}}>{lbl}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
};

v3.Package = function({ dark }) {
  const { PACKAGES, COURSES_IN_AQEEDAH } = window.APP_DATA;
  const p = PACKAGES[0];
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        {/* Editorial hero */}
        <div style={{background:'#AE1F24', padding:'50px 24px 40px', position:'relative', overflow:'hidden', color:'#fff'}}>
          <PatternBg color="#fff" opacity={0.12} scale={130}/>
          <div style={{position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32}}>
            <div style={{width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#fff', 18)}</div>
            <div style={{fontSize:10, fontWeight:700, opacity:0.85, letterSpacing:'0.1em', fontFamily:'var(--font-latin)'}}>PACKAGE · 01</div>
            <div style={{width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.bookmark('#fff', 18)}</div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{fontSize:11, fontWeight:600, opacity:0.85, letterSpacing:'0.06em', marginBottom:8}}>{p.cat} · المستوى الأول</div>
            <h1 style={{margin:0, fontSize:32, fontWeight:800, lineHeight:1.15}}>{p.title}</h1>
            <div style={{display:'flex', gap:16, marginTop:18, fontSize:12}}>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.book('#fff',13)} ٥ دورات</span>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.clock('#fff',13)} ٢٤ ساعة</span>
              <span style={{display:'flex', alignItems:'center', gap:5}}>{Icon.users('#fff',13)} ١٢٬٤٨٠</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{padding:'24px', display:'flex', flexDirection:'column', gap:24}}>
          {/* Instructor row */}
          <div style={{display:'flex', gap:14, alignItems:'center', padding:'14px 0', borderBottom:`1px solid ${border}`}}>
            <Avatar name={p.instructor} size={52}/>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:fg2, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:'var(--font-latin)', marginBottom:2}}>Instructor</div>
              <div style={{fontSize:14, fontWeight:800, color:fg}}>{p.instructor}</div>
              <div style={{fontSize:11, color:fg2, marginTop:3}}>عضو هيئة كبار العلماء · خبرة ٢٥ سنة</div>
            </div>
          </div>

          {/* About */}
          <div>
            <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', fontFamily:'var(--font-latin)', marginBottom:6}}>ABOUT</div>
            <p style={{margin:0, fontSize:14, color:fg, lineHeight:1.85, fontWeight:500}}>{p.desc}</p>
          </div>

          {/* outcomes */}
          <div>
            <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', fontFamily:'var(--font-latin)', marginBottom:14}}>OUTCOMES</div>
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['تأسيس','منهج أهل السنة في باب التوحيد'],
                ['تطبيق','الرد على شبهات معاصرة'],
                ['حفظ','متن العقيدة الواسطية كاملاً'],
              ].map(([k,v],i) => (
                <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                  <div style={{fontSize:32, fontWeight:900, color:'#AE1F24', lineHeight:1, fontFamily:'var(--font-latin)', minWidth:34}}>0{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:800, color:fg}}>{k}</div>
                    <div style={{fontSize:12, color:fg2, marginTop:3, lineHeight:1.6}}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course list — editorial table */}
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingBottom:14, borderBottom:`2px solid ${fg}`, marginBottom:6}}>
              <div style={{fontSize:11, color:fg, fontWeight:800, letterSpacing:'0.08em', fontFamily:'var(--font-latin)'}}>CONTENTS</div>
              <div style={{fontSize:11, color:fg2}}>٥ دورات · ٤٦ درس</div>
            </div>
            {COURSES_IN_AQEEDAH.map(c => (
              <div key={c.n} style={{display:'flex', gap:14, padding:'18px 0', borderBottom:`1px solid ${border}`, alignItems:'center', opacity: c.status==='locked'?0.55:1}}>
                <div style={{fontSize:24, fontWeight:900, color: c.status==='active'?'#AE1F24':fg, fontFamily:'var(--font-latin)', minWidth:34, lineHeight:1}}>0{c.n}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:700, color:fg, lineHeight:1.4}}>{c.title}</div>
                  <div style={{fontSize:11, color:fg2, marginTop:3}}>{c.lessons} درس · {c.dur}</div>
                </div>
                {c.status==='done' && <div style={{fontSize:10, fontWeight:700, color:'#2E7D5B', background:'rgba(46,125,91,0.1)', padding:'4px 10px', borderRadius:4, letterSpacing:'0.04em'}}>مكتمل</div>}
                {c.status==='active' && <div style={{fontSize:10, fontWeight:700, color:'#fff', background:'#AE1F24', padding:'4px 10px', borderRadius:4, letterSpacing:'0.04em'}}>الآن</div>}
                {c.status==='locked' && <div style={{color:fg2}}>{Icon.lock(fg2,14)}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{position:'sticky', bottom:0, padding:'14px 24px 28px', background:'#1A1A1A', display:'flex', gap:12, alignItems:'center'}}>
          <div style={{flex:1, color:'#fff'}}>
            <div style={{fontSize:10, opacity:0.6, letterSpacing:'0.08em', fontFamily:'var(--font-latin)'}}>FREE PACKAGE</div>
            <div style={{fontSize:18, fontWeight:800, marginTop:2}}>التحاق مفتوح</div>
          </div>
          <button style={{padding:'14px 28px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:6, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:800, letterSpacing:'0.04em'}}>التحق الآن ←</button>
        </div>
      </div>
    </Phone>
  );
};

v3.Course = function({ dark }) {
  const { LESSONS } = window.APP_DATA;
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        {/* Big editorial cover */}
        <div style={{position:'relative', height:280, background:'#AE1F24', overflow:'hidden'}}>
          <PatternBg color="#fff" opacity={0.12} scale={130}/>
          <div style={{position:'absolute', top:50, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <div style={{width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#fff', 18)}</div>
            <div style={{fontSize:10, fontWeight:700, color:'#fff', opacity:0.85, letterSpacing:'0.1em', fontFamily:'var(--font-latin)', alignSelf:'center'}}>COURSE · 03/05</div>
            <div style={{width:40}}/>
          </div>
          <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'24px', color:'#fff'}}>
            <div style={{fontSize:11, opacity:0.85, letterSpacing:'0.06em', marginBottom:6}}>باقة العقيدة · المستوى الأول</div>
            <h1 style={{margin:0, fontSize:34, fontWeight:800, lineHeight:1.1}}>توحيد<br/>الألوهية</h1>
            <div style={{display:'flex', alignItems:'center', gap:14, marginTop:16}}>
              <button style={{padding:'12px 22px', background:'#fff', color:'#AE1F24', border:'none', borderRadius:6, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:800, display:'flex', alignItems:'center', gap:8}}>
                {Icon.play('#AE1F24', 13)} تابع الدرس ٤
              </button>
              <div style={{fontSize:11, opacity:0.85}}>٤٠٪ مكتمل</div>
            </div>
          </div>
        </div>

        <div style={{padding:'24px', display:'flex', flexDirection:'column', gap:22}}>
          {/* Tabs */}
          <div style={{display:'flex', gap:0, borderBottom:`2px solid ${fg}`}}>
            {[['الدروس', true],['ملاحظات',false],['نقاش',false],['ملفات',false]].map(([t,a]) => (
              <div key={t} style={{padding:'10px 18px 10px 0', fontSize:12, fontWeight: a?800:500, color: a?fg:fg2, letterSpacing:'0.04em', borderBottom: a?`3px solid #AE1F24`:'none', marginBottom:-2}}>{t}</div>
            ))}
          </div>

          {/* Lessons editorial list */}
          <div>
            {LESSONS.map((l,i) => (
              <div key={l.n} style={{
                display:'grid', gridTemplateColumns:'auto 1fr auto', gap:18, padding:'16px 0',
                borderBottom: i<LESSONS.length-1?`1px solid ${border}`:'none', alignItems:'center',
                background: l.current ? (dark?'rgba(174,31,36,0.1)':'rgba(174,31,36,0.04)') : 'transparent',
                margin: l.current?'0 -10px':'0', padding: l.current?'16px 10px':'16px 0',
                borderRadius: l.current?8:0,
              }}>
                <div style={{fontSize:24, fontWeight:900, color: l.done?'#2E7D5B' : l.current?'#AE1F24':fg2, fontFamily:'var(--font-latin)', minWidth:34, lineHeight:1, opacity: l.done?0.8:1}}>0{l.n}</div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:14, fontWeight: l.current?800:600, color: l.current?'#AE1F24':fg, lineHeight:1.4}}>{l.title}</div>
                  <div style={{display:'flex', gap:12, fontSize:10, color:fg2, marginTop:4, alignItems:'center'}}>
                    <span style={{fontFamily:'var(--font-latin)'}}>{l.dur}</span>
                    {l.done && <span style={{color:'#2E7D5B', fontWeight:700, letterSpacing:'0.04em'}}>· COMPLETED</span>}
                    {l.current && <span style={{color:'#AE1F24', fontWeight:700, letterSpacing:'0.04em'}}>· NOW PLAYING</span>}
                  </div>
                </div>
                <div style={{width:36, height:36, borderRadius:10, background: l.current?'#AE1F24':(dark?'rgba(255,255,255,0.06)':'#fff'), border: l.current?'none':`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', color: l.current?'#fff':fg}}>
                  {l.done ? Icon.check('#2E7D5B',14) : Icon.play(l.current?'#fff':fg,12)}
                </div>
              </div>
            ))}
          </div>

          {/* Notes panel */}
          <div style={{padding:'20px', background:cardBg, border:`1px dashed ${border}`, borderRadius:12}}>
            <div style={{fontSize:11, color:'#AE1F24', fontWeight:800, letterSpacing:'0.08em', fontFamily:'var(--font-latin)', marginBottom:8}}>YOUR NOTES</div>
            <div style={{fontSize:13, color:fg, lineHeight:1.85, fontStyle:'italic'}}>"التوحيد ثلاثة أنواع: ربوبية، ألوهية، أسماء وصفات. وأعظمها توحيد الألوهية لأنه..."</div>
            <div style={{fontSize:10, color:fg2, marginTop:10, letterSpacing:'0.04em'}}>الدرس ٢ · ١٢:٣٤</div>
          </div>
        </div>
      </div>
    </Phone>
  );
};

v3.Login = function({ dark }) {
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';
  const inpBg = dark ? 'rgba(255,255,255,0.04)' : '#fff';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        {/* Top half — bold maroon with verse */}
        <div style={{flex:'0 0 50%', background:'#AE1F24', padding:'60px 24px 30px', position:'relative', overflow:'hidden', color:'#fff'}}>
          <PatternBg color="#fff" opacity={0.13} scale={120}/>
          <div style={{position:'relative'}}>
            <img src="assets/logo/insan-logo-mark.svg" style={{width:48, height:58, filter:'brightness(0) invert(1)'}}/>
            <div style={{fontSize:11, opacity:0.85, letterSpacing:'0.1em', fontFamily:'var(--font-latin)', marginTop:24, marginBottom:8}}>INSAN ACADEMY · ٠١</div>
            <h1 style={{margin:0, fontSize:34, fontWeight:800, lineHeight:1.15}}>أكاديميةُ<br/>إنسان</h1>
            <div style={{height:2, width:30, background:'#fff', marginTop:14, marginBottom:14}}/>
            <p style={{margin:0, fontSize:13, opacity:0.85, lineHeight:1.7, maxWidth:280}}>﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾<span style={{display:'block', fontSize:10, opacity:0.7, marginTop:4, letterSpacing:'0.04em'}}>طه ١١٤</span></p>
          </div>
        </div>

        {/* Bottom — form */}
        <div style={{flex:1, padding:'30px 24px 30px', display:'flex', flexDirection:'column'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:800, letterSpacing:'0.1em', fontFamily:'var(--font-latin)', marginBottom:8}}>SIGN IN</div>
          <h2 style={{margin:'0 0 24px', fontSize:22, fontWeight:800, color:fg}}>الدخول إلى حسابك</h2>

          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div>
              <div style={{fontSize:10, color:fg2, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:'var(--font-latin)', marginBottom:6, fontWeight:700}}>EMAIL</div>
              <div style={{padding:'13px 0', borderBottom:`2px solid ${fg}`, fontSize:14, color:fg, fontWeight:500}}>name@example.com</div>
            </div>
            <div>
              <div style={{fontSize:10, color:fg2, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:'var(--font-latin)', marginBottom:6, fontWeight:700}}>PASSWORD</div>
              <div style={{padding:'13px 0', borderBottom:`2px solid ${fg}`, fontSize:14, color:fg, letterSpacing:'4px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span>••••••••</span>
                <span style={{fontSize:10, letterSpacing:0, color:fg2}}>إظهار</span>
              </div>
            </div>
          </div>

          <button style={{padding:'15px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:6, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:800, letterSpacing:'0.04em', marginTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 22px'}}>
            <span>تسجيل الدخول</span>
            <span>←</span>
          </button>

          <div style={{textAlign:'center', fontSize:12, color:fg2, marginTop:18}}>
            جديد هنا؟ <span style={{color:'#AE1F24', fontWeight:800, borderBottom:'1px solid #AE1F24'}}>أنشئ حساباً</span>
          </div>

          <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', fontSize:10, color:fg2, letterSpacing:'0.06em', fontFamily:'var(--font-latin)'}}>
            <span>v 1.0</span>
            <span>RIYADH · 1447H</span>
          </div>
        </div>
      </div>
    </Phone>
  );
};

v3.Profile = function({ dark }) {
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        {/* Editorial header */}
        <div style={{padding:'24px 24px 20px', background:'#1A1A1A', color:'#fff', position:'relative', overflow:'hidden'}}>
          <PatternBg color="#AE1F24" opacity={0.18} scale={120}/>
          <div style={{position:'relative'}}>
            <div style={{fontSize:10, opacity:0.6, letterSpacing:'0.1em', fontFamily:'var(--font-latin)', marginBottom:14}}>STUDENT PROFILE · 2026</div>
            <div style={{display:'flex', alignItems:'flex-end', gap:16}}>
              <Avatar name="عبدالرحمن" size={70} color="#AE1F24"/>
              <div style={{flex:1, paddingBottom:4}}>
                <h1 style={{margin:0, fontSize:22, fontWeight:800, lineHeight:1.2}}>عبدالرحمن السبيعي</h1>
                <div style={{fontSize:11, opacity:0.7, marginTop:6, letterSpacing:'0.04em'}}>طالب علم · ID #INS-08841</div>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, marginTop:24, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.15)'}}>
              {[['12','COURSES'],['84h','LEARNED'],['03','CERTIFIED']].map(([n,l],i) => (
                <div key={i} style={{borderRight: i<2?'1px solid rgba(255,255,255,0.15)':'none', padding:'0 4px'}}>
                  <div style={{fontSize:24, fontWeight:900, fontFamily:'var(--font-latin)', lineHeight:1}}>{n}</div>
                  <div style={{fontSize:9, opacity:0.6, letterSpacing:'0.08em', marginTop:6}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent achievements editorial card */}
        <div style={{padding:'24px'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:800, letterSpacing:'0.08em', fontFamily:'var(--font-latin)'}}>RECENT</div>
          <h3 style={{margin:'4px 0 14px', fontSize:18, fontWeight:800, color:fg}}>إنجازاتك الأخيرة</h3>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {[
              ['شهادة','إتمام باقة الفقه — المستوى الأول','ربيع الثاني ١٤٤٧'],
              ['شارة','طالب مجتهد · ٥ دورات في شهر','صفر ١٤٤٧'],
              ['شهادة','حضور ٥ حلقات حضورية','محرّم ١٤٤٧'],
            ].map(([k,t,d],i) => (
              <div key={i} style={{padding:'14px 16px', background:cardBg, border:`1px solid ${border}`, borderRadius:8, display:'flex', alignItems:'center', gap:14}}>
                <div style={{width:40, height:40, borderRadius:8, background:'#AE1F24', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.cert('#fff', 22)}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:9, color:fg2, fontWeight:700, letterSpacing:'0.06em'}}>{k}</div>
                  <div style={{fontSize:13, fontWeight:700, color:fg, marginTop:2, lineHeight:1.4}}>{t}</div>
                  <div style={{fontSize:10, color:fg2, marginTop:2}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings — minimal list */}
        <div style={{padding:'8px 24px 24px'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:800, letterSpacing:'0.08em', fontFamily:'var(--font-latin)', marginBottom:6}}>SETTINGS</div>
          <div style={{borderTop:`2px solid ${fg}`}}>
            {[
              ['الإعدادات والخصوصية',''],
              ['التذكيرات للحلقات الحضورية','مفعّلة'],
              ['الفواتير والاشتراكات',''],
              ['اللغة','العربية'],
              ['تسجيل الخروج',''],
            ].map(([t,v],i,arr) => (
              <div key={i} style={{display:'flex', alignItems:'center', padding:'18px 0', borderBottom: i<arr.length-1?`1px solid ${border}`:'none'}}>
                <div style={{flex:1, fontSize:14, color:fg, fontWeight:600}}>{t}</div>
                {v && <span style={{fontSize:11, color:fg2, marginLeft:12}}>{v}</span>}
                <span style={{color:fg2, fontSize:18, marginRight:8}}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:10}}>
        {[['home','الرئيسية',false],['compass','استكشف',false],['bookmark','دوراتي',false],['user','حسابي',true]].map(([ic, lbl, act]) => (
          <div key={lbl} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:3}}>
            {Icon[ic]( act?'#AE1F24':fg2, 22, act?'#AE1F24':'none')}
            <div style={{fontSize:10, color: act?'#AE1F24':fg2, fontWeight: act?700:500}}>{lbl}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
};

v3.Instructors = function({ dark }) {
  const { INSTRUCTORS } = window.APP_DATA;
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        {/* Editorial header */}
        <div style={{padding:'24px 24px 20px'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:800, letterSpacing:'0.1em', fontFamily:'var(--font-latin)'}}>FACULTY · 18</div>
          <h1 style={{margin:'6px 0 0', fontSize:30, fontWeight:800, color:fg, lineHeight:1.15}}>المشايخ<br/>والمدرّسون</h1>
          <div style={{height:2, width:30, background:'#AE1F24', marginTop:14}}/>
        </div>

        {/* Filter chips */}
        <div style={{display:'flex', gap:8, padding:'8px 24px 18px', overflowX:'auto'}}>
          {['الكل','العقيدة','الفقه','التفسير','الحديث','تخصصي'].map((c,i) => (
            <span key={c} style={{flex:'0 0 auto', padding:'8px 14px', fontSize:12, fontWeight:700, color: i===0?'#fff':fg, background: i===0?'#AE1F24':'transparent', border:`1.5px solid ${i===0?'#AE1F24':border}`, borderRadius:0}}>{c}</span>
          ))}
        </div>

        {/* Big editorial list */}
        <div style={{padding:'4px 24px 24px'}}>
          {INSTRUCTORS.map((i,idx) => (
            <div key={i.id} style={{padding:'22px 0', borderTop: idx===0?`2px solid ${fg}`:`1px solid ${border}`}}>
              <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                <div style={{fontSize:32, fontWeight:900, color:'#AE1F24', fontFamily:'var(--font-latin)', lineHeight:1, minWidth:42, opacity: 0.9}}>0{idx+1}</div>
                <Avatar name={i.name} size={56}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:2}}>
                    <span style={{fontSize:15, fontWeight:800, color:fg}}>{i.name}</span>
                  </div>
                  <div style={{fontSize:11, color:fg2, marginBottom:10}}>{i.title}</div>
                  <div style={{display:'flex', gap:14, fontSize:10, color:fg2, alignItems:'center', letterSpacing:'0.04em', textTransform:'uppercase', fontFamily:'var(--font-latin)'}}>
                    <span>{i.rating}★</span>
                    <span>· {i.courses} courses</span>
                    <span>· {(i.students/1000).toFixed(0)}K students</span>
                  </div>
                </div>
              </div>
              <p style={{margin:'14px 0 0', paddingLeft:60, fontSize:12, color:fg2, lineHeight:1.7}}>{i.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:10}}>
        {[['home','الرئيسية',false],['compass','استكشف',true],['bookmark','دوراتي',false],['user','حسابي',false]].map(([ic, lbl, act]) => (
          <div key={lbl} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:3}}>
            {Icon[ic]( act?'#AE1F24':fg2, 22, act?'#AE1F24':'none')}
            <div style={{fontSize:10, color: act?'#AE1F24':fg2, fontWeight: act?700:500}}>{lbl}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
};

window.V3 = v3;
