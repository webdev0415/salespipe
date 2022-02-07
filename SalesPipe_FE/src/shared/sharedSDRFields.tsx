import React, { useState } from 'react';
import { Button, Form, Input, Select, InputNumber, Upload } from 'antd';
import { Languages } from 'common/helper/languages';
import { Countries } from 'common/helper/countries';
const { TextArea } = Input;
const { Option } = Select;

export const firstName = (validate?: any) => (
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
        validate();
      }}
    />
  </Form.Item>
);
export const lastName = (validate?: any) => (
  <Form.Item
    name="lastName"
    rules={[{ required: true, message: 'Please input your last name' }]}>
    <Input
      placeholder="Last Name"
      size="large"
      onPressEnter={(e): void => {
        e.preventDefault();
        validate();
      }}
    />
  </Form.Item>
);
export const email = (validate?: any) => (
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
        validate();
      }}
    />
  </Form.Item>
);
export const linkedin = (validate?: any) => (
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
        validate();
      }}
    />
  </Form.Item>
);

export const phone = (validate?: any) => (
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
        validate();
      }}
    />
  </Form.Item>
);
export const country = () => (
  <Form.Item
    name="country"
    rules={[{ required: true, message: 'Please select your country' }]}>
    <Select showSearch size="large" placeholder="Country">
      {Countries.map((country, idx) => (
        <Option key={idx} value={country.label}>
          {country.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
);
export const languages = () => (
  <Form.Item
    name="languages"
    rules={[{ required: true, message: 'Please select your language' }]}>
    <Select mode="multiple" showSearch size="large" placeholder="Language">
      {Languages.map((lang, idx) => (
        <Option key={idx} value={lang.value}>
          {lang.value}
        </Option>
      ))}
    </Select>
  </Form.Item>
);
export const yose = () => (
  <Form.Item
    name="yose"
    rules={[
      {
        required: true,
        message: 'Please select your years of sales experience'
      }
    ]}>
    <Select size="large" placeholder="Years of sales experience">
      <Option value="1-3">1-3 years</Option>
      <Option value="3-5">3-5 years</Option>
      <Option value="5">+5 years</Option>
    </Select>
  </Form.Item>
);
export const saleChannels = () => (
  <Form.Item
    name="saleChannels"
    rules={[
      {
        required: true,
        message: 'Please select your sales channels'
      }
    ]}>
    <Select size="large" placeholder="Your sales channels">
      <Option value="email">Email</Option>
      <Option value="phone">Phone</Option>
      <Option value="social">Social</Option>
      <Option value="none">None</Option>
    </Select>
  </Form.Item>
);
export const saleSkills = () => (
  <Form.Item
    name="saleSkills"
    rules={[
      {
        required: true,
        message: 'Please input your sales skills'
      }
    ]}>
    <Select mode="multiple" size="large" placeholder="Sales skills">
      <Option value="skill1">Skill1</Option>
      <Option value="skill2">Skill2</Option>
      <Option value="skill3">Skill3</Option>
    </Select>
  </Form.Item>
);
export const saleTools = () => (
  <Form.Item
    name="saleTools"
    rules={[
      {
        required: true,
        message: 'Please input your sale tools'
      }
    ]}>
    <Select mode="multiple" size="large" placeholder="Sale tools">
      <Option value="tool1">Tool1</Option>
      <Option value="tool2">Tool2</Option>
      <Option value="tool3">Tool3</Option>
    </Select>
  </Form.Item>
);
export const headline = (validate?: any) => (
  <Form.Item
    name="headline"
    rules={[{ required: true, message: 'Please input your headline' }]}>
    <Input
      placeholder="Headline"
      size="large"
      onPressEnter={(e): void => {
        e.preventDefault();
        validate();
      }}
    />
  </Form.Item>
);
export const bio = () => (
  <Form.Item
    name="bio"
    rules={[{ required: true, message: 'Please input your bio' }]}>
    <TextArea placeholder="Bio" rows={4} />
  </Form.Item>
);
export const rate = (validate?: any) => (
  <Form.Item
    name="rate"
    rules={[
      {
        required: true,
        message: 'Please input your hourly rate'
      }
    ]}>
    <Input
      placeholder="Hourly rate/USD"
      size="large"
      style={{ width: '100%' }}
      onPressEnter={(e): void => {
        e.preventDefault();
        validate();
      }}
    />
  </Form.Item>
);
export const hoursPerWeek = (validate?: any) => (
  <Form.Item
    name="hoursPerWeek"
    rules={[
      {
        required: true,
        type: 'number',
        message: 'Please input how many hours per week'
      }
    ]}>
    <InputNumber
      placeholder="How many hours per week ?"
      size="large"
      style={{ width: '100%' }}
      onPressEnter={(e): void => {
        e.preventDefault();
        validate();
      }}
    />
  </Form.Item>
);
export const workHistory = () => (
  <Form.Item
    name="workHistory"
    rules={[
      {
        required: true,
        message: 'Please input your work history'
      }
    ]}>
    <TextArea placeholder="Work history" rows={4} />
  </Form.Item>
);
