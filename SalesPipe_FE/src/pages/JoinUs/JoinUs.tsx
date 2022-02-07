import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import './JoinUs.less';

const { Title, Paragraph } = Typography;

export const JoinUs: React.FC = () => {
  const history = useHistory();

  const handleRedirectCompany = (): void => {
    history.push('/join-us/company');
  };

  const handleRedirectSDR = (): void => {
    history.push('/join-us/sdr');
  };

  return (
    <div className="join-us-page">
      <section className="choose-method">
        <Title className="choose-method__title" level={2}>
          What is your goal with SalesPipe?
        </Title>
        <Row>
          <Col span={11}>
            <div className="choose-method__item">
              <Button
                className="choose-method__item-btn"
                size="large"
                type="primary"
                onClick={handleRedirectCompany}>
                HIRE SDR
              </Button>
              <Paragraph className="choose-method__item-desc">
                Discover and hire vetted SDRs customized for what you need.
              </Paragraph>
            </div>
          </Col>
          <Col span={11}>
            <div className="choose-method__item">
              <Button
                className="choose-method__item-btn"
                size="large"
                type="primary"
                onClick={handleRedirectSDR}>
                WORK AS SDR
              </Button>
              <Paragraph className="choose-method__item-desc">
                Apply to become a Verified SDR and get work with companies.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};
