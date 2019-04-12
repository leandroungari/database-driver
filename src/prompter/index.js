import readlineSync from 'readline-sync';
import { 
  initialQuestion, 
  selectDriverQuestion, 
  optionsDatasetsQuestion, 
  createDatasetQuestion ,
  removeDatasetQuestion
} from './questions';

import { 
  initialAnswer, 
  selectDriverAnswer, 
  optionsDatasetsAnswer, 
  createDatasetAnswer,  
  listDatasetAnswer,
  removeDatasetAnswer
} from './answers';

class Prompter {
  constructor() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    return this;
  }

  stop() {
    this.isRunning = false;
    return this;
  }

  prompt() {
    while(this.isRunning) {

      setTimeout(() => {
      
      }, 5000);

      this.makeQuestion();
    }
  }

  ask({message, question, choices, cancel = false}) {
    console.log(`\n${message}`);
    const index = readlineSync.keyInSelect(
      choices, 
      question, 
      {
        cancel
      }
    );

    return choices[index];
  }

  makeQuestion(name = 'initial') {
    let answer;

    switch(name) {
      case 'initial':
        answer = this.ask(initialQuestion);
        initialAnswer(answer, this);
        break;

      case 'select-driver':
        answer = this.ask(selectDriverQuestion());
        selectDriverAnswer(answer);
        break;

      case 'dataset':
        answer = this.ask(optionsDatasetsQuestion);
        optionsDatasetsAnswer(answer, this);
        break;

      case 'create-dataset':
        answer = createDatasetQuestion();
        createDatasetAnswer(answer);
        break;

      case 'list-all-datasets':
        listDatasetAnswer();
        break;

      case 'remove-dataset':
        answer = removeDatasetQuestion();
        removeDatasetAnswer(answer);
        break;

      case 'database':

        break;

      case 'close':
        this.stop();
        break;
      
    }
  }

  render() {

    this.prompt();
  }
}

export default new Prompter();