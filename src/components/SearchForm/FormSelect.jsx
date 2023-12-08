import React from 'react';

function FormSelect({ listData, onChange }) {
  return (
    <select name="시/도" onChange={onChange}>
      {listData &&
        listData.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
    </select>
  );
}

export default FormSelect;
