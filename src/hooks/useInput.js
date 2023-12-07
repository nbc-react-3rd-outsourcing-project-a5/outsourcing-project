import { useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState('');

  const handle = (e) => {
    setValue(e.target.value);
  };

  return [value, handle];
};
