import React from 'react';

import styles from './ConversionRateForm.module.scss';
import Date from './Date.jsx';
import Select from './Select.jsx';

export default class ConversionRateForm extends React.PureComponent {
  state = {
    baseCurrency: '',
    date: '',
    targetCurrency: '',
  }

  handleBaseCurrency = ({ target }) => {
    this.setState({ baseCurrency: target.value });
  }

  handleDate = ({ target }) => {
    this.setState({ date: target.value });
  }

  handleTargetCurrency = ({ target }) => {
    this.setState({ targetCurrency: target.value });
  }

  render() {
    let {
      baseCurrency,
      date,
      targetCurrency,
    } = this.state;

    return (
      <form className={styles.container}>
        <Select
          label="Pick Base Currency"
          onSelect={this.handleBaseCurrency}
          value={baseCurrency}
        />
        <Select
          label="Pick Target Currency"
          onSelect={this.handleTargetCurrency}
          value={targetCurrency}
        />
        <Date onDate={this.handleDate} value={date} />
        <button className="button is-primary">Look Up</button>
      </form>
    );
  }
}
