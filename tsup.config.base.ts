import { defineConfig, Options } from 'tsup';

export const createTsupConfig = (options: Partial<Options> = {}): Options => ({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: false,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  ...options,
});

export default defineConfig(createTsupConfig());
