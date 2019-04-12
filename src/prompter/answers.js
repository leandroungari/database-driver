import app from "../app";

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
  app.changeDatabase(answer);
  console.log(
    `Database selected: ${app.getCurrentDatabase()}`
  );
}