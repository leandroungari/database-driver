export const initialAnswer = (prompt, answer) => {
  switch(answer) {
    case 'Select a driver':
      prompt.makeQuestion('select-driver');
      break;

    case 'Dataset manipulation':
      prompt.makeQuestion('');
      break;

    case 'Database operations':

      break;
  }
};