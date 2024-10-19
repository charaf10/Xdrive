import React from 'react';
import { Button, Tooltip } from 'antd';

const NavigationButtons = ({ onPrevious, onNext }) => {
  return (
    <div>
      
        <Button onClick={onPrevious}>Previous Week</Button>
      
        <Button onClick={onNext}>Next Week</Button>
      
    </div>
  );
};

export default NavigationButtons;
