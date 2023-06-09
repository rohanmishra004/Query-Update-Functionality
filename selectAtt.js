const extractAttDefIds = (obj, result = []) => {
  if (obj instanceof Object) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => extractAttDefIds(item, result));
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        if (key === '@AttDefId') {
          result.push(value);
        } else {
          extractAttDefIds(value, result);
        }
      });
    }
  }
};

module.exports = extractAttDefIds