import { shallow } from 'enzyme';
import React from 'react';

import ConversionRateForm from './ConversionRateForm.jsx';
import Date from './Date.jsx';
import renderSnapshot from '../testing/renderSnapshot.js';

jest.mock('./ConversionRateForm.module.scss', () => ({
  container: 'styles.container',
}));
jest.mock('./Date.jsx', () => 'Date');
jest.mock('./Select.jsx', () => 'Select');

describe('ConversionRateForm', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  describe('base currency select', () => {
    describe('when onSelect fires', () => {
      it('passes down value prop set to received event value', () => {
        let { baseCurrencySelect: subject, root } = extractComponents(renderComponent());

        subject.props().onSelect(createEvent('some base currency'));
        root.update();
        subject = extractComponents(root).baseCurrencySelect;

        expect(subject).toHaveProp(
          'value',
          'some base currency',
        );
      });
    });
  });

  describe('target currency select', () => {
    describe('when onSelect fires', () => {
      it('passes down value prop set to received event value', () => {
        let { targetCurrencySelect: subject, root } = extractComponents(renderComponent());

        subject.props().onSelect(createEvent('some target currency'));
        root.update();
        subject = extractComponents(root).targetCurrencySelect;

        expect(subject).toHaveProp(
          'value',
          'some target currency',
        );
      });
    });
  });

  describe('date select', () => {
    describe('when onDate fires', () => {
      it('passes down value prop set to received event value', () => {
        let { dateSelect: subject, root } = extractComponents(renderComponent());

        subject.props().onDate(createEvent('some date'));
        root.update();
        subject = extractComponents(root).dateSelect;

        expect(subject).toHaveProp(
          'value',
          'some date',
        );
      });
    });
  });

  const createEvent = (value) => ({ target: { value } });

  const extractComponents = (root) => ({
    baseCurrencySelect: root.find('[label="Pick Base Currency"]'),
    dateSelect: root.find(Date),
    root,
    targetCurrencySelect: root.find('[label="Pick Target Currency"]'),
  });

  const renderComponent = (props) => (
    shallow(
      <ConversionRateForm
        {...props}
      />
    )
  );
});
