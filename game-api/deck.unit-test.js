describe('deck', () => {
  // 2
  test('dealer should should shuffle cards', () => {
    // Arrange
    const deck = require('./deck.js');
    // Assert
    expect(deck()[0]).toEqual('01H');
    expect(deck()[51]).toEqual('13S');
  });
});

