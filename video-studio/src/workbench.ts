import {ExpertFilm} from './expert/ExpertFilm';
import {SceneUnit} from './expert/SceneUnit';
import {SHOTS, TOTAL} from './expert/timeline';
export const WORKBENCH = {
  name: 'Потенциал · экспертный монтаж', fps:30, width:1080, height:1920,
  total:TOTAL, background:'#0b0e14', revision:'expert-v1',
  shots:SHOTS.map(s=>({id:s.id,label:s.label,from:s.from,duration:s.to-s.from,component:SceneUnit,props:{start:s.from},cardId:s.id})),
  transitions:[],captions:[],overlays:[],sfx:[],bgm:[],order:[],original:ExpertFilm,
};
