module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "react/jsx-filename-extension": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "react/function-component-definition": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "global-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/prefer-default-export": "off",
    "no-extend-native": "off",
  },
};
