import {ExpertPotentialV2, ObjectStudy, TOTAL_V2, CaptionStrip} from './expert-v2/Film';
import {ExpertFilm} from "./expert/ExpertFilm";
import {Composition} from "remotion";
import {ToolkitCheck} from "./Composition";
export const RemotionRoot = () => <>
  <Composition id="ToolkitCheck" component={ToolkitCheck} durationInFrames={60} fps={30} width={640} height={360}/>
  <Composition id="ExpertPotential" component={ExpertFilm} durationInFrames={1815} fps={30} width={1080} height={1920}/>
  <Composition id="ExpertPotentialV2" component={ExpertPotentialV2} durationInFrames={TOTAL_V2} fps={30} width={1080} height={1920}/>
  <Composition id="PotentialObjectStudy" component={ObjectStudy} durationInFrames={90} fps={30} width={1080} height={1920}/>
  <Composition id="PotentialCaptions" component={CaptionStrip} durationInFrames={TOTAL_V2} fps={30} width={1080} height={320}/>
</>;
