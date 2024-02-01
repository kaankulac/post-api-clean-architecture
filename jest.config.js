module.exports = {
    roots: ['<rootDir>/test'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    // preset: '@shelf/jest-mongodb',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '@test/(.*)': '<rootDir>/test/$1',
        '@domain/(.*)': '<rootDir>/src/domain/$1',
        '@data/(.*)': '<rootDir>/src/data/$1',
        '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
        '@main/(.*)': '<rootDir>/src/main/$1',
        '@presentation/(.*)': '<rootDir>/src/presentation/$1'
    }
}