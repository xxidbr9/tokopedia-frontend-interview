const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  testMatch: ['**/*.test.(ts|tsx)'],
  passWithNoTests: true,
}

export default config