exports.makeResponse = (json = {}) => {
  const obj = {};
  obj.result = json.success ? 'success' : 'error';

  if (json.data) {
    obj.data = json.data;
  }

  if (json.message) {
    obj.message = json.message;
  }

  return obj;
};
