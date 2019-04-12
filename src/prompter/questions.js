import app from "../app";

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

