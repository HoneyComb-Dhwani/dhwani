module.exports = {
    root: true,
    extends: ["@dhwani/eslint-config"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
    },
  };