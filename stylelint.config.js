export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
    'declaration-no-important': true,
    'declaration-block-single-line-max-declarations': 1,
    'selector-class-pattern': null,
    'font-family-name-quotes': 'always-where-recommended',
  },
};
