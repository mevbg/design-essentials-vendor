/* =================================================== */
/* FAVICONS → GENERATOR */
/* =================================================== */

import favicons from 'favicons';
import fs from 'fs/promises';
import path from 'path';
import { faviconsGeneratorDefaultParams } from '../../defaults.js';
import type { FaviconsGeneratorParams } from './favicons.types.js';

// This function generates favicons and prints them out into files
export const faviconsGenerator = async ({ id, sourcePath, ...params }: FaviconsGeneratorParams) => {
  const config = {
    ...faviconsGeneratorDefaultParams,
    ...params,
    manifestMaskable: params.manifestMaskable || sourcePath
  } as Required<FaviconsGeneratorParams>;
  const resolvedBuildPath = path.resolve(
    config.buildPath || (faviconsGeneratorDefaultParams.buildPath as string)
  );

  // Create output directory if it doesn't exist
  await fs.mkdir(resolvedBuildPath, { recursive: true });

  const faviconsResult = await favicons(sourcePath, config);
  await Promise.all([
    // Write image files
    ...faviconsResult.images.map(async (image) => {
      await fs.writeFile(path.join(resolvedBuildPath, image.name), image.contents);
    }),

    // Write manifest and other files
    ...faviconsResult.files.map(async (file) => {
      let fileContents = file.contents;

      // Add "id" property to manifest.webmanifest if it's a JSON file
      if (file.name === 'manifest.webmanifest') {
        try {
          const { developerName: developer_name, developerURL: developer_url } = config;
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

      await fs.writeFile(path.join(resolvedBuildPath, file.name), fileContents);
    })
  ]);

  console.info(`Favicons generated successfully in: ${resolvedBuildPath}`);
  console.info(
    `Generated ${faviconsResult.images.length} images and ${faviconsResult.files.length} files`
  );

  return faviconsResult;
};
