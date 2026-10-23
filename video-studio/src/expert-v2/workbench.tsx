import {Sequence} from 'remotion';
import {ExpertPotentialV2, TOTAL_V2, v2Shots, v2Captions} from './Film';
import sound from '../../production/expert-v2/sound-plan.json';

export function V2SceneUnit({start=0}:{start?:number}) {
  return <Sequence from={-start}><ExpertPotentialV2/></Sequence>;
}

/** Separate V2 manifest; preserves the original V1 workbench. */
export const WORKBENCH_V2={
 name:'Потенциал · монтаж V2',revision:'expert-v2',fps:30,width:1080,height:1920,
 total:TOTAL_V2,background:'#0B0E14',
 shots:v2Shots.map(s=>({id:s.id,label:s.label,from:s.fromFrame,duration:s.toFrame-s.fromFrame,component:V2SceneUnit,props:{start:s.fromFrame}})),
 captions:v2Captions,
 sfx:sound.events,
 bgm:[{src:'audio/v2/score.wav',from:0,duration:TOTAL_V2}],
 original:ExpertPotentialV2,
};
