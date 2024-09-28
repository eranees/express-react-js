import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export function timeStamp() {
  return + new Date();
}


export function rootDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootDirectory = resolve(__dirname, '../../');
  return rootDirectory;
}

