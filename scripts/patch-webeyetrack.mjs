import { readFileSync, writeFileSync } from 'node:fs';

const bundle = new URL('../node_modules/webeyetrack/dist/index.js', import.meta.url);
let source = readFileSync(bundle, 'utf8');
const original = source;

const patches = [
  ['model path', 'self.location.origin,"/web/model.json"', 'self.location.origin,"/FakeEyeGaze-WebEyeTrack/web/model.json"'],
  ['nine calibration points', 'void 0===e&&(e=5),void 0===t&&(t=60)', 'void 0===e&&(e=9),void 0===t&&(t=60)'],
  ['SVD least-squares affine fit', '(0,u.solve)(r,s).transpose()', '(0,u.solve)(r,s,!0).transpose()'],
  [
    'calibration promise restores worker status',
    'i.handleClick(r.x,r.y),u="idle",self.postMessage({type:"statusUpdate",status:u}),[3,8]',
    'i.handleClick(r.x,r.y).catch(function(err){console.warn("[WebEyeTrack patch] calibration update failed:",err&&err.message||err)}).finally(function(){u="idle",self.postMessage({type:"statusUpdate",status:u})}),[3,8]'
  ],
  [
    'failed frame recovery',
    '[4,i.step(r.frame,r.timestamp)]',
    '[4,i.step(r.frame,r.timestamp).catch(function(err){console.warn("[WebEyeTrack patch] frame failed:",err&&err.message||err);return null})]'
  ],
  [
    'skip failed frame result',
    'case 4:a=s.sent(),r.timestamp,self.postMessage({type:"stepResult",result:a})',
    'case 4:a=s.sent(),r.timestamp,a&&self.postMessage({type:"stepResult",result:a})'
  ]
];

for (const [description, from, to] of patches) {
  if (source.includes(to)) continue;
  if (!source.includes(from)) throw new Error(`Nie znaleziono fragmentu poprawki: ${description}`);
  source = source.replaceAll(from, to);
}

if (source !== original) writeFileSync(bundle, source);
console.log(`Patched WebEyeTrack (${patches.length} fixes): robust calibration and worker recovery.`);
