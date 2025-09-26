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
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.ts',
        '\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/styleMock.ts',

        ".*main-button/main-button$": "<rootDir>/test/mocks/mainButtonMock.tsx",
        ".*select-label/select-label$": "<rootDir>/test/mocks/selectLabelMock.tsx",
    },
    
    collectCoverage: false,

    collectCoverageFrom: [
    'src/ui/components/molecules/**/*.{ts,tsx}',
    'src/ui/components/organisms/**/*.{ts,tsx}',
    'src/ui/components/atoms/**/*.{ts,tsx}',
    'src/domain/datasource/**/*.ts',
    'src/domain/repository/**/*.ts',
    'src/domain/validator/**/*.ts',
    
    '!src/domain/errors/**/*.ts',
    '!**/*.d.ts',
    '!**/index.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/test-utils/**',
    "!src/ui/components/atoms/select-label/select-label.tsx",
    "!src/ui/components/atoms/main-button/main-button.tsx",

    '!src/domain/entity/**/*.ts',
    ],

    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
}

export default config