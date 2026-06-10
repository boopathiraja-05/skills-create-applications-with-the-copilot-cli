const { add, sub, mul, div, modulo, power, squareRoot } = require('../calculator-lib');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(5, 0)).toThrow('Division by zero');
  });

  test('supports floating point division', () => {
    expect(div(7, 2)).toBeCloseTo(3.5);
  });

  // New tests for extended operations
  test('5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero');
  });

  test('2 ^ 3 = 8 (power)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with negative exponent', () => {
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  test('sqrt 16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of negative number throws', () => {
    expect(() => squareRoot(-9)).toThrow('Square root of negative number');
  });
});
