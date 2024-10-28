import React from 'react';
import { InputNumber } from 'antd';

const InputNumberComponent = ({ value, day, templateId, mode, existingBlock, onChange }) => {
  const handleChange = (value) => {
    onChange(value, day, templateId, mode, existingBlock);
  };

  return (
    
      <InputNumber
        min={0}
        max={80}
        formatter={(value) => (value === '' || isNaN(value) ? '' : String(value).replace(/[^0-9]/, ''))}
        parser={(value) => value.replace(/[^\d]/g, '')}
        onChange={handleChange}
        value={mode === 'update' ? existingBlock?.Quantity : undefined}
      />
    
  );
};

export default InputNumberComponent;
