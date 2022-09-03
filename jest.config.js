/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    coverageDirectory: './reports/test-coverage',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};