import React, { useCallback } from 'react';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import { useFormFields } from '../../Form/context';

import './index.scss';
import { Field } from '../../Form/types';

const ConfirmPassword: React.FC = () => {
  const password = useFormFields<Field>(([fields]) => fields.password);

  const validate = useCallback((value: string) => {
    if (!value) {
      return 'This field is required';
    }

    if (value === password?.value) {
      return true;
    }

    return 'Passwords do not match.';
  }, [password]);

  const {
    value,
    showError,
    setValue,
    errorMessage,
  } = useField({
    path: 'confirm-password',
    disableFormData: true,
    validate,
  });

  const classes = [
    'field-type',
    'confirm-password',
    showError && 'error',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Error
        showError={showError}
        message={errorMessage}
      />
      <Label
        htmlFor="field-confirm-password"
        label="Confirm Password"
        required
      />
      <input
        value={value as string || ''}
        onChange={setValue}
        type="password"
        autoComplete="off"
        id="field-confirm-password"
        name="confirm-password"
      />
    </div>
  );
};

export default ConfirmPassword;
