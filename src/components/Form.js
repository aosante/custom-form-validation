import React from 'react';
import useForm from '../lib/useForm';

const Form = () => {
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

  const onSubmit = (state) => {
    alert(JSON.stringify(state, null, 2));
  };

  const { state, disable, handleChange, handleSubmit } = useForm(
    stateSchema,
    validationSchema,
    onSubmit
  );

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={state.first_name.value}
            onChange={handleChange}
          />
          {state.first_name.error && (
            <p className={'error--style'}>{state.first_name.error}</p>
          )}
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={state.last_name.value}
            onChange={handleChange}
          />
          {state.last_name.error && (
            <p className={'error--style'}>{state.last_name.error}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={state.email.value}
            onChange={handleChange}
          />
          {state.email.error && (
            <p className={'error--style'}>{state.email.error}</p>
          )}
        </div>
        <input type="submit" name="submit" disabled={disable} />
      </form>
    </div>
  );
};

export default Form;
