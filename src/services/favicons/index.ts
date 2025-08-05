import favicons from 'favicons';
import fs from 'fs/promises';
import path from 'path';
import { DEFAULT_FAVICONS_CONFIG } from '../../configs.js';
import type { FaviconsConfig, ServiceParams } from '../../types/index.js';

// This function generates favicons and prints them out into files
export const faviconsService = async ({
  id,
  sourcePath,
  outputPath,
  ...config
}: ServiceParams<FaviconsConfig>) => {
  const resolvedOutputPath = path.resolve(outputPath || './favicons');
  const resolvedConfig = {
    path: '/', // This should be the web path, not filesystem path
    ...DEFAULT_FAVICONS_CONFIG,
    ...config,
    manifestMaskable: config.manifestMaskable || sourcePath
  };

  // Create output directory if it doesn't exist
  await fs.mkdir(resolvedOutputPath, { recursive: true });

  const faviconsResult = await favicons(sourcePath, resolvedConfig);

  await Promise.all([
    // Write image files
    ...faviconsResult.images.map(async (image) => {
      await fs.writeFile(path.join(resolvedOutputPath, image.name), image.contents);
    }),

    // Write manifest and other files
    ...faviconsResult.files.map(async (file) => {
      let fileContents = file.contents;

      // Add "id" property to manifest.webmanifest if it's a JSON file
      if (file.name === 'manifest.webmanifest') {
        try {
          const { developerName: developer_name, developerURL: developer_url } = resolvedConfig;
          const manifest = JSON.parse(file.contents);
          const updatedManifest = {
            id,
            ...manifest,
            developer_name,
            developer_url,
            icons: manifest.icons.map((icon: Record<string, string>) => ({
              ...icon,
              src: icon.src.replace('/', '')
            }))
          };
          fileContents = JSON.stringify(updatedManifest, null, 2);
        } catch (error) {
          console.warn('Failed to parse manifest.webmanifest:', error);
        }
      }

      await fs.writeFile(path.join(resolvedOutputPath, file.name), fileContents);
    })
  ]);

  console.info(`Favicons generated successfully in: ${resolvedOutputPath}`);
  console.info(
    `Generated ${faviconsResult.images.length} images and ${faviconsResult.files.length} files`
  );
};
