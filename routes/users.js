const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'The server is not responding, please contact your administrator' });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'The server is not responding, please contact your administrator' });
      return;
    }
    const users = JSON.parse(data);
    const user = users.find(({ _id }) => _id === req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
      return;
    }
    res.send(user);
  });
});

module.exports = router;
