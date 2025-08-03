import chokidar, { type FSWatcher } from 'chokidar';
import { generateDevClientEssentials } from './client/index';

(chokidar.watch([`./src`, `./client`], { ignoreInitial: true }) as FSWatcher).on(
  'ready',
  async () => {
    try {
      await generateDevClientEssentials();
      console.info('✅ Build completed.');
    } catch (error) {
      console.error('❌ Build failed:', error);
    }

    // Restart the process
    process.exit(0);
  }
);
