import axios from 'axios';

const getConversionRate = async ({ baseCurrency, date, targetCurrency }={}) => {
  if (!baseCurrency) {
    throw new Error('Must provide baseCurrency.');
  }

  if (!date) {
    throw new Error('Must provide date.');
  }

  if (!targetCurrency) {
    throw new Error('Must provide targetCurrency.');
  }

  let url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
  let resp = await axios.get(url);
  return getTargetCurrency(targetCurrency, resp);
};

const getTargetCurrency = (targetCurrency, { data }) => data.rates[targetCurrency];

export default getConversionRate;
