export function mockModelFactory(mock?: any) {
  return {
    new: jest.fn().mockResolvedValue(mock),
    constructor: jest.fn().mockResolvedValue(mock),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    findById: jest.fn(),
  };
}
