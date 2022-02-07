import React, { useState } from 'react';
import { Button, Form, Input, Upload, InputNumber, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactFullpage from '@fullpage/react-fullpage';

import './JoinUsCompany.less';
import { FileService } from 'services/FileService';
import { CompanyProfileService } from 'services/CompanyProfileService';
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

enum fields {
  company = 1,
  firstName,
  lastName,
  email,
  title,
  linkedIn,
  website,
  phone,
  position,
  time,
  headline,
  description,
  saleTools,
  targetCustomer,
  teamSize
}

function getBase64(img: any, callback: any): void {
  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const JoinUsCompany: React.FC = () => {
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleChange = (info: any): void => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);

      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imgUrl: string) => {
        setImageUrl(imgUrl);
        setUploadLoading(false);
      });
    }
  };

  const handleJoinUsCompany = async (values: any): Promise<void> => {
    values.avatar = values.avatar.file.response.Location;
    const res = await CompanyProfileService.createCompanyProfile({
      ...values,
      type: 'HIRER'
    });

    if (!res.error) {
      setIsSuccess(true);
    }
  };

  const handleCatchFormError = (error: any, fullpageApi: any): void => {
    if (error && error.errorFields.length > 0) {
      fullpageApi.moveTo(fields[error.errorFields[0].name]);
    }
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const validateSingleFormItem = (name: string, fullpageApi: any): void => {
    form.validateFields([name]).then(() => {
      fullpageApi.moveSectionDown();
    });
  };

  return (
    <ReactFullpage
      scrollingSpeed={500}
      render={({ fullpageApi }): JSX.Element => {
        return (
          <ReactFullpage.Wrapper>
            <Form
              form={form}
              className="join-us-company-page"
              layout="vertical"
              onFinish={handleJoinUsCompany}
              onFinishFailed={(props): void =>
                handleCatchFormError(props, fullpageApi)
              }
              autoComplete="off">
              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="company"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your company name'
                      }
                    ]}>
                    <Input
                      placeholder="Company name"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('company', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('company', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name'
                      }
                    ]}>
                    <Input
                      placeholder="First Name"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('firstName', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('firstName', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="lastName"
                    rules={[
                      { required: true, message: 'Please input your last name' }
                    ]}>
                    <Input
                      placeholder="Last Name"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('lastName', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('lastName', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Please input your email address'
                      }
                    ]}>
                    <Input
                      placeholder="Email address"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('email', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('email', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="title"
                    rules={[
                      { required: true, message: 'Please input your title' }
                    ]}>
                    <Input
                      placeholder="Title"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('title', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('title', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="linkedIn"
                    rules={[
                      {
                        required: true,
                        type: 'url',
                        message: 'Please input your linkedIn URL'
                      }
                    ]}>
                    <Input
                      placeholder="LinkedIn URL"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('linkedIn', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('linkedIn', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="website"
                    rules={[
                      {
                        required: true,
                        type: 'url',
                        message: 'Please input your website URL'
                      }
                    ]}>
                    <Input
                      placeholder="Website URL"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('website', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('website', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number'
                      }
                    ]}>
                    <Input
                      placeholder="Phone number"
                      size="large"
                      style={{ width: '100%' }}
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('phone', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('phone', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="position"
                    rules={[
                      { required: true, message: 'Please select one option' }
                    ]}>
                    <Select
                      size="large"
                      placeholder="What do you need help with?">
                      <Option value="outbound">Outbound</Option>
                      <Option value="inbound">Inbound</Option>
                      <Option value="closing">Closing</Option>
                      <Option value="all">All of above</Option>
                      <Option value="else">Something else</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('position', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="time"
                    rules={[
                      { required: true, message: 'Please select one option' }
                    ]}>
                    <Select size="large" placeholder="Full time or part time?">
                      <Option value="FULLTIME">Full-time</Option>
                      <Option value="PARTTIME">Part-time</Option>
                      <Option value="BOTH">Both</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('time', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="headline"
                    rules={[
                      { required: true, message: 'Please input your headline' }
                    ]}>
                    <Input
                      placeholder="Headline"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('headline', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('headline', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your description'
                      }
                    ]}>
                    <TextArea placeholder="Input your description" rows={4} />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('description', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="saleTools"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your sales tools'
                      }
                    ]}>
                    <Input
                      placeholder="Sales tools"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('saleTools', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('saleTools', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="targetCustomer"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your target customer'
                      }
                    ]}>
                    <Input
                      placeholder="Who is your target customer?"
                      size="large"
                      onPressEnter={(e): void => {
                        e.preventDefault();
                        validateSingleFormItem('targetCustomer', fullpageApi);
                      }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('targetCustomer', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item
                    name="teamSize"
                    rules={[
                      { required: true, message: 'Please select one option' }
                    ]}>
                    <Select
                      size="large"
                      placeholder="Size of your current sales team?">
                      <Option value="0">0</Option>
                      <Option value="1-2">1-2</Option>
                      <Option value="3-5">6-10</Option>
                      <Option value="6-10">6-10</Option>
                      <Option value="11-20">11-20</Option>
                      <Option value="20+">20+</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('teamSize', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item label="Profile picture" name="avatar">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      action={FileService.uploadImageUrl}
                      onChange={handleChange}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign up
                  </Button>
                </div>
              </div>
            </Form>
            {isSuccess && <Redirect to="/users" push />}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};
