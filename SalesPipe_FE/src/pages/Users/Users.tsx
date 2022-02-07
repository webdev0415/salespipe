import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';

import { SDRFields, UsersList } from 'modules';

import './Users.less';

export const Users: React.FC = () => {
  return (
    <div className="users-page">
      <Card title="How would you like to use SalesPipe?">
        <UsersList />
      </Card>
    </div>
  );
};
