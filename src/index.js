import app from './app';
import prompter from './prompter';


app
  .databases([
    {name: 'MongoClient'},
    {name: 'Mongoose'}
  ])
  .prompt(prompter.start())
  .play();