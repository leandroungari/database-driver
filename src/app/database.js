import {
  loadState,
  storeState
} from './state';

import Metric from './metrics';

import app from './index.js';

class DatabaseManager {

  constructor() {
    this.currentDatabase = undefined;
  }

  changeDatabase(name) {
    const state = loadState();
    state.currentDatabase = name;
    storeState(state);
  }

  getCurrentDatabase() {
    const state = loadState();
    return state.currentDatabase;
  }

  async database(name) {
    try {
      
      this.currentDatabase = app
      .getDatabases()
      .filter(database => {
        return database.name === this.getCurrentDatabase();
      })[0].driver;
      
      await this.currentDatabase.connect(name);
    }
    catch(error) {
      console.error(`Connection error: ${error}`);
    }
    return this;
  }

  async create(collection, data) {

    try {
      const metric = new Metric();
      metric.start();
      const result = await this.currentDatabase.create(
        collection, 
        data
      );
      metric.stop();

      return {
        result,
        stats: metric.result()
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async read(collection, condition) {
    
    try {
      const metric = new Metric();
      metric.start();
      const result =  await this.currentDatabase.read(
        collection, 
        condition
      );
      metric.stop();
      return {
        result,
        stats: metric.result()
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async update(collection, condition, values) {
    
    try {
      const metric = new Metric();
      metric.start();
      const result = await this.currentDatabase.update(
        collection,
        condition,
        values
      );
      metric.stop();
      return {
        result,
        stats: metric.result()
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async delete(collection, condition) {
    
    try {
      const metric = new Metric();
      metric.start();
      const result = await this.currentDatabase.delete(
        collection,
        condition
      );
      metric.stop();
      return {
        result,
        stats: metric.result()
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async close() {
    this.currentDatabase.close();
  }
}

export default new DatabaseManager();