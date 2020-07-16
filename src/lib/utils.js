export const isObject = (schemaValidator) =>
  schemaValidator !== null && typeof schemaValidator === 'object';

export const isInvalid = (value, schemaValidator) =>
  value && !schemaValidator.regEx.test(value);
