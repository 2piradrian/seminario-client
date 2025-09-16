import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest/presets/default-esm',
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest',{ tsconfig: '<rootDir>/tsconfig.test.json', useESM: true }]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/styleMock.js',
    },
}

export default config