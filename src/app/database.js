import {
  loadState,
  storeState
} from './state';

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
      return await this.currentDatabase.create(
        collection, 
        data
      );
    }
    catch(error) {
      console.error(error);
    }
  }

  async read(collection, condition) {
    
    try {
      return await this.currentDatabase.read(
        collection, 
        condition
      );
    }
    catch(error) {
      console.error(error);
    }
  }

  async update(collection, condition, values) {
    
    try {
      return await this.currentDatabase.update(
        collection,
        condition,
        values
      );
    }
    catch(error) {
      console.error(error);
    }
  }

  async delete(collection, condition) {
    
    try {
      return await this.currentDatabase.delete(
        collection,
        condition
      );
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