// Path screens — PathQuiz, SkillTree, Leaderboard, Duel, AITutor, Wird, Tajweed, LangSheet

// ─────────────── Language switcher sheet
function LangSheet({ open, onClose }) {
  const i18n = window.useT?.();
  if (!i18n) return null;
  return (
    <window.BottomSheet open={open} onClose={onClose} height="48%" title="اختر اللغة · Language">
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {window.LANGUAGES.map(l => (
          <window.Press key={l.code} onClick={() => { i18n.setLang(l.code); window.toast?.('Language updated · ' + l.name, {icon: l.flag, tone:'success'}); setTimeout(onClose, 180); }}
            style={{
              padding:'14px 16px', borderRadius:14, display:'flex', alignItems:'center', gap:14,
              background: i18n.lang === l.code ? '#AE1F24' : '#f5f5f7',
              color: i18n.lang === l.code ? '#fff' : '#1a1a1a',
            }}>
            <span style={{fontSize:24}}>{l.flag}</span>
            <div style={{flex:1, textAlign: l.dir === 'rtl' ? 'right' : 'left'}}>
              <div style={{fontSize:14, fontWeight:700, direction:l.dir}}>{l.name}</div>
              <div style={{fontSize:10, opacity:0.7, marginTop:2, fontFamily:'var(--font-latin)'}}>{l.code.toUpperCase()} · {l.dir.toUpperCase()}</div>
            </div>
            {i18n.lang === l.code && Icon.check('#fff', 18)}
          </window.Press>
        ))}
      </div>
    </window.BottomSheet>
  );
}
window.LangSheet = LangSheet;

// ─────────────── Path Quiz (Adaptive placement)
function PathQuiz({ dark }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({ goal:null, level:null, time:null, topics:[], lang:i18n.lang });

  const QUESTIONS = [
    { key:'goal', q:t('quiz_q1'), opts:[
      { v:'foundation', label:t('quiz_q1_a'), icon:'🕌' },
      { v:'quran',      label:t('quiz_q1_b'), icon:'📖' },
      { v:'arabic',     label:t('quiz_q1_c'), icon:'✍️' },
      { v:'pro',        label:t('quiz_q1_d'), icon:'🎓' },
    ]},
    { key:'level', q:t('quiz_q2'), opts:[
      { v:'beginner',     label:t('quiz_q2_a'), icon:'🌱' },
      { v:'intermediate', label:t('quiz_q2_b'), icon:'🌿' },
      { v:'advanced',     label:t('quiz_q2_c'), icon:'🌳' },
    ]},
    { key:'time', q:t('quiz_q3'), opts:[
      { v:5,  label:t('quiz_q3_a'), icon:'⚡' },
      { v:15, label:t('quiz_q3_b'), icon:'🔥' },
      { v:30, label:t('quiz_q3_c'), icon:'💪' },
      { v:60, label:t('quiz_q3_d'), icon:'🚀' },
    ]},
    { key:'topics', q:t('quiz_q4'), multi:true, opts:[
      { v:'aqeedah', label:'العقيدة', icon:'🛡' },
      { v:'fiqh',    label:'الفقه',   icon:'⚖️' },
      { v:'tafseer', label:'التفسير', icon:'📜' },
      { v:'hadith',  label:'الحديث',  icon:'📚' },
      { v:'seerah',  label:'السيرة',  icon:'🏛' },
      { v:'arabic',  label:'العربية',  icon:'✒️' },
      { v:'tajweed', label:'التجويد',  icon:'🎙' },
      { v:'pro',     label:'تخصصي',   icon:'💼' },
    ]},
    { key:'lang', q:t('quiz_q5'), opts: window.LANGUAGES.map(l => ({ v:l.code, label:l.name, icon:l.flag })) },
  ];

  const cur = step < QUESTIONS.length ? QUESTIONS[step] : null;
  const total = QUESTIONS.length;
  const progress = (step / total);

  const pick = (v) => {
    if (cur.multi) {
      setAnswers(a => {
        const arr = a[cur.key] || [];
        return { ...a, [cur.key]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] };
      });
    } else {
      setAnswers(a => ({ ...a, [cur.key]: v }));
      setTimeout(() => setStep(s => s + 1), 280);
    }
  };

  const finish = () => {
    game.setQuizProfile(answers);
    if (answers.lang && answers.lang !== i18n.lang) i18n.setLang(answers.lang);
    setStep(total); // results
  };

  if (cur === null) {
    // Result screen
    return (
      <Phone dark={dark} bg={pageBg}>
        {window.Confetti && <window.Confetti run={true}/>}
        <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'30px', textAlign:'center'}}>
          <div style={{fontSize:72, marginBottom:14, animation:'bounceIn 0.8s cubic-bezier(0.32, 0.72, 0, 1)'}}>🎯</div>
          <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', marginBottom:8}}>{t('quiz_done_title').toUpperCase()}</div>
          <h1 style={{margin:'0 0 10px', fontSize:26, fontWeight:800, color:fg, letterSpacing:'-0.015em'}}>{t('quiz_done_title')}</h1>
          <p style={{margin:'0 0 28px', fontSize:13, color:fg2, lineHeight:1.7, maxWidth:300}}>{t('quiz_done_sub')}</p>

          <div style={{width:'100%', padding:16, background:cardBg, border:`1px solid ${border}`, borderRadius:16, marginBottom:24, textAlign: i18n.dir==='rtl'?'right':'left'}}>
            <div style={{fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em', marginBottom:10}}>📋 ملخّص مسارك</div>
            <Row k="الهدف"  v={answers.goal}/>
            <Row k="المستوى" v={answers.level}/>
            <Row k="الوقت اليومي" v={answers.time + ' ' + t('minutes')}/>
            <Row k="المواضيع" v={(answers.topics||[]).length + ' مواضيع'}/>
          </div>

          <window.Press as="button" onClick={() => { game.addXp(50, 'إكمال التحديد'); nav.replace('skillTree'); }} style={{
            width:'100%', padding:'16px', background:'#AE1F24', color:'#fff',
            border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:'0 12px 30px rgba(174,31,36,0.35)',
          }}>
            {t('quiz_view_path')} {Icon.chevronL('#fff', 14)}
          </window.Press>
        </div>
      </Phone>
    );
  }

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        {/* Header progress */}
        <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:10}}>
          {step > 0 && (
            <window.Press onClick={() => setStep(s => s-1)} style={{width:36, height:36, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              {Icon.chevronL(fg, 16)}
            </window.Press>
          )}
          <div style={{flex:1, height:6, background:cardBg, border:`1px solid ${border}`, borderRadius:99, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${progress*100}%`, background:'linear-gradient(90deg, #AE1F24, #E84A50)', borderRadius:99, transition:'width 480ms cubic-bezier(0.32, 0.72, 0, 1)'}}/>
          </div>
          <div style={{fontSize:12, color:fg2, fontWeight:700, fontFamily:'var(--font-latin)', minWidth:36, textAlign:'left'}}>{step+1}/{total}</div>
        </div>

        {step === 0 && (
          <div style={{padding:'30px 24px 14px', textAlign:'center'}}>
            <div style={{fontSize:54, marginBottom:8, animation:'bounceIn 0.7s cubic-bezier(0.32, 0.72, 0, 1)'}}>🧭</div>
            <h2 style={{margin:'0 0 6px', fontSize:22, fontWeight:800, color:fg, letterSpacing:'-0.015em'}}>{t('quiz_title')}</h2>
            <div style={{fontSize:12, color:fg2, lineHeight:1.7}}>{t('quiz_sub')}</div>
          </div>
        )}

        <div key={step} style={{flex:1, padding:'20px 24px 0', overflow:'auto', animation:'fadeUp 0.4s ease'}}>
          <h3 style={{margin:'0 0 22px', fontSize:18, fontWeight:700, color:fg, lineHeight:1.5, letterSpacing:'-0.005em'}}>{cur.q}</h3>
          <div style={{display: cur.multi ? 'grid' : 'flex', gridTemplateColumns: cur.multi ? '1fr 1fr' : 'none', flexDirection: cur.multi ? undefined : 'column', gap:10}}>
            {cur.opts.map((o, i) => {
              const sel = cur.multi ? (answers[cur.key] || []).includes(o.v) : answers[cur.key] === o.v;
              return (
                <window.Press key={o.v} onClick={() => pick(o.v)} className="stagger-item"
                  style={{
                    padding: cur.multi ? '14px 12px' : '16px 18px', borderRadius:14,
                    background: sel ? 'rgba(174,31,36,0.08)' : cardBg,
                    border:`2px solid ${sel ? '#AE1F24' : border}`,
                    display:'flex', alignItems:'center', gap:12,
                    flexDirection: cur.multi ? 'column' : 'row',
                    textAlign: cur.multi ? 'center' : (i18n.dir==='rtl'?'right':'left'),
                    animationDelay:(i*0.05)+'s', transition:'all 220ms ease',
                  }}>
                  <div style={{fontSize: cur.multi ? 28 : 22}}>{o.icon}</div>
                  <div style={{flex:1, fontSize: cur.multi ? 12 : 14, fontWeight: sel?700:600, color:fg}}>{o.label}</div>
                  {sel && !cur.multi && Icon.check('#AE1F24', 18)}
                </window.Press>
              );
            })}
          </div>
        </div>

        <div style={{padding:'14px 24px 30px'}}>
          {cur.multi ? (
            <window.Press as="button" onClick={() => { if ((answers[cur.key]||[]).length) setStep(s=>s+1); }} style={{
              width:'100%', padding:'15px', background: (answers[cur.key]||[]).length?'#AE1F24':'#ccc', color:'#fff',
              border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700,
              opacity: (answers[cur.key]||[]).length?1:0.5,
            }}>
              {t('next')} ({(answers[cur.key]||[]).length})
            </window.Press>
          ) : step === total - 1 && answers[cur.key] != null ? (
            <window.Press as="button" onClick={finish} style={{
              width:'100%', padding:'15px', background:'#AE1F24', color:'#fff',
              border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:700,
            }}>{t('done')}</window.Press>
          ) : (
            <div style={{textAlign:'center', fontSize:11, color:fg2}}>{t('skip')}</div>
          )}
        </div>
      </div>
    </Phone>
  );
}

function Row({k, v}) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'7px 0', fontSize:12.5, borderBottom:'1px dashed rgba(0,0,0,0.06)'}}>
      <span style={{color:'#888'}}>{k}</span>
      <span style={{fontWeight:700}}>{v ? String(v) : '—'}</span>
    </div>
  );
}

// ─────────────── Skill Tree (Duolingo-style)
function SkillTree({ dark }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const UNITS = [
    { id:'u1', title:'البداية: التوحيد', icon:'🛡', color:'#2E7D5B', desc:'أساس الإيمان',
      nodes:[
        { id:'u1-1', title:'مدخل العقيدة', icon:'📖', short:'L1' },
        { id:'u1-2', title:'توحيد الربوبية', icon:'🌌', short:'L2' },
        { id:'u1-3', title:'توحيد الألوهية', icon:'🕋', short:'L3' },
        { id:'u1-4', title:'مراجعة الوحدة', icon:'🏆', short:'★' , isReview:true},
      ]},
    { id:'u2', title:'الفقه: العبادات', icon:'⚖️', color:'#AE1F24', desc:'الطهارة والصلاة',
      nodes:[
        { id:'u2-1', title:'فقه الطهارة', icon:'💧', short:'L1' },
        { id:'u2-2', title:'أحكام الوضوء', icon:'🚿', short:'L2' },
        { id:'u2-3', title:'الصلاة وأركانها', icon:'🤲', short:'L3' },
        { id:'u2-4', title:'مراجعة الوحدة', icon:'🏆', short:'★', isReview:true },
      ]},
    { id:'u3', title:'العربية: النحو', icon:'✒️', color:'#1a8fd9', desc:'لغة القرآن',
      nodes:[
        { id:'u3-1', title:'الكلمة وأقسامها', icon:'🔤', short:'L1' },
        { id:'u3-2', title:'المرفوعات', icon:'⬆️', short:'L2' },
        { id:'u3-3', title:'المنصوبات', icon:'➡️', short:'L3' },
      ]},
    { id:'u4', title:'القرآن وعلومه', icon:'📜', color:'#7B1FA2', desc:'تفسير وتدبر',
      nodes:[
        { id:'u4-1', title:'علوم القرآن', icon:'📖', short:'L1' },
        { id:'u4-2', title:'أصول التفسير', icon:'🔎', short:'L2' },
      ]},
  ];

  const isCompleted = (id) => game.completedNodes.includes(id);
  const indexInUnit = (unit, nodeId) => unit.nodes.findIndex(n => n.id === nodeId);
  const isUnlocked = (unit, idx) => idx === 0 || isCompleted(unit.nodes[idx-1].id);
  const isCurrent = (unit, idx) => isUnlocked(unit, idx) && !isCompleted(unit.nodes[idx].id);

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto', paddingBottom:24}}>
        {/* Sticky header with chips */}
        <div style={{position:'sticky', top:0, zIndex:10, background:pageBg, padding:'14px 20px 12px', borderBottom:`1px solid ${border}`}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
            <div>
              <div style={{fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em'}}>SMART PATH</div>
              <h1 style={{margin:0, fontSize:20, fontWeight:800, color:fg, letterSpacing:'-0.01em'}}>{t('path_title')}</h1>
            </div>
            <window.GameChips dark={dark} compact={true}/>
          </div>
        </div>

        <div style={{padding:'10px 0 30px'}}>
          {UNITS.map((unit, ui) => (
            <div key={unit.id} style={{marginBottom:30}}>
              {/* Unit banner */}
              <div style={{
                margin:'0 16px 22px', padding:'14px 18px', borderRadius:16,
                background:`linear-gradient(135deg, ${unit.color} 0%, ${unit.color}cc 100%)`, color:'#fff',
                display:'flex', alignItems:'center', gap:14,
                boxShadow:`0 12px 26px ${unit.color}44`,
              }}>
                <div style={{fontSize:30}}>{unit.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:9, opacity:0.85, fontWeight:700, letterSpacing:'0.08em'}}>{t('path_unit')} {ui+1}</div>
                  <div style={{fontSize:15, fontWeight:800, marginTop:1}}>{unit.title}</div>
                  <div style={{fontSize:10.5, opacity:0.85, marginTop:2}}>{unit.desc}</div>
                </div>
                <div style={{fontSize:11, fontWeight:800, fontFamily:'var(--font-latin)', textAlign:'center', minWidth:48}}>
                  <div style={{fontSize:18}}>{unit.nodes.filter(n => isCompleted(n.id)).length}</div>
                  <div style={{fontSize:9, opacity:0.85}}>/ {unit.nodes.length}</div>
                </div>
              </div>

              {/* Node trail (zigzag) */}
              <div style={{position:'relative', padding:'0 30px'}}>
                {unit.nodes.map((n, ni) => {
                  const completed = isCompleted(n.id);
                  const unlocked = isUnlocked(unit, ni);
                  const current = isCurrent(unit, ni);
                  const offset = (ni % 4 === 0) ? 0 : (ni % 4 === 1) ? 60 : (ni % 4 === 2) ? 120 : 60;
                  const xpReward = n.isReview ? 50 : 20;
                  return (
                    <div key={n.id} style={{display:'flex', justifyContent: i18n.dir==='rtl'?'flex-end':'flex-start', marginBottom:30, position:'relative'}}>
                      {/* connector line to next */}
                      {ni < unit.nodes.length - 1 && (
                        <div style={{
                          position:'absolute', bottom:-30, [i18n.dir==='rtl'?'right':'left']: offset+34,
                          width:2, height:30, background:`repeating-linear-gradient(to bottom, ${completed?unit.color:border} 0 6px, transparent 6px 12px)`,
                        }}/>
                      )}
                      <div style={{[i18n.dir==='rtl'?'marginRight':'marginLeft']: offset, position:'relative'}}>
                        {current && (
                          <div style={{position:'absolute', bottom: '100%', [i18n.dir==='rtl'?'right':'left']:'50%', transform:'translateX(50%)', marginBottom:4, padding:'5px 10px', background:'#AE1F24', color:'#fff', borderRadius:99, fontSize:9, fontWeight:700, letterSpacing:'0.04em', whiteSpace:'nowrap'}} className="bounce-tag">START</div>
                        )}
                        <window.Press
                          onClick={() => unlocked ? nav.push('lessonNode', { node: n, unit, xpReward }) : window.toast?.('أكمل الدرس السابق أولاً', {tone:'error', icon:'🔒'})}
                          style={{
                            width:72, height:72, borderRadius:'50%',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            background: completed ? `linear-gradient(135deg, ${unit.color}, ${unit.color}cc)` :
                                        current ? '#fff' :
                                        unlocked ? cardBg : (dark?'#1f1f24':'#e8e8eb'),
                            border: completed ? `4px solid ${unit.color}` :
                                    current ? `4px solid ${unit.color}` :
                                    unlocked ? `4px solid ${border}` : `4px solid transparent`,
                            boxShadow: current ? `0 6px 18px ${unit.color}55, 0 0 0 4px rgba(255,255,255,0.5) inset` : completed ? `0 6px 16px ${unit.color}44` : 'none',
                            color: completed ? '#fff' : current ? unit.color : unlocked ? fg : fg2,
                            fontSize:26, position:'relative',
                            opacity: unlocked ? 1 : 0.5,
                          }}>
                          {!unlocked ? Icon.lock(fg2, 22) : completed ? Icon.check('#fff', 26) : n.icon}
                          {/* crowns */}
                          {completed && (
                            <div style={{position:'absolute', bottom:-10, left:'50%', transform:'translateX(-50%)', display:'flex', gap:1}}>
                              {[1,2,3].map(c => (
                                <span key={c} style={{fontSize:10, opacity: (game.crown[n.id]||0) >= c ? 1 : 0.25, filter: (game.crown[n.id]||0) >= c ? 'none' : 'grayscale(1)'}}>👑</span>
                              ))}
                            </div>
                          )}
                        </window.Press>
                        {/* label */}
                        <div style={{textAlign:'center', marginTop:14, fontSize:11, fontWeight:700, color: unlocked ? fg : fg2, maxWidth:90, lineHeight:1.4, marginInline:'auto'}}>
                          {n.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <window.TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
}

// ─────────────── Lesson node detail (when tapping a path node)
function LessonNode({ dark, params }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const node = params?.node || { id:'demo', title:'درس تجريبي', icon:'📖' };
  const unit = params?.unit || { color:'#AE1F24', title:'وحدة' };
  const xpReward = params?.xpReward || 20;

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{height:240, position:'relative', background:`linear-gradient(135deg, ${unit.color}, ${unit.color}99)`, overflow:'hidden'}}>
          <window.PatternBg color="#fff" opacity={0.1} scale={140}/>
          <div style={{position:'absolute', top:54, left:16, right:16, display:'flex', justifyContent:'space-between'}}>
            <window.Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:42, height:42, borderRadius:99, background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL('#0A0A0C', 18)}</window.Press>
            <div style={{padding:'6px 12px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:99, color:'#fff', fontSize:11, fontWeight:700}}>+{xpReward} XP</div>
          </div>
          <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff'}}>
            <div style={{fontSize:64, marginBottom:8}} className="splash-pop">{node.icon}</div>
            <h1 style={{margin:'0 0 4px', fontSize:22, fontWeight:800, letterSpacing:'-0.015em'}}>{node.title}</h1>
            <div style={{fontSize:11, opacity:0.85}}>{unit.title}</div>
          </div>
        </div>

        <div style={{flex:1, padding:'24px 20px', overflow:'auto'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:18}}>
            {[{i:'⏱',l:'٥-٧ دقائق'},{i:'📝',l:'٥ أسئلة'},{i:'❤️',l:'لن يخصم قلوبك'}].map((s,i) => (
              <div key={i} style={{padding:'12px 6px', background:cardBg, border:`1px solid ${border}`, borderRadius:12, textAlign:'center'}}>
                <div style={{fontSize:18, marginBottom:4}}>{s.i}</div>
                <div style={{fontSize:10.5, color:fg2, fontWeight:600}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:14, marginBottom:14}}>
            <div style={{fontSize:11, color:fg2, fontWeight:700, letterSpacing:'0.06em', marginBottom:8}}>أهداف الدرس</div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {['التعرف على المفهوم الأساسي','حفظ ٣ أدلة من الكتاب','تطبيق على ٥ أمثلة'].map((o,i) => (
                <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start', fontSize:12.5}}>
                  <span style={{color:unit.color, fontWeight:800}}>·</span>
                  <span style={{color:fg, fontWeight:500}}>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Crown progress */}
          <div style={{padding:14, background:cardBg, border:`1px solid ${border}`, borderRadius:14, marginBottom:14, display:'flex', alignItems:'center', gap:14}}>
            <div style={{display:'flex', gap:4}}>
              {[1,2,3,4,5].map(c => (
                <span key={c} style={{fontSize:18, opacity: (game.crown[node.id]||0) >= c ? 1 : 0.2, filter: (game.crown[node.id]||0) >= c ? 'none' : 'grayscale(1)'}}>👑</span>
              ))}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:12.5, fontWeight:700, color:fg}}>المستوى {(game.crown[node.id]||0)} من ٥</div>
              <div style={{fontSize:10, color:fg2, marginTop:2}}>أكمل بدون أخطاء لكسب تاج إضافي</div>
            </div>
          </div>
        </div>

        <div style={{padding:'14px 20px 30px'}}>
          <window.Press as="button" onClick={() => { game.completeNode(node.id, true); game.addXp(xpReward, 'إكمال درس'); nav.pop(); }} style={{
            width:'100%', padding:'16px', background: unit.color, color:'#fff',
            border:'none', borderRadius:16, fontFamily:'var(--font-arabic)', fontSize:15, fontWeight:800,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:`0 14px 30px ${unit.color}55`,
          }}>
            ابدأ الدرس {Icon.chevronL('#fff', 14)}
          </window.Press>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────── Leaderboard
function Leaderboard({ dark }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const players = React.useMemo(() => {
    const me = { id:'me', name:'أنت', xp: game.xp, isMe:true, avatar:'🧑‍🎓' };
    const others = [
      { name:'فهد العنزي', xp: 1640, avatar:'👨‍🎓' },
      { name:'لطيفة المطيري', xp: 1480, avatar:'👩‍🏫' },
      { name:'يوسف الدوسري', xp: 1320, avatar:'👨' },
      { name:'هند الشمري', xp: 1240, avatar:'👩' },
      { name:'عبدالعزيز ', xp: 1100, avatar:'🧔' },
      { name:'منيرة العتيبي', xp: 980, avatar:'👩‍💼' },
      { name:'سعد القحطاني', xp: 870, avatar:'👨‍💼' },
      { name:'نورة الزهراني', xp: 810, avatar:'👩‍🎓' },
      { name:'محمد البقمي', xp: 720, avatar:'🧑' },
    ];
    return [...others, me].sort((a,b) => b.xp - a.xp);
  }, [game.xp]);

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'calc(100% - 84px)', overflow:'auto'}}>
        {/* Hero with league */}
        <div style={{padding:'18px 20px 14px'}}>
          <div style={{padding:'18px', borderRadius:20, position:'relative', overflow:'hidden',
            background:`linear-gradient(135deg, ${game.league.color} 0%, ${game.league.color}99 100%)`,
            color:'#fff', boxShadow:`0 14px 30px ${game.league.color}44`,
          }}>
            <window.PatternBg color="#fff" opacity={0.1} scale={120}/>
            <div style={{position:'relative', display:'flex', alignItems:'center', gap:16}}>
              <div style={{fontSize:54, animation:'splashPop 0.8s cubic-bezier(0.32, 0.72, 0, 1)'}}>{game.league.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, opacity:0.85, fontWeight:700, letterSpacing:'0.08em'}}>{t('lb_title').toUpperCase()}</div>
                <h1 style={{margin:'4px 0 0', fontSize:24, fontWeight:800, letterSpacing:'-0.015em'}}>دوري {t(game.league.nameKey)}</h1>
                <div style={{fontSize:11, opacity:0.85, marginTop:4}}>⏰ ٤ أيام · ٢١ ساعة {t('lb_remaining')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion / demotion zones */}
        <div style={{padding:'0 20px', fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em', display:'flex', justifyContent:'space-between', marginBottom:8}}>
          <span style={{color:'#2E7D5B'}}>↑ ٣ {t('lb_promote')}</span>
          <span>{players.length} متسابق</span>
        </div>

        <div style={{padding:'0 20px 24px', display:'flex', flexDirection:'column', gap:6}}>
          {players.map((p, i) => {
            const rank = i + 1;
            const isPromote = rank <= 3;
            const isDemote = rank >= players.length - 2;
            return (
              <div key={p.id || p.name} className="stagger-item" style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                background: p.isMe ? 'rgba(174,31,36,0.08)' : cardBg,
                border:`2px solid ${p.isMe ? '#AE1F24' : border}`, borderRadius:14,
                animationDelay:(i*0.04)+'s', position:'relative',
              }}>
                <div style={{
                  width:30, height:30, borderRadius:99,
                  background: rank===1 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                             rank===2 ? 'linear-gradient(135deg, #C0C0C0, #909090)' :
                             rank===3 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' :
                             cardBg,
                  border: rank > 3 ? `1px solid ${border}` : 'none',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, fontWeight:800, fontFamily:'var(--font-latin)',
                  color: rank <= 3 ? '#fff' : fg, flexShrink:0,
                }}>{rank}</div>
                <div style={{fontSize:24}}>{p.avatar}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:fg, display:'flex', alignItems:'center', gap:6}}>
                    {p.name}
                    {p.isMe && <span style={{padding:'2px 7px', background:'#AE1F24', color:'#fff', borderRadius:99, fontSize:9, fontWeight:700}}>أنت</span>}
                  </div>
                  <div style={{fontSize:10.5, color:fg2, marginTop:2}}>
                    {isPromote && <span style={{color:'#2E7D5B', fontWeight:700}}>↑ يصعد</span>}
                    {!isPromote && !isDemote && <span>منطقة آمنة</span>}
                    {isDemote && <span style={{color:'#AE1F24', fontWeight:700}}>↓ يهبط</span>}
                  </div>
                </div>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:15, fontWeight:800, color:fg, fontFamily:'var(--font-latin)'}}>{p.xp >= 1000 ? (p.xp/1000).toFixed(1)+'k' : p.xp}</div>
                  <div style={{fontSize:9, color:fg2, fontWeight:600}}>XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <window.TabBar dark={dark} activeTab={nav.tab}/>
    </Phone>
  );
}

// ─────────────── Duel
function Duel({ dark }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const [state, setState] = React.useState('lobby'); // lobby | searching | match | result
  const [opp, setOpp] = React.useState(null);
  const [round, setRound] = React.useState(0);
  const [meScore, setMe] = React.useState(0);
  const [oppScore, setOp] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [timer, setTimer] = React.useState(15);

  const QS = [
    { q:'كم عدد أركان الإسلام؟', opts:['٣','٤','٥','٦'], correct:2 },
    { q:'أول من أسلم من الرجال؟', opts:['أبوبكر','عمر','عثمان','علي'], correct:0 },
    { q:'كم عدد أنواع التوحيد؟', opts:['نوعان','ثلاثة','أربعة','خمسة'], correct:1 },
    { q:'الفعل المضارع علامة رفعه؟', opts:['الفتحة','الكسرة','الضمة','السكون'], correct:2 },
    { q:'أطول سورة في القرآن؟', opts:['آل عمران','البقرة','النساء','الأنعام'], correct:1 },
  ];

  const startSearch = () => {
    setState('searching');
    setTimeout(() => {
      const opps = [
        { name:'فهد العنزي', avatar:'👨‍🎓', xp:1640 },
        { name:'لطيفة المطيري', avatar:'👩‍🏫', xp:1480 },
        { name:'محمد البقمي', avatar:'🧑', xp:720 },
      ];
      setOpp(opps[Math.floor(Math.random()*opps.length)]);
      setState('match');
      setRound(0); setMe(0); setOp(0); setPicked(null); setTimer(15);
    }, 1900);
  };

  // Timer for current round
  React.useEffect(() => {
    if (state !== 'match' || picked != null) return;
    if (timer <= 0) { handleAnswer(-1); return; }
    const id = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, state, picked]);

  const handleAnswer = (i) => {
    setPicked(i);
    const c = QS[round].correct;
    const correct = i === c;
    if (correct) setMe(s => s+1);
    // simulate opponent: 65% correct
    const oppCorrect = Math.random() < 0.65;
    if (oppCorrect) setOp(s => s+1);
    setTimeout(() => {
      if (round < QS.length - 1) {
        setRound(r => r+1); setPicked(null); setTimer(15);
      } else {
        setState('result');
      }
    }, 1500);
  };

  if (state === 'lobby') {
    return (
      <Phone dark={dark} bg={pageBg}>
        <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
          <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:10}}>
            <window.Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</window.Press>
            <div style={{flex:1}}>
              <h1 style={{margin:0, fontSize:18, fontWeight:800, color:fg}}>{t('duel_title')}</h1>
            </div>
          </div>
          <div style={{flex:1, padding:'20px 24px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <div style={{fontSize:80, marginBottom:14, animation:'flamePulse 2s infinite ease-in-out'}}>⚔️</div>
            <h2 style={{margin:'0 0 8px', fontSize:24, fontWeight:800, color:fg, textAlign:'center', letterSpacing:'-0.015em'}}>{t('duel_title')}</h2>
            <p style={{margin:'0 0 30px', fontSize:13, color:fg2, textAlign:'center', lineHeight:1.7, maxWidth:280}}>{t('duel_sub')}</p>
            <div style={{width:'100%', display:'flex', flexDirection:'column', gap:10}}>
              <window.Press as="button" onClick={startSearch} style={{padding:'16px', background:'linear-gradient(135deg, #AE1F24, #6B1115)', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:14, fontWeight:800, boxShadow:'0 14px 30px rgba(174,31,36,0.4)', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
                ⚡ {t('duel_find')}
              </window.Press>
              <window.Press as="button" style={{padding:'14px', background:cardBg, color:fg, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>
                👥 {t('duel_friends')}
              </window.Press>
            </div>
          </div>
        </div>
      </Phone>
    );
  }

  if (state === 'searching') {
    return (
      <Phone dark={dark} bg={pageBg}>
        <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20}}>
          <div className="search-spin" style={{fontSize:80}}>⚔️</div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:18, fontWeight:800, color:fg, marginBottom:6}}>{t('duel_searching')}</div>
            <div style={{fontSize:12, color:fg2}}>المنافسون من حول العالم</div>
          </div>
          <div style={{display:'flex', gap:6}}>
            {[0,1,2].map(i => <div key={i} className="dot-wave" style={{width:8, height:8, borderRadius:8, background:'#AE1F24', animationDelay:(i*0.15)+'s'}}/>)}
          </div>
        </div>
      </Phone>
    );
  }

  if (state === 'match') {
    const q = QS[round];
    return (
      <Phone dark={dark} bg={pageBg}>
        <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
          {/* Match header */}
          <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:`1px solid ${border}`}}>
            <div style={{display:'flex', alignItems:'center', gap:8, flex:1}}>
              <div style={{fontSize:24}}>🧑‍🎓</div>
              <div>
                <div style={{fontSize:11, fontWeight:700, color:fg}}>أنت</div>
                <div style={{fontSize:18, fontWeight:800, color:'#AE1F24', fontFamily:'var(--font-latin)', lineHeight:1}}>{meScore}</div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div className="timer-pulse" style={{
                width:46, height:46, borderRadius:99, background:'#AE1F24', color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, fontFamily:'var(--font-latin)',
              }}>{timer}</div>
              <div style={{fontSize:9, color:fg2, fontWeight:700, marginTop:4}}>{t('duel_round')} {round+1}/{QS.length}</div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, flex:1, justifyContent:'flex-end'}}>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11, fontWeight:700, color:fg}}>{opp.name}</div>
                <div style={{fontSize:18, fontWeight:800, color:fg, fontFamily:'var(--font-latin)', lineHeight:1}}>{oppScore}</div>
              </div>
              <div style={{fontSize:24}}>{opp.avatar}</div>
            </div>
          </div>

          <div key={round} style={{flex:1, padding:'30px 24px', animation:'fadeUp 0.4s ease', overflow:'auto'}}>
            <div style={{fontSize:11, color:'#AE1F24', fontWeight:700, letterSpacing:'0.08em', marginBottom:10}}>{t('duel_round')} {round+1}</div>
            <h2 style={{margin:'0 0 26px', fontSize:22, fontWeight:700, color:fg, lineHeight:1.4, letterSpacing:'-0.005em'}}>{q.q}</h2>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {q.opts.map((o, i) => {
                const isPicked = picked === i;
                const showCorrect = picked != null && i === q.correct;
                const showWrong = isPicked && i !== q.correct;
                return (
                  <window.Press key={i} onClick={() => picked == null && handleAnswer(i)} className="stagger-item" style={{
                    padding:'15px 18px', borderRadius:14, textAlign: i18n.dir==='rtl'?'right':'left',
                    background: showCorrect ? 'rgba(46,125,91,0.12)' : showWrong ? 'rgba(174,31,36,0.12)' : cardBg,
                    border:`2px solid ${showCorrect ? '#2E7D5B' : showWrong ? '#AE1F24' : border}`,
                    fontSize:14, color:fg, fontWeight:600, animationDelay:(i*0.05)+'s',
                  }}>{o}</window.Press>
                );
              })}
            </div>
          </div>
        </div>
      </Phone>
    );
  }

  // Result
  const won = meScore > oppScore;
  const tied = meScore === oppScore;
  const reward = won ? 30 : tied ? 10 : 5;
  return (
    <Phone dark={dark} bg={pageBg}>
      {won && window.Confetti && <window.Confetti run={true}/>}
      <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:30, textAlign:'center'}}>
        <div style={{fontSize:80, marginBottom:14, animation:'bounceIn 0.8s cubic-bezier(0.32, 0.72, 0, 1)'}}>{won?'🏆':tied?'🤝':'💪'}</div>
        <div style={{fontSize:11, color:won?'#2E7D5B':'#AE1F24', fontWeight:700, letterSpacing:'0.08em', marginBottom:8}}>{won?'فوز ساحق':tied?'تعادل':'خسارة شريفة'}</div>
        <h1 style={{margin:'0 0 30px', fontSize:28, fontWeight:800, color:fg, letterSpacing:'-0.015em'}}>{meScore} - {oppScore}</h1>
        <div style={{padding:'14px 22px', background:'linear-gradient(135deg, #AE1F24, #6B1115)', color:'#fff', borderRadius:99, fontSize:14, fontWeight:800, marginBottom:24, boxShadow:'0 10px 24px rgba(174,31,36,0.3)'}}>+{reward} XP</div>
        <div style={{display:'flex', gap:10, width:'100%'}}>
          <window.Press as="button" onClick={() => setState('lobby')} style={{flex:1, padding:'14px', background:cardBg, color:fg, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>تحدّي جديد</window.Press>
          <window.Press as="button" onClick={() => { game.addXp(reward, 'تحدّي'); nav.pop(); }} style={{flex:1, padding:'14px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700}}>استلام الجائزة</window.Press>
        </div>
      </div>
    </Phone>
  );
}

// ─────────────── AI Tutor (الشيخ الذكي)
function AITutor({ dark }) {
  const nav = window.useNav();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const SAMPLES = {
    'الوضوء': 'الوضوء واجب لكل صلاة. أركانه: غسل الوجه، غسل اليدين إلى المرفقين، مسح الرأس، وغسل الرجلين إلى الكعبين. والترتيب والموالاة شرطان عند جمهور أهل العلم. والدليل قوله تعالى: "إذا قمتم إلى الصلاة فاغسلوا..." [المائدة: ٦].',
    'التوحيد': 'التوحيد لغةً: جعل الشيء واحداً. واصطلاحاً: إفراد الله بما يختص به سبحانه. وأنواعه ثلاثة: توحيد الربوبية (إفراده بأفعاله)، وتوحيد الألوهية (إفراده بالعبادة)، وتوحيد الأسماء والصفات (إفراده بأسمائه وصفاته كما وردت).',
    'الصلاة': 'الصلاة عمود الدين، وهي خمس صلوات في اليوم والليلة فرضت ليلة الإسراء. أركانها أربعة عشر منها: القيام مع القدرة، تكبيرة الإحرام، قراءة الفاتحة، الركوع، السجود، والتشهد الأخير. تركها كفر عند طائفة من العلماء.',
    'الفاعل': 'الفاعل اسم مرفوع يأتي بعد فعل تام مبني للمعلوم، يدل على من فعل الفعل. علامته الرفع: الضمة الظاهرة أو المقدرة. مثل: "حضر الطالبُ" — الطالب: فاعل مرفوع وعلامة رفعه الضمة.',
  };
  const fallback = (q) => 'سؤال طيب. الإجابة المختصرة: ' + q + ' من المسائل التي اختلف فيها العلماء، والمختار عند الجمهور أن... [للتفصيل، راجع: شرح ابن عثيمين / فتاوى ابن باز]. هل تريد المزيد من التفصيل أو دليلاً من الكتاب والسنة؟';
  const reply = (q) => {
    for (const k of Object.keys(SAMPLES)) if (q.includes(k)) return SAMPLES[k];
    return fallback(q);
  };

  const [messages, setMessages] = React.useState([
    { role:'sheikh', text:'السلام عليكم ورحمة الله. أنا الشيخ الذكي — مساعدك في العلوم الشرعية واللغة العربية. اسألني عن أي مسألة وسأجيبك مع ذكر الدليل ما أمكن.' },
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior:'smooth' });
  }, [messages, typing]);

  const send = (custom) => {
    const text = (custom ?? input).trim();
    if (!text) return;
    setMessages(m => [...m, { role:'me', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role:'sheikh', text: reply(text) }]);
      setTyping(false);
    }, 900 + Math.random()*900);
  };

  const suggestions = ['ما حكم الوضوء؟','ما هو التوحيد؟','ما هي أركان الصلاة؟','ما هو الفاعل في النحو؟'];

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:`1px solid ${border}`}}>
          <window.Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</window.Press>
          <div style={{position:'relative'}}>
            <div style={{width:42, height:42, borderRadius:99, background:'linear-gradient(135deg, #AE1F24, #6B1115)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, color:'#fff'}}>🕌</div>
            <span className="pulse-dot" style={{position:'absolute', bottom:0, right:0, width:11, height:11, borderRadius:99, background:'#2E7D5B', border:`2px solid ${pageBg}`}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14, fontWeight:800, color:fg}}>{t('tutor_title')}</div>
            <div style={{fontSize:10, color:'#2E7D5B', fontWeight:600}}>● متاح الآن</div>
          </div>
        </div>

        <div ref={scrollRef} style={{flex:1, padding:'16px 16px 4px', overflow:'auto', display:'flex', flexDirection:'column', gap:10}}>
          {messages.map((m, i) => (
            <div key={i} className="stagger-item" style={{
              alignSelf: m.role === 'me' ? (i18n.dir==='rtl'?'flex-start':'flex-end') : (i18n.dir==='rtl'?'flex-end':'flex-start'),
              maxWidth:'82%', padding:'11px 14px', borderRadius:18,
              background: m.role === 'me' ? '#AE1F24' : cardBg,
              color: m.role === 'me' ? '#fff' : fg,
              border: m.role === 'sheikh' ? `1px solid ${border}` : 'none',
              fontSize:13, lineHeight:1.7, animationDelay: '0.05s',
              borderBottomRightRadius: m.role === 'me' && i18n.dir==='rtl' ? 6 : 18,
              borderBottomLeftRadius: m.role === 'me' && i18n.dir!=='rtl' ? 6 : 18,
              borderTopRightRadius: m.role === 'sheikh' && i18n.dir==='rtl' ? 6 : 18,
              borderTopLeftRadius: m.role === 'sheikh' && i18n.dir!=='rtl' ? 6 : 18,
            }}>{m.text}</div>
          ))}
          {typing && (
            <div style={{alignSelf: i18n.dir==='rtl'?'flex-end':'flex-start', padding:'11px 14px', background:cardBg, border:`1px solid ${border}`, borderRadius:18, display:'flex', gap:5, alignItems:'center'}}>
              {[0,1,2].map(i => <div key={i} className="dot-wave" style={{width:6, height:6, borderRadius:6, background:fg2, animationDelay:(i*0.15)+'s'}}/>)}
              <span style={{fontSize:11, color:fg2, marginInlineStart:6}}>{t('tutor_typing')}</span>
            </div>
          )}
        </div>

        {messages.length === 1 && !typing && (
          <div style={{padding:'10px 16px', display:'flex', gap:6, overflowX:'auto'}}>
            {suggestions.map(s => (
              <window.Press key={s} onClick={() => send(s)} style={{flex:'0 0 auto', padding:'8px 14px', background:cardBg, border:`1px solid ${border}`, borderRadius:99, fontSize:11.5, color:fg, fontWeight:600}}>{s}</window.Press>
            ))}
          </div>
        )}

        <div style={{padding:'10px 12px', borderTop:`1px solid ${border}`, display:'flex', gap:8, alignItems:'center', background:pageBg}}>
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e) => e.key==='Enter' && send()}
            placeholder={t('tutor_placeholder')}
            style={{flex:1, padding:'12px 14px', background:cardBg, border:`1px solid ${border}`, borderRadius:99, fontFamily:'var(--font-arabic)', fontSize:13, color:fg, outline:'none', direction: i18n.dir}}
          />
          <button onClick={() => send()} style={{
            width:42, height:42, borderRadius:99, background:'#AE1F24', color:'#fff', border:'none', cursor:'pointer',
            fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center',
          }}>↑</button>
        </div>
        <div style={{padding:'2px 14px 6px', fontSize:9, color:fg2, textAlign:'center'}}>⚠ {t('tutor_disclaimer')}</div>
      </div>
    </Phone>
  );
}

// ─────────────── Daily Wird
function Wird({ dark }) {
  const nav = window.useNav();
  const game = window.useGame();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';

  const today = new Date().toISOString().slice(0,10);
  const items = (game.wirdToday.date === today ? game.wirdToday.items : {});
  const tasks = [
    { key:'fajr', label:'أذكار الصباح', detail:'٧ مرات: قل هو الله أحد', icon:'🌅', xp:5 },
    { key:'quran', label:'قراءة جزء من القرآن', detail:'وِرد اليوم: سورة الكهف', icon:'📖', xp:15, action:'tajweed' },
    { key:'hadith', label:'حديث اليوم', detail:'الأربعون النووية — الحديث الأول', icon:'📚', xp:5 },
    { key:'duaa', label:'دعاء الحاجات', detail:'دعاء طلب العلم وتثبيته', icon:'🤲', xp:3 },
    { key:'maghrib', label:'أذكار المساء', detail:'بعد صلاة العصر', icon:'🌆', xp:5 },
  ];
  const completed = tasks.filter(x => items[x.key]).length;
  const pct = completed / tasks.length;

  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', overflow:'auto'}}>
        <div style={{padding:'14px 16px 8px', display:'flex', alignItems:'center', gap:10}}>
          <window.Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</window.Press>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em'}}>DAILY · ورد اليوم</div>
            <h1 style={{margin:'2px 0 0', fontSize:18, fontWeight:800, color:fg, letterSpacing:'-0.01em'}}>{t('wird_title')}</h1>
          </div>
        </div>

        {/* Progress hero */}
        <div style={{padding:'10px 20px 18px'}}>
          <div style={{padding:'18px 20px', borderRadius:20, background:'linear-gradient(135deg, #2E7D5B 0%, #1f5f43 100%)', color:'#fff', display:'flex', alignItems:'center', gap:18, position:'relative', overflow:'hidden', boxShadow:'0 14px 30px rgba(46,125,91,0.3)'}}>
            <window.PatternBg color="#fff" opacity={0.08} scale={120}/>
            {window.AnimatedRing && (
              <window.AnimatedRing progress={pct} size={72} stroke={5} color="#fff" track="rgba(255,255,255,0.25)">
                <div style={{fontSize:18, fontWeight:800, fontFamily:'var(--font-latin)'}}>{completed}/{tasks.length}</div>
              </window.AnimatedRing>
            )}
            <div style={{flex:1, position:'relative'}}>
              <div style={{fontSize:11, opacity:0.85, fontWeight:600, letterSpacing:'0.04em'}}>اليوم · {new Date().toLocaleDateString('ar-SA')}</div>
              <div style={{fontSize:18, fontWeight:800, marginTop:4, letterSpacing:'-0.01em'}}>{pct>=1 ? t('wird_done_today') : `بقي ${tasks.length - completed} مهام`}</div>
              <div style={{fontSize:11, opacity:0.85, marginTop:4}}>+{tasks.reduce((s,x)=>items[x.key]?s+x.xp:s, 0)} XP اليوم</div>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div style={{padding:'0 20px 30px', display:'flex', flexDirection:'column', gap:10}}>
          {tasks.map((task, i) => {
            const done = !!items[task.key];
            return (
              <window.Press
                key={task.key}
                onClick={() => {
                  if (task.action === 'tajweed') nav.push('tajweed');
                  else {
                    game.tickWird(task.key);
                    if (!done) { game.addXp(task.xp, task.label); }
                  }
                }}
                className="stagger-item"
                style={{
                  display:'flex', alignItems:'center', gap:14, padding:14,
                  background: done ? 'rgba(46,125,91,0.08)' : cardBg,
                  border:`1px solid ${done ? 'rgba(46,125,91,0.3)' : border}`,
                  borderRadius:16, animationDelay:(i*0.05)+'s',
                }}>
                <div style={{
                  width:42, height:42, borderRadius:12, flexShrink:0,
                  background: done ? '#2E7D5B' : (dark?'#202024':'#f5f5f7'),
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, color:'#fff',
                  transition:'all 280ms ease',
                }}>
                  {done ? Icon.check('#fff', 22) : <span style={{filter: dark?'none':'none'}}>{task.icon}</span>}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:700, color:fg, textDecoration: done?'line-through':'none', textDecorationColor:'rgba(46,125,91,0.5)', textDecorationThickness:'2px'}}>{task.label}</div>
                  <div style={{fontSize:11, color:fg2, marginTop:3, lineHeight:1.5}}>{task.detail}</div>
                </div>
                <div style={{padding:'4px 9px', borderRadius:99, background: done?'#2E7D5B':'rgba(174,31,36,0.1)', color: done?'#fff':'#AE1F24', fontSize:10, fontWeight:800, fontFamily:'var(--font-latin)'}}>+{task.xp}</div>
              </window.Press>
            );
          })}
        </div>
      </div>
    </Phone>
  );
}

// ─────────────── Tajweed Reading (color-coded Quran)
function Tajweed({ dark }) {
  const nav = window.useNav();
  const i18n = window.useT();
  const t = i18n.t;
  const fg = dark ? '#fff' : '#0A0A0C';
  const fg2 = dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,12,0.55)';
  const pageBg = dark ? '#0A0A0C' : '#FAFAFA';
  const cardBg = dark ? '#161618' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)';
  const [playing, setPlaying] = React.useState(false);
  const [currentWord, setCurrentWord] = React.useState(0);

  // Tajweed colors (simplified):
  // غنة: #4caf50  مد: #1a8fd9  قلقلة: #FFD700  إخفاء: #9c27b0  إدغام: #E84A50  ترقيق/تفخيم: عادي
  const verses = [
    {
      n: 1,
      tokens: [
        { t:'بِسْمِ', c:null }, { t:'ٱللَّـهِ', c:'#1a8fd9' }, { t:'ٱلرَّحْمَـٰنِ', c:'#E84A50' }, { t:'ٱلرَّحِيمِ', c:'#1a8fd9' },
      ],
    },
    {
      n: 2,
      tokens: [
        { t:'ٱلْحَمْدُ', c:'#FFD700' }, { t:'لِلَّـهِ', c:null }, { t:'رَبِّ', c:null }, { t:'ٱلْعَـٰلَمِينَ', c:'#1a8fd9' },
      ],
    },
    {
      n: 3,
      tokens: [{ t:'ٱلرَّحْمَـٰنِ', c:'#E84A50' }, { t:'ٱلرَّحِيمِ', c:'#1a8fd9' }],
    },
    {
      n: 4,
      tokens: [{ t:'مَـٰلِكِ', c:'#1a8fd9' }, { t:'يَوْمِ', c:null }, { t:'ٱلدِّينِ', c:'#E84A50' }],
    },
    {
      n: 5,
      tokens: [{ t:'إِيَّاكَ', c:'#1a8fd9' }, { t:'نَعْبُدُ', c:'#FFD700' }, { t:'وَإِيَّاكَ', c:'#1a8fd9' }, { t:'نَسْتَعِينُ', c:null }],
    },
  ];
  const allWords = verses.flatMap(v => v.tokens);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrentWord(w => {
        if (w >= allWords.length - 1) { setPlaying(false); return 0; }
        return w + 1;
      });
    }, 700);
    return () => clearInterval(id);
  }, [playing]);

  const legend = [
    { c:'#4caf50', l:'غنة' },
    { c:'#1a8fd9', l:'مدّ' },
    { c:'#FFD700', l:'قلقلة' },
    { c:'#9c27b0', l:'إخفاء' },
    { c:'#E84A50', l:'إدغام/تفخيم' },
  ];

  let counter = 0;
  return (
    <Phone dark={dark} bg={pageBg}>
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'14px 16px 8px', display:'flex', alignItems:'center', gap:10}}>
          <window.Press onClick={() => nav.canPop ? nav.pop() : nav.setTab('home')} style={{width:38, height:38, borderRadius:99, background:cardBg, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icon.chevronL(fg, 16)}</window.Press>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:fg2, fontWeight:700, letterSpacing:'0.06em'}}>سورة الفاتحة</div>
            <h1 style={{margin:'2px 0 0', fontSize:16, fontWeight:800, color:fg}}>{t('tajweed_title')}</h1>
          </div>
        </div>

        <div style={{flex:1, padding:'16px 18px 0', overflow:'auto'}}>
          {/* Legend */}
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:18}}>
            {legend.map(g => (
              <div key={g.l} style={{display:'flex', alignItems:'center', gap:5, padding:'5px 10px', background:cardBg, border:`1px solid ${border}`, borderRadius:99, fontSize:10, fontWeight:600, color:fg}}>
                <span style={{width:8, height:8, borderRadius:8, background:g.c}}/>
                {g.l}
              </div>
            ))}
          </div>

          {/* Quran display */}
          <div style={{
            padding:'24px 20px', background:cardBg, border:`1px solid ${border}`, borderRadius:18,
            fontFamily:'"Amiri Quran","Amiri","Scheherazade New",var(--font-arabic), serif',
            fontSize:24, lineHeight:2.3, textAlign:'center', direction:'rtl',
          }}>
            {verses.map(v => (
              <span key={v.n}>
                {v.tokens.map((tok, ti) => {
                  const idx = counter++;
                  const isCur = playing && idx === currentWord;
                  return (
                    <span key={ti} style={{
                      color: tok.c || fg,
                      background: isCur ? 'rgba(174,31,36,0.15)' : 'transparent',
                      padding: isCur ? '2px 4px' : '0',
                      borderRadius: 6,
                      transition: 'all 200ms ease',
                      margin: '0 4px',
                    }}>{tok.t}</span>
                  );
                })}
                <span style={{color:'#AE1F24', fontSize:18, margin:'0 6px'}}>﴿{v.n}﴾</span>
              </span>
            ))}
          </div>
        </div>

        <div style={{padding:'14px 16px 24px', display:'flex', gap:10, alignItems:'center'}}>
          <window.Press as="button" style={{padding:'14px 18px', background:cardBg, color:fg, border:`1px solid ${border}`, borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', gap:8}}>
            🎙 {t('tajweed_record')}
          </window.Press>
          <window.Press as="button" onClick={() => { setCurrentWord(0); setPlaying(p => !p); }} style={{flex:1, padding:'14px', background:'#AE1F24', color:'#fff', border:'none', borderRadius:14, fontFamily:'var(--font-arabic)', fontSize:13, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
            {playing ? '⏸ إيقاف' : `▶ ${t('tajweed_listen')}`}
          </window.Press>
        </div>
      </div>
    </Phone>
  );
}

window.SCREENS_PATH = {
  pathQuiz: PathQuiz,
  skillTree: SkillTree,
  lessonNode: LessonNode,
  leaderboard: Leaderboard,
  duel: Duel,
  tutor: AITutor,
  wird: Wird,
  tajweed: Tajweed,
};
