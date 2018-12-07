module.exports = function() {
  return {
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  };
};
