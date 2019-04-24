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
    
    const model = this.getModel(collection);
    
    try {
      const result = await model.insertMany(data);
      return result.length;
    } 
    catch(error) {
      console.log(error);
    } 
    
  }

  async read(collection, condition) {
    
    const model = this.getModel(collection);

    try {
      return await model.find(condition);
    }
    catch(error) {
      console.log(error);
    }
  }

  async update(collection, condition, values) {

    const model = this.getModel(collection);
    try{
      const result = await model.updateMany(condition, {$set: values});
      return result.nModified;
    }
    catch(error) {
      console.log(error);
    }
  }

  async delete(collection, condition) {
    
    const model = this.getModel(collection);
    
    try{
      const res = await model.deleteMany(condition);
      return res.deletedCount
    }
    catch(error) {
      console.log(error);
    }
  }
}