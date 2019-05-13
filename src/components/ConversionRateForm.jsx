import PropTypes from 'prop-types';
import React from 'react';

import styles from './ConversionRateForm.module.scss';
import Date from './Date.jsx';
import Select from './Select.jsx';
import getConversionRate from '../getConversionRate.js';
import formatRate from '../helpers/formatRate.js';

export default class ConversionRateForm extends React.PureComponent {
  state = {
    baseCurrency: '',
    conversionRate: null,
    date: '',
    isLoading: false,
    targetCurrency: '',
  }

  handleApiException(ex) {
    this.setState({ isLoading: false });
    this.props.appendError(ex);
    console.error(ex);
    return;
  }

  handleBaseCurrency = ({ target }) => {
    let { value: baseCurrency } = target;
    this.setState({ baseCurrency });

    this.resetConversionRate();
  }

  handleDate = ({ target }) => {
    let { value: date } = target;
    this.setState({ date });

    this.resetConversionRate();
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    let conversionRate;
    try {
      this.validateSubmission();

      let { baseCurrency, date, targetCurrency } = this.state;
      conversionRate = await getConversionRate({
        baseCurrency,
        date,
        targetCurrency,
      });
    }
    catch (ex) {
      this.handleApiException(ex);
    }
    finally {
      this.setState({ isLoading: false });
      this.setState({ conversionRate });
    }
  }

  handleTargetCurrency = ({ target }) => {
    let { value: targetCurrency } = target;
    this.setState({ targetCurrency });

    this.resetConversionRate();
  }

  resetConversionRate() {
    this.setState({ conversionRate: null });
  }

  validateSubmission() {
    let { baseCurrency, date, targetCurrency } = this.state;

    if (!baseCurrency || hasDefaultOption(baseCurrency)) {
      throw new Error('Must provide a valid base currency.');
    }

    if (!targetCurrency || hasDefaultOption(targetCurrency)) {
      throw new Error('Must provide a valid target currency.');
    }

    if (!date) {
      throw new Error('Must provide a valid date.');
    }
  }

  render() {
    let { conversionRate, isLoading } = this.state;

    return (
      <div className={styles.container}>
        {isLoading ? this.renderLoader() : this.renderForm()}
        {(!isLoading && !!conversionRate) && this.renderConversionRate()}
      </div>
    );
  }

  renderConversionRate() {
    let {
      baseCurrency,
      conversionRate,
      date,
      targetCurrency,
    } = this.state;

    return (
      <div className={styles.container} data-test-id="conversion-rate-output">
        <p>1 {baseCurrency} =</p>
        <p className="has-text-dark has-text-weight-semibold is-size-4">
          {formatRate(conversionRate)} {targetCurrency}
        </p>
        <p className="has-text-grey">as of {date}</p>
      </div>
    );
  }

  renderForm() {
    let {
      baseCurrency,
      date,
      targetCurrency,
    } = this.state;

    return (
      <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
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
        <input className="button is-primary" type="submit" value="Look Up" />
      </form>
    );
  }

  renderLoader() {
    return (
      <progress
        className="progress is-medium is-primary"
        max="100"
        style={{ width: '20rem' }}
      />
    );
  }
}

const hasDefaultOption = (val) => val === '-1';

ConversionRateForm.propTypes = {
  appendError: PropTypes.func.isRequired,
};
