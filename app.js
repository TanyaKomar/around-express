const express = require('express');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(helmet());
app.use('/users', users);
app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to the server: ${PORT}`);
});
