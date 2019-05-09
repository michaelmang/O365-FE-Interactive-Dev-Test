import classnames from 'classnames';
import React from 'react';

import styles from './ConversionRateForm.module.scss';

const currencies = [
  'BGN',
  'NZD',
  'ILS',
  'RUB',
  'CAD',
  'USD',
  'PHP',
  'CHF',
  'ZAR',
  'AUD',
  'JPY',
  'TRY',
  'HKD',
  'MYR',
  'THB',
  'HRK',
  'NOK',
  'IDR',
  'DKK',
  'CZK',
  'HUF',
  'GBP',
  'MXN',
  'KRW',
  'ISK',
  'SGD',
  'BRL',
  'PLN',
  'INR',
  'RON',
  'CNY',
  'SEK',
];

const ConversionRateForm = (props) => {
  let currencyOptions = currencies.map(c => (
    <option key={c}>{c}</option>
  ));

  return (
    <form className={styles.container}>
      <div className={classnames('field', styles.field)}>
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Base Currency</option>
              {currencyOptions}
            </select>
          </div>
        </div>
      </div>

      <div className={classnames('field', styles.field)}>
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Target Currency</option>
              {currencyOptions}
            </select>
          </div>
        </div>
      </div>

      <div className={classnames('field', styles.field)}>
        <div className="control">
          <input className="input" type="date" />
        </div>
      </div>

      <button className="button is-primary">Look Up</button>
    </form>
  );
};

export default ConversionRateForm;
