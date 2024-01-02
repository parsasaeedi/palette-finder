import { Col, InputNumber, Row, Slider } from 'antd';

export default function NumOfColorsSlider(props) {
  const onChange = (newValue) => {
    if (newValue != null && Number.isInteger(newValue)) {
      props.setNumOfColors(newValue);
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
            value={typeof props.numOfColors === 'number' ? props.numOfColors : 0}
          />
        </Col>
        <Col flex="10px" />
        <Col flex="60px">
          <InputNumber
            min={1}
            max={10}
            value={props.numOfColors}
            style={{ width: '60px' }}
            onChange={onChange}
          />
        </Col>
      </Row>

    </div>
  );
};