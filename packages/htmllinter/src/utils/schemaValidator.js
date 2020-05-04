import Ajv from 'ajv';

const ajv = new Ajv({
  meta: false,
  useDefaults: true,
  validateSchema: false,
  missingRefs: 'ignore',
  verbose: true,
  schemaId: 'auto',
});

function getRuleOptionsSchema(schema) {
  if (!schema) {
    return null;
  }

  if (Array.isArray(schema)) {
    if (schema.length) {
      return {
        type: 'array',
        items: schema,
      };
    }
    return {
      type: 'array',
    };
  }

  return schema;
}

export const validateRuleSchema = (schema, option) => {
  let validate;
  try {
    const normalizedSchema = getRuleOptionsSchema(schema);

    validate = ajv.compile(normalizedSchema);
  } catch (error) {
    throw new Error(error.message || error);
  }

  validate(option);

  if (validate.errors) {
    throw new Error(
      validate.errors
        .map(
          (error) => `\tValue ${JSON.stringify(error.data)} ${error.message}.\n`
        )
        .join('')
    );
  }
};
