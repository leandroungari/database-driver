import mongoose from "mongoose";
import {
  jogadoresCompleto,
  jogadoresReduzido
} from './schemas';

const schemas = {
  "jogadores-reduzido": jogadoresReduzido,
  "jogadores-completo": jogadoresCompleto
};

export default class MongooseDB {
  constructor() {
    
  }

  close() {
    
  }

  async connect(database) {
    await mongoose.connect(
      `mongodb://localhost:27017/${database}`,
      {useNewUrlParser: true}
    );

    return this;
  }

  getModel(model) {
    if(!Object.keys(schemas).includes(model)) throw new Error('Schema not found!');
    return mongoose.model(model, schemas[model]);
  }

  async create(collection, data) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.insertMany(data, (error, docs) => {
        if(error) reject(error);
        resolve(docs.length);
      });
    });
  }

  async read(collection, condition) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.find(condition).exec((error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  update(collection, condition, values) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.updateMany(condition, values, (err, res) => {
        if(err) reject(err);
        resolve(res.nModified);
      })
    });
  }

  delete(collection, condition) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.deleteMany(condition, (err, res) => {
        if(err) reject(err);
        resolve(res.deletedCount);
      });
    });
  }
}