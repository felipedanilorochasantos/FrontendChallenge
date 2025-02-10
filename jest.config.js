module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@env/(.*)': '<rootDir>/src/environments/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^environments/(.*)$': '<rootDir>/src/environments/$1'
    },
    roots: ['<rootDir>/src/'],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jsdom'
};