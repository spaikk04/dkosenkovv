import {ExpertFilm} from "./expert/ExpertFilm";
import {Composition} from "remotion";
import {ToolkitCheck} from "./Composition";
export const RemotionRoot = () => <>
  <Composition id="ToolkitCheck" component={ToolkitCheck} durationInFrames={60} fps={30} width={640} height={360}/>
  <Composition id="ExpertPotential" component={ExpertFilm} durationInFrames={1815} fps={30} width={1080} height={1920}/>
</>;
