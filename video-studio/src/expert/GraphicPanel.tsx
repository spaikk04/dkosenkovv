import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import type {ReactNode} from "react";

// Reusable reference-derived panel; scene text comes from the verified transcript.
export const GraphicPanel = ({children}: {children: ReactNode}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame, fps, config: {damping: 24, stiffness: 140}});
  return <div style={{
    padding: "44px 48px", borderRadius: 40, color: "#f7f8fb",
    background: "linear-gradient(145deg,rgba(76,83,96,0.96),rgba(19,23,31,0.98))",
    border: "1px solid rgba(220,232,255,0.25)",
    boxShadow: "0 30px 70px #0008, inset 0 2px 2px #ffffff24",
    opacity: progress,
    transform: `perspective(1400px) translateY(${interpolate(progress, [0, 1], [90, 0])}px) rotateX(${interpolate(progress, [0, 1], [12, 0])}deg)`,
  }}>{children}</div>;
};
