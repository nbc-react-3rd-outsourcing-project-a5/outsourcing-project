import { useState } from 'react';

export const useInput = (init = '') => {
  const [value, setValue] = useState(init);

  const handle = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, handle, reset];
};
