const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});
module.exports = router;
