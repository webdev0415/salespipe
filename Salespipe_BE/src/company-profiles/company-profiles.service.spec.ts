import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyProfilesService } from './company-profiles.service';
import { CompanyProfile } from './entities/company-profile.entity';
import * as faker from 'faker';
import { FindQuery } from 'src/shared/paging';

describe('CompanyProfilesService', () => {
  let service: CompanyProfilesService;
  let find: jest.Mock;
  let findOne: jest.Mock;
  let save: jest.Mock;
  let update: jest.Mock;
  let remove: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    findOne = jest.fn();
    save = jest.fn();
    update = jest.fn();
    remove = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyProfilesService,
        {
          provide: getRepositoryToken(CompanyProfile),
          useValue: {
            find,
            findOne,
            save,
            update,
            delete: remove,
          },
        },
      ],
    }).compile();

    service = module.get<CompanyProfilesService>(CompanyProfilesService);
  });

  describe('When create new company profile', () => {
    describe('and company not create any profile yet', () => {
      beforeEach(async () => {
        find.mockReturnValue(Promise.resolve([undefined]));
      });

      it('should create new company-profile', async () => {
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        await service.create(dto);
        expect(save).toBeCalledWith(dto);
      });
    });

    describe('and company already create a profile', () => {
      beforeEach(async () => {
        find.mockReturnValue(
          Promise.resolve([
            {
              userId: faker.internet.userName(),
              email: faker.internet.email(),
              linked_in: faker.internet.url(),
              avatar: faker.internet.url(),
              headline: faker.random.words(20),
              description: faker.random.words(20),
              website: faker.internet.url(),
            },
          ]),
        );
      });

      it('should not create second profile for same company', () => {
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        expect(service.create(dto)).rejects.toThrowError();
      });
    });
  });

  describe('When find all company profiles', () => {
    it('Should find all company profiles', async () => {
      const query = {
        limit: faker.datatype.number(100),
        page: faker.datatype.number(100),
        sortBy: faker.datatype.string(),
        sortOrder: 'DESC',
        s: faker.datatype.string(),
        where: null,
      } as FindQuery<null>;

      await service.findAll(query);

      expect(find).toBeCalledWith({
        order: { [query.sortBy]: 'DESC' },
        take: query.limit,
        skip: query.limit * query.page,
      });
    });
  });

  describe('When find company profile by id', () => {
    it('Should find company profile by id', async () => {
      const id = faker.datatype.uuid();

      await service.findOne(id);

      expect(findOne).toBeCalledWith(id);
    });
  });

  describe('When find company profile by user id', () => {
    it('Should find company profile by id', async () => {
      const userId = faker.datatype.uuid();

      await service.findByUserId(userId);

      expect(find).toBeCalledWith({
        where: {
          userId,
        },
      });
    });
  });

  describe('When update company profile by id', () => {
    describe('When profile exits', () => {
      beforeEach(() => {
        findOne.mockReturnValue(
          Promise.resolve({
            userId: faker.internet.userName(),
            email: faker.internet.email(),
            linked_in: faker.internet.url(),
            avatar: faker.internet.url(),
            headline: faker.random.words(20),
            description: faker.random.words(20),
            website: faker.internet.url(),
          }),
        );
      });
      it('Should update company profile by id', async () => {
        const id = faker.datatype.uuid();
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        await service.update(id, dto);

        expect(update).toBeCalledWith(id, dto);
      });
    });

    describe("When profile doesn't exits", () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(null));
      });

      it('Should throw 404 error', async () => {
        const id = faker.datatype.uuid();
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        expect(service.update(id, dto)).rejects.toThrowError();
      });
    });
  });

  describe('When update company profile by user id', () => {
    describe('When profile exits', () => {
      const profileId = faker.datatype.uuid();
      beforeEach(() => {
        find.mockReturnValue(
          Promise.resolve([
            {
              id: profileId,
              userId: faker.internet.userName(),
              email: faker.internet.email(),
              linked_in: faker.internet.url(),
              avatar: faker.internet.url(),
              headline: faker.random.words(20),
              description: faker.random.words(20),
              website: faker.internet.url(),
            },
          ]),
        );
      });
      it('Should update company profile by user id', async () => {
        const userId = faker.datatype.uuid();
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        await service.updateByUserId(userId, dto);

        expect(update).toBeCalledWith(profileId, dto);
      });
    });

    describe("When profile doesn't exits", () => {
      beforeEach(() => {
        find.mockReturnValue(Promise.resolve([null]));
      });

      it('Should throw 404 error', async () => {
        const userId = faker.datatype.uuid();
        const dto = {
          userId: faker.internet.userName(),
          email: faker.internet.email(),
          linked_in: faker.internet.url(),
          avatar: faker.internet.url(),
          headline: faker.random.words(20),
          description: faker.random.words(20),
          website: faker.internet.url(),
        };

        expect(service.updateByUserId(userId, dto)).rejects.toThrowError();
      });
    });
  });

  describe('When remove company profile by id', () => {
    describe('When profile exits', () => {
      beforeEach(() => {
        findOne.mockReturnValue(
          Promise.resolve({
            userId: faker.internet.userName(),
            email: faker.internet.email(),
            linked_in: faker.internet.url(),
            avatar: faker.internet.url(),
            headline: faker.random.words(20),
            description: faker.random.words(20),
            website: faker.internet.url(),
          }),
        );
      });
      it('Should remove company profile by id', async () => {
        const id = faker.datatype.uuid();

        await service.remove(id);

        expect(remove).toBeCalledWith(id);
      });
    });

    describe("When profile doesn't exits", () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(null));
      });

      it('Should throw 404 error', async () => {
        const id = faker.datatype.uuid();

        expect(service.remove(id)).rejects.toThrowError();
      });
    });
  });
});
