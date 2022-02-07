import React, { useEffect, useState } from 'react';
import { Card, Descriptions } from 'antd';

import './Profile.less';
import { SDRProfileService } from 'services/SDRProfileService';
import { SDRProfileModel } from 'models/SDRProfileModel';
import { LoadingOutlined } from '@ant-design/icons';

export const Profile: React.FC = () => {
  const [userData, setUserData] = useState<SDRProfileModel | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    const res = await SDRProfileService.getMySDRProfile();

    setIsLoading(false);
    if (res.data) {
      setUserData(res.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <Card className="profile" title="My profile">
        {!isLoading ? (
          userData && (
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
              <Descriptions.Item label="Bio" span={3}>
                {userData.bio}
              </Descriptions.Item>
              <Descriptions.Item label="Work history">
                {userData.workHistory}
              </Descriptions.Item>
            </Descriptions>
          )
        ) : (
          <LoadingOutlined />
        )}
      </Card>
    </div>
  );
};
