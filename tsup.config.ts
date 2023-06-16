import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/apis/*',
    'src/chat-agents/*',
    'src/runners/*',
    'src/apis/openpm',
    'src/chat-agents/open-ai',
    'src/runners/workgpt',
  ],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
})
