import type { PluginOption } from 'vite';
import { basename } from 'node:path';

export interface ViteReloadConfig {
  /** Whether to trigger a full reload when files in the public directory change (default: false) */
  public?: boolean;

  /** When true, will always trigger a full reload on ANY change (default: false) */
  everything?: boolean;

  /** Logs to the console whenever a watched file triggers a full reload (default: false) */
  log?: boolean;
}

/**
 * Triggers a full reload when files in the public directory change
 * 
 * @example
 * ```ts
 * import { defineConfig } from 'vite';
 * import { viteSimpleReload } from 'vite-simple-reload-utils';
 *
 * export default defineConfig({
 *   plugins: [
 *     viteSimpleReload({
 *       public: true,
 *       everything: false,
 *       log: true
 *     })
 *   ]
 * });
 * ```
 */
export function viteSimpleReload(config: ViteReloadConfig = {}): PluginOption {
  return {
    name: 'vite-simple-reload-utils',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      let watchedFileChange = false;

      if (config.public) {
        if (file.includes(server.config.publicDir)) {
          watchedFileChange = true;
          if (config.log) console.log(`  > Reloading for public file ${basename(file)}`);
        }
      }


      if (watchedFileChange || config.everything) {
        server.ws.send({ type: 'full-reload', path: '*' });
      }
    }
  }
}