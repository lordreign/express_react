const fs = require('fs');

exports.mkdir = (dirPath) => {
  if (!dirPath) return false;
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  return true;
};
