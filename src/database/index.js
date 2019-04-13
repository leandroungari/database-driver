import MongoClientDB from './mongoclient';
import MongooseDB from './mongoose';

const mongoClient = {
  name: 'MongoClient',
  driver: new MongoClientDB()
};

const mongoose = {
  name: 'Mongoose',
  driver: new MongooseDB()
}

export {
  mongoClient,
  mongoose
}