# Потенциал · V2

Новая версия предыдущего экспертного ролика; старый экспорт сохранён.

## Воспроизведение

Из `video-studio`, при сохранённом исходнике в `public/footage/expert-cut-sdr.mp4`:

1. `python3 scripts/prepare-expert-v2.py` — монтаж речи и покадровый EDL.
2. `python3 scripts/sound-expert-v2.py` — оригинальная атмосферная подложка и синхронные SFX.
3. `npx remotion render src/index.ts ExpertPotentialV2 out/expert-v2-polished-overlay --sequence --image-format=png --props=production/expert-v2/overlay-props.json --concurrency=3` — графика и настоящее 3D без субтитров.
4. `npx remotion render src/index.ts PotentialCaptions out/expert-v2-captions --sequence --image-format=png --concurrency=2` — независимый нижний слой субтитров.
5. `python3 scripts/compose-expert-v2.py` — собирает оригинальную речь, покадровую графику и звук, экспортирует три файла. Параметр `--audio-only` позволяет проверить звук до завершения графики.

Результаты: `out/expert-potential-v2.mp4`, `out/expert-potential-v2-no-music.mp4`, `out/expert-potential-v2-mobile.mp4`. Полная и безмузыкальная версии используют одинаковый видеопоток; вторая сохраняет голос и SFX.

Remotion Studio: `npm run dev`, композиции `ExpertPotentialV2`, `PotentialObjectStudy`, `PotentialCaptions`. Геометрия/тексты разделены на сцены. Новый manifest: `src/expert-v2/workbench.tsx`. Проверка импортом во внешний Shotcraft Workbench и parity не заявлена; основной проверяемый результат — экспортированный MP4.

Голосовые исходники и рабочие PCM сохраняются локально, не публикуются в Git отдельно. Готовый пользовательский MP4 размещается в отдельной delivery-ветке. Только оригинальные SFX/score-stems без речи включены в исходный комплект.

См. DIRECTION.md, ASSETS.md, edit.json, sound-plan.json и QA/independent review.
