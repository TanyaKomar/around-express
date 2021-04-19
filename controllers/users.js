const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if(! name && about && avatar ) {
    res.status(400).send({ message: 'invalid data for creating a user'});
  }
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user===null){
        res.status(404).send({ message: 'user not found'})
        return
      }
      res.send({ data: user })})
    .catch((err) => res.status(500).send({ message: 'Server error' }));
};
