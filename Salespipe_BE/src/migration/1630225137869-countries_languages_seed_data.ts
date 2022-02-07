/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class countriesLanguagesSeedData1630225137869
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('countries').save([
      {
        id: '511f0dcf-3071-4b91-aa29-d288ecae5a53',
        code: 'af',
        name: 'Afghanistan',
      },
      {
        id: 'dba7019a-29b7-45ff-a659-1e10615e13ff',
        code: 'al',
        name: 'Albania',
      },
      {
        id: 'ea2ce7cb-b8a2-4f40-a951-d9d456330dcf',
        code: 'ag',
        name: 'Algeria',
      },
      {
        id: 'f9604cab-3fc6-4a92-9cd2-ed19a7ea29fe',
        code: 'mx',
        name: 'Mexico',
      },
    ]);

    await getRepository('languages').save([
      {
        id: '253c634a-59ae-451f-9dac-d2362ccf6b24',
        code: 'en',
        name: 'English',
      },
      {
        id: '5f7bacb6-d6e6-4211-b04c-4ed655bec52c',
        code: 'ko',
        name: 'Korean',
      },
      {
        id: '88f78d39-790c-4597-91e6-df97b4b948a2',
        code: 'fr',
        name: 'French',
      },
    ]);

    await getRepository('industries').save([
      {
        id: '0ca30200-b277-4912-a3f4-cf1e9e71764c',
        code: 'mkt',
        name: 'Marketing',
      },
      {
        id: 'bcbf6c7e-0e9b-4bf4-8af9-2e04a94f3a40',
        code: 'sam',
        name: 'Sale manager',
      },
      {
        id: 'f0e8776c-0c5d-4920-9c32-cd323519c641',
        code: 'cu',
        name: 'Customer support',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
