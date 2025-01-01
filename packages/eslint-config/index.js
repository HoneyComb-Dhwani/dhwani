module.exports = {
    extends: [
      "eslint-config-turbo"
    ],
    globals: {
      React: true,
      JSX: true,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
    ignorePatterns: ["node_modules/", "dist/"],
  };