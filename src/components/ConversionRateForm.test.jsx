import { shallow } from 'enzyme';
import React from 'react';

import ConversionRateForm from './ConversionRateForm.jsx';
import Date from './Date.jsx';
import getConversionRate from '../getConversionRate.js';
import renderSnapshot from '../testing/renderSnapshot.js';

jest.mock('./ConversionRateForm.module.scss', () => ({
  container: 'styles.container',
}));
jest.mock('./Date.jsx', () => 'Date');
jest.mock('./Select.jsx', () => 'Select');
jest.mock('../getConversionRate.js');

describe('ConversionRateForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.resetAllMocks();
  });

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

      it('resets conversionRate state', () => {
        let { baseCurrencySelect: subject, root } = extractComponents(renderComponent());
        root.setState({
          conversionRate: '123',
        });

        subject.props().onSelect(createEvent('some base currency'));
        root.update();

        expect(root).toHaveState(
          'conversionRate',
          null,
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

      it('resets conversionRate state', () => {
        let { targetCurrencySelect: subject, root } = extractComponents(renderComponent());
        root.setState({
          conversionRate: '123',
        });

        subject.props().onSelect(createEvent('some target currency'));
        root.update();

        expect(root).toHaveState(
          'conversionRate',
          null,
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

      it('resets conversionRate state', () => {
        let { dateSelect: subject, root } = extractComponents(renderComponent());
        root.setState({
          conversionRate: '123',
        });

        subject.props().onDate(createEvent('some date'));
        root.update();

        expect(root).toHaveState(
          'conversionRate',
          null,
        );
      });
    });
  });

  describe('on form submission', () => {
    it('calls event.preventDefault', () => {
      let preventDefault = jest.fn();
      let { form } = extractComponents(renderComponent());

      expect(preventDefault).not.toHaveBeenCalled();

      form.props().onSubmit({ preventDefault });

      expect(preventDefault).toHaveBeenCalled();
    });

    describe('submission validation', () => {
      describe('missing base currency', () => {
        it('calls appendError prop with associated exception', async () => {
          let appendError = jest.fn();
          let { form } = extractComponents(renderComponent({
            appendError,
          }));

          form.props().onSubmit({
            preventDefault: () => {},
          });

          let expected = new Error('Must provide a valid base currency.');
          expect(appendError).toHaveBeenCalledWith(expected);
        });

        it('also calls appendError with associated exception when default option selected', () => {
          let appendError = jest.fn();
          let { baseCurrencySelect, form } = extractComponents(renderComponent({
            appendError,
          }));

          baseCurrencySelect.props().onSelect(createDefaultOption());

          form.props().onSubmit({
            preventDefault: () => {},
          });

          let expected = new Error('Must provide a valid base currency.');
          expect(appendError).toHaveBeenCalledWith(expected);
        });

        it('renders form and no conversion rate output', async () => {
          let { form, root } = extractComponents(renderComponent());

          form.props().onSubmit({
            preventDefault: () => {},
          });
          root.update();

          expect(renderSnapshot(root)).toMatchSnapshot();
        });
      });

      describe('missing target currency', () => {
        it('calls appendError prop with associated exception', async () => {
          let appendError = jest.fn();
          let {
            baseCurrencySelect,
            form,
          } = extractComponents(renderComponent({
            appendError,
          }));

          baseCurrencySelect.props().onSelect(createEvent('some base currency'));

          form.props().onSubmit({
            preventDefault: () => {},
          });

          let expected = new Error('Must provide a valid target currency.');
          expect(appendError).toHaveBeenCalledWith(expected);
        });


        it('also calls appendError with associated exception when default option selected', () => {
          let appendError = jest.fn();
          let {
            baseCurrencySelect,
            form,
            targetCurrencySelect,
          } = extractComponents(renderComponent({
            appendError,
          }));

          baseCurrencySelect.props().onSelect(createEvent('some base currency'));
          targetCurrencySelect.props().onSelect(createDefaultOption());

          form.props().onSubmit({
            preventDefault: () => {},
          });

          let expected = new Error('Must provide a valid target currency.');
          expect(appendError).toHaveBeenCalledWith(expected);
        });

        it('renders form and no conversion rate output', async () => {
          let {
            baseCurrencySelect,
            form,
            root,
          } = extractComponents(renderComponent());

          baseCurrencySelect.props().onSelect(createEvent('some base currency'));

          form.props().onSubmit({
            preventDefault: () => {},
          });
          root.update();

          expect(renderSnapshot(root)).toMatchSnapshot();
        });
      });

      describe('missing date', () => {
        it('calls appendError prop with associated exception', async () => {
          let appendError = jest.fn();
          let {
            baseCurrencySelect,
            form,
            targetCurrencySelect,
          } = extractComponents(renderComponent({
            appendError,
          }));

          baseCurrencySelect.props().onSelect(createEvent('some base currency'));
          targetCurrencySelect.props().onSelect(createEvent('some target currency'));

          form.props().onSubmit({
            preventDefault: () => {},
          });

          let expected = new Error('Must provide a valid date.');
          expect(appendError).toHaveBeenCalledWith(expected);
        });

        it('renders form and no conversion rate output', async () => {
          let {
            baseCurrencySelect,
            form,
            root,
            targetCurrencySelect,
          } = extractComponents(renderComponent());

          baseCurrencySelect.props().onSelect(createEvent('some base currency'));
          targetCurrencySelect.props().onSelect(createEvent('some target currency'));

          form.props().onSubmit({
            preventDefault: () => {},
          });
          root.update();

          expect(renderSnapshot(root)).toMatchSnapshot();
        });
      });
    });

    it('calls getConversionRate with baseCurrencySelect, date, and targetCurrency state', () => {
      let {
        baseCurrencySelect,
        dateSelect,
        form,
        targetCurrencySelect,
      } = extractComponents(renderComponent());

      baseCurrencySelect.props().onSelect(createEvent('some base currency'));
      targetCurrencySelect.props().onSelect(createEvent('some target currency'));
      dateSelect.props().onDate(createEvent('some date'));

      expect(getConversionRate).not.toHaveBeenCalled();

      form.props().onSubmit({
        preventDefault: () => {},
      });

      expect(getConversionRate).toHaveBeenCalledWith({
        baseCurrency: 'some base currency',
        date: 'some date',
        targetCurrency: 'some target currency',
      });
    });

    describe('when getConversionRate is pending', () => {
      it('only renders progress bar', () => {
        let {
          baseCurrencySelect,
          dateSelect,
          form,
          root,
          targetCurrencySelect,
        } = extractComponents(renderComponent());

        baseCurrencySelect.props().onSelect(createEvent('some base currency'));
        targetCurrencySelect.props().onSelect(createEvent('some target currency'));
        dateSelect.props().onDate(createEvent('some date'));

        form.props().onSubmit({
          preventDefault: () => {},
        });
        root.update();

        expect(renderSnapshot(root)).toMatchSnapshot();
      });
    });

    describe('when getConversionRate resolves successfully', () => {
      beforeEach(() => {
        getConversionRate.mockResolvedValue('123.4567');
      });

      it('renders form and conversion rate output', async () => {
        let actual = await submitForm();

        expect(renderSnapshot(actual)).toMatchSnapshot();
      });
    });

    describe('when getConversionRate throws an exception', () => {
      let someError;

      beforeEach(() => {
        someError = new Error('kaboom');
        getConversionRate.mockRejectedValue(someError);
      });

      it('calls appendError prop with raised exception', async () => {
        let appendError = jest.fn();

        await submitForm({ appendError });

        expect(appendError).toHaveBeenCalledWith(someError);
      });

      it('renders form and no conversion rate output', async () => {
        let appendError = jest.fn();

        let actual = await submitForm({ appendError });

        expect(renderSnapshot(actual)).toMatchSnapshot();
      });
    });
  });

  const createDefaultOption = () => createEvent('-1');

  const createEvent = (value) => ({ target: { value } });

  const extractComponents = (root) => ({
    baseCurrencySelect: root.find('[label="Pick Base Currency"]'),
    dateSelect: root.find(Date),
    form: root.find('form'),
    root,
    targetCurrencySelect: root.find('[label="Pick Target Currency"]'),
  });

  const renderComponent = (props) => (
    shallow(
      <ConversionRateForm
        appendError={() => {}}
        {...props}
      />
    )
  );

  const submitForm = async (props) => {
    let {
      baseCurrencySelect,
      dateSelect,
      form,
      root,
      targetCurrencySelect,
    } = extractComponents(renderComponent(props));

    baseCurrencySelect.props().onSelect(createEvent('some base currency'));
    targetCurrencySelect.props().onSelect(createEvent('some target currency'));
    dateSelect.props().onDate(createEvent('some date'));

    await form.props().onSubmit({
      preventDefault: () => {},
    });
    root.update();

    return root;
  };
});
