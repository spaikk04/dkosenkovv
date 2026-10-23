import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import {loadFont} from '@remotion/fonts';
import {ArrowDown, ArrowRight, Target, Footprints, Brain, Layers, Focus, Sparkles, Zap, MoveUpRight} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import captions from './captions.json';
import {SHOTS, SFX, TOTAL} from './timeline';
import type {Shot} from './timeline';

await Promise.all([
  loadFont({family: 'Editorial', url: staticFile('fonts/DejaVuSans.ttf'), weight: '400'}),
  loadFont({family: 'Display', url: staticFile('fonts/DejaVuSansCondensed-Bold.ttf'), weight: '700'}),
]);
const C = {ink: '#0b0e14', paper: '#f4f5f0', ice: '#b5cdff', muted: '#a4acbc', coral: '#f29b8f'};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const display: CSSProperties = {fontFamily: 'Display', fontWeight: 700, letterSpacing: -3, lineHeight: 1.05};
const small: CSSProperties = {fontSize: 24, letterSpacing: 5, color: C.muted};
const panel: CSSProperties = {borderRadius: 42, padding: 42, border: '1px solid #c6d4ef35', background: 'linear-gradient(145deg, #343b48ed, #131720f5)', boxShadow: '0 24px 70px #0007, inset 0 2px 1px #ffffff18'};

const Entry = ({children, delay = 0, style = {}}: {children: ReactNode; delay?: number; style?: CSSProperties}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = spring({frame: f-delay, fps, config: {damping: 24, stiffness: 140}});
  return <div style={{...style, opacity: p, transform: `translateY(${(1-p)*52}px)`}}>{children}</div>;
};

const Orbit = () => {
  const f = useCurrentFrame();
  return <svg width="600" height="420" viewBox="0 0 600 420">
    <defs>
      <radialGradient id="orb" cx="32%" cy="25%"><stop stopColor="#f1f7ff"/><stop offset=".32" stopColor="#a8c8ff"/><stop offset=".8" stopColor="#456ca6"/><stop offset="1" stopColor="#20304a"/></radialGradient>
      <radialGradient id="halo"><stop stopColor="#739ce0" stopOpacity=".22"/><stop offset="1" stopColor="#739ce0" stopOpacity="0"/></radialGradient>
    </defs>
    <circle cx="300" cy="210" r="205" fill="url(#halo)"/>
    <ellipse cx="300" cy="210" rx="245" ry="95" fill="none" stroke="#b5cdff55" strokeWidth="2" transform={`rotate(${-18+f*.12} 300 210)`}/>
    <ellipse cx="300" cy="210" rx="180" ry="145" fill="none" stroke="#b5cdff22" strokeWidth="2" transform="rotate(38 300 210)"/>
    <circle cx="300" cy="210" r="108" fill="url(#orb)"/>
    <circle cx={300+245*Math.cos(f/75)} cy={210+95*Math.sin(f/75)} r="8" fill="#edf5ff"/>
  </svg>;
};

export const SceneGraphic = ({shot}: {shot: Shot}) => {
  const f = useCurrentFrame();
  const exit = interpolate(f, [shot.to-shot.from-8, shot.to-shot.from], [1, 0], clamp);
  const content = (() => {
    switch (shot.id) {
      case 'hook': return <>
        <Entry><div style={small}>ВОЗМОЖНОСТЬ ≠ ДЕЙСТВИЕ</div></Entry>
        <Entry delay={4}><div style={{...display, fontSize: 104, marginTop: 30}}>БОЛЬШОЙ<br/><span style={{color: C.ice}}>ПОТЕНЦИАЛ.</span></div></Entry>
        <Entry delay={13}><div style={{marginTop: 26, width: 96, height: 5, background: C.ice, borderRadius: 8}}/></Entry>
      </>;
      case 'thinkers': return <>
        <Entry><div style={{...small, marginBottom: 26}}>ЧТО ПРЕДЛАГАЛИ ФИЛОСОФЫ</div></Entry>
        <div style={{display:'flex', gap:18}}>{['САРТР','АРИСТОТЕЛЬ','НИЦШЕ'].map((n,i)=><Entry key={n} delay={i*9} style={{flex:1}}>
          <div style={{...panel,padding:'36px 16px', textAlign:'center',height:200}}>
            <div style={{...display,fontSize:74,color:C.ice,marginBottom:28}}>{n[0]}</div><div style={{fontFamily:'Display',fontSize:32,letterSpacing:0}}>{n}</div>
          </div>
        </Entry>)}</div>
      </>;
      case 'energy': return <Entry><div style={{display:'flex',alignItems:'center',marginTop:-55}}>
        <div style={{marginLeft:-100}}><Orbit/></div><div style={{marginLeft:-58}}><Zap color={C.ice} size={36}/><div style={{...display,fontSize:50,marginTop:18}}>ЭНЕРГИЯ<br/>ЕСТЬ.</div><div style={{fontSize:25,color:C.muted,marginTop:18}}>Движения — нет.</div></div>
      </div></Entry>;
      case 'dynamis': return <Entry><div style={{...panel,background:'linear-gradient(145deg,#edf0f4,#bac3cf)',color:C.ink,padding:44}}>
        <div style={{fontSize:22,letterSpacing:5,color:'#536071'}}>ПОНЯТИЕ АРИСТОТЕЛЯ</div>
        <div style={{...display,fontSize:99,margin:'25px 0 22px'}}>ДЮНАМИС</div>
        <div style={{height:1,background:'#1a2a4330',marginBottom:24}}/>
        <div style={{fontSize:36}}>Возможность <span style={{color:'#758299'}}> / </span> сила</div>
      </div></Entry>;
      case 'pressure': return <>
        <Entry><div style={small}>КОГДА НЕТ НАПРАВЛЕНИЯ</div><div style={{...display,fontSize:74,marginTop:28}}>ЭНЕРГИЯ<br/>НАЧИНАЕТ <span style={{color:C.coral}}>ДАВИТЬ.</span></div></Entry>
        <Entry delay={52}><div style={{display:'flex',gap:16,marginTop:28}}>{['ФОНОВЫЙ ШУМ','НЕУДОВЛЕТВОРЁННОСТЬ'].map((x)=><div key={x} style={{fontSize:22,padding:'20px 22px',border:'1px solid #f29b8f55',borderRadius:20,background:'#291b20',color:'#efbab2'}}>{x}</div>)}</div></Entry>
      </>;
      case 'direction': return <>
        <Entry><div style={{...small,color:'#535e70'}}>ПОТЕНЦИАЛУ НУЖНЫ</div><div style={{...display,fontSize:116,marginTop:44,color:C.ink}}>ФОРМА.<br/><span style={{color:'#416a9d'}}>И ЦЕЛЬ.</span></div></Entry>
        <Entry delay={10}><div style={{display:'flex',alignItems:'center',gap:22,marginTop:70}}>
          <div style={{...panel,width:260,height:220,display:'flex',alignItems:'center',justifyContent:'center'}}><Layers size={100} strokeWidth={1.3} color={C.ice}/></div>
          <ArrowRight size={52} color="#62718b"/>
          <div style={{...panel,width:260,height:220,display:'flex',alignItems:'center',justifyContent:'center'}}><Target size={110} strokeWidth={1.3} color={C.ice}/></div>
        </div></Entry>
        <Entry delay={22}><div style={{color:'#4e5b70',fontSize:32,marginTop:44}}>Дайте энергии направление.</div></Entry>
      </>;
      case 'close': return <>
        <Entry><div style={{...small,display:'flex',gap:14,alignItems:'center'}}><Sparkles size={28} color={C.ice}/> ОТ ВОЗМОЖНОСТИ — К ДЕЙСТВИЮ</div>
        <div style={{...display,fontSize:92,marginTop:30}}>РАСКРОЙ<br/><span style={{color:C.ice}}>СВОЙ ПОТЕНЦИАЛ.</span></div></Entry>
        <Entry delay={12}><div style={{display:'flex',gap:14,marginTop:32}}>{[1,2,3,4,5].map(n=><div key={n} style={{height:48,width:48,borderRadius:24,background:C.ice,color:C.ink,fontSize:22,display:'grid',placeItems:'center'}}>{n}</div>)}</div></Entry>
      </>;
      default: {
        const index = Number(shot.id.slice(-1));
        const Icon = [Target,Footprints,Brain,Layers,Focus][index-1];
        const titles = ['ПРЕДНАЗНАЧЕНИЕ\nИ ЦЕЛЬ','МАЛЕНЬКИЕ\nДЕЙСТВИЯ','МЕНЬШЕ\nАНАЛИЗА','СНИЗЬ\nОЖИДАНИЯ','ВСТРЕТЬСЯ\nС РЕАЛЬНОСТЬЮ'];
        const subs = ['Определи направление.','Регулярность важнее масштаба.','Перейди от мыслей к опыту.','Освободи место для опыта.','Действуй в настоящем.'];
        return <Entry><div style={panel}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:25}}><div style={{...small,fontSize:23}}>ШАГ <span style={{color:C.ice}}>0{index}</span> / 05</div><Icon size={48} strokeWidth={1.5} color={C.ice}/></div>
          <div style={{...display,fontSize:index===5?65:78,whiteSpace:'pre-line'}}>{titles[index-1]}</div>
          <div style={{fontSize:32,color:C.muted,marginTop:24}}>{subs[index-1]}</div>
          <div style={{display:'flex',gap:9,marginTop:28}}>{[1,2,3,4,5].map(n=><div key={n} style={{height:4,flex:1,borderRadius:4,background:n<=index?C.ice:'#596172'}}/>)}</div>
        </div></Entry>;
      }
    }
  })();
  return <AbsoluteFill style={{opacity:exit,padding:shot.id.startsWith('step')?'160px 72px 0':'205px 72px 0'}}>{content}</AbsoluteFill>;
};

export const WordCaptions = () => {
  const frame = useCurrentFrame(); const t=frame/30; const light=frame>=954&&frame<1137;
  const group=captions.captions.find(c=>t>=c.start&&t<c.end);
  if(!group)return null;
  return <div style={{position:'absolute',left:80,right:80,bottom:205,textAlign:'center',fontFamily:'Display',fontWeight:700,fontSize:57,lineHeight:1.25,letterSpacing:-1,textShadow:light?'none':'0 4px 16px #000, 0 1px 3px #000',display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'0 15px'}}>
    {group.words.map((w,i)=><span key={i} style={{color:t>=w.start&&t<w.end?(light?'#416a9d':C.ice):(light?'#253146':C.paper)}}>{w.text}</span>)}
  </div>;
};

export const ExpertFilm = ({overlayOnly=false}: {overlayOnly?: boolean}) => {
  const f=useCurrentFrame(); const active=SHOTS.find(s=>f>=s.from&&f<s.to)??SHOTS[0];
  const inset=active.id==='direction';
  const zoom=interpolate(f-active.from,[0,active.to-active.from],[1,1.025],clamp);
  const fade=interpolate(f,[0,5,TOTAL-10,TOTAL],[0,1,1,0],clamp);
  return <AbsoluteFill style={{background:overlayOnly?'transparent':C.ink,color:C.paper,fontFamily:'Editorial',opacity:fade}}>
    {overlayOnly ? (inset && <svg width={1080} height={1920} style={{position:'absolute',inset:0}}>
      <defs><linearGradient id="silver" x2="1" y2="1"><stop stopColor="#f3f4f1"/><stop offset="1" stopColor="#b8c3d1"/></linearGradient>
      <mask id="presenter-window"><rect width="1080" height="1920" fill="white"/><rect x="686" y="1030" width="320" height="570" rx="38" fill="black"/></mask></defs>
      <rect width="1080" height="1920" fill="url(#silver)" mask="url(#presenter-window)"/>
      <rect x="686" y="1030" width="320" height="570" rx="38" fill="none" stroke="#ffffff88" strokeWidth="2"/>
    </svg>) : <AbsoluteFill style={{background:inset?'linear-gradient(135deg,#f3f4f1,#b8c3d1)':C.ink}}/>}
    {!overlayOnly && <div style={inset?{position:'absolute',right:74,top:1030,width:320,height:570,borderRadius:38,overflow:'hidden',boxShadow:'0 20px 80px #0b162c44',border:'2px solid #fff8'}:{position:'absolute',inset:0,overflow:'hidden'}}>
      <Video src={staticFile('footage/expert-cut-sdr.mp4')} objectFit="cover" style={{height:'100%',width:'100%',transform:`scale(${zoom})`,filter:'saturate(0.85)'}} volume={0.9}/>
    </div>}
    {!inset&&<AbsoluteFill style={{background:'linear-gradient(180deg,#0b0e1480 0%,#0b0e1420 29%,transparent 43%,transparent 59%,#0b0e1499 75%,#0b0e14 95%)'}}/>}
    <div style={{position:'absolute',left:72,right:72,top:87,display:'flex',justifyContent:'space-between',alignItems:'center',color:inset?'#42516a':C.muted,fontSize:20,letterSpacing:4}}>
      <span>ФИЛОСОФИЯ / В ДЕЙСТВИИ</span><MoveUpRight size={28} strokeWidth={1.4}/>
    </div>
    {SHOTS.map(s=><Sequence key={s.id} from={s.from} durationInFrames={s.to-s.from}><SceneGraphic shot={s}/></Sequence>)}
    <WordCaptions/>
    <div style={{position:'absolute',left:72,right:72,bottom:120,display:'flex',gap:16,alignItems:'center'}}>
      <div style={{height:2,background:inset?'#51617933':'#ffffff25',flex:1}}><div style={{width:`${f/TOTAL*100}%`,height:2,background:inset?'#416a9d':C.ice}}/></div>
      <ArrowDown size={18} color={inset?'#416a9d':C.muted}/>
    </div>
    {!overlayOnly && SFX.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}><Audio src={staticFile(s.src)} volume={s.volume}/></Sequence>)}
  </AbsoluteFill>;
};
