import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ... other configurations
  vite: {
    ssr: {
      noExternal: ['appwrite'], // Specify dependencies explicitly
    },
  },
});
