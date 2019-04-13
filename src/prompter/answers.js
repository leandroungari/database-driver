import databaseManager from '../app/database';
import datasetManager from '../app/dataset';
import database from '../app/database';

export const initialAnswer = (answer, prompt) => {
  switch(answer) {
    case 'Select a driver':
      prompt.makeQuestion('select-driver');
      break;

    case 'Dataset manipulation':
      prompt.makeQuestion('dataset');
      break;

    case 'Database operations':
      prompt.makeQuestion('database');
      break;
    default:
      prompt.makeQuestion('close');
  }
};

export const selectDriverAnswer = (answer) => {
  databaseManager.changeDatabase(answer);
  console.log(
    `Database selected: ${databaseManager.getCurrentDatabase()}`
  );
}

export const optionsDatasetsAnswer = (answer, prompt) => {
  switch(answer) {
    case 'Create dataset':
      prompt.makeQuestion('create-dataset');
      break;
    
    case 'List all datasets':
      prompt.makeQuestion('list-all-datasets');
      break;

    case 'Remove dataset':
      prompt.makeQuestion('remove-dataset');
      break;
  }
}

export const createDatasetAnswer = ({name, path}) => {
  datasetManager.createDataset(name, path);
  console.log(`Dataset ${name} created`);
}

export const listDatasetAnswer = () => {
  console.log("\nList of datasets:");
  datasetManager.listDataset().forEach(({name, size}) => {
    console.log(`#${name} (${size})`);
  });
}

export const removeDatasetAnswer = name => {
  if (datasetManager.thereIsDataset(name)) {
    datasetManager.deleteDataset(name);
    console.log(`Dataset '${name}' removed`);
  }
  else {
    console.log(`Dataset '${name}' doesn't exist`);
  }
}

export const optionsDatabaseAnswer = (answer, prompt) => {
  switch(answer) {
    case 'Create':
      prompt.makeQuestion('database-create');
      break;

    case 'Read':
      prompt.makeQuestion('database-read');
      break;

    case 'Update':
      prompt.makeQuestion('database-update');
      break;

    case 'Delete':
      prompt.makeQuestion('database-delete');
      break;
  }
}

export const databaseCreateAnswer = ({dataset, database, collection}) => {
  const data = datasetManager.getDataset(dataset);
  databaseManager
  .database(database)
  .create(collection, data);
}

export const databaseReadAnswer = ({database, collection, condition}) => {
  databaseManager
  .database(database)
  .read(collection, condition);
}

export const databaseUpdateAnswer = ({database, collection, condition, values}) => {
  databaseManager
  .database(database)
  .update(collection, condition, values);
}

export const databaseDeleteAnswer = ({database, collection, condition}) => {
  databaseManager
  .database(database)
  .delete(collection, condition);
}