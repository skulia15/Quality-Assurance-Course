const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

// Given Tests
test('a new game should have 50 cards left in the deck', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});


// isGameOver
describe('isGameOver', () => {
  test('isGameOver when game is not over', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '2C', '2D', '02L',
    ];
    
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);
    
    // Act
    game.guess21OrUnder(game);
    var res = game.isGameOver(game);
    // Assert
    expect(res).toBe(false);
  }); 
  
  test('isGameOver when game is over when player loses', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];
    
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);
    
    // Act
    game.guess21OrUnder(game);
    var res = game.isGameOver(game);
    // Assert
    expect(res).toBe(true);
  });

  test('isGameOver when game is over when player wins', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '10H', '10C', '10D', '10L',
    ];
    
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);
    
    // Act
    game.guessOver21(game);
    var res = game.isGameOver(game);
    // Assert
    expect(res).toBe(true);
  });
})

describe('playerWon', () => {
  test('playerWon when player won', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
        '10H', '10C', '10D', '10L',
    ];
  
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);
  
    // Act
    game.guessOver21(game);
    var res = game.playerWon(game);
  
    // Assert
    expect(res).toBe(true);
  });
  
  test('playerWon when player lost', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
        '10H', '10C', '10D', '10L',
    ];
  
    let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
    let game = lucky21Constructor(deck, dealer);
  
    // Act
    game.guess21OrUnder(game);
    var res = game.playerWon(game);
  
    // Assert
    expect(res).toBe(false);
  });
});

// Test getCard
test('getCard of valid card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    
    // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.state.card = dealer.draw(deck);
  var res = game.getCard(game);

  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual('09S');
});

test('getCard of undefined card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  var res = game.getCard(game);

  // Assert
  // console.log(game.state.cards);
  expect(game.state.card).toBe(undefined);
});

test('getCard expect undefined after ', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  var res = game.getCard(game);

  // Assert
  // console.log(game.state.cards);
  expect(game.state.card).toBe(undefined);
});


test('getCards get all of the players cards after 2 turns', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05H', '05S', '05D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  
  var res = game.getCards(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(['05L', '05D', '05S', '05H']);
}); 


test('getCardValue of 02-09', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.state.card = dealer.draw(deck);
  var res = game.getCardValue(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(9);
}); 

test('getCardValue of 10-13', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '13C', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.state.card = dealer.draw(deck);
  var res = game.getCardValue(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(10);
}); 

test('getCardValue of Ace', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '01C', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.state.card = dealer.draw(deck);
  var res = game.getCardValue(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(11);
}); 


test('getTotal of three aces when guess under', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '01C', '01D', '01L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  var res = game.getTotal(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(13);
}); 

test('getTotal with all card types, ace, normal, royal', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '13C', '7D', '01L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game)
  var res = game.getTotal(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toEqual(18);
}); 




test('getCardsValue of when 2 cards', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '13C', '10D', '10L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  var res = game.getCardsValue(game);
  // Assert
  expect(res).toEqual(20);
}); 


test('getCardsValue of when 2 cards, with ace under 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '13C', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  var res = game.getCardsValue(game);
  // Assert
  expect(res).toEqual(16);
});

test('getCardsValue of when 3 cards, with ace over 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '13C', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.state.card = dealer.draw(deck);
  game.state.cards.push(game.getCard(game));
  var res = game.getCardsValue(game);
  // Assert
  expect(res).toEqual(16);
});

test('guessOver21 should draw the next card but not push to the cards array', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05L', '01D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guessOver21(game, dealer);
  
  // Assert
  // console.log(game.state.cards);
  expect(game.state.cards.length).toEqual(2);
  expect(game.state.cards[1]).toEqual('09S');
  expect(game.state.card).toEqual('01D');
});

// Test getCards when more than two cards
// Test Aces
//Test drawing all cards in a deck?