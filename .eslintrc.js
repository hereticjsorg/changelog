module.exports = {
    ignorePatterns: [],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: false
        }
    },
    extends: "airbnb-base",
    env: {
        es6: true,
        browser: true,
        node: true,
        es2020: true
    },
    rules: {
        quotes: ["error", "double",
            {
                allowTemplateLiterals: true
            }
        ],
        "template-curly-spacing": "off",
        indent: "off",
        "arrow-parens": "off",
        "no-console": "off",
        camelcase: "off",
        "comma-dangle": "off",
        "array-callback-return": "off",
        "guard-for-in": "off",
        "import/extensions": "off",
        "max-len": "off",
        "no-confusing-arrow": "off",
        "no-unused-expressions": "off",
        "no-nested-ternary": "off",
        "no-return-assign": "off",
        "no-underscore-dangle": "off",
        "linebreak-style": "off",
        "import/no-dynamic-require": "off",
        "no-case-declarations": "off",
        "global-require": "off",
        "no-async-promise-executor": "off",
        "dot-notation": "off",
        "no-param-reassign": "off",
        "import/no-extraneous-dependencies": "off",
        "default-case": "off",
        "class-methods-use-this": "off",
        "no-cond-assign": "off",
        "no-new": "off",
        "consistent-return": "off",
        "no-await-in-loop": "off",
        "no-restricted-syntax": "off",
        "no-continue": "off"
    },
};
