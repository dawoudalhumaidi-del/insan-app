// Variant 1: Conservative — formal, traditional, clean cards with strong maroon
// Modeled after Insan's existing UI kit aesthetic

const v1 = {};

v1.Home = function({ dark }) {
  const { PACKAGES, CATEGORIES } = window.APP_DATA;
  const free = PACKAGES.filter(p => !p.premium);
  const premium = PACKAGES.filter(p => p.premium);

  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 34px)', overflow:'auto', paddingBottom:90}}>
        {/* Header — logo + bell */}
        <div style={{padding:'16px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <img src="assets/logo/insan-logo-mark.svg" style={{width:34, height:42}}/>
            <div>
              <div style={{fontSize:11, color:fg2, marginBottom:2}}>أكاديمية</div>
              <div style={{fontSize:15, fontWeight:700, color:fg}}>إنسان للعلوم الشرعية</div>
            </div>
          </div>
          <div style={{position:'relative', width:38, height:38, borderRadius:10, background: dark?'rgba(255,255,255,0.06)':'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${border}`}}>
            {Icon.bell(fg, 18)}
            <span style={{position:'absolute', top:8, right:9, width:7, height:7, borderRadius:7, background:'#AE1F24'}}/>
          </div>
        </div>

        {/* Salam greeting */}
        <div style={{padding:'4px 20px 18px'}}>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, color:fg, lineHeight:1.3}}>السلام عليكم،<br/>أبا عبدالرحمن</h1>
          <p style={{margin:'8px 0 0', fontSize:13, color:fg2}}>أكمل ما بدأت — درس واحد يقرّبك من الإتمام.</p>
        </div>

        {/* Search */}
        <div style={{padding:'0 20px 20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background: cardBg, border:`1px solid ${border}`, borderRadius:10}}>
            {Icon.search(fg2, 18)}
            <span style={{fontSize:14, color:fg2}}>ابحث عن دورة، شيخ، أو موضوع…</span>
          </div>
        </div>

        {/* Continue learning row */}
        <div style={{padding:'0 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:fg}}>تابع التعلم</h3>
          <span style={{fontSize:12, color:'#AE1F24', fontWeight:600}}>الكل ›</span>
        </div>
        <div style={{margin:'0 20px 24px', background: cardBg, border:`1px solid ${border}`, borderRadius:12, overflow:'hidden'}}>
          <div style={{display:'flex', gap:12, padding:14}}>
            <div style={{width:64, height:64, borderRadius:8, overflow:'hidden', flexShrink:0}}>
              <CourseThumb seed={2} color="#AE1F24" h={64}/>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:11, color:fg2, marginBottom:2}}>الدرس ٤ من ١٠</div>
              <div style={{fontSize:14, fontWeight:700, color:fg, lineHeight:1.4}}>الأدلة العقلية والحسية</div>
              <div style={{fontSize:11, color:fg2, marginTop:4}}>توحيد الألوهية</div>
            </div>
            <button style={{width:40, height:40, borderRadius:99, background:'#AE1F24', border:'none', display:'flex', alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
              {Icon.play('#fff', 14)}
            </button>
          </div>
          <div style={{height:3, background: dark?'rgba(255,255,255,0.08)':'#F1F1F2'}}>
            <div style={{height:'100%', width:'40%', background:'#AE1F24'}}/>
          </div>
        </div>

        {/* Categories */}
        <div style={{padding:'0 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:fg}}>التصنيفات</h3>
        </div>
        <div style={{display:'flex', gap:10, padding:'8px 20px 24px', overflowX:'auto'}}>
          {CATEGORIES.map(c => (
            <div key={c.id} style={{flex:'0 0 auto', minWidth:96, background: cardBg, border:`1px solid ${border}`, borderRadius:12, padding:14, textAlign:'center'}}>
              <div style={{width:36, height:36, margin:'0 auto 8px', borderRadius:8, background:'rgba(174,31,36,0.08)', color:'#AE1F24', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {Icon[c.icon] && Icon[c.icon]('#AE1F24', 20)}
              </div>
              <div style={{fontSize:12, fontWeight:700, color:fg}}>{c.name}</div>
              <div style={{fontSize:10, color:fg2, marginTop:2}}>{c.count} دورة</div>
            </div>
          ))}
        </div>

        {/* Free packages section */}
        <div style={{padding:'0 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:fg}}>باقات مجانية</h3>
          <span style={{fontSize:12, color:'#AE1F24', fontWeight:600}}>الكل ›</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10, padding:'8px 20px 24px'}}>
          {free.slice(0, 3).map(p => (
            <div key={p.id} style={{display:'flex', gap:12, padding:12, background:cardBg, border:`1px solid ${border}`, borderRadius:12}}>
              <div style={{width:72, height:72, borderRadius:8, overflow:'hidden', flexShrink:0}}>
                <CourseThumb seed={p.id.length} color="#AE1F24" h={72}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:4}}>
                  <span style={{fontSize:10, color:'#2E7D5B', fontWeight:700, background:'rgba(46,125,91,0.1)', padding:'2px 6px', borderRadius:4}}>مجاني</span>
                  <span style={{fontSize:10, color:fg2}}>{p.cat}</span>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:fg, lineHeight:1.4, marginBottom:6}}>{p.title}</div>
                <div style={{display:'flex', gap:10, fontSize:10, color:fg2, alignItems:'center'}}>
                  <span style={{display:'flex', alignItems:'center', gap:3}}>{Icon.book(fg2, 11)} {p.courses} دورات</span>
                  <span style={{display:'flex', alignItems:'center', gap:3}}>{Icon.clock(fg2, 11)} {p.hours} ساعة</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium / certified row */}
        <div style={{padding:'0 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:fg}}>شهادات معتمدة</h3>
          <span style={{fontSize:12, color:'#AE1F24', fontWeight:600}}>الكل ›</span>
        </div>
        <div style={{display:'flex', gap:10, overflowX:'auto', padding:'8px 20px 16px'}}>
          {premium.map(p => (
            <div key={p.id} style={{flex:'0 0 240px', background:'#1A1A1A', borderRadius:14, overflow:'hidden', position:'relative'}}>
              <div style={{height:90, position:'relative'}}>
                <CourseThumb seed={6} color="#1A1A1A" h={90}/>
                <PatternBg color="#AE1F24" opacity={0.15} scale={120}/>
                <div style={{position:'absolute', top:10, right:10, fontSize:10, fontWeight:700, color:'#1A1A1A', background:'#FFD700', padding:'3px 8px', borderRadius:4, letterSpacing:'0.04em'}}>{p.label}</div>
              </div>
              <div style={{padding:14, color:'#fff'}}>
                <div style={{fontSize:13, fontWeight:700, lineHeight:1.4, marginBottom:6}}>{p.title}</div>
                <div style={{fontSize:11, color:'rgba(255,255,255,0.65)', marginBottom:10}}>{p.instructor}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:16, fontWeight:800, fontFamily:'var(--font-latin)'}}>{p.price.toLocaleString('ar-SA')} <span style={{fontSize:11, fontWeight:600, opacity:0.7}}>ر.س</span></span>
                  <span style={{fontSize:10, color:'rgba(255,255,255,0.6)'}}>{p.hours} ساعة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:8}}>
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

v1.Package = function({ dark }) {
  const { PACKAGES, COURSES_IN_AQEEDAH } = window.APP_DATA;
  const p = PACKAGES[0]; // العقيدة - المستوى الأول
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        {/* Hero */}
        <div style={{position:'relative', height:280, background:'#AE1F24', overflow:'hidden'}}>
          <PatternBg color="#fff" opacity={0.12} scale={180}/>
          <div style={{position:'absolute', top:50, left:20, right:20, display:'flex', justifyContent:'space-between'}}>
            <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {Icon.chevronL('#fff', 18)}
            </div>
            <div style={{display:'flex', gap:8}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {Icon.bookmark('#fff', 18)}
              </div>
            </div>
          </div>
          <div style={{position:'absolute', bottom:24, left:20, right:20, color:'#fff'}}>
            <div style={{fontSize:11, fontWeight:600, opacity:0.85, letterSpacing:'0.06em', marginBottom:6}}>باقة تدريبية · {p.cat}</div>
            <h1 style={{margin:0, fontSize:24, fontWeight:700, lineHeight:1.3}}>{p.title}</h1>
            <div style={{display:'flex', gap:14, marginTop:12, fontSize:12, opacity:0.92}}>
              <span style={{display:'flex', alignItems:'center', gap:4}}>{Icon.book('#fff', 14)} {p.courses} دورات</span>
              <span style={{display:'flex', alignItems:'center', gap:4}}>{Icon.clock('#fff', 14)} {p.hours} ساعة</span>
              <span style={{display:'flex', alignItems:'center', gap:4}}>{Icon.users('#fff', 14)} {p.students.toLocaleString('ar-SA')}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{padding:'20px', display:'flex', flexDirection:'column', gap:18}}>
          {/* Instructor card */}
          <div style={{display:'flex', gap:12, padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:12}}>
            <Avatar name={p.instructor} size={48}/>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:fg2, marginBottom:2}}>المحاضر</div>
              <div style={{fontSize:14, fontWeight:700, color:fg}}>{p.instructor}</div>
              <div style={{display:'flex', gap:10, fontSize:11, color:fg2, marginTop:4, alignItems:'center'}}>
                <span style={{display:'flex', alignItems:'center', gap:3}}>{Icon.star('#C68B14', 12)} 4.9</span>
                <span>· عضو هيئة كبار العلماء</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 style={{margin:'0 0 8px', fontSize:15, fontWeight:700, color:fg}}>عن الباقة</h3>
            <p style={{margin:0, fontSize:13, color:fg2, lineHeight:1.85}}>{p.desc}</p>
          </div>

          {/* Tags */}
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {['أونلاين مسجل','اختبارات','شهادة','مدى الحياة','تحميل دروس'].map(t => (
              <span key={t} style={{fontSize:11, color:fg2, background: dark?'rgba(255,255,255,0.06)':'#fff', border:`1px solid ${border}`, padding:'5px 10px', borderRadius:99}}>{t}</span>
            ))}
          </div>

          {/* Courses list */}
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
              <h3 style={{margin:0, fontSize:15, fontWeight:700, color:fg}}>محتوى الباقة</h3>
              <span style={{fontSize:11, color:fg2}}>٢ من ٥ مكتمل</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {COURSES_IN_AQEEDAH.map(c => (
                <div key={c.n} style={{display:'flex', gap:12, padding:12, background:cardBg, border:`1px solid ${border}`, borderRadius:10, alignItems:'center', opacity: c.status==='locked'?0.6:1}}>
                  <div style={{width:36, height:36, borderRadius:8, background: c.status==='done'?'rgba(46,125,91,0.12)' : c.status==='active'?'rgba(174,31,36,0.1)' : (dark?'rgba(255,255,255,0.05)':'#F1F1F2'), color: c.status==='done'?'#2E7D5B': c.status==='active'?'#AE1F24' : fg2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:700, fontSize:13}}>
                    {c.status==='done' ? Icon.check(undefined, 16) : c.status==='locked' ? Icon.lock(undefined, 14) : c.n}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:600, color:fg}}>{c.title}</div>
                    <div style={{fontSize:11, color:fg2, marginTop:2}}>{c.lessons} درس · {c.dur}</div>
                    {c.status==='active' && (
                      <div style={{height:3, background: dark?'rgba(255,255,255,0.08)':'#F1F1F2', borderRadius:2, marginTop:8, overflow:'hidden'}}>
                        <div style={{height:'100%', width:`${c.progress*100}%`, background:'#AE1F24'}}/>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{position:'sticky', bottom:0, padding:'12px 20px 28px', background: dark?'rgba(14,14,16,0.92)':'rgba(247,244,238,0.92)', backdropFilter:'blur(12px)', borderTop:`1px solid ${border}`, display:'flex', gap:10, alignItems:'center'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:fg2}}>السعر</div>
              <div style={{fontSize:18, fontWeight:800, color:'#AE1F24'}}>مجاني <span style={{fontSize:11, color:fg2, fontWeight:500}}>· التحاق مباشر</span></div>
            </div>
            <button style={{padding:'14px 24px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:10, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700}}>التحق بالباقة</button>
          </div>
      </div>
    </Phone>
  );
};

v1.Course = function({ dark }) {
  const { LESSONS } = window.APP_DATA;
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        {/* Player thumbnail */}
        <div style={{position:'relative', height:220, background:'#1A1A1A', overflow:'hidden'}}>
          <CourseThumb seed={3} color="#AE1F24" h={220}/>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)'}}/>
          <div style={{position:'absolute', top:50, left:16, display:'flex', gap:10}}>
            <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {Icon.chevronL('#fff', 18)}
            </div>
          </div>
          <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:64, height:64, borderRadius:99, background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {Icon.play('#AE1F24', 22)}
            </div>
          </div>
          <div style={{position:'absolute', bottom:14, left:16, right:16, color:'#fff'}}>
            <div style={{fontSize:10, fontWeight:600, opacity:0.85}}>الدرس ٣ · {LESSONS[2].dur}</div>
            <div style={{fontSize:14, fontWeight:700, marginTop:2}}>{LESSONS[2].title}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex', gap:0, padding:'0 20px', borderBottom:`1px solid ${border}`}}>
          {[['الدروس', true],['الملفات',false],['نقاش',false],['ملاحظاتي',false]].map(([t,a]) => (
            <div key={t} style={{flex:1, padding:'14px 4px', textAlign:'center', fontSize:13, fontWeight: a?700:500, color: a?'#AE1F24':fg2, borderBottom: a?'2px solid #AE1F24':'2px solid transparent', marginBottom:-1}}>{t}</div>
          ))}
        </div>

        {/* Course header */}
        <div style={{padding:'18px 20px 8px'}}>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, marginBottom:4}}>دورة ٣ من ٥ · باقة العقيدة</div>
          <h1 style={{margin:0, fontSize:20, fontWeight:700, color:fg, lineHeight:1.3}}>توحيد الألوهية</h1>
          <div style={{display:'flex', gap:12, fontSize:11, color:fg2, marginTop:6}}>
            <span>١٠ دروس</span><span>·</span><span>٥ ساعات</span><span>·</span><span>المستوى الأول</span>
          </div>
          <div style={{height:5, background: dark?'rgba(255,255,255,0.08)':'#F1F1F2', borderRadius:3, marginTop:12, overflow:'hidden'}}>
            <div style={{height:'100%', width:'40%', background:'#AE1F24'}}/>
          </div>
          <div style={{fontSize:11, color:fg2, marginTop:6}}>أتممت ٤ دروس من ١٠ — ٤٠٪</div>
        </div>

        {/* Lesson list */}
        <div style={{padding:'12px 20px 100px', display:'flex', flexDirection:'column', gap:6}}>
          {LESSONS.map(l => (
            <div key={l.n} style={{
              display:'flex', gap:12, padding:14, alignItems:'center',
              background: l.current ? (dark?'rgba(174,31,36,0.15)':'rgba(174,31,36,0.06)') : cardBg,
              border:`1px solid ${l.current?'#AE1F24':border}`, borderRadius:10
            }}>
              <div style={{width:30, height:30, borderRadius:99, background: l.done?'rgba(46,125,91,0.15)' : l.current?'#AE1F24':(dark?'rgba(255,255,255,0.05)':'#F1F1F2'), color: l.done?'#2E7D5B' : l.current?'#fff':fg2, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:11, flexShrink:0}}>
                {l.done ? Icon.check(undefined, 14) : l.current ? Icon.play('#fff', 11) : l.n}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:600, color:fg, lineHeight:1.4}}>{l.title}</div>
                <div style={{fontSize:11, color:fg2, marginTop:2, fontFamily:'var(--font-latin)'}}>{l.dur}</div>
              </div>
              {!l.done && !l.current && (
                <div style={{width:28, height:28, borderRadius:8, background: dark?'rgba(255,255,255,0.05)':'#F1F1F2', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  {Icon.download(fg2, 14)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
};

v1.Login = function({ dark }) {
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';
  const inpBg = dark ? 'rgba(255,255,255,0.04)' : '#F7F4EE';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{padding:'40px 24px 24px', height:'100%', display:'flex', flexDirection:'column'}}>
        {/* Logo */}
        <div style={{textAlign:'center', marginBottom:32}}>
          <img src="assets/logo/insan-logo-mark.svg" style={{width:60, height:74, margin:'0 auto'}}/>
          <div style={{fontSize:13, color:fg2, marginTop:14, letterSpacing:'0.04em'}}>أكاديمية إنسان للعلوم الشرعية</div>
        </div>

        {/* Heading */}
        <h1 style={{margin:'0 0 6px', fontSize:26, fontWeight:700, color:fg}}>أهلاً بعودتك</h1>
        <p style={{margin:'0 0 28px', fontSize:13, color:fg2, lineHeight:1.7}}>
          سجّل الدخول للوصول إلى دوراتك ومتابعة تعلمك من حيث توقّفت.
        </p>

        {/* Form */}
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          <div>
            <label style={{fontSize:12, color:fg2, fontWeight:500, marginBottom:6, display:'block'}}>البريد الإلكتروني أو الجوال</label>
            <div style={{padding:'14px 14px', background:inpBg, border:`1px solid ${border}`, borderRadius:10, fontSize:14, color:fg}}>name@example.com</div>
          </div>
          <div>
            <label style={{fontSize:12, color:fg2, fontWeight:500, marginBottom:6, display:'flex', justifyContent:'space-between'}}>
              <span>كلمة المرور</span>
              <span style={{color:'#AE1F24'}}>نسيتها؟</span>
            </label>
            <div style={{padding:'14px 14px', background:inpBg, border:`1px solid ${border}`, borderRadius:10, fontSize:14, color:fg, letterSpacing:'4px'}}>••••••••</div>
          </div>
          <button style={{padding:'15px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:10, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700, marginTop:6}}>تسجيل الدخول</button>
        </div>

        {/* Divider */}
        <div style={{display:'flex', alignItems:'center', gap:12, margin:'24px 0'}}>
          <div style={{flex:1, height:1, background:border}}/>
          <span style={{fontSize:11, color:fg2}}>أو تابع باستخدام</span>
          <div style={{flex:1, height:1, background:border}}/>
        </div>

        {/* Social */}
        <div style={{display:'flex', gap:10}}>
          {['Apple','Google','نفاذ'].map(s => (
            <div key={s} style={{flex:1, padding:'12px', background:dark?'rgba(255,255,255,0.04)':'#fff', border:`1px solid ${border}`, borderRadius:10, textAlign:'center', fontSize:13, fontWeight:600, color:fg}}>{s}</div>
          ))}
        </div>

        {/* Sign up */}
        <div style={{marginTop:'auto', textAlign:'center', fontSize:13, color:fg2, paddingTop:24}}>
          لا تملك حساباً؟ <span style={{color:'#AE1F24', fontWeight:700}}>أنشئ حساباً</span>
        </div>
      </div>
    </Phone>
  );
};

v1.Profile = function({ dark }) {
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto', paddingBottom:20}}>
        {/* Header banner */}
        <div style={{position:'relative', padding:'40px 20px 28px', background:'#AE1F24', overflow:'hidden'}}>
          <PatternBg color="#fff" opacity={0.12} scale={150}/>
          <div style={{display:'flex', justifyContent:'flex-start', position:'relative', marginBottom:20}}>
            <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)'}}/>
          </div>
          <div style={{position:'relative', display:'flex', gap:14, alignItems:'center'}}>
            <Avatar name="عبدالرحمن" size={64} color="#fff"/>
            <div style={{color:'#fff'}}>
              <div style={{fontSize:18, fontWeight:700}}>عبدالرحمن السبيعي</div>
              <div style={{fontSize:12, opacity:0.85, marginTop:2}}>طالب علم · منذ ٢ ربيع الأول ١٤٤٧</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8, padding:'16px 20px'}}>
          {[['١٢','دورة'], ['٣','شهادات'], ['٨٤','ساعة']].map(([n,l],i) => (
            <div key={i} style={{padding:'12px 8px', background:cardBg, border:`1px solid ${border}`, borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:22, fontWeight:800, color:'#AE1F24', fontFamily:'var(--font-latin)'}}>{n}</div>
              <div style={{fontSize:11, color:fg2, marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div style={{padding:'8px 20px', display:'flex', flexDirection:'column', gap:14}}>
          <div>
            <div style={{fontSize:11, color:fg2, letterSpacing:'0.04em', padding:'0 4px 8px', fontWeight:600}}>الحساب</div>
            <div style={{background:cardBg, border:`1px solid ${border}`, borderRadius:12, overflow:'hidden'}}>
              {[
                ['الملف الشخصي','✏️'],
                ['شهاداتي وإنجازاتي','🏅'],
                ['تذكيرات الحلقات الحضورية','🔔'],
                ['الفواتير والاشتراكات','💳'],
              ].map(([t,e],i,arr) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:12, padding:'14px 14px', borderBottom: i<arr.length-1?`1px solid ${border}`:'none'}}>
                  <span style={{fontSize:18}}>{e}</span>
                  <div style={{flex:1, fontSize:13, color:fg, fontWeight:500}}>{t}</div>
                  <span style={{color:fg2, fontSize:14}}>›</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontSize:11, color:fg2, letterSpacing:'0.04em', padding:'0 4px 8px', fontWeight:600}}>الإعدادات</div>
            <div style={{background:cardBg, border:`1px solid ${border}`, borderRadius:12, overflow:'hidden'}}>
              {[
                ['اللغة','العربية'],
                ['التقويم','هجري'],
                ['التذكيرات','مفعّلة'],
                ['تحميل الدروس على Wi-Fi فقط','مفعّل'],
              ].map(([t,v],i,arr) => (
                <div key={t} style={{display:'flex', alignItems:'center', gap:12, padding:'14px', borderBottom: i<arr.length-1?`1px solid ${border}`:'none'}}>
                  <div style={{flex:1, fontSize:13, color:fg, fontWeight:500}}>{t}</div>
                  <span style={{fontSize:12, color:fg2}}>{v}</span>
                  <span style={{color:fg2, fontSize:14}}>›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:8}}>
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

v1.Instructors = function({ dark }) {
  const { INSTRUCTORS } = window.APP_DATA;
  const cardBg = dark ? '#1C1C1E' : '#fff';
  const fg = dark ? '#fff' : '#1A1A1A';
  const fg2 = dark ? 'rgba(255,255,255,0.65)' : '#5A5A5A';
  const pageBg = dark ? '#0E0E10' : '#F7F4EE';
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E2E4E5';

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        <div style={{padding:'16px 20px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${border}`}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:700, color:fg}}>المشايخ والمدرّسون</h1>
          <div style={{width:36, height:36, borderRadius:10, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.search(fg, 18)}</div>
        </div>

        <div style={{display:'flex', gap:8, padding:'12px 20px', overflowX:'auto'}}>
          {['الكل','العقيدة','الفقه','التفسير','الحديث','تخصصي'].map((c,i) => (
            <span key={c} style={{flex:'0 0 auto', padding:'8px 14px', borderRadius:99, fontSize:12, fontWeight:600, background: i===0?'#AE1F24':cardBg, color: i===0?'#fff':fg, border:`1px solid ${i===0?'#AE1F24':border}`}}>{c}</span>
          ))}
        </div>

        <div style={{padding:'4px 20px 16px', display:'flex', flexDirection:'column', gap:10}}>
          {INSTRUCTORS.map(i => (
            <div key={i.id} style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:12, display:'flex', gap:12}}>
              <Avatar name={i.name} size={56}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:2}}>
                  <span style={{fontSize:14, fontWeight:700, color:fg}}>{i.name}</span>
                  {i.badge && <span style={{fontSize:9, fontWeight:700, color:'#fff', background:'#AE1F24', padding:'2px 6px', borderRadius:4}}>{i.badge}</span>}
                </div>
                <div style={{fontSize:11, color:fg2, marginBottom:8}}>{i.title}</div>
                <div style={{display:'flex', gap:14, fontSize:11, color:fg2, alignItems:'center'}}>
                  <span style={{display:'flex', alignItems:'center', gap:3}}>{Icon.star('#C68B14', 11)} {i.rating}</span>
                  <span>{i.courses} دورة</span>
                  <span>{(i.students/1000).toFixed(0)}ك طالب</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:'absolute', bottom:0, left:0, right:0, height:84, background: dark?'rgba(28,28,30,0.95)':'#fff', borderTop:`1px solid ${border}`, display:'flex', justifyContent:'space-around', paddingTop:8}}>
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

window.V1 = v1;
