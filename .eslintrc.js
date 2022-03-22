module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
        "simple-import-sort"
    ],
    extends: [
        "plugin:@typescript-eslint/recommended",
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "no-undef": "off",
        "func-names": "off",
        "array-element-newline": [
            "error", {
                ArrayExpression: "consistent",
                ArrayPattern: { minItems: 2 },
            },
        ],
        "object-property-newline": [
            "error", {
                allowMultiplePropertiesPerLine: false,
            },
        ],
        "object-curly-newline": ["error", { "multiline": true }],
        "no-multi-spaces": "error",
        "no-irregular-whitespace": "error",
        "no-trailing-spaces": "error",
        "import/no-extraneous-dependencies": "off",
        "global-require": "off",
        "max-len": [
            "error", {
                code: 140,
                tabWidth: 4,
            },
        ],
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "ignoredNodes": ["PropertyDefinition"],
        }],
        "no-tabs": "error",
        "no-lone-blocks": "error",
        "eol-last": "error",
        "no-use-before-define": "off",
        "no-unused-vars": "off",
        "consistent-return": "off",
        "import/prefer-default-export": "off",
        "array-bracket-newline": ["error", { multiline: true }],
        semi: ["error"],
        "linebreak-style": "off",
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "always"],
        "computed-property-spacing": "error",
        "comma-dangle": ["error", "always-multiline"],
        "quotes": ["error", "double"],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "function-call-argument-newline": ["error", "consistent"],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "no-multiple-empty-lines": ["error", {
            max: 1
        }],
        "no-return-await": "error"
    },
};
