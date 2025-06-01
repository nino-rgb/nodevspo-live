module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.+(ts|js)"],
  testEnvironment: "node",
  moduleNameMapper: {
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^tests/(.*)$': '<rootDir>/src/tests/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
