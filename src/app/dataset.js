import fs from "fs";

import {
  loadState,
  storeState,
  loadDataset,
  storeDataset,
} from "./state";

class DatasetManager {

  createDataset(name, path) {
    let data;
    if (path.endsWith('.json')) {
      data = readJSONFile(path);
    }
    else if (path.endsWith('.csv')) {
      data = readCSVFile(path);
    }
    else {
      console.log('Format not supported');
      return;
    }

    const state = loadState();
    if(
      state.datasets
      .map(a => a.name)
      .includes(name)
    ) return;

    state.datasets = [
      ...state.datasets,
      {name, size: data.length}
    ];
    storeState(state);

    const file = loadDataset();
    file.datasets = [
      ...file.datasets,
      {name, data}
    ];
    storeDataset(file);
  }

  deleteDataset(name) {
    const state = loadState();
  
    if (
      !state.datasets
      .map(a => a.name)
      .includes(name)
    ) return;
  
    state.datasets = 
      state.datasets
      .filter(a => a.name !== name);
    storeState(state);
  
    const file = loadDataset();
    file.datasets = 
      file.datasets
      .filter(a => a.name !== name);
    storeDataset(file);
  }
  
  listDataset() {
    const state = loadState();
    return state.datasets;
  }
  
  thereIsDataset(name) {
  
    return this.listDataset()
    .map(dataset => dataset.name)
    .includes(name);
  }
  
  getDataset(name) {
    const file = loadDataset();
    
    return file.datasets.filter(dataset => {
      return dataset.name = name;
    })[0];
  }
}


const readCSVFile = filePath => {
    const data = fs
      .readFileSync(filePath, "utf8");
    const [header, ...items] = new String(data).split("\n");
  
    const headerItems = header.split(",");
    if (items[items.length - 1] === '') items.pop(); 
    const result = items.map(item => {

      const element = {};
      const itemValues = item.split(",");
      headerItems.forEach((headerItem, index) => {
        element[headerItem] = itemValues[index];
      })
      return element;
    });

  return result;
}

const readJSONFile = filepath => {
  const fileBuffer = fs
    .readFileSync(filepath, "utf8");
  return JSON.parse(new String(fileBuffer));
}

export default new DatasetManager();