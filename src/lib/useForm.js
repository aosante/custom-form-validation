import { useState, useCallback, useEffect } from 'react';
import { isObject, isInvalid } from './utils';

export default (stateSchema, validationSchema = {}, callback) => {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) setDisable(hasError());
    // eslint-disable-next-line
  }, [state, isDirty]);

  // Used to disable submit button if there's an error in state or if there's no value.
  // Wrapped in useCallback to cache the function to avoid unnecessary re-renders
  const hasError = useCallback(() => {
    // return true if there is an error detected in state
    const hasErrorInState = Object.keys(validationSchema).some((key) => {
      return (
        (validationSchema[key].required && !state[key].value) ||
        state[key].error
      );
    });
    return hasErrorInState;
  }, [state, validationSchema]);

  const handleChange = useCallback(
    (e) => {
      setIsDirty(true);
      const { name, value } = e.target;
      let error = '';

      if (validationSchema[name].required && !value)
        error = 'This field is required';

      if (
        isObject(validationSchema[name].validator) &&
        isInvalid(value, validationSchema[name].validator)
      )
        error = validationSchema[name].validator.error;

      setState((prevState) => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!hasError()) callback(state);
    },
    // eslint-disable-next-line
    [state]
  );

  return {
    state,
    disable,
    handleChange,
    handleSubmit,
  };
};
