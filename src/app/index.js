import {
  storeDataset,
  storeState,

  stateExists,
  datasetExists,
  loadState
} from './state';

class App {

  constructor() {
    this.prompter = undefined;
    this.currentDatabase = undefined;

    this.createAppFiles();
  }

  createAppFiles() {
    if (!stateExists()) storeState({
      datasets: [],
      currentDatabase: undefined
    });

    if (!datasetExists()) storeDataset({
      datasets: []
    });

  }

  changeDatabase(name) {
    const state = loadState();
    state.currentDatabase = name;
    storeState(state);
  }

  databases(list = []) {
    this.listOfDatabases = [
      ...list
    ];
    return this;
  }

  getDatabases() {
    return this.listOfDatabases;
  }

  getCurrentDatabase() {
    const state = loadState();
    return state.currentDatabase;
  }

  prompt(cmd) {
    if (cmd) this.prompter = cmd;
    return this;
  }

  play() {
    if (this.prompter) this.prompter.render();
  }
}

export default new App();