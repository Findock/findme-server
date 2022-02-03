module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    './src/**',
    '!**/node_modules/**',
    '!**/config/**',
    '!**/*.module.ts',
    '!./src/App.ts',
    '!./src/main.ts',
    '!./src/constants/**',
    '!./src/config/**',
  ],
  coverageReporters: ['text', 'text-summary', 'html', 'clover'],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
