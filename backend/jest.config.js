/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};