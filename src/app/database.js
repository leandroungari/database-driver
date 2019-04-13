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

  database() {
    this.currentDatabase = app
    .getDatabases()
    .filter(database => {
      return database.name === this.getCurrentDatabase();
    })[0].driver;
    return this;
  }

  create(collection, data) {
    this.currentDatabase.create(
      collection, 
      data
    )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  read(collection, condition) {
    this.currentDatabase.read(
      collection, 
      condition
    )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  update(collection, condition, values) {
    this.currentDatabase.update(
      collection,
      condition,
      values
    )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  delete(collection, condition) {
    this.currentDatabase.delete(
      collection,
      condition
    )
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  }

  close() {
    this.currentDatabase.close();
  }
}

export default new DatabaseManager();