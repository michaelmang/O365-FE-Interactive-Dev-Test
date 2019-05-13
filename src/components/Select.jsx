import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Select.module.scss';
import currencies from '../currencies.js';

const Select = ({ label, onSelect, value }) => {
  let currencyOptions = currencies.map(c => (
    <option key={c} value={c}>{c}</option>
  ));

  return (
    <div className={classnames('field', styles.field)}>
      <div className="control">
        <div className="select">
          <select onChange={onSelect} value={value}>
            <option value="-1">{label}</option>
            {currencyOptions}
          </select>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
