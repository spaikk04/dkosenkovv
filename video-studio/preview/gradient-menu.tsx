import {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Camera, Heart, Home, Share2, Video} from 'lucide-react';
import {useReducedMotion} from 'motion/react';
import GradientMenu, {type GradientMenuItem} from '../components/ui/gradient-menu';
import '../styles/globals.css';
import './gradient-menu.css';

// Icon descriptions are accessibility metadata, NOT proposed menu copy.
const items: GradientMenuItem[] = [
  {id: 'home', icon: Home, accessibleLabel: 'Иконка дома'},
  {id: 'video', icon: Video, accessibleLabel: 'Иконка видеокамеры'},
  {id: 'photo', icon: Camera, accessibleLabel: 'Иконка фотоаппарата'},
  {id: 'share', icon: Share2, accessibleLabel: 'Иконка обмена'},
  {id: 'heart', icon: Heart, accessibleLabel: 'Иконка сердца'},
];

function Preview() {
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!playing || reduceMotion) return;
    let index = 0;
    setActive(items[0].id);
    const timer = window.setInterval(() => {
      index = (index + 1) % (items.length + 1);
      setActive(items[index]?.id ?? null);
    }, 3000); // MOTION.md hold 2–3s, .4s entrance inside each step.
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion]);

  return <main className="menu-preview">
    <header><p>Проверка механики</p><h1>Меню с раскрытием</h1>
      <p>Черновой профиль MOTION.md. Названия и действия ожидаются.</p></header>
    <section className="menu-preview__stage" aria-label="Анимация формы и иконок">
      <GradientMenu items={items} ariaLabel="Структурный пример без содержимого" activeId={active}
        onActiveChange={(id) => {setPlaying(false); setActive(id);}} />
    </section>
    <footer><button type="button" disabled={Boolean(reduceMotion)} onClick={() => setPlaying(!playing)}>
      {playing ? 'Остановить анимацию' : 'Показать анимацию'}
    </button><p>{reduceMotion ? 'Включено уменьшение движения.' : 'Также работают наведение, Tab и касание.'}</p></footer>
  </main>;
}

createRoot(document.getElementById('root')!).render(<Preview />);
