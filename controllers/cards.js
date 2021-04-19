const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if(!( name && link )) {
    res.status(400).send({ message: 'invalid data for creating a card'});
  }
  Card.create({ name, link, owner: req.user._id, likes: [] })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};
