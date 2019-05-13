import 'bulma/css/bulma.css';
import React from 'react';

import styles from './App.module.scss';
import ConversionRateForm from './components/ConversionRateForm.jsx';
import Notifications from './components/Notifications.jsx';

export default class App extends React.PureComponent {
  state = {
    errors: [],
  }

  appendError = (error) => {
    this.setState({ errors: [error] });
  }

  render() {
    let { errors } = this.state;
    return (
      <div className={styles.container}>
        <h1 className="title">Look Up Conversion Rate</h1>
        <ConversionRateForm appendError={this.appendError} />
        <Notifications errors={errors} />
      </div>
    );
  }
}
