module.exports = {
  name: 'frontend',
  preset: '../../jest.config.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/frontend-react',
  setupFilesAfterEnv: ['./test/setup/jest.setup.ts'],
  collectCoverageFrom: ['src/app/**', '!test/**'],
};
