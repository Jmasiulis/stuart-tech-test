import * as apiValueValidator from '../apiValueValidator';

describe('validateNumberData', () => {
  it('should return value if it is of type number', () => {
    const result = apiValueValidator.validateNumberData(20, 'Key');

    expect(result).toEqual(20);
  });

  it('should return rejected promise if value is negative', () => {
    const result = apiValueValidator.validateNumberData(-5, 'Key');

    expect(result).toMatchInlineSnapshot(`Promise {}`);
  });
});
