import {
  storeDataset,
  storeState,
  
  stateExists,
  datasetExists
} from './state';

class App {

  constructor() {
    this.prompter = undefined;
   
    this.createAppFiles();
  }

  createAppFiles() {
    if (!stateExists()) storeState({
      datasets: []
    });

    if (!datasetExists()) storeDataset({
      datasets: []
    });

  }

  databases(list = []) {
    this.listOfDatabases = [
      ...list
    ];
    return this;
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