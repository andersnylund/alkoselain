import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  chunk,
  capitalizeFirstChar,
  getFileNumber,
  getProducts,
} from './helpers';
import { alkoUrl } from './constants';

const axiosMock = new MockAdapter(axios);

describe('helpers.js', () => {
  describe('chunk()', () => {
    it('should chunk the data', () => {
      const array = [1, 2, 3, 4];
      const result = chunk(array, 2);
      expect(result).toEqual([[1, 2], [3, 4]]);
    });
  });
  describe('capitalizeFirstChar()', () => {
    it('should capitalize separate words', () => {
      const string = 'this is a string';
      expect(capitalizeFirstChar(string)).toEqual('This is a string');
    });
  });

  describe('getFileNumber()', () => {
    it('should get the file number with an integer', () => {
      expect(getFileNumber(1)).toEqual('000001');
    });
    it('should get the file number with a string', () => {
      expect(getFileNumber('32')).toEqual('000032');
    });
  });

  describe('getProducts()', () => {
    axiosMock.onGet(alkoUrl).reply(200, {});
    it('should run without errors', async () => {
      await getProducts();
    });
  });
});
