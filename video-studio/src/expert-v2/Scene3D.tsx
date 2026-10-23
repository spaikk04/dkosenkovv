import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {useLayoutEffect, useMemo, type ReactNode} from 'react';
import {useThree} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import {PMREMGenerator} from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

const C={silver:'#DCE2EC',accent:'#B5CDFF',surface:'#252C38',ground:'#0B0E14',ink:'#F4F5F0',coral:'#F29B8F'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export type ObjectKind='energy'|'form'|'goal'|'release';
const Metal=({color=C.silver}:{color?:string})=><meshPhysicalMaterial color={color} roughness={.28} metalness={.6} clearcoat={.65} clearcoatRoughness={.2}/>;
function StudioEnvironment() {
 const {gl,scene}=useThree();
 const texture=useMemo(()=>{
  const generator=new PMREMGenerator(gl);
  const room=new RoomEnvironment();
  const target=generator.fromScene(room,.04);
  room.dispose();generator.dispose();
  return target;
 },[gl]);
 useLayoutEffect(()=>{
  scene.environment=texture.texture;
  scene.environmentIntensity=.8;
  return ()=>{scene.environment=null;texture.dispose();};
 },[scene,texture]);
 return null;
}
function LitStage({children}:{children:ReactNode}) {
 return <>
  <StudioEnvironment/>
  <ambientLight intensity={.7} color={C.silver}/>
  <directionalLight position={[-3,4,5]} intensity={4} color={C.ink}/>
  <directionalLight position={[4,1,-2]} intensity={6} color={C.accent}/>
  <directionalLight position={[0,-3,3]} intensity={1.4} color={C.silver}/>
  {children}
 </>;
}

export const Scene3D=({kind='energy'}:{kind?:ObjectKind})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const p=interpolate(f,[0,.4*fps],[0,1],{...clamp,easing:Easing.bezier(.16,1,.3,1)});
 const turn=interpolate(f,[0,3*fps],[-.35,.35],clamp);
 const assemble=interpolate(f,[.2*fps,1.5*fps],[0,1],{...clamp,easing:Easing.bezier(.16,1,.3,1)});
 return <ThreeCanvas width={720} height={720} camera={{position:[0,0,7],fov:38}} gl={{alpha:true,antialias:true}} style={{background:'transparent'}}>
  <LitStage>
   <group rotation={[.16,turn,-.12]} scale={.8+.2*p}>
   {kind==='energy'&&<>
    <mesh><sphereGeometry args={[.85,48,32]}/><Metal/></mesh>
    {[0,1,2].map((i)=><group key={i} rotation={[.55+i*.62,.3+i*.7,0]}>
      <mesh rotation={[0,0,f/fps*.22]}><torusGeometry args={[1.28+i*.12,.025,8,80]}/><Metal color={i===1?C.accent:C.silver}/></mesh>
      <mesh position={[Math.cos(f/fps*.25+i*2)* (1.28+i*.12),Math.sin(f/fps*.25+i*2)*(1.28+i*.12),0]}><sphereGeometry args={[.09,16,12]}/><Metal color={C.accent}/></mesh>
    </group>)}
   </>}
   {kind==='form'&&<>
    {Array.from({length:27},(_,i)=>{
      const x=i%3-1,y=Math.floor(i/3)%3-1,z=Math.floor(i/9)-1;
      const expansion=1.65-.82*assemble;
      return <RoundedBox key={i} args={[.68,.68,.68]} radius={.065} smoothness={3} position={[x*expansion,y*expansion,z*expansion]} rotation={[.2*(1-assemble)*y,.3*(1-assemble)*x,0]}>
       <Metal color={i%5===0?C.accent:C.silver}/>
      </RoundedBox>;
    })}
   </>}
   {kind==='goal'&&<group rotation={[.15,-.12,0]}>
    {[1.45,1.0,.55].map((r,i)=><mesh key={r} position={[0,0,-i*.18]} scale={.85+.15*assemble}><torusGeometry args={[r,.085,12,80]}/><Metal color={i===1?C.accent:C.silver}/></mesh>)}
    <mesh position={[0,0,.15+(1-assemble)*2]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,1.2,16]}/><Metal color={C.accent}/></mesh>
    <mesh position={[0,0,-.5+(1-assemble)*2]} rotation={[-Math.PI/2,0,0]}><coneGeometry args={[.18,.38,24]}/><Metal color={C.accent}/></mesh>
   </group>}
   {kind==='release'&&<group rotation={[.25,0,0]}>
    {[0,1,2,3,4].map((i)=>{
      const x=(i-2)*.68; const y=(i-2)*.28;
      return <mesh key={i} position={[x*(1+(1-assemble)*1.5),y-(1-assemble)*Math.abs(i-2),0]} rotation={[0,turn*.4,0]} scale={[.5,.5+i*.19,.5]}><boxGeometry/><Metal color={i===4?C.accent:C.silver}/></mesh>;
    })}
   </group>}
   </group>
  </LitStage>
 </ThreeCanvas>;
};
