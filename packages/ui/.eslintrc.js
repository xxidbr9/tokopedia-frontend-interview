module.exports = {
  root: true,
  extends: ["weboo", "eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: "module"
  },
  settings: {
    react: {
      "version": "detect"
    }
  }
};
