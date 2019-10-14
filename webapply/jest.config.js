/* eslint-disable max-len */
/*eslint-env node*/
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

console.log('@@@ webapply'); // eslint-disable-line

module.exports = {
  collectCoverage: false,

  collectCoverageFrom: ["src/**/*.js", "!src/**/index.js", "!**/constants/**"],

  coverageDirectory: "coverage",

  coverageReporters: getCoverageReporters(),

  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  setupFiles: ["./src/setupTests.js"],

  testEnvironment: "node",

  testPathIgnorePatterns: ["/node_modules/", "./src/setupTests.js", "./src/constants"],

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};

function getCoverageReporters() {
  return process.env.TF_BUILD ? ["cobertura"] : ["json", "text", "cobertura", "html"];
}
