import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  external: ['vite'],
  dts: true,
  format: ['esm', 'cjs']
});
