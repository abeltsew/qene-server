const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi there');
});

app.post('/', async (req, res) => {
  console.log(req);
  const word = req.body.word;

  console.log(word);

  const readFileLines = (filename) =>
    fs.readFileSync(filename).toString('UTF8').split('\n');

  const dictionary = 'Dictionary.txt';

  let arr = readFileLines(dictionary);

  arr.map((w) => {
    if (w.split(' ')[0] === word) {
      res.send({ meaning: w });
    }
  });
  res.send('not found');
});

app.listen(80);
