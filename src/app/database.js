import {
  loadState,
  storeState
} from './state';

class DatabaseManager {
  changeDatabase(name) {
    const state = loadState();
    state.currentDatabase = name;
    storeState(state);
  }

  getCurrentDatabase() {
    const state = loadState();
    return state.currentDatabase;
  }

  database(name) {
    
    return this;
  }

  create(collection, data) {
    console.log("create");
  }

  read(collection, condition) {
    console.log("read");
  }

  update(collection, condition, values) {
    console.log("update");
  }

  delete(collection, condition) {
    console.log("delete");
  }
}

export default new DatabaseManager();