import { readFileSync, writeFileSync } from 'node:fs';

const bundle = new URL('../node_modules/webeyetrack/dist/index.js', import.meta.url);
const source = readFileSync(bundle, 'utf8');
const needle = 'self.location.origin,"/web/model.json"';
const replacement = 'self.location.origin,"/FakeEyeGaze-WebEyeTrack/web/model.json"';
const fivePointDefault = 'void 0===e&&(e=5),void 0===t&&(t=60)';
const ninePointDefault = 'void 0===e&&(e=9),void 0===t&&(t=60)';

if (!source.includes(needle) && !source.includes(replacement)) {
  throw new Error('Nie znaleziono oczekiwanej ścieżki modelu w pakiecie WebEyeTrack.');
}

if (!source.includes(fivePointDefault) && !source.includes(ninePointDefault)) {
  throw new Error('Nie znaleziono domyślnego limitu punktów w pakiecie WebEyeTrack.');
}

const patched = source
  .replaceAll(needle, replacement)
  .replaceAll(fivePointDefault, ninePointDefault);

if (patched !== source) writeFileSync(bundle, patched);
console.log('Patched WebEyeTrack for GitHub Pages and nine-point calibration.');
