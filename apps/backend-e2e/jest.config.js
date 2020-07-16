module.exports = {
  name: 'backend-e2e',
  preset: './jest.config.js',
  coverageDirectory: './coverage/apps/backend-e2e',
  testEnvironment: 'node',
  collectCoverageFrom: ['./apps/backend/src/**'],
  roots: ['./apps/backend-e2e'],
  rootDir: './../../',
  moduleNameMapper: {
    "@trends/data": "<rootDir>/libs/data/src/index.ts",
    "@trends/fixtures": "<rootDir>/libs/fixtures/src/index.ts",
    "@trends/backend/(.*)": "<rootDir>/apps/backend/$1"
  }
};
