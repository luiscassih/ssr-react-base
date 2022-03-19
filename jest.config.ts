import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/components/common/__mocks__/fileMock.ts",
    "\\.svg$": "<rootDir>/src/components/common/__mocks__/svgrMock.tsx",
  },
  testEnvironment: 'jsdom',
};
export default config;