const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose  = require('mongoose');

const app = express();
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
  req.user = {
    _id: '607cab59b3e890312437cf29',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(jsonParser);
app.use(helmet());
app.use('/users', users);
app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to the server: ${PORT}`);
});
