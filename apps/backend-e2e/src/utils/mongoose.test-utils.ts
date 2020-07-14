import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, DocumentDefinition } from 'mongoose';

@Injectable()
export class MongooseTestUtils {
  constructor(@InjectConnection() private connection: Connection) {
  }

  async clearAll() {
    Object.values(this.connection.collections).forEach(val => this.connection.dropCollection(val.name).catch(e => e));
  }

  async save<T extends Function, V>(Model: T, object: DocumentDefinition<V>): Promise<DocumentDefinition<V>> {
    return this.connection.models[Model.name].create(object as any);
  }

  async saveMany<T extends Function, V>(Model: T, objects: DocumentDefinition<V>[]): Promise<DocumentDefinition<V>[]> {
    return this.connection.models[Model.name].create(objects as any);
  }

  async getAll<T extends Function>(Model: T) {
    return this.connection.models[Model.name].find();
  }

}
