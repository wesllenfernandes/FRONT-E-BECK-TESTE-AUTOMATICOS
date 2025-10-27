module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    "**/testefront.js",
    "**/testeback.js"
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
};