import chokidar, { type FSWatcher } from 'chokidar';
import { generateDevClientTokens } from './client/index';

const watchingPatterns: string[] = [`./src`, `./dev/client`];

const onHandler = async (msg: string, filePath?: string) => {
  if (filePath) {
    console.info(filePath);
  }

  // Build once and then restart the process
  try {
    await generateDevClientTokens();
    console.info('✅ Build completed.');
  } catch (error) {
    console.error('❌ Build failed:', error);
  }

  // Restart the process
  process.exit(0);
};

(chokidar.watch(watchingPatterns, { ignoreInitial: true }) as FSWatcher)
  .on('ready', () => onHandler('✅ File watcher is ready!'))
  .on('change', (filePath: string) => onHandler('🔁 File changed', filePath))
  .on('add', (filePath: string) => onHandler('➕ File added', filePath))
  .on('unlink', (filePath: string) => onHandler('➖ File removed', filePath));
