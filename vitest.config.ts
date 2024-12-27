import { defineConfig } from 'vitest/config'

const VITEST_SEQUENCE_SEED = Date.now();

export default defineConfig({
  test: {
    // setupFiles: ["./test/setup/mongo-memory-server.ts"],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      include: ['src'],
    },
    reporters: 'basic',
    sequence: {
      seed: VITEST_SEQUENCE_SEED,
      shuffle: true,
    },
  }
})
