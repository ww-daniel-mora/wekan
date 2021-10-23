import fs from 'fs';

tryReadFile = function(path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch(err) {
    return false;
  }
};

getSecret = function(key) {
  if (key in process.env) {
    return tryReadFile(process.env[key]);
  }
  return false;
};
