module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!**/config/**',
    '!**/*.module.ts',
    '!./src/App.ts',
    '!./src/main.ts',
  ],
  coverageReporters: ['text', 'text-summary', 'html', 'clover'],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
