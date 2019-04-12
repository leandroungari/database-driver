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
}

export default new DatabaseManager();