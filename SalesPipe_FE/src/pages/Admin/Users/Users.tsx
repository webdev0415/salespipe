import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, message, Modal } from 'antd';

import { SDRFields, UsersList } from 'modules';

import './Users.less';
import { SDRProfileService } from 'services/SDRProfileService';
import { SDRProfileModel, SDRProfileView } from 'models/SDRProfileModel';

export const Users: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userIdModal, setUserIdModal] = useState<string | undefined>(undefined);
  const [userModal, setUserModal] = useState<SDRProfileView | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (userIdModal) {
      setLoading(true);
      const userResp = await SDRProfileService.getSDRProfileByUserId(
        userIdModal
      );

      if (userResp.data) {
        const parsedData = {
          ...userResp.data,
          languages: userResp.data.languages?.split(',') ?? [],
          saleSkills: userResp.data.saleSkills?.split(',') ?? [],
          saleTools: userResp.data.saleTools?.split(',') ?? []
        };

        setUserModal(parsedData);
      }

      setLoading(false);
    }
  }, [userIdModal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetModalFields = () => {
    setUserIdModal(undefined);
    setUserModal(undefined);
  };
  const updateOrSave = useCallback(
    async (values: SDRProfileView) => {
      setLoading(true);
      if (userModal && userIdModal) {
        const model = {
          ...values,
          id: userModal.id,
          userId: userModal.userId,
          languages: values.languages.join(','),
          saleSkills: values.saleSkills.join(','),
          saleTools: values.saleTools.join(',')
        } as SDRProfileModel;

        await SDRProfileService.updateSDRProfile(model);
      } else {
        const model = {
          ...values,
          languages: values.languages.join(','),
          saleSkills: values.saleSkills.join(','),
          saleTools: values.saleTools.join(','),
          industries: [],
          type: 'SDR'
        } as SDRProfileModel;

        await SDRProfileService.createSDRProfile(model);
      }
      setLoading(false);
      setIsCreateModalOpen(false);
      message.success('Successful');
      await fetchData();
    },
    [userModal, userIdModal]
  );

  return (
    <div className="users-admin-page">
      <Card title="How would you like to use SalesPipe?">
        <UsersList
          admin
          setIsCreateModalOpen={setIsCreateModalOpen}
          setUserIdModal={setUserIdModal}
        />
      </Card>
      {isCreateModalOpen && (
        <Modal
          title={userIdModal ? 'Edit User' : 'Create user'}
          visible={isCreateModalOpen}
          onCancel={(): void => {
            setIsCreateModalOpen(false);
            resetModalFields();
          }}
          footer={null}
          width={1000}>
          <SDRFields
            onSubmit={updateOrSave}
            user={userModal}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};
