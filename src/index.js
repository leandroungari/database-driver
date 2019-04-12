import app from './app';
import prompter from './prompter';


app
  .databases()
  .prompt(prompter.start())
  .play();