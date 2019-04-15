import app from "../app";
import readlineSync from 'readline-sync';

export const initialQuestion = {
  message: 'Please select an option',
  question: 'Which option? ',
  choices: [
    'Select a driver',
    'Dataset manipulation',
    'Database operations',
    'CRUD test'
  ],
  cancel: 'Close program'
}

export const selectDriverQuestion = () => {
  return {
    message: 'Please select a driver to use in next tests',
    question: 'Which driver? ',
    choices: app.getDatabases().map(a => a.name),
    cancel: false
  };
}

export const optionsDatasetsQuestion = {
  message: 'Please select an action',
  question: 'What you wanna do? ',
  choices: [
    'Create dataset',
    'List all datasets',
    'Remove dataset'
  ]
}

export const createDatasetQuestion = async () => {
  const name = readlineSync.question(
    'Give a name to the dataset? ',
    {limit: null}  
  );
  
  const path = readlineSync.questionPath(
    'Type the filepath to dataset: ',
    {limit: null}
  );

  return {name, path};
}

export const removeDatasetQuestion = async () => {
  const name = readlineSync.question(
    'Give a name to the dataset? ',
    {limit: null}  
  );

  return name;
}

export const optionsDatabaseQuestion = {
  message: 'Please select a database operation',
  question: 'Which operation? ',
  choices: [
    'Create',
    'Read',
    'Update',
    'Delete'
  ],
  cancel: false
}

export const databaseCreateQuestion = async () => {
  
  const dataset = readlineSync.question(
    'Which dataset do you want to use? '
  );

  const database = readlineSync.question(
    'Which database do you want to use? '
  );
  
  const collection = readlineSync.question(
    'What\'s the collection name? '
  );

  return {
    dataset, collection, database
  }
}

export const databaseReadQuestion = async () => {
  const database = readlineSync.question(
    'Which database do you want to use? '
  );

  const collection = readlineSync.question(
    'What\'s the collection name? '
  );

  const condition = readlineSync.question(
    'Enter a condition: '
  );

  return {
    condition, collection, database
  }
}

export const databaseUpdateQuestion = async () => {
  const database = readlineSync.question(
    'Which database do you want to use? '
  );

  const collection = readlineSync.question(
    'What\'s the collection name? '
  );

  const condition = readlineSync.question(
    'Enter a condition: '
  );

  const values = readlineSync.question(
    'Enter set of values to assign: '
  );

  return {
    condition, collection, values, database
  }
}

export const databaseDeleteQuestion = async () => {
  const database = readlineSync.question(
    'Which database do you want to use? '
  );

  const collection = readlineSync.question(
    'What\'s the collection name? '
  );

  const condition = readlineSync.question(
    'Enter a condition: '
  );

  return {
    condition, collection, database
  }
}

export const crudQuestion = async () => {
  const database = readlineSync.question(
    'Which database do you want to use? '
  );

  const collection = readlineSync.question(
    'What\'s the collection name? '
  );

  const createDataset = readlineSync.question(
    'To create operation, which dataset you want to use: '
  );

  const createItemsNumber = readlineSync.questionInt(
    'To create operation, how many items you want to insert: '
  );

  const readCondition = readlineSync.question(
    'To read operation, please, enter a condition: '
  );

  const updateCondition = readlineSync.question(
    'To update operation, please, enter a condition: '
  );

  const updateValues = readlineSync.question(
    'To update operation, enter the object of values: '
  );

  const deleteCondition = readlineSync.question(
    'To delete operation, please, enter a condition: '
  );

  const repeat = readlineSync.questionInt(
    'How many times do you want to repeat the tests: '
  );

  return {
    database, 
    collection, 
    createDataset,
    createItemsNumber,
    readCondition,
    updateCondition,
    updateValues,
    deleteCondition,
    repeat
  }
};

