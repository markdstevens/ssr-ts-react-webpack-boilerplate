module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  testRegex: 'spec.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^config$': '<rootDir>/src/config/index.ts',
    '^routes$': '<rootDir>/src/common/routes/index.ts',
    '^components/(.*)$': '<rootDir>/src/common/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/common/hooks/$1',
    '^pages/(.*)$': '<rootDir>/src/common/pages/$1',
    '^stores/(.*)$': '<rootDir>/src/common/stores/$1',
    '^utils/(.*)$': '<rootDir>/src/common/utils/$1',
    '^styles/(.*)$': '<rootDir>/src/common/styles/$1',
    '^images/(.*)$': '<rootDir>/src/common/images/$1'
  },
  globals: {
    'babel-jest': {
      packageJson: 'package.json'
    }
  }
};
