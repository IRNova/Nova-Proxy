import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const [worker, metadata] = await Promise.all([
  readFile(new URL('../worker.js', import.meta.url)),
  readFile(new URL('../version.json', import.meta.url), 'utf8').then(JSON.parse),
]);

const text = worker.toString('utf8');
const hash = createHash('sha256').update(worker).digest('hex');
const requiredMarkers = [
  'protected release', 'const Version =', 'NOVA_BUILD',
  'NOVA_TG_CHANNEL', 'export default',
];

if (worker.byteLength < 100_000 || worker.byteLength > 2_900_000) {
  throw new Error(`worker.js has an invalid size: ${worker.byteLength}`);
}
if (requiredMarkers.some((marker) => !text.includes(marker))) {
  throw new Error('worker.js is missing protected release integrity markers');
}
if (text.includes('sourceMappingURL=')) {
  throw new Error('worker.js must not expose a source map');
}
if (metadata.protected !== true || metadata.worker_sha256 !== hash) {
  throw new Error('version.json does not match the protected Worker artifact');
}

console.log(JSON.stringify({ version: metadata.version, bytes: worker.byteLength, sha256: hash }));
