import readlineSync from 'readline-sync';
import { initialQuestion } from './questions';

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
    console.log(message);
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
        
        break;

      case 'select-driver':

        break;

      case 'dataset':

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