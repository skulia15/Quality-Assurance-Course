
module.exports = (context) => {
  // const random = randomConstructor(context);
  return {
    shuffle: (deck) => {
      const random = context('random'); // provides functionality to get random integer
      for (let i = 0; i < deck.length - 1; i++) {
        const j = random.randomInt(i, deck.length);
        const card = deck[j];
        const old = deck[i];
        deck[i] = card;
        deck[j] = old;
      }
    },
    draw: (deck) => {
      const card = deck.pop();
      return card;
    },
  };
};
