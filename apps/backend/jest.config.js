module.exports = {
  name: 'backend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/backend',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/app/**', '!test/**'],
};
