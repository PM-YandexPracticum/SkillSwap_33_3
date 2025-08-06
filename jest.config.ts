import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json',
        useESM: false,
        babelConfig: false,
        diagnostics: {
          ignoreCodes: [1343, 1286],
        },
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@/*': ['src/*'],
      '@assets/*': ['src/assets/*'],
    },
    { prefix: '<rootDir>/' }
  ),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
