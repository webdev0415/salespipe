import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  List,
  Modal,
  Descriptions,
  InputNumber,
  Tooltip
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { SDRFields } from 'modules';

import './User.less';
import { useParams } from 'react-router-dom';
import { SDRProfileModel } from 'models/SDRProfileModel';
import { SDRProfileService } from 'services/SDRProfileService';
import { ContractService } from 'services/ContractService';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

export const User: React.FC = () => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [userData, setUserData] = useState<SDRProfileModel | null>(null);
  const { id } = useParams<{ id: string }>();
  const { roles } = useSelector((state: RootState) => state.auth);

  const getById = useCallback(async () => {
    const profile = await SDRProfileService.getSDRProfileByUserId(id);

    setUserData(profile.data);
  }, [id]);

  const handleCalcFinalAmount = (hour: number, rateHour: number): void => {
    const finalVal = hour * rateHour + hour * rateHour * 0.3;

    setFinalAmount(finalVal);
  };

  const hireThisSDR = async () => {
    if (userData) {
      await ContractService.hireSDR({
        hiree: userData.userId,
        hireeEmail: userData.email || ''
      });
    }

    setIsBillModalOpen(false);
  };

  useEffect(() => {
    getById();
  }, [getById]);

  return (
    <div className="user-page">
      {userData && (
        <>
          <Card className="user" title={`${userData.firstName}'s User`}>
            <List
              itemLayout="horizontal"
              dataSource={[userData]}
              className="user-header"
              renderItem={(item: SDRProfileModel | null): any =>
                item && (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        key="open-modal"
                        onClick={() => setIsBillModalOpen(true)}>
                        Show hourly bill
                      </Button>
                    ]}>
                    <List.Item.Meta
                      avatar={<Avatar size="large" src={`${item.avatar}`} />}
                      title={
                        <div className="users-list-module__header">
                          <span className="users-list-module__name">
                            {`${item.firstName} ${item.lastName}`}
                          </span>
                          <Tooltip title="Verified" color="blue">
                            <CheckCircleOutlined className="users-list-module__verified-icon" />
                          </Tooltip>
                        </div>
                      }
                      description="User SDR"
                    />
                  </List.Item>
                )
              }
            />

            <Descriptions>
              <Descriptions.Item label="Full name">
                {`${userData.firstName} ${userData.lastName}`}
              </Descriptions.Item>
              <Descriptions.Item label="LinkedIn">
                <a href={userData.linkedIn || undefined}>{userData.linkedIn}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {userData.country}
              </Descriptions.Item>
              <Descriptions.Item label="Language">
                {userData.languages?.split(',').map((x) => {
                  return <span key={`language-${x}`}>{x}</span>;
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Years of experience">
                {userData.yose}
              </Descriptions.Item>
              <Descriptions.Item label="Industry experience">
                {userData.industries}
              </Descriptions.Item>
              <Descriptions.Item label="Sales channels">
                {userData.saleChannels?.split(',').map((x) => {
                  return <span key={`language-${x}`}>{x}</span>;
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Sales skills">
                {userData.saleSkills?.split(',').map((x) => {
                  return <span key={`language-${x}`}>{x}</span>;
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Sales tools">
                {userData.saleTools?.split(',').map((x) => {
                  return <span key={`language-${x}`}>{x}</span>;
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Bio">{userData.bio}</Descriptions.Item>
              <Descriptions.Item label="Gender">
                {userData.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Age">{userData.age}</Descriptions.Item>
              <Descriptions.Item label="Expression">
                {userData.expression}
              </Descriptions.Item>
              <Descriptions.Item label="Work history">
                {userData.workHistory}
              </Descriptions.Item>
              <Descriptions.Item label="Personal video">
                <a href={userData.video || undefined}>Link</a>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Modal
            title="Hourly bill"
            visible={isBillModalOpen}
            onCancel={(): void => setIsBillModalOpen(false)}
            footer={
              !roles?.includes('ADMIN') && [
                <Button
                  disabled={finalAmount === 0}
                  type="primary"
                  key="hire"
                  onClick={hireThisSDR}>
                  Hire this SDR
                </Button>
              ]
            }>
            <p>This SDR is billed at ${userData.rate} per hour.</p>
            <p>
              There can be 80 hours for Part-Time or 160 hours for Full-Time
            </p>
            <InputNumber
              placeholder="Enter hour per month"
              min={80}
              style={{ width: '100%', marginBottom: '1rem' }}
              onChange={(val: number): void =>
                handleCalcFinalAmount(val, userData.rate || 0)
              }
            />
            <p>SalesPipe charges a 30% fee per month.</p>
            <p>
              The total price for this SDR will be{' '}
              <span style={{ fontWeight: 'bold' }}>${finalAmount}</span> per
              month.
            </p>
          </Modal>

          <Modal
            title="Edit user"
            visible={isEditModalOpen}
            onCancel={(): void => setIsEditModalOpen(false)}
            footer={null}
            width={1000}>
            <SDRFields />
          </Modal>
        </>
      )}
    </div>
  );
};
