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

  handleBaseCurrency = ({ target }) => {
    this.setState({
      baseCurrency: target.value,
      conversionRate: null,
    });
  }

  handleDate = ({ target }) => {
    this.setState({
      conversionRate: null,
      date: target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    let { baseCurrency, date, targetCurrency } = this.state;
    let newConversionRate;
    try {
      newConversionRate = await getConversionRate({
        baseCurrency,
        date,
        targetCurrency,
      });
    }
    catch (ex) {
      console.error(ex);

      this.props.appendError(ex);

      this.setState({ isLoading: false });

      return;
    }
    finally {
      this.setState({ isLoading: false });
      this.setState({ conversionRate: newConversionRate });
    }
  }

  handleTargetCurrency = ({ target }) => {
    this.setState({
      conversionRate: null,
      targetCurrency: target.value,
    });
  }

  render() {
    let {
      baseCurrency,
      conversionRate,
      date,
      isLoading,
      targetCurrency,
    } = this.state;

    return (
      <div className={styles.container}>
        {
          isLoading
          ? (
            <progress
              className="progress is-medium is-primary"
              max="100"
              style={{ width: '20rem' }}
            />
          )
          : (
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
          )
        }
        {
          !isLoading &&
          !!conversionRate && (
            <div className={styles.container} data-test-id="conversion-rate-output">
              <p>1 {baseCurrency} =</p>
              <p className="has-text-dark has-text-weight-semibold is-size-4">
                {formatRate(conversionRate)} {targetCurrency}
              </p>
              <p className="has-text-grey">as of {date}</p>
            </div>
          )
        }
      </div>
    );
  }
}

ConversionRateForm.propTypes = {
  appendError: PropTypes.func.isRequired,
};
