import axios from 'axios';

import getConversionRate from './getConversionRate.js';

jest.mock('axios');

describe('getConversionRate', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        rates: {
          RUB: '123',
          USD: '456',
          AUD: '789',
        },
      },
    });
  });

  it('calls axios.get with constructed conversion rate route using provided base currency and date', () => {
    getConversionRate({
      baseCurrency: 'USD',
      date: '1970-01-01',
      targetCurrency: 'AUD',
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangeratesapi.io/1970-01-01?base=USD'
    );
  });

  describe('missing arguments', () => {
    describe('missing baseCurrency', () => {
      it('throws associated error', async () => {
        let actual;

        try {
          await getConversionRate();
        }
        catch (ex) {
          actual = ex;
        }

        expect(actual).toEqual(new Error('Must provide baseCurrency.'));
      });
    });

    describe('missing date', () => {
      it('throws associated error', async () => {
        let actual;

        try {
          await getConversionRate({
            baseCurrency: 'CAD',
          });
        }
        catch (ex) {
          actual = ex;
        }

        expect(actual).toEqual(new Error('Must provide date.'));
      });
    });

    describe('missing targetCurrency', () => {
      it('throws associated error', async () => {
        let actual;

        try {
          await getConversionRate({
            baseCurrency: 'CAD',
            date: '1970-01-01',
          });
        }
        catch (ex) {
          actual = ex;
        }

        expect(actual).toEqual(new Error('Must provide targetCurrency.'));
      });
    });
  });

  describe('request resolves successfully', () => {
    it('returns conversion rate for provided target currency', async () => {
      let actual = await getConversionRate({
        baseCurrency: 'CAD',
        date: '1970-01-01',
        targetCurrency: 'USD',
      });

      let expected = '456';
      expect(actual).toBe(expected);
    });
  });
});
