import PropTypes from 'prop-types';
import React from 'react';

import styles from './Notifications.module.scss';

const Notifications = ({ errors }) => (
  <div className={styles.container}>
    {errors.map(renderError)}
  </div>
);

Notifications.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
  })).isRequired,
};

const renderError = ({ message }, idx) => (
  <div key={idx} className="notification is-danger">
    {message}
  </div>
);

export default Notifications;
