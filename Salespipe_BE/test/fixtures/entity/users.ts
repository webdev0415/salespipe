import { UserType } from 'src/users/entities/user.entity';

export const users = [
  {
    type: UserType.SYSTEM,
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'password',
    firstName: 'admin',
    lastName: 'admin',
    isActive: true,
    roles: [
      {
        id: '09fa1762-0948-11ec-9b25-0242ac140002',
      },
    ],
    id: '4f0a22bd-6942-4590-b1b5-e5c1ad0f763b',
    createdAt: '2021-08-31T03:39:47.783Z',
    updatedAt: '2021-08-31T03:39:47.783Z',
    version: 1,
  },
  {
    type: UserType.SDR,
    username: 'user',
    email: 'user@gmail.com',
    password: 'password',
    firstName: 'user',
    lastName: 'user',
    isActive: true,
    roles: [
      {
        id: '90df268d-0947-11ec-9b25-0242ac140002',
      },
    ],
    id: '00f99098-0a48-11ec-bd3f-0242ac140002',
    createdAt: '2021-08-31T03:39:47.783Z',
    updatedAt: '2021-08-31T03:39:47.783Z',
    version: 1,
  },
  {
    type: UserType.HIRER,
    username: 'hirer',
    email: 'hirer@gmail.com',
    password: 'password',
    firstName: 'hirer',
    lastName: 'hirer',
    isActive: true,
    roles: [
      {
        id: '0378cee7-0948-11ec-9b25-0242ac140002',
      },
    ],
    id: '0a089336-0a48-11ec-bd3f-0242ac140002',
    createdAt: '2021-08-31T03:39:47.783Z',
    updatedAt: '2021-08-31T03:39:47.783Z',
    version: 1,
  },
];
