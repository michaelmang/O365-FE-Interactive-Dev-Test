import axios from 'axios';

const getConversionRate = async ({ baseCurrency, date, targetCurrency }={}) => {
  let resp;
  try {
    resp = await axios.get(getConversionRateUrl({ baseCurrency, date }));
  }
  catch (ex) {
    throw new Error(`Conversion Rate API failed with the following message: ${ex.message}`);
  }

  if (!isExpectedStatus(resp)) {
    throw new Error(`Conversion Rate API returned an unexpected status: ${resp.status}`);
  }

  return getTargetCurrency(targetCurrency, resp);
};

const getConversionRateUrl = ({ baseCurrency, date }) =>
  `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;

const getTargetCurrency = (targetCurrency, { data }) => data.rates[targetCurrency];

const isExpectedStatus = ({ status }, expectedStatus=200) => status === expectedStatus;

export default getConversionRate;
