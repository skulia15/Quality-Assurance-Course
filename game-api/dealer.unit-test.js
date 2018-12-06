function newRandom(randomReturnValues) {
  let i = 0;
  return {
    randomInt: (min, max) => {
      return randomReturnValues[i++];
    },
  };
}

describe('dealer.js - shuffle', () => {
  // 2
  test('dealer should should shuffle cards', () => {
    // Arrange
    const dependencies = {
      'random': newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
      return dependencies[name];
    });
    const deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
  });

  test('dealer should should not shuffle empty deck', () => {
    // Arrange
    const dependencies = {
      'random': newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
      return dependencies[name];
    });
    const deck = [];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual([]);
  });

  test('dealer should should shuffle two deck differenly given two different parametes to random function', () => {
    // Arrange
    const dependencies = {
      'random': newRandom([2, 1]),
    };
    const dependencies2 = {
      'random': newRandom([2]),
    };
    const newDealer = require('./dealer.js');

    const dealer = newDealer((name) => {
      return dependencies[name];
    });
    const dealer2 = newDealer((name) => {
      return dependencies2[name];
    });
    const deck = [1, 2, 3, 4];
    const deck2 = [1, 2, 3, 4];

    // Act
    dealer.shuffle(deck);
    dealer2.shuffle(deck2);

    // Assert
    expect(deck).not.toEqual(deck2);
  });
});

describe('dealer.js - draw', () => {
  // 2
  test('dealer should draw a card', () => {
    // Arrange
    // const dependencies = {
    //   'random': newRandom([2, 1]),
    // };
    const newDealer = require('./dealer.js');
    const dealer = newDealer();
    const deck = ['a', 'b', 'c'];

    // Act
    const card = dealer.draw(deck);

    // Assert
    expect(card).toEqual('c');
  });

  test('dealer should draw undefined when deck is empty', () => {
    // Arrange
    // const dependencies = {
    //   'random': newRandom([2, 1]),
    // };
    const newDealer = require('./dealer.js');
    const dealer = newDealer();
    const deck = [];

    // Act
    const card = dealer.draw(deck);

    // Assert
    expect(card).toEqual(undefined);
  });
});
