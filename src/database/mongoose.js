import mongoose from "mongoose";
import {
  jogadores
} from './schemas';

const schemas = {
  jogadores
};

export default class MongooseDB {
  constructor() {
    
  }

  close() {
    
  }

  async connect(database) {
    await mongoose.connection(
      `mongodb://localhost:27017/${database}`
    );

    return this;
  }

  getModel(model) {
    if(!Object.keys().includes(model)) throw new Error('Schema not found!');
    return mongoose.model(model, schemas[model]);
  }

  async create(collection, data) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.insertMany(data, (error, docs) => {
        if(error) reject(error);
        resolve(docs);
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
        resolve(res);
      })
    });
  }

  delete(collection, condition) {
    return new Promise((resolve, reject) => {
      const model = this.getModel(collection);
      model.deleteMany(condition, (err, res) => {
        if(err) reject(err);
        resolve(res);
      });
    });
  }
}