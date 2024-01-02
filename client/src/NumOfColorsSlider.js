import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';

export default function NumOfColorsSlider() {
  const [inputValue, setInputValue] = useState(5);
  const onChange = (newValue) => {
    if (newValue != null && Number.isInteger(newValue)) {
      setInputValue(newValue);
    }
  };
  return (
    <div>
      <Row>
        <Col flex="auto">
          <Slider
            min={1}
            max={10}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col flex="10px" />
        <Col flex="60px">
          <InputNumber
            min={1}
            max={10}
            value={inputValue}
            style={{ width: '60px' }}
            onChange={onChange}
          />
        </Col>
      </Row>

    </div>
  );
};