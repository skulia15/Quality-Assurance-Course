module.exports = (context) => {
  return {
    shuffle: (deck) => {
      const randomConstructor = context('random');
      const random = randomConstructor(context); // provides functionality to get random integer
      for (let i = 0; i < deck.length - 1; i++) {
        const j = random.randomInt(i, deck.length);
        const card = deck[j];
        const old = deck[i];
        deck[i] = card;
        deck[j] = old;
      }
    },
    draw: (deck) => {
      return deck.pop();
    },
  };
};
