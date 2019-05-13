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
      status: 200,
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

    describe('returns unexpected (non-200) response status', () => {
      let someNon200Status;

      beforeEach(() => {
        someNon200Status = 999;
        axios.get.mockResolvedValue({
          data: {
            rates: {
              RUB: '123',
              USD: '456',
              AUD: '789',
            },
          },
          status: someNon200Status,
        });
      });

      it('throws associated error', async () => {
        let actual;

        try {
          await getConversionRate({
            baseCurrency: 'CAD',
            date: '1970-01-01',
            targetCurrency: 'USD',
          });
        }
        catch (ex) {
          actual = ex;
        }

        let expected = new Error(`Conversion Rate API returned an unexpected status: ${someNon200Status}`);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('request resolves unsuccessfully', () => {
    beforeEach(() => {
      axios.get.mockRejectedValue(new Error('kaboom'));
    });

    it('throws associated errror', async () => {
      let actual;

      try {
        await getConversionRate({
          baseCurrency: 'CAD',
          date: '1970-01-01',
          targetCurrency: 'USD',
        });
      }
      catch (ex) {
        actual = ex;
      }

      let expected = new Error('Conversion Rate API failed with the following message: kaboom');
      expect(actual).toEqual(expected);
    });
  });
});
