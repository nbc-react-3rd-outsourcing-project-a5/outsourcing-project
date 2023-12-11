import { useState } from 'react';

export const useDate = () => {
  const [date, setDate] = useState(new Date());

  const handleChangeDate = (date) => {
    setDate(date);
  };

  return [date, handleChangeDate];
};
