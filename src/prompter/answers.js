import databaseManager from '../app/database';
import datasetManager from '../app/dataset';
import { saveStats } from '../app/stats';
import mongoose from "mongoose";



export const initialAnswer = async (answer, prompt) => {
  
  switch(answer) {
    case 'Select a driver':
      await prompt.makeQuestion('select-driver');
      break;

    case 'Dataset manipulation':
      await prompt.makeQuestion('dataset');
      break;

    case 'Database operations':
      await prompt.makeQuestion('database');
      break;
    
    case 'CRUD test':
      await prompt.makeQuestion('crud-test');
      break;

    default:
      await prompt.makeQuestion('close');
  }
};

export const selectDriverAnswer = async (answer) => {
  databaseManager.changeDatabase(answer);
  console.log(
    `Database selected: ${databaseManager.getCurrentDatabase()}`
  );
}

export const optionsDatasetsAnswer = async (answer, prompt) => {
  switch(answer) {
    case 'Create dataset':
      await prompt.makeQuestion('create-dataset');
      break;
    
    case 'List all datasets':
      await prompt.makeQuestion('list-all-datasets');
      break;

    case 'Remove dataset':
      await prompt.makeQuestion('remove-dataset');
      break;
  }
}

export const createDatasetAnswer = async ({name, path}) => {
  datasetManager.createDataset(name, path);
  console.log(`Dataset ${name} created`);
}

export const listDatasetAnswer = async () => {
  console.log("\nList of datasets:");
  datasetManager.listDataset().forEach(({name, size}) => {
    console.log(`#${name} (${size})`);
  });
}

export const removeDatasetAnswer = async name => {
  if (datasetManager.thereIsDataset(name)) {
    datasetManager.deleteDataset(name);
    console.log(`Dataset '${name}' removed`);
  }
  else {
    console.log(`Dataset '${name}' doesn't exist`);
  }
}

export const optionsDatabaseAnswer = async (answer, prompt) => {
  switch(answer) {
    case 'Create':
      await prompt.makeQuestion('database-create');
      break;

    case 'Read':
      await prompt.makeQuestion('database-read');
      break;

    case 'Update':
      await prompt.makeQuestion('database-update');
      break;

    case 'Delete':
      await prompt.makeQuestion('database-delete');
      break;
  }
}

export const databaseCreateAnswer = async ({dataset, database, collection}) => {
  const {data} = datasetManager.getDataset(dataset);
  databaseManager
  .database(database)
  .then(db => db.create(collection, data))
  .then(({result, stats}) => {
    saveStats({
      command: 'Create',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      dataset,
      message: `After that, ${result} item(s) was inserted`,
      stats
    });
    databaseManager.close();
  });
  
}

export const databaseReadAnswer = async ({database, collection, condition}) => {
  
  condition = formatDataString(condition);
  
  databaseManager
  .database(database)
  .then(db => db.read(
    collection, 
    condition
  ))
  .then(({result, stats}) => {
    saveStats({
      command: 'Read',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition,
      message: `This search returns ${result.length} item(s)`,
      stats
    });
    databaseManager.close();
  });
}

export const databaseUpdateAnswer = async ({database, collection, condition, values}) => {
  
  condition = formatDataString(condition);
  values = formatDataString(values);
  
  databaseManager
  .database(database)
  .then(db => db.update(
    collection, 
    condition,
    values
  ))
  .then(({result, stats}) => {
    saveStats({
      command: 'Update',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition,
      values,
      message: `This operation updated ${result} item(s)`,
      stats
    });
    databaseManager.close();
  });
}

export const databaseDeleteAnswer = async ({database, collection, condition}) => {
  
  condition = formatDataString(condition);
  
  databaseManager
  .database(database)
  .then(db => db.delete(
    collection, 
    condition
  ))
  .then(({result, stats}) => {
    saveStats({
      command: 'Delete',
      driver: databaseManager.getCurrentDatabase(),
      database,
      collection,
      condition,
      message: `This operation deleted ${result} item(s)`,
      stats
    });
    databaseManager.close();
  });
}

export const crudAnswer = async ({
  database, 
  collection, 
  createDataset,
  createItemsNumber,
  readCondition,
  updateCondition,
  updateValues,
  deleteCondition,
  repeat
}) => {

  let data;
  if (datasetManager.thereIsDataset(createDataset)) {
    data = datasetManager.getDataset(createDataset).data;
  }
  else throw new Error("Dataset not found");

  readCondition = formatDataString(readCondition);
  updateCondition = formatDataString(updateCondition);
  updateValues = formatDataString(updateValues);
  deleteCondition = formatDataString(deleteCondition);

  const list = {
    create: [],
    read: [],
    update: [],
    delete: []
  }

  const db = await databaseManager
  .database(database);

  const items = generateSet(data, createItemsNumber);
  console.log(`Conjunto gerado.`);
  
  for(let i = 0; i < repeat; i++) {
    
    console.log(`Iteração ${i} iniciada.`);
    const resultCreate = await db.create(
      collection, 
      items
    );
    const resultRead = await db.read(
      collection, 
      readCondition
    );
    const resultUpdate = await db.update(
      collection, 
      updateCondition, 
      updateValues
    );
    const resultDelete = await db.delete(
      collection,
      deleteCondition
    );

    
    list.create = [...list.create, resultCreate];
    list.read = [...list.read, {
      result: resultRead.result.length,
      stats: resultRead.stats 
    }];
    list.update = [...list.update, resultUpdate];
    list.delete = [...list.delete, resultDelete];

    console.log(`Iteração ${i} finalizada.`);
  }

  const stats = {
    driver: databaseManager.getCurrentDatabase(),
    repeat,
    create: {
      dataset: createDataset,
      executions: {
        result: list.create.map(a => a.result),
        stats: {
          diffTime: getDiffTime(list.create),
          diffCPU: getDiffCPU(list.create),
          diffExternal: getDiffExternal(list.create),
          diffHeapTotal: getDiffHeapTotal(list.create),
          diffHeapUsed: getDiffHeapUsed(list.create),
          diffRam: getDiffRam(list.create)
        }
      }
    },
    read: {
      condition: readCondition,
      executions: {
        result: list.read.map(a => a.result),
        stats: {
          diffTime: getDiffTime(list.read),
          diffCPU: getDiffCPU(list.read),
          diffExternal: getDiffExternal(list.read),
          diffHeapTotal: getDiffHeapTotal(list.read),
          diffHeapUsed: getDiffHeapUsed(list.read),
          diffRam: getDiffRam(list.read)
        }
      }
    },
    update: {
      condition: updateCondition,
      values: updateValues,
      executions: {
        result: list.update.map(a => a.result),
        stats: {
          diffTime: getDiffTime(list.update),
          diffCPU: getDiffCPU(list.update),
          diffExternal: getDiffExternal(list.update),
          diffHeapTotal: getDiffHeapTotal(list.update),
          diffHeapUsed: getDiffHeapUsed(list.update),
          diffRam: getDiffRam(list.update)
        }
      }
    },
    delete: {
      condition: deleteCondition,
      executions: {
        result: list.delete.map(a => a.result),
        stats: {
          diffTime: getDiffTime(list.delete),
          diffCPU: getDiffCPU(list.delete),
          diffExternal: getDiffExternal(list.delete),
          diffHeapTotal: getDiffHeapTotal(list.delete),
          diffHeapUsed: getDiffHeapUsed(list.delete),
          diffRam: getDiffRam(list.delete)
        }
      }
    }
  };

  saveStats(stats);
  
}

const generate = (name, contador) => {
  const table = {
    //"Mongoose": () => mongoose.Types.ObjectId(generateId(contador)),
    "Mongoose": () => mongoose.Types.ObjectId(),
    "MongoClient": () => generateId(contador)
  }

  return table[name]();
}

const generateSet = (data, quantity) => {
  let contador = 0;
  const items = [];
  for(let i = 0; i < quantity; i++) {
    /*items[i] = JSON.parse(JSON.stringify(data[i%data.length]));
    items[i]._id = generate(databaseManager.getCurrentDatabase(), contador);
    */
    items[i] = {
      ...data[i%data.length],
      _id: generate(databaseManager.getCurrentDatabase(), contador)
    }
    contador++;
  }
  
  return items;
}

const generateId = (number) => {
  
  return number.toString(16);
}

const formatDataString = data => {
  return JSON.parse(data === "" ? "{}" : data);
}

const getDiffTime = list => {
  return list.map(a => a.stats.diffTime)
  .filter(a => a !== undefined);
}

const getDiffCPU = list => {
  return list.map(a => a.stats.diffCPU)
  .filter(a => a !== undefined);
}

const getDiffHeapTotal = list => {
  return list.map(a => a.stats.diffHeapTotal)
  .filter(a => a !== undefined);
}

const getDiffHeapUsed = list => {
  return list.map(a => a.stats.diffHeapUsed)
  .filter(a => a !== undefined);
}

const getDiffExternal = list => {
  return list.map(a => a.stats.diffExternal)
  .filter(a => a !== undefined);
}

const getDiffRam = list => {
  return list.map(a => a.stats.diffRAM)
  .filter(a => a !== undefined);
}