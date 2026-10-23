import {AbsoluteFill, Sequence, Img, interpolate, Easing, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video, Audio} from '@remotion/media';
import {loadFont} from '@remotion/fonts';
import {ArrowUpRight, Target, Footprints, Brain, Layers, Focus, ArrowRight, Check} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import edit from './edit.json';
import {Scene3D, type ObjectKind} from './Scene3D';

await Promise.all([
 loadFont({family:'V2Body',url:staticFile('fonts/DejaVuSans.ttf'),weight:'400'}),
 loadFont({family:'V2Display',url:staticFile('fonts/DejaVuSansCondensed-Bold.ttf'),weight:'700'}),
]);
export const V2={ground:'#0B0E14',surface:'#252C38',ink:'#F4F5F0',muted:'#A4ACBC',accent:'#B5CDFF',silver:'#DCE2EC',dark:'#253146',coral:'#F29B8F'};
export const TOTAL_V2=edit.totalFrames;
type Shot=typeof edit.shots[number];
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const font:CSSProperties={fontFamily:'V2Display',fontWeight:700,letterSpacing:'-.02em',lineHeight:1.05};
const panel:CSSProperties={background:V2.surface,border:`1px solid ${V2.muted}66`,borderRadius:40,boxShadow:`0 32px 48px ${V2.ground}99`};
const ease=Easing.bezier(.16,1,.3,1);
const objectFor=(id:string):ObjectKind=>id==='dynamis'?'form':id==='direction'?'goal':id==='close'?'release':'energy';
export const hasCutaway=(id:string)=>['energy','dynamis','direction','close'].includes(id);

function Enter({children,delay=0,style={}}:{children:ReactNode;delay?:number;style?:CSSProperties}) {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const p=interpolate(f,[delay,delay+.4*fps],[0,1],{...clamp,easing:ease});
 return <div style={{...style,opacity:p,transform:`translateY(${48*(1-p)}px)`,filter:`blur(${(1-p)*5}px)`}}>{children}</div>;
}
function BigTitle({lines,color=V2.ink}:{lines:ReactNode;color?:string}) {
 return <div style={{...font,fontSize:104,color}}>{lines}</div>;
}

function Bento({index}:{index:number}){
 const f=useCurrentFrame();
 const icons=[Target,Footprints,Brain,Layers,Focus];const Icon=icons[index-1];
 const titles=[<>ПРЕДНАЗНАЧЕНИЕ<br/>И ЦЕЛЬ</>,<>НЕБОЛЬШИЕ<br/>ДЕЙСТВИЯ</>,<>ПЕРЕСТАНЬ<br/>АНАЛИЗИРОВАТЬ</>,<>СНИЗЬ<br/>ОЖИДАНИЯ</>,<>СТОЛКНОВЕНИЕ<br/>С РЕАЛЬНОСТЬЮ</>];
 const p=interpolate(f,[3,15],[0,1],{...clamp,easing:ease});
 return <>
  <Enter><div style={{display:'flex',alignItems:'center',gap:24}}>
   <div style={{...font,fontSize:108,color:V2.accent,lineHeight:1}}>{String(index).padStart(2,'0')}</div>
   <div style={{...font,fontSize:index===5?58:66}}>{titles[index-1]}</div>
  </div></Enter>
  <div style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:18,marginTop:32,height:164}}>
   <Enter delay={3}><div style={{...panel,height:164,display:'grid',placeItems:'center',transform:`perspective(1000px) rotateY(${(1-p)*-22}deg)`}}><Icon color={V2.accent} size={76} strokeWidth={1.4}/></div></Enter>
   <Enter delay={6}><div style={{...panel,height:164,position:'relative',overflow:'hidden'}}>
    {index===1&&<svg width="600" height="164" viewBox="0 0 600 164"><path d="M44 116 C160 116 150 46 278 46 L510 46" stroke={V2.muted} strokeWidth="3" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/><circle cx={44+466*p} cy={116-70*p} r="12" fill={V2.accent}/><circle cx="510" cy="46" r="22" stroke={V2.accent} strokeWidth="2" fill="none"/></svg>}
    {index===2&&<div style={{display:'flex',gap:14,alignItems:'end',height:'100%',padding:'30px 40px'}}>{[0,1,2,3,4,5].map(i=><div key={i} style={{height:26+i*13,width:62,borderRadius:12,background:i<=Math.floor(f/15)?V2.accent:V2.muted,opacity:i<=Math.floor(f/15)?1:.22,transform:`translateY(${(1-interpolate(f,[i*3,i*3+12],[0,1],{...clamp,easing:ease}))*100}px)`}}/>)}</div>}
    {index===3&&<div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:30}}><Brain size={64} strokeWidth={1.4} color={V2.muted} style={{opacity:1-p*.6}}/><ArrowRight size={48} color={V2.accent} style={{transform:`translateX(${(1-p)*-30}px)`}}/><Footprints size={64} strokeWidth={1.4} color={V2.accent}/></div>}
    {index===4&&<div style={{display:'flex',alignItems:'end',justifyContent:'center',gap:30,height:'100%',padding:32}}>{[0,1,2].map(i=><div key={i} style={{width:106,height:interpolate(f,[0,15],[105-i*16,48+i*12],clamp),background:i===1?V2.accent:V2.muted,borderRadius:16,opacity:i===1?1:.5}}/>)}</div>}
    {index===5&&<div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:32}}><div style={{width:80,height:80,borderRadius:32,border:`2px solid ${V2.muted}`,transform:`translateX(${(1-p)*-80}px)`}}/><div style={{width:8,height:100,background:V2.accent,borderRadius:4}}/><Check size={62} color={V2.accent} style={{opacity:p}}/></div>}
   </div></Enter>
  </div>
 </>;
}

function Scene({shot,objects=true}:{shot:Shot;objects?:boolean}) {
 const f=useCurrentFrame(); const full=hasCutaway(shot.id);
 const exit=interpolate(f,[shot.toFrame-shot.fromFrame-9,shot.toFrame-shot.fromFrame],[1,0],clamp);
 return <AbsoluteFill style={{opacity:full?1:exit}}>
  {full&&<svg width="1080" height="1920" style={{position:'absolute'}}>
   <defs><linearGradient id={`stage-${shot.id}`} x2="1" y2="1"><stop stopColor={V2.surface}/><stop offset="1" stopColor={V2.ground}/></linearGradient><mask id={`inset-${shot.id}`}><rect width="1080" height="1920" fill="white"/><rect x="108" y="1050" width="300" height="534" rx="40" fill="black"/></mask></defs>
   <rect width="1080" height="1920" fill={`url(#stage-${shot.id})`} mask={`url(#inset-${shot.id})`}/>
   <rect x="108" y="1050" width="300" height="534" rx="40" fill="none" stroke={V2.muted} strokeWidth="1"/>
  </svg>}
  <div style={{position:'absolute',left:108,right:108,top:216,opacity:full?exit:1}}>
   {shot.id==='hook'&&<>
    <div style={{...font,fontSize:104,opacity:interpolate(f,[0,12],[.7,1],clamp),transform:`translateY(${interpolate(f,[0,12],[24,0],{...clamp,easing:ease})}px)`}}>БОЛЬШОЙ<br/><span style={{color:V2.accent}}>ПОТЕНЦИАЛ.</span></div>
    <Enter delay={48}><div style={{display:'flex',gap:18,alignItems:'center',fontSize:40,marginTop:28,color:V2.muted}}><span>Как реализовать?</span><ArrowUpRight size={40} color={V2.accent}/></div></Enter>
   </>}
   {shot.id==='thinkers'&&<>
    <Enter><div style={{...font,fontSize:64,marginBottom:28}}>ЧТО ПРЕДЛАГАЛИ</div></Enter>
    <div style={{display:'flex',gap:18}}>{['САРТР','АРИСТОТЕЛЬ','НИЦШЕ'].map((x,i)=><Enter key={x} delay={i*3} style={{flex:1}}><div style={{...panel,padding:'32px 12px',height:204,textAlign:'center',transform:`perspective(1000px) rotateY(${interpolate(f,[i*3,i*3+12],[-30,0],{...clamp,easing:ease})}deg)`}}><div style={{...font,fontSize:74,color:V2.accent}}>{x[0]}</div><div style={{fontSize:32,marginTop:22}}>{x}</div></div></Enter>)}</div>
   </>}
   {shot.id==='energy'&&<Enter><BigTitle lines={<>ЭНЕРГИЯ<br/><span style={{color:V2.accent}}>ЕСТЬ.</span></>}/><div style={{fontSize:44,marginTop:28,color:V2.muted}}>Но она статична.</div></Enter>}
   {shot.id==='dynamis'&&<Enter><div style={{fontSize:32,color:V2.muted,marginBottom:28}}>АРИСТОТЕЛЬ</div><BigTitle lines="ДЮНАМИС"/><div style={{fontSize:44,marginTop:32,color:V2.accent}}>Возможность / сила</div></Enter>}
   {shot.id==='pressure'&&<>
    <Enter><BigTitle lines={<>ЭНЕРГИЯ<br/><span style={{color:V2.coral}}>ДАВИТ.</span></>}/></Enter>
    <div style={{display:'flex',gap:16,marginTop:28}}>
     <Enter delay={116}><div style={{...panel,padding:'24px 18px',fontSize:32,color:V2.coral,whiteSpace:'nowrap'}}>ФОНОВЫЙ ШУМ</div></Enter>
     <Enter delay={180}><div style={{...panel,padding:'24px 18px',fontSize:32,color:V2.coral,whiteSpace:'nowrap'}}>НЕУДОВЛЕТВОРЁННОСТЬ</div></Enter>
    </div>
   </>}
   {shot.id==='direction'&&<Enter><BigTitle lines={<>ФОРМА.<br/><span style={{color:V2.accent}}>И ЦЕЛЬ.</span></>}/><div style={{fontSize:40,marginTop:28,color:V2.muted}}>Определи направление.</div></Enter>}
   {shot.id.startsWith('step')&&<Bento index={Number(shot.id.slice(-1))}/>}
   {shot.id==='close'&&<Enter><BigTitle lines={<>РАСКРОЙ<br/>СВОЙ<br/><span style={{color:V2.accent}}>ПОТЕНЦИАЛ.</span></>}/></Enter>}
  </div>
  {full&&objects&&<div style={{position:'absolute',left:348,top:660,width:720,height:720,opacity:exit}}><Scene3D kind={objectFor(shot.id)}/></div>}
 </AbsoluteFill>;
}

export function V2Captions(){
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const group=edit.captions.find(c=>t>=c.start&&t<c.end);
 if(!group)return null;
 const p=interpolate(f,[group.start*fps,group.start*fps+3],[0,1],{...clamp,easing:ease});
 return <div style={{position:'absolute',left:108,right:108,top:1630,display:'flex',justifyContent:'center',transform:`translateY(${12*(1-p)}px)`,opacity:.5+.5*p}}>
  <div style={{padding:'20px 28px',background:`${V2.ground}EB`,borderRadius:32,display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'8px 14px',...font,fontSize:56,lineHeight:1.18,maxWidth:864}}>
   {group.words.map((w,i)=>{
    const active=t>=w.start&&t<w.end;
    return <span key={`${group.start}-${i}`} style={{color:active?V2.accent:V2.ink,transform:active?'translateY(-3px)':'translateY(0)',background:active?`${V2.surface}E6`:'transparent',borderRadius:12,padding:'2px 3px'}}>{w.text}</span>;
   })}
  </div>
 </div>;
}

export function ExpertPotentialV2({overlayOnly=false,objects=true,bgm=true,captions=true}:{overlayOnly?:boolean;objects?:boolean;bgm?:boolean;captions?:boolean}){
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const active=edit.shots.find(s=>f>=s.fromFrame&&f<s.toFrame)??edit.shots[0];
 return <AbsoluteFill style={{background:overlayOnly?'transparent':V2.ground,color:V2.ink,fontFamily:'V2Body'}}>
  {!overlayOnly&&<Video src={staticFile('footage/expert-v2-cut.mp4')} premountFor={fps} objectFit="cover" style={{width:'100%',height:'100%'}}/>}
  {!overlayOnly&&hasCutaway(active.id)&&<Video src={staticFile('footage/expert-v2-cut.mp4')} premountFor={fps} muted objectFit="cover" style={{position:'absolute',left:108,top:1050,width:300,height:534,borderRadius:40}}/>}
  <AbsoluteFill style={{background:`linear-gradient(180deg,${V2.ground}B8 0%,${V2.ground}55 27%,transparent 43%,transparent 62%,${V2.ground}CC 85%,${V2.ground} 100%)`}}/>
  {edit.shots.map(s=><Sequence key={s.id} from={s.fromFrame} durationInFrames={s.toFrame-s.fromFrame} premountFor={fps}><Scene shot={s} objects={objects}/></Sequence>)}
  {captions&&<CaptionPass/>}
  {!overlayOnly&&<Audio src={staticFile('audio/v2/sfx.wav')} premountFor={fps}/>}
  {!overlayOnly&&bgm&&<Audio src={staticFile('audio/v2/score.wav')} premountFor={fps}/>}
 </AbsoluteFill>;
}

/** A separately editable 3D stage for look development and preflight. */
export function ObjectStudy(){return <AbsoluteFill style={{background:V2.ground,display:'flex',alignItems:'center',justifyContent:'center'}}><Scene3D kind="form"/></AbsoluteFill>;}

/** Offline compositor uses the same geometry/timing tables as Studio. */
export const v2Shots=edit.shots;
export const v2Captions=edit.captions;
export const V2SourceStill=({src}:{src:string})=><Img src={staticFile(src)} style={{width:'100%',height:'100%'}}/>;

/** Separate 1080×320 render pass lets text revisions stay independent of 3D. */
export function CaptionPass(){
 return <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,pointerEvents:'none'}}>
  <div style={{position:'absolute',top:1600,left:0,width:1080,height:320,background:`linear-gradient(180deg,transparent 0px,${V2.ground} 30px)`}}/>
  <V2Captions/>
 </div>;
}
export function CaptionStrip(){return <AbsoluteFill style={{overflow:'hidden'}}><div style={{position:'absolute',top:-1600,left:0}}><CaptionPass/></div></AbsoluteFill>;}
