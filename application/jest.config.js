module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.{spec,test}.ts'],
  setupFilesAfterEnv: ['./test/setup/setup.ts'],
};
