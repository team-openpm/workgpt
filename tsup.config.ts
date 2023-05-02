import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/apis/*', 'src/chat-agents/*', 'src/runners/*'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
})
