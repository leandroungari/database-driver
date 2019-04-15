import readlineSync from 'readline-sync';
import { 
  initialQuestion, 
  selectDriverQuestion, 
  optionsDatasetsQuestion, 
  createDatasetQuestion ,
  removeDatasetQuestion,
  optionsDatabaseQuestion,
  databaseCreateQuestion,
  databaseReadQuestion,
  databaseDeleteQuestion,
  databaseUpdateQuestion,
  crudQuestion
} from './questions';

import { 
  initialAnswer, 
  selectDriverAnswer, 
  optionsDatasetsAnswer, 
  createDatasetAnswer,  
  listDatasetAnswer,
  removeDatasetAnswer,
  optionsDatabaseAnswer,
  databaseCreateAnswer,
  databaseReadAnswer,
  databaseUpdateAnswer,
  databaseDeleteAnswer,
  crudAnswer
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

  async prompt() {
    while (this.isRunning) {
      setTimeout(() => {}, 1000);
      await this.makeQuestion();  
    }
  }

  async ask({message, question, choices, cancel = false}) {
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

  async makeQuestion(name = 'initial') {
    let answer;

    switch(name) {
      case 'initial':
        await this.ask(initialQuestion)
        .then(answer => initialAnswer(answer, this))
        
        break;

      case 'select-driver':
        this.ask(selectDriverQuestion())
        .then(selectDriverAnswer);
        break;

      case 'dataset':
        this.ask(optionsDatasetsQuestion)
        .then(answer => optionsDatasetsAnswer(answer, this));
        break;

      case 'create-dataset':
        createDatasetQuestion()
        .then(createDatasetAnswer);
        break;

      case 'list-all-datasets':
        listDatasetAnswer();
        break;

      case 'remove-dataset':
        removeDatasetQuestion()
        .then(removeDatasetAnswer);
        break;

      case 'database':
        this.ask(optionsDatabaseQuestion)
        .then(answer => optionsDatabaseAnswer(answer, this));
        break;

      case 'database-create':
        databaseCreateQuestion()
        .then(databaseCreateAnswer);
        break;

      case 'database-read':
        databaseReadQuestion()
        .then(databaseReadAnswer);
        break;
      
      case 'database-update':
        databaseUpdateQuestion()
        .then(databaseUpdateAnswer);
        break;
        
      case 'database-delete': 
        databaseDeleteQuestion()
        .then(databaseDeleteAnswer);
        break;

      case 'crud-test':
        crudQuestion()
        .then(crudAnswer);

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