import {
  MongoClient
} from "mongodb";

const url = 'mongodb://localhost:27017';

export default class MongoClientDB {
  constructor() {
    this.database = undefined;
    this.client = new MongoClient(url, { useNewUrlParser: true });
  }

  close() {
    this.database = undefined;
    this.client.close();
  }

  async connect(databaseName) {
    await this.client.connect();
    this.database = await this.client.db(databaseName);
    return this;
  }

  async create(collectionName, data) {
    
    try {
      const result = await this.database
      .collection(collectionName)
      .insertMany(data);
      return result.insertedCount;
    }
    catch(error) {
      console.log(error);
    }
    
    throw new Error("mongo-db insert error");
  }

  async read(collection, condition) {
    try {
      
      const result = await this.database
      .collection(collection)
      .find(condition)
      .toArray();
      
      return result;
    }
    catch(error) {
      console.log(error);
    }
    throw new Error("mongo-db read error");
  }

  async update(collection, condition, values) {
    try {
      const result = await this.database
      .collection(collection)
      .updateMany(condition, {$set: values});

      return result.upsertedCount;
    } 
    catch(error) {
      console.log(error);
    }

    throw new Error("mongo-db update error");
  }

  async delete(collection, condition) {
    try {
      const result = await this.database
      .collection(collection)
      .deleteMany(condition);

      return result.deleteCount;
    }
    catch(error) {
      console.log(error);
    }

    throw new Error("mongo-db delete error");
  }
}