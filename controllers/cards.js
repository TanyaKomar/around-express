const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  card cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  card cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Card not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  card cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Card not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  card cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Card not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  card cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};
