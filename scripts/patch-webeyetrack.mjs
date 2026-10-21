import { readFileSync, writeFileSync } from 'node:fs';

const bundle = new URL('../node_modules/webeyetrack/dist/index.js', import.meta.url);
const source = readFileSync(bundle, 'utf8');
const needle = 'self.location.origin,"/web/model.json"';
const replacement = 'self.location.origin,"/FakeEyeGaze-WebEyeTrack/web/model.json"';

if (!source.includes(needle) && !source.includes(replacement)) {
  throw new Error('Nie znaleziono oczekiwanej ścieżki modelu w pakiecie WebEyeTrack.');
}

if (source.includes(needle)) {
  writeFileSync(bundle, source.replaceAll(needle, replacement));
  console.log('Patched WebEyeTrack model path for GitHub Pages.');
}
