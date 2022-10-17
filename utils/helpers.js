const bcrypt = require('bcrypt');

const hasLetters = (password) => /[a-zA-Z]/.test(password);
const hasNumbers = (password) => /[0-9]/.test(password);
const hasMinLengthChars = (password) => password && password.length >= 6;

exports.passwordValidator = {
  hasLetters,
  hasNumbers,
  hasMinLengthChars,
  isStrong: (password) => hasMinLengthChars(password)
};

exports.generatePasswordDigest = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
