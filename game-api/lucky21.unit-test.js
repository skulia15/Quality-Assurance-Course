const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');
const randomConstructor = require('./random.js');

const gameConstructor = () => {
  const dependencies = {
    'deck': deckConstructor,
    'dealer': dealerConstructor,
    'random': randomConstructor(),
  };
  return lucky21Constructor((name) => dependencies[name]);
};

const gameConstructorMockDealer= (deck) => {
  mockDealer = (deck) => ({
    // Override the shuffle to do nothing.
    shuffle: (deck) => { },
    draw: (deck) => deck.pop(),
  });

  const dependenciesMockDealer = {
    'deck': () => deck,
    'dealer': mockDealer,
    'random': randomConstructor(),
  };
  return lucky21Constructor((name) => dependenciesMockDealer[name]);
};

// Given Tests
describe('Given Tests', () => {
  test('a new game should have 50 cards left in the deck', () => {
    const game = gameConstructor();
    expect(game.state.deck.length).toEqual(50);
  });

  test('a new game should have 2 drawn cards', () => {
    const game = gameConstructor();
    expect(game.state.cards.length).toEqual(2);
  });

  test('guess21OrUnder should draw the next card', () => {
    // Arrange
    const deck = [
      '05C', '01D', '09S', '10H',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);

    // Assert
    // console.log(game.state.cards);
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });
});

// isGameOver
describe('isGameOver', () => {
  test('isGameOver when game is not over', () => {
    // Arrange
    deck = [
      '10H', '2C', '2D', '02L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.isGameOver(game);
    // Assert
    expect(res).toBe(false);
  });

  test('isGameOver when game is over when player loses', () => {
    // Arrange
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.isGameOver(game);
    // Assert
    expect(res).toBe(true);
  });

  test('isGameOver when game is over when player wins', () => {
    // Arrange
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guessOver21(game);
    const res = game.isGameOver(game);
    // Assert
    expect(res).toBe(true);
  });
});

describe('playerWon', () => {
  test('playerWon when player won', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guessOver21(game);
    const res = game.playerWon(game);

    // Assert
    expect(res).toBe(true);
  });

  test('playerWon when player lost', () => {
    // Arrange
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.playerWon(game);

    // Assert
    expect(res).toBe(false);
  });
});


describe('getCardsValue', () => {
  test('getCardsValue of when 2 cards in array, two tens', () => {
    // Arrange
    deck = [
      '10H', '13C', '10D', '10L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);
    // Act
    const res = game.getCardsValue(game);
    // Assert
    expect(res).toEqual(20);
  });


  test('getCardsValue of when 2 cards, with ace under 21', () => {
    // Arrange
    deck = [
      '10H', '13C', '01D', '05L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    const res = game.getCardsValue(game);
    // Assert
    expect(res).toEqual(16);
  });

  test('getCardsValue of when 3 cards, with ace over 21', () => {
    // Arrange
    deck = [
      '10H', '01C', '12D', '12L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.state.card = game.state.dealer.draw(deck);
    game.state.cards.push(game.getCard(game));
    const res = game.getCardsValue(game);
    // Assert
    expect(res).toEqual(21);
  });
});

describe('getCardValue', () => {
  test('getCardValue of normal card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.state.card = game.state.dealer.draw(deck);
    const res = game.getCardValue(game);
    // Assert
    expect(res).toEqual(9);
  });

  test('getCardValue of Royal', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '13C', '01D', '05L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.state.card = game.state.dealer.draw(deck);
    const res = game.getCardValue(game);
    // Assert
    expect(res).toEqual(10);
  });

  test('getCardValue of Ace', () => {
    // Arrange
    deck = [
      '10H', '01C', '01D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);
    // Act
    game.state.card = game.state.dealer.draw(deck);
    const res = game.getCardValue(game);
    // Assert
    expect(res).toEqual(11);
  });
});

describe('getTotal', () => {
  test('getTotal of three normal cards', () => {
    // Arrange
    deck = [
      '10H', '04C', '03D', '02L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.getTotal(game);
    // Assert
    expect(res).toEqual(9);
  });

  test('getTotal when card is not defined', () => {
    // Arrange
    deck = [
      '10H', '04C', '03D', '02L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.state.card = undefined;
    const res = game.getTotal(game);

    // Assert
    expect(res).toEqual(5);
  });

  test('getTotal of three aces when guess under 21', () => {
    // Arrange
    deck = [
      '10H', '01C', '01D', '01L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.getTotal(game);
    // Assert
    expect(res).toEqual(13);
  });

  test('getTotal with all card types, ace, normal, royal', () => {
    // Arrange
    deck = [
      '10H', '13C', '7D', '01L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);


    // Act
    game.guess21OrUnder(game);
    const res = game.getTotal(game);
    // Assert
    expect(res).toEqual(18);
  });
});

describe('getCards', () => {
  test('getCards get all of the players cards when game initializes', () => {
    // Arrange
    deck = [
      '05H', '05S', '05D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    // Do nothing

    const res = game.getCards(game);
    // Assert
    expect(res).toEqual(['05L', '05D']);
  });

  test('getCards get all of the players cards after 2 turns', () => {
    // Arrange
    deck = [
      '05H', '05S', '05D', '05L',
    ];
    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);

    const res = game.getCards(game);
    // Assert
    expect(res).toEqual(['05L', '05D', '05S', '05H']);
  });
});

// Test getCard
describe('getCard', () => {
  test('getCard of valid card', () => {
  // Arrange
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.state.card = game.state.dealer.draw(deck);
    const res = game.getCard(game);

    // Assert
    expect(res).toEqual('09S');
  });

  test('getCard of undefined card', () => {
    // Arrange
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    const res = game.getCard(game);

    // Assert
    expect(res).toBe(undefined);
  });

  test('getCard expect undefined after guessing 21 or under', () => {
    // Arrange
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    const res = game.getCard(game);

    // Assert
    expect(res).toBe(undefined);
    expect(game.state.cards.length).toBe(3);
  });
});


describe('guess21OrUnder', () => {
  test('guess21OrUnder guess 2 times, expect card to be undefined and card length to be two more that initially', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    // Inject our dependencies
    const game = gameConstructorMockDealer(deck);

    // Act
    game.guess21OrUnder(game);
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.card).toBe(undefined);
    expect(game.state.cards.length).toBe(4);
  });
});

describe('guessOver21', () => {
  test('guessOver21 should draw the next card but not push to the cards array', () => {
    // Arrange

    // Inject our dependencies
    const deck = [
      '05L', '01D', '09S', '10H',
    ];
    const game = gameConstructorMockDealer(deck);
    // Act
    game.guessOver21(game);

    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.cards[1]).toEqual('09S');
    expect(game.state.card).toEqual('01D');
  });
});
