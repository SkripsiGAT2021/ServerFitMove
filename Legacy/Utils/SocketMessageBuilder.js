module.exports = (type, data) => {
  return JSON.stringify({
    type: type,
    data: data,
  });
};
