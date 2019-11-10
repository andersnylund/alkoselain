import { capitalizeFirstChar } from './helpers';

describe('helpers.js', () => {
  describe('capitalizeFirstChar()', () => {
    it('should capitalize separate words', () => {
      const string = 'this is a string';
      expect(capitalizeFirstChar(string)).toEqual('This is a string');
    });
  });
});
