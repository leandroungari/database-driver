import app from './app';
import prompter from './prompter';

import {
  mongoClient,
  mongoose
} from './database';

app
  .databases([mongoClient, mongoose])
  .prompt(prompter.start())
  .play();