/* eslint-disable max-len */
/*eslint-env node*/
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

console.log("@@@ webapply"); // eslint-disable-line

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    "!src/*.js",
    "!src/**/index.js",
    "!src/**/styled.js",
    "!src/**/constants.js",
    "!**/constants/**",
    "!src/stories/**",
    "!src/containers/WebChat/**",
    "src/components/Form/Input/**",
    "src/components/Form/RadioButton/**",
    "src/components/Form/InlineRadioGroup/**",
    "src/components/Form/Checkbox/**",
    "src/components/Form/Select/**",
    "src/components/Avatar/**",
    "src/components/ApplicationStatus/**",
    "src/components/BackgroundVideoPlayer/**",
    "src/**/*New.{js,jsx}"
  ],

  reporters: ["default", ["jest-junit", { outputDirectory: "reports/junit" }]],

  coverageDirectory: "coverage",

  coverageReporters: getCoverageReporters(),

  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  setupFiles: ["./src/setupTests.js"],

  testEnvironment: "jsdom",

  testPathIgnorePatterns: [
    "<rootDir>/__tests__/",
    "/node_modules/",
    "./src/setupTests.js",
    "./src/constants",
    "./src/assets"
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 80
    }
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js"
  }
};

function getCoverageReporters() {
  return process.env.TF_BUILD ? ["cobertura", "html"] : ["json", "text", "cobertura", "html"];
}
