import { type ChangeEvent, useRef, useState } from 'react';

export const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const currentValue = useRef(defaultValue);
  const [isError, setIsError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setValue(e.target.value);
    currentValue.current = e.target.value;
    validate();
  };

  const validate = () => {
    if (currentValue.current.trim().length === 0) {
      setIsError(true);
      return { error: true };
    } else {
      setIsError(false);
      return { error: false };
    }
  };

  return {
    value,
    onChange,
    isError,
    validate,
  };
};
