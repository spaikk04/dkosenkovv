import {AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {RoundedBox} from "@react-three/drei";
import {Sparkles, Box, AudioLines} from "lucide-react";

export const ToolkitCheck = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 22}});
  return <AbsoluteFill style={{background: "#10131c", color: "#f6f7fb", fontFamily: "sans-serif"}}>
    <Audio src={staticFile("check-tone.wav")} volume={0.3}/>
    <ThreeCanvas width={width} height={height} camera={{position: [0, 0, 6], fov: 40}}>
      <ambientLight intensity={1.3}/>
      <directionalLight position={[3, 4, 5]} intensity={3}/>
      <RoundedBox args={[1.4, 1.4, 1.4]} radius={0.22} smoothness={4}
        position={[1.25, 0.25, 0]} rotation={[0.25, frame / fps * 0.6, -0.12]}>
        <meshStandardMaterial color="#9fbcff" roughness={0.28} metalness={0.35}/>
      </RoundedBox>
    </ThreeCanvas>
    <div style={{position: "absolute", left: 36, top: 50, opacity: enter,
      translate: `0 ${interpolate(enter, [0, 1], [20, 0])}px`}}>
      <Sparkles size={30} color="#abc5ff"/>
      <h1 style={{fontSize: 38, letterSpacing: -1.5, margin: "18px 0 8px"}}>Motion Studio</h1>
      <p style={{fontSize: 22, color: "#bdc6da", margin: 0}}>Графика. Объём. Звук.</p>
    </div>
    <div style={{position: "absolute", bottom: 28, left: 36, display: "flex", gap: 22, color: "#cbd5e8", fontSize: 18}}>
      <span><Box size={20}/> 3D</span><span><AudioLines size={20}/> AUDIO</span><span>30 FPS</span>
    </div>
  </AbsoluteFill>;
};
