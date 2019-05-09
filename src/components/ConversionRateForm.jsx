import classnames from 'classnames';
import React from 'react';

import styles from './ConversionRateForm.module.scss';

const ConversionRateForm = (props) => {
  return (
    <form className={styles.container}>
      <div className={classnames('field', styles.field)}>
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Base Currency</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className={classnames('field', styles.field)}>
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Target Currency</option>
              <option>With options</option>
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
