/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFiles: ["./tests/setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "^(.*)\\.js$": "$1",
  },
};
