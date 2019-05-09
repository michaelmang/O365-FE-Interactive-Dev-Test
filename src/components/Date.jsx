import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Date.module.scss';

const Date = ({ onDate, value }) => (
  <div className={classnames('field', styles.field)}>
    <div className="control">
      <input className="input" onChange={onDate} type="date" value={value} />
    </div>
  </div>
);

Date.propTypes = {
  onDate: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Date;
