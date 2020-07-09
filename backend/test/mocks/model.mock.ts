export class MockModel {
  constructor(private data) {
  }

  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn()
  static findOne = jest.fn()
  static findOneAndUpdate = jest.fn()
  static deleteOne = jest.fn()
}
