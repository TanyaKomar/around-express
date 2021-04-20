const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  user cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  user cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  user cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name, about: req.body.about } },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  user cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation failed:  user cannot be found.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};
