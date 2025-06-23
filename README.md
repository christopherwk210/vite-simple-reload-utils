# vite-simple-reload-utils

A simple vite plugin for performing a full reload when the public folder is changed.

## Usage:
```bash
npm i vite-simple-reload-utils
```
```ts
import { defineConfig } from 'vite';
import { viteSimpleReload } from 'vite-simple-reload-utils';

export default defineConfig({
  plugins: [
    viteSimpleReload({
      public: true, // Trigger a full reload whenever a file in the public directory changes
      everything: true, // Trigger a full reload whenever ANY change is detected
      log: true // Log when full reloads are triggered
    })
  ]
});
```