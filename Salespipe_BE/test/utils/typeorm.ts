export function createQueryBuilderMock() {
  return jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue('0x0'),
  });
}

export function createRepositoryMock() {
  return jest.fn().mockReturnValue({
    metadata: {
      columns: [],
      relations: [],
    },
    create: jest.fn().mockReturnThis(),
    save: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
  });
}
