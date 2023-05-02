import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    mode: 'test',

    test: {
      environment: 'node',
      globals: true,
    },
  }
})
