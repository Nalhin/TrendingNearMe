export function mockModelFactory() {
  return {
    new: jest.fn().mockResolvedValue(null),
    constructor: jest.fn().mockResolvedValue(null),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    findById: jest.fn(),
  };
}
