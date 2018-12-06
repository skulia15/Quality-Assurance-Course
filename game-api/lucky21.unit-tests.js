const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

// Given Tests
describe('Given Tests', () => {
  test('a new game should have 50 cards left in the deck', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    const game = lucky21Constructor(deck, dealer);
    expect(game.state.deck.length).toEqual(50);
  });

  test('a new game should have 2 drawn cards', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    const game = lucky21Constructor(deck, dealer);
    expect(game.state.cards.length).toEqual(2);
  });

  test('guess21OrUnder should draw the next card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });
});

// isGameOver
describe('isGameOver', () => {
  test('isGameOver when game is not over', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '2C', '2D', '02L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);
    const res = game.isGameOver(game);
    // Assert
    expect(res).toBe(false);
  });

  test('isGameOver when game is over when player loses', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);
    const res = game.isGameOver(game);
    // Assert
    expect(res).toBe(true);
  });

  test('isGameOver when game is over when player wins', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guessOver21(game);
    const res = game.playerWon(game);

    // Assert
    expect(res).toBe(true);
  });

  test('playerWon when player lost', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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
    let deck = deckConstructor();
    deck = [
      '10H', '13C', '10D', '10L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    const res = game.getCardsValue(game);
    // Assert
    expect(res).toEqual(20);
  });


  test('getCardsValue of when 2 cards, with ace under 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '13C', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    const res = game.getCardsValue(game);
    // Assert
    expect(res).toEqual(16);
  });

  test('getCardsValue of when 3 cards, with ace over 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '01C', '12D', '12L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = dealer.draw(deck);
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

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = dealer.draw(deck);
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

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = dealer.draw(deck);
    const res = game.getCardValue(game);
    // Assert
    expect(res).toEqual(10);
  });

  test('getCardValue of Ace', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '01C', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = dealer.draw(deck);
    const res = game.getCardValue(game);
    // Assert
    expect(res).toEqual(11);
  });
});

describe('getTotal', () => {
  test('getTotal of three normal cards', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '04C', '03D', '02L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);
    const res = game.getTotal(game);
    // Assert
    expect(res).toEqual(9);
  });

  test('getTotal when card is not defined', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '04C', '03D', '02L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = undefined;
    const res = game.getTotal(game);

    // Assert
    expect(res).toEqual(5);
  });

  test('getTotal of three aces when guess under 21', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '01C', '01D', '01L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);
    const res = game.getTotal(game);
    // Assert
    expect(res).toEqual(13);
  });

  test('getTotal with all card types, ace, normal, royal', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '13C', '7D', '01L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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
    let deck = deckConstructor();
    deck = [
      '05H', '05S', '05D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    // Do nothing

    const res = game.getCards(game);
    // Assert
    expect(res).toEqual(['05L', '05D']);
  });

  test('getCards get all of the players cards after 2 turns', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '05H', '05S', '05D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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
    let deck = deckConstructor();
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.state.card = dealer.draw(deck);
    const res = game.getCard(game);

    // Assert
    expect(res).toEqual('09S');
  });

  test('getCard of undefined card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    const res = game.getCard(game);

    // Assert
    expect(res).toBe(undefined);
  });

  test('getCard expect undefined after guessing 21 or under', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '09S', '01D', '05L',
    ];

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

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
    let deck = deckConstructor();
    deck = [
      '05L', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guessOver21(game, dealer);

    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.cards[1]).toEqual('09S');
    expect(game.state.card).toEqual('01D');
  });
});
// Test getCards when more than two cards
// Test Aces
// Test drawing all cards in a deck?
