import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/schemas/index.ts',
    'src/constants.ts',
    'src/lib/prisma.ts',
    'src/lib/auth.ts',
    'src/lib/auth-client.ts',
  ],
  format: ['esm'],
  outDir: 'dist',
  dts: true,
  clean: true,
  sourcemap: false,
  //! excluding server-specific dependencies
  external: ['@prisma/client', 'lucia', '@lucia-auth/adapter-prisma'],
});
