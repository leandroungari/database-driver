import fs from 'fs';
import readFileSync from 'readline-sync';

const getValue = (set, attribute) => {
  const list = ['create', 'read', 'update', 'delete'];
  const result = {
    create: [],
    read: [],
    update: [],
    delete: []
  };

  Object.entries(set).forEach(([number, obj]) => {
    list.forEach(item => {
      result[item].push(obj[item][attribute]);
    });
  });
  
  return result;
}

const file = fs.readFileSync("./stats-result.json");
const result = JSON.parse(file);

const dbOptions = ['mongoclient', 'mongoose'];
const db = dbOptions[
  readFileSync.keyInSelect(
    dbOptions, 
    "Selecione o driver: ", 
    {cancel: false}
  )
];

const sizeOptions = ['small', 'big'];
const size = sizeOptions[
  readFileSync.keyInSelect(
    sizeOptions, 
    'Selecione o tamanho',
    {cancel: false}
  )
];

const attributeOptions = [
  'avgDiffTime',
  'avgDiffCPU',
  'avgDiffExternal',
  'avgDiffHeapTotal',
  'avgDiffHeapUsed',
  'avgDiffRam'
];

const attribute = attributeOptions[
  readFileSync.keyInSelect(
    attributeOptions, 
    'Selecione um atributo',
    {cancel: false}
  )
];

console.log(getValue(result[db][size], attribute));

