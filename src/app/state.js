import fs from "fs";

const stateFilePath = "./app.json";
const datasetFilePath = "./dataset.json";

const load = (filePath) => {
  const fileBuffer = fs.readFileSync(
    filePath, "utf8"
  );
  return JSON.parse(fileBuffer);
}

const store = (filePath, data) => {
 
  const contentString = JSON.stringify(data);
  fs.writeFileSync(filePath, contentString);
}

const exists = path => fs.existsSync(path);

const loadState = () => 
  load(stateFilePath);
const storeState = state => 
  store(stateFilePath, state);
const stateExists = () => 
  exists(stateFilePath);


const loadDataset = () =>
  load(datasetFilePath);
const storeDataset = dataset => 
  store(datasetFilePath, dataset);
const datasetExists = () => 
  exists(datasetFilePath);
  
export {
  loadState,
  storeState,
  stateExists,
  
  loadDataset,
  storeDataset,
  datasetExists,
}