module.exports = (context) => {
  
  return {
    shuffle: (deck) => {
      const randomConstructor = context('random');
      for (let i = 0; i < deck.length - 1; i++) {
        const j = randomConstructor.randomInt(i, deck.length);
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
