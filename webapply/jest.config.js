/* eslint-disable max-len */
/*eslint-env node*/
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

console.log("@@@ webapply"); // eslint-disable-line

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/*.js",
    "!src/**/index.js",
    "!src/**/styled.js",
    "!src/**/constants.js",
    "!**/constants/**",
    "!**/components/**",
    "!src/stories/**",
    "!src/containers/WebChat/**"
  ],

  coverageDirectory: "coverage",

  coverageReporters: getCoverageReporters(),

  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  setupFiles: ["./src/setupTests.js"],

  testEnvironment: "jsdom",

  testPathIgnorePatterns: [
    "/node_modules/",
    "./src/setupTests.js",
    "./src/constants",
    "./src/assets"
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 98,
      functions: 98,
      lines: 98
    }
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js"
  }
};

function getCoverageReporters() {
  return process.env.TF_BUILD ? ["cobertura"] : ["json", "text", "cobertura", "html"];
}
