import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    "src/index.ts",
    'src/apis/*',
    'src/chat-agents/*',
    'src/runners/*',
    'src/apis/openpm/index.ts',
    'src/chat-agents/open-ai/index.ts',
    'src/runners/workgpt/index.ts',
  ],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
})
