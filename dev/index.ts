import chokidar, { type FSWatcher } from 'chokidar';
import { generateDevClientTokens } from './client/index';

(chokidar.watch([`./src`, `./dev/client`], { ignoreInitial: true }) as FSWatcher).on(
  'ready',
  async () => {
    try {
      await generateDevClientTokens();
      console.info('✅ Build completed.');
    } catch (error) {
      console.error('❌ Build failed:', error);
    }

    // Restart the process
    process.exit(0);
  }
);
