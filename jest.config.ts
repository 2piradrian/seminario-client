import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest/presets/default-esm',
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest',{ tsconfig: '<rootDir>/tsconfig.test.json', useESM: true }]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/mocks/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/src/test/mocks/styleMock.js',
    },
}

export default config