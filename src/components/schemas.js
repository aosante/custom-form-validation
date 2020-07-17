const stateSchema = {
  first_name: { value: '', error: '' },
  last_name: { value: '', error: '' },
  email: { value: '', error: '' },
};

const validationSchema = {
  first_name: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: 'Invalid first name format.',
    },
  },
  last_name: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: 'Invalid last name format.',
    },
  },
  email: {
    required: true,
    validator: {
      regEx: /\S+@\S+\.\S+/,
      error: 'Invalid email format.',
    },
  },
};

module.exports = {
  stateSchema,
  validationSchema,
};
