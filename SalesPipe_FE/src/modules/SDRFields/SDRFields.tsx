import React from 'react';
import { Form, Row, Col, Button, Skeleton } from 'antd';

import './SDRFields.less';

import { SDRProfileView } from 'models/SDRProfileModel';
import * as SDRFIELDS from 'shared/sharedSDRFields';

type Props = {
  user?: SDRProfileView;
  loading?: boolean;
  onSubmit?: (values: SDRProfileView) => Promise<void>;
};
export const SDRFields: React.FC<Props> = ({
  onSubmit,
  user,
  loading
}: Props) => {
  const [form] = Form.useForm();
  const handleUpdateProfile = async (values: SDRProfileView): Promise<void> => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const validateSingleFormItem = (name: string): void => {
    form.validateFields([name]);
  };

  return !loading ? (
    <Form
      form={form}
      className="sdr-fields-module"
      layout="horizontal"
      onFinish={handleUpdateProfile}
      autoComplete="off"
      initialValues={user || undefined}>
      <Row gutter={16}>
        <Col span={8}>
          {SDRFIELDS.firstName(() => validateSingleFormItem('firstName'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.lastName(() => validateSingleFormItem('lastName'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.email(() => validateSingleFormItem('email'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.linkedin(() => validateSingleFormItem('linkedIn'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.phone(() => validateSingleFormItem('phone'))}
        </Col>

        <Col span={8}>{SDRFIELDS.country()}</Col>

        <Col span={8}>{SDRFIELDS.languages()}</Col>

        <Col span={8}>{SDRFIELDS.yose()}</Col>

        <Col span={8}>{SDRFIELDS.saleChannels()}</Col>

        <Col span={8}>{SDRFIELDS.saleSkills()}</Col>

        <Col span={8}>{SDRFIELDS.saleTools()}</Col>

        <Col span={8}>
          {SDRFIELDS.headline(() => validateSingleFormItem('headline'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.rate(() => validateSingleFormItem('rate'))}
        </Col>

        <Col span={8}>
          {SDRFIELDS.hoursPerWeek(() => validateSingleFormItem('hoursPerWeek'))}
        </Col>

        <Col span={24}>{SDRFIELDS.workHistory()}</Col>

        <Col span={24}>{SDRFIELDS.bio()}</Col>

        <Button type="primary" className="submit-form" htmlType="submit">
          Save
        </Button>
      </Row>
    </Form>
  ) : (
    <>
      {[...Array(3)].map((e) => (
        <Skeleton key={`skeleton-${e}`} />
      ))}
    </>
  );
};
