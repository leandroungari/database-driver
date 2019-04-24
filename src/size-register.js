const fs = require('fs');

const file = fs.readFileSync('./dataset.json', 'utf8');
const data = JSON.parse(file);

const convertToKBytes = valueInBytes => valueInBytes/1024;

const out = {};

data.datasets.forEach(({name, data}) => {

  const average = data
    .reduce((total, a) => total + JSON.stringify(a).length, 0)/data.length;
  const min = data
    .reduce((min, a) => JSON.stringify(a).length < min ? JSON.stringify(a).length : min, Number.MAX_VALUE);
  const max = data
    .reduce((max, a) => JSON.stringify(a).length > max ? JSON.stringify(a).length : max, Number.MIN_VALUE);

  out[name] = {
    average: `${convertToKBytes(average)} KB`,
    min: `${convertToKBytes(min)} KB`,
    max: `${convertToKBytes(max)} KB`
  }
});

console.dir(out, {depth: null});