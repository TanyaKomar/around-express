const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'The server is not responding, please contact your administrator' });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});
module.exports = router;
