export const TOTAL = 1815;
export const SHOTS = [
  {id: 'hook', from: 0, to: 195, label: 'Большой потенциал'},
  {id: 'thinkers', from: 195, to: 351, label: 'Три философа'},
  {id: 'energy', from: 351, to: 483, label: 'Статичная энергия'},
  {id: 'dynamis', from: 483, to: 678, label: 'Дюнамис'},
  {id: 'pressure', from: 678, to: 954, label: 'Фоновый шум'},
  {id: 'direction', from: 954, to: 1137, label: 'Форма и цель'},
  {id: 'step1', from: 1137, to: 1263, label: 'Предназначение и цель'},
  {id: 'step2', from: 1263, to: 1401, label: 'Регулярные действия'},
  {id: 'step3', from: 1401, to: 1524, label: 'Меньше анализа'},
  {id: 'step4', from: 1524, to: 1593, label: 'Ожидания'},
  {id: 'step5', from: 1593, to: 1674, label: 'Столкновение с реальностью'},
  {id: 'close', from: 1674, to: TOTAL, label: 'Раскрыть потенциал'},
] as const;
export type Shot = typeof SHOTS[number];
export const SFX = [
  {from: SHOTS[0].from + 3, src: 'audio/air.mp3', volume: 0.10, duration: 24},
  {from: SHOTS[1].from + 7, src: 'audio/sweep.mp3', volume: 0.13, duration: 16},
  {from: SHOTS[3].from + 5, src: 'audio/paper-slide.mp3', volume: 0.12, duration: 24},
  {from: SHOTS[5].from + 5, src: 'audio/air.mp3', volume: 0.13, duration: 24},
  ...SHOTS.slice(6, 11).map(s => ({from: s.from + 5, src: 'audio/sweep.mp3', volume: 0.09, duration: 14})),
];
