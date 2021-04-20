const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]{2,}#?$/igm.test(v);
      },
      message: (props) => `${props.value} is not a valid link to the avatar!`,
    },
    required: [true, 'Link to the avatar required'],
  },
});

module.exports = mongoose.model('user', userSchema);
