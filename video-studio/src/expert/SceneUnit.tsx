import {Sequence} from 'remotion';
import {ExpertFilm} from './ExpertFilm';
export const SceneUnit = ({start=0}: {start?: number}) => <Sequence from={-start}><ExpertFilm/></Sequence>;
