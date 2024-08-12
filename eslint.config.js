import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import typeScriptESLint from "@typescript-eslint/eslint-plugin";
import typeScriptESLintParser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    files: ["eslint.config.js", "src/js/**/*.js"],
    ignores: ["public/**", "dist/**", ".yarn/**"],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  prettier,
  {
    plugins: {
      "@typescript-eslint": typeScriptESLint,
      prettierPlugin,
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        chrome: "readonly",
        globalThis: "readonly",
        spyOn: "readonly",
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2021,
      },
    },
    rules: {
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_.*" },
      ],
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];
