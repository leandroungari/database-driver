import app from "../app";
import readlineSync from 'readline-sync';

export const initialQuestion = {
  message: 'Please select an option',
  question: 'Which option? ',
  choices: [
    'Select a driver',
    'Dataset manipulation',
    'Database operations'
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

export const createDatasetQuestion = () => {
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

export const removeDatasetQuestion = () => {
  const name = readlineSync.question(
    'Give a name to the dataset? ',
    {limit: null}  
  );

  return name;
}
