'use strict';

const DEFAULT_ERROR_MESSAGE = 'Files matching this path are not allowed.';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow files with a path matching a specific regexp',
      category: 'JavaScript',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-restricted-files.md',
    },
    schema: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['paths'],
        properties: {
          error: {
            type: 'string',
          },
          paths: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    },
  },

  DEFAULT_ERROR_MESSAGE,

  create(context) {
    return {
      Program(node) {
        const match = context.options.find((option) =>
          option.paths.some((path) => context.getFilename().match(path))
        );
        if (match) {
          context.report({
            node,
            message: match.error || DEFAULT_ERROR_MESSAGE,
          });
        }
      },
    };
  },
};