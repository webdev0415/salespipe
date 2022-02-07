import React, { useState, useEffect } from 'react';
import {
  List,
  Avatar,
  Skeleton,
  Row,
  Col,
  Select,
  DatePicker,
  Tooltip,
  Input,
  Button,
  Switch
} from 'antd';

import './UsersList.less';

const { Search } = Input;

import { Link } from 'react-router-dom';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { SDRProfileService } from 'services/SDRProfileService';

type ListData = {
  userId: string;
  isVerified: boolean;
  name: string;
  desc: string;
  avatar: string;
}[];

type Props = {
  admin?: boolean;
  setIsCreateModalOpen?: (val: boolean) => void;
  setUserIdModal?: (val: string) => void;
};

export const UsersList: React.FC<Props> = ({
  admin,
  setIsCreateModalOpen,
  setUserIdModal
}: Props) => {
  const [list, setList] = useState<ListData>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [list]);

  const loadData = async (filter?: any) => {
    let list = null;

    setIsLoading(true);
    if (admin) {
      list = await SDRProfileService.getAllSDRProfilesAvailable(filter);
    } else {
      list = await SDRProfileService.getAllSDRProfilesVerified(filter);
    }
    setIsLoading(false);
    setList(
      list.data?.map((user) => {
        return {
          userId: user.userId,
          isVerified: user.isVerified,
          name: user.firstName ?? '' + user.lastName ?? '',
          desc: user.bio ?? '',
          avatar: user.avatar ?? ''
        };
      }) ?? []
    );
  };
  const editUser = (id: string): void => {
    if (setUserIdModal && setIsCreateModalOpen) {
      setUserIdModal(id);
      setIsCreateModalOpen(true);
    }
  };

  const onChangeVerifies = async (
    userId: string,
    val: boolean
  ): Promise<void> => {
    setIsLoading(true);
    const x = await SDRProfileService.updateSDRProfilesVerified(userId, val);

    if (!x.error) {
      setList((oldList) => {
        const user = oldList.find((x) => x.userId === userId);

        if (user) user.isVerified = !user.isVerified;

        return [...oldList];
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  const onSearch = (val: any) => {
    loadData({ s: val });
  };
  const loadMore = (): JSX.Element | null => {
    if (!isLoading) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
            height: 32,
            lineHeight: '32px'
          }}>
          {false && <Button>Load more</Button>}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <Row gutter={12} className="users-list-module__filters">
        <Col span={12}>
          <Search
            className="users-list-module__search"
            placeholder='Try "Outbound", "Hubspot", "LinkedIn'
            enterButton="Search"
            onSearch={onSearch}
            loading={isLoading}
          />
        </Col>
      </Row>

      <List
        loading={isLoading}
        itemLayout="horizontal"
        loadMore={loadMore()}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={`/user/${item.userId}`} key="visit-profile">
                Visit user profile
              </Link>,
              admin && setIsCreateModalOpen && (
                <>
                  <Button
                    style={{
                      marginRight: '5px'
                    }}
                    shape="round"
                    onClick={() => {
                      editUser(item.userId);
                    }}
                    icon={<EditOutlined />}>
                    Edit
                  </Button>
                  <Switch
                    onChange={(val: boolean) => {
                      onChangeVerifies(item.userId, val);
                    }}
                    checkedChildren="Verified"
                    unCheckedChildren="Unverified"
                    checked={item.isVerified}
                  />
                </>
              )
            ]}>
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={<Avatar size="large" src={item.avatar} />}
                title={
                  <div className="users-list-module__header">
                    <span className="users-list-module__name">{item.name}</span>
                    <Tooltip title="Verified" color="blue">
                      <CheckCircleOutlined className="users-list-module__verified-icon" />
                    </Tooltip>
                  </div>
                }
                description={item.desc}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
