const randomdDep = require('./random.js');

describe('random', () => {
  // 3
  test('randomInt should return a valid value between 1 and 10', () => {
    // Arrange
    const random = randomdDep();

    // Act
    const value = random.randomInt(1, 10);


    // Assert
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThan(10);
  });

  test('randomInt should return be 10 when numbers are reversed', () => {
    // Arrange
    const random = randomdDep();

    // Act
    const value = random.randomInt(10, 11);


    // Assert
    expect(value).toBe(10);
  });

  test('randomInt should return 1', () => {
    // Arrange
    const random = randomdDep();

    // Act
    const value = random.randomInt(1, 1);


    // Assert
    expect(value).toBe(1);
  });

  test('randomInt should return undefined', () => {
    // Arrange
    const random = randomdDep();

    // Act
    const value = random.randomInt('p', 'p');


    // Assert
    expect(value).toBe(NaN);
  });

  test('randomInt should return number in a large number space', () => {
    // Arrange
    const random = randomdDep();

    // Act
    const value = random.randomInt(Number.MIN_VALUE, Number.MAX_VALUE);


    // Assert
    expect(value).toBeGreaterThanOrEqual(Number.MIN_VALUE);
    expect(value).toBeLessThan(Number.MAX_VALUE);
  });
});


