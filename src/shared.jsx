// Shared icons + helpers used across all variants

const Icon = {
  search: (c='currentColor', s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
  ),
  bell: (c='currentColor', s=20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 003.4 0"/></svg>
  ),
  home: (c='currentColor', s=22, fill='none') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V9.5z"/></svg>
  ),
  compass: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6 6-2z"/></svg>
  ),
  bookmark: (c='currentColor', s=22, fill='none') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
  ),
  user: (c='currentColor', s=22, fill='none') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  play: (c='currentColor', s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M6 4l14 8-14 8V4z"/></svg>
  ),
  clock: (c='currentColor', s=14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  ),
  users: (c='currentColor', s=14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  ),
  star: (c='currentColor', s=14, fill='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2l3.1 6.3 7 1L17 14.3l1.2 7-6.2-3.3L5.8 21.3 7 14.3 2 9.3l7-1L12 2z"/></svg>
  ),
  check: (c='currentColor', s=16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
  ),
  lock: (c='currentColor', s=14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
  ),
  back: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6"/><path d="M3 12h18"/></svg>
  ),
  chevronL: (c='currentColor', s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  ),
  shield: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  book: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/><path d="M4 19.5A2.5 2.5 0 016.5 22H20v-5"/></svg>
  ),
  quran: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M8 8h8M8 12h8"/></svg>
  ),
  quote: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3-1 4-3 4-7H3V7h7v7c0 4-2 6-7 7zM14 21c3-1 4-3 4-7h-4V7h7v7c0 4-2 6-7 7z"/></svg>
  ),
  mosque: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M9 6c0-2 1.5-3 3-3s3 1 3 3"/><path d="M4 21V11c0-3 4-5 8-5s8 2 8 5v10"/><path d="M10 21v-5a2 2 0 014 0v5"/></svg>
  ),
  briefcase: (c='currentColor', s=22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>
  ),
  download: (c='currentColor', s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
  ),
  pin: (c='currentColor', s=14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  cert: (c='currentColor', s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>
  ),
  signal: (c='currentColor', s=14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="12" cy="12" r="4"/></svg>
  ),
};

// iOS status bar in dark/light
function StatusBar({ dark = false, time = '٩:٤١' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div dir="ltr" style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'14px 28px 8px', position:'relative', zIndex:50,
    }}>
      <div style={{fontFamily:'-apple-system, system-ui', fontWeight:600, fontSize:15, color:c, direction:'rtl'}}>{time}</div>
      <div style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6.5" width="2.6" height="4" rx="0.6" fill={c}/><rect x="3.7" y="4.5" width="2.6" height="6" rx="0.6" fill={c}/><rect x="7.4" y="2.5" width="2.6" height="8" rx="0.6" fill={c}/><rect x="11.1" y="0" width="2.6" height="10.5" rx="0.6" fill={c}/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10"><path d="M7 2.5C8.9 2.5 10.6 3.2 11.8 4.4L12.7 3.5C11.2 2 9.2 1.2 7 1.2S2.8 2 1.3 3.5L2.2 4.4C3.4 3.2 5.1 2.5 7 2.5z" fill={c}/><circle cx="7" cy="8" r="1.2" fill={c}/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/></svg>
      </div>
    </div>
  );
}

// Home indicator bar
function HomeBar({ dark = false }) {
  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, height:34,
      display:'flex', justifyContent:'center', alignItems:'flex-end',
      paddingBottom:8, pointerEvents:'none', zIndex:60,
    }}>
      <div style={{width:134, height:5, borderRadius:99, background: dark?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.35)'}}/>
    </div>
  );
}

// Phone shell — full-screen container; relies on real device chrome
function Phone({ children, dark = false, bg }) {
  return (
    <div style={{
      width:'100%', height:'100%',
      position:'relative', overflow:'hidden',
      background: bg || (dark ? '#0E0E10' : '#fff'),
      fontFamily: 'var(--font-arabic)', color: dark ? '#fff' : '#1a1a1a',
      direction:'rtl',
      paddingTop: 'env(safe-area-inset-top)',
    }}>
      {children}
    </div>
  );
}

// Decorative SVG illustration placeholders (in lieu of real photos) — geometric tile motifs
function PatternBg({ color='#0B5FB0', opacity=0.07, scale=180 }) {
  return (
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none',
      backgroundImage:`url('assets/patterns/insan-tile.svg')`,
      backgroundSize: scale+'px', opacity, mixBlendMode:'multiply',
    }}/>
  );
}

// Decorative course thumbnail — generative geometric
function CourseThumb({ seed=1, color='#0B5FB0', dark=false, h=120 }) {
  const variants = [
    // arched mihrab silhouette
    <svg key="a" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <g opacity="0.18" fill="#fff">
        <path d="M100 20a40 40 0 00-40 40v60h80V60a40 40 0 00-40-40z"/>
        <circle cx="100" cy="60" r="20"/>
      </g>
      <g stroke="#fff" strokeWidth="1" opacity="0.25" fill="none">
        <path d="M0 100h200M0 80h200M0 60h200"/>
      </g>
    </svg>,
    // star polygon
    <svg key="b" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <g transform="translate(100 60)" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.4">
        {Array.from({length:8}).map((_,i)=>(
          <polygon key={i} transform={`rotate(${i*22.5})`} points="0,-44 12,-12 44,0 12,12 0,44 -12,12 -44,0 -12,-12"/>
        ))}
      </g>
    </svg>,
    // crescent + lattice
    <svg key="c" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <g opacity="0.22" stroke="#fff" strokeWidth="1" fill="none">
        {Array.from({length:6}).map((_,i)=>(
          <path key={i} d={`M${20+i*30} 10 Q${35+i*30} 60 ${20+i*30} 110`}/>
        ))}
      </g>
      <g opacity="0.5" fill="#fff">
        <path d="M150 30a25 25 0 1010 39 20 20 0 110-39 25 25 0 00-10 0z"/>
      </g>
    </svg>,
    // calligraphy stroke
    <svg key="d" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <path d="M20 80 Q60 30 110 60 Q160 90 190 50" stroke="#fff" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round"/>
      <path d="M20 95 Q60 50 110 75 Q160 100 190 65" stroke="#fff" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round"/>
      <circle cx="40" cy="40" r="4" fill="#fff" opacity="0.7"/>
      <circle cx="170" cy="35" r="3" fill="#fff" opacity="0.5"/>
    </svg>,
    // grid of dots (sanabel)
    <svg key="e" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <g fill="#fff" opacity="0.4">
        {Array.from({length:7}).map((_,r)=>(
          Array.from({length:12}).map((_,c)=>(
            <circle key={`${r}-${c}`} cx={10+c*17} cy={12+r*16} r={1.5+Math.sin(r+c)*0.6}/>
          ))
        ))}
      </g>
    </svg>,
    // dome
    <svg key="f" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{width:'100%', height:'100%'}}>
      <rect width="200" height="120" fill={color}/>
      <g fill="#fff" opacity="0.2">
        <path d="M100 30c-25 0-40 20-40 40v50h80V70c0-20-15-40-40-40z"/>
        <rect x="40" y="100" width="120" height="20"/>
      </g>
      <path d="M100 20l3 8h-6z" fill="#fff" opacity="0.45"/>
    </svg>,
  ];
  return <div style={{width:'100%', height:h, overflow:'hidden', borderRadius: 'inherit', background: color}}>{variants[seed % variants.length]}</div>;
}

// Avatar placeholder for instructors — gradient circle with initials
function Avatar({ name='', size=44, color='#0B5FB0', dark=false }) {
  const initial = (name || '').replace(/[^أ-يa-zA-Z]/g,'').slice(0,2);
  return (
    <div style={{
      width:size, height:size, borderRadius:size,
      background: `linear-gradient(135deg, ${color} 0%, ${color}b3 100%)`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', fontWeight:700, fontSize: size*0.36, flexShrink:0,
    }}>{initial}</div>
  );
}

// Photo image with optional overlay & blend
function CoursePhoto({ src, h='100%', tint, overlay, children, style }) {
  return (
    <div style={{position:'relative', width:'100%', height: h, overflow:'hidden', ...style}}>
      <img src={src} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
      {tint && <div style={{position:'absolute', inset:0, background: tint, mixBlendMode:'multiply'}}/>}
      {overlay && <div style={{position:'absolute', inset:0, background: overlay}}/>}
      {children}
    </div>
  );
}

Object.assign(window, { Icon, StatusBar, HomeBar, Phone, PatternBg, CourseThumb, CoursePhoto, Avatar });
