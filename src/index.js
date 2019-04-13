import app from './app';
import prompter from './prompter';


app
  .databases([
    {
      name: 'MongoClient',
      driver: undefined
    },
    {
      name: 'Mongoose',
      driver: undefined
    }
  ])
  .prompt(prompter.start())
  .play();