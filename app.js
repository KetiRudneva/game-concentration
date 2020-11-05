const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.set('session cookie name', 'sid');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('main');
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/getDogs', async (req, res) => {
  const images = [];
  for (let i = 0; i<6; i++) {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const json = await response.json();
    images.push(json.message);
  }
  console.log('IMAGES IS: ', images);
  res.json(images);
});

app.listen(3000);


// app.get('/getDogs', (req, res) => {
//   const images = [];
//   for (let i = 0; i<10; i++) {
//     fetch('https://dog.ceo/api/breeds/image/random')
//       .then((response) => response.json())
//       .then(({message: image}) => images.push(message));
//   // images.push(json.message);
//   }
//   console.log('IMAGES IS: ', message);
//   // res.json(images);
// });
