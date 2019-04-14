import databaseManager from '../app/database';
import datasetManager from '../app/dataset';
import { saveStats } from '../app/stats';


export const initialAnswer = async (answer, prompt) => {
  
  switch(answer) {
    case 'Select a driver':
      await prompt.makeQuestion('select-driver');
      break;

    case 'Dataset manipulation':
      await prompt.makeQuestion('dataset');
      break;

    case 'Database operations':
      await prompt.makeQuestion('database');
      break;
    default:
      await prompt.makeQuestion('close');
  }
};

export const selectDriverAnswer = async (answer) => {
  databaseManager.changeDatabase(answer);
  console.log(
    `Database selected: ${databaseManager.getCurrentDatabase()}`
  );
}

export const optionsDatasetsAnswer = async (answer, prompt) => {
  switch(answer) {
    case 'Create dataset':
      await prompt.makeQuestion('create-dataset');
      break;
    
    case 'List all datasets':
      await prompt.makeQuestion('list-all-datasets');
      break;

    case 'Remove dataset':
      await prompt.makeQuestion('remove-dataset');
      break;
  }
}

export const createDatasetAnswer = async ({name, path}) => {
  datasetManager.createDataset(name, path);
  console.log(`Dataset ${name} created`);
}

export const listDatasetAnswer = async () => {
  console.log("\nList of datasets:");
  datasetManager.listDataset().forEach(({name, size}) => {
    console.log(`#${name} (${size})`);
  });
}

export const removeDatasetAnswer = async name => {
  if (datasetManager.thereIsDataset(name)) {
    datasetManager.deleteDataset(name);
    console.log(`Dataset '${name}' removed`);
  }
  else {
    console.log(`Dataset '${name}' doesn't exist`);
  }
}

export const optionsDatabaseAnswer = async (answer, prompt) => {
  switch(answer) {
    case 'Create':
      await prompt.makeQuestion('database-create');
      break;

    case 'Read':
      await prompt.makeQuestion('database-read');
      break;

    case 'Update':
      await prompt.makeQuestion('database-update');
      break;

    case 'Delete':
      await prompt.makeQuestion('database-delete');
      break;
  }
}

export const databaseCreateAnswer = async ({dataset, database, collection}) => {
  const {data} = datasetManager.getDataset(dataset);
  databaseManager
  .database(database)
  .then(db => db.create(collection, data))
  .then(result => {
    saveStats({
      command: 'Create',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      dataset,
      message: `After that, ${result} item(s) was inserted`
    });
    databaseManager.close();
  });
  
}

export const databaseReadAnswer = async ({database, collection, condition}) => {
  
  condition = (condition === "" ? "{}" : condition);
  
  databaseManager
  .database(database)
  .then(db => db.read(
    collection, 
    JSON.parse(condition)
  ))
  .then(result => {
    saveStats({
      command: 'Read',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition: JSON.stringify(condition),
      message: `This search returns ${result.length} item(s)`
    });
    databaseManager.close();
  });
}

export const databaseUpdateAnswer = async ({database, collection, condition, values}) => {
  
  condition = (condition === "" ? "{}" : condition);
  values = (values === "" ? "{}" : values);
  
  databaseManager
  .database(database)
  .then(db => db.update(
    collection, 
    JSON.parse(condition), 
    JSON.parse(values)
  ))
  .then(result => {
    saveStats({
      command: 'Update',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition: JSON.stringify(condition),
      values: JSON.stringify(values),
      message: `This operation updated ${result} item(s)`
    });
    databaseManager.close();
  });
}

export const databaseDeleteAnswer = async ({database, collection, condition}) => {
  
  condition = (condition === "" ? "{}" : condition);
  
  databaseManager
  .database(database)
  .then(db => db.delete(
    collection, 
    JSON.parse(condition)
  ))
  .then(result => {
    saveStats({
      command: 'Delete',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition: JSON.stringify(condition),
      message: `This operation deleted ${result} item(s)`
    });
    databaseManager.close();
  });
}