import { shallow } from 'enzyme';
import React from 'react';

import Select from './Select.jsx';
import renderSnapshot from '../testing/renderSnapshot.js';

jest.mock('./Select.module.scss', () => ({
  field: 'styles.field',
}));

describe('Select', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  describe('select', () => {
    it('passes down onChange prop with value of onSelect', () => {
      let onSelect = jest.fn();
      let { select: subject } = extractComponents(renderComponent({
        onSelect,
      }));

      expect(subject).toHaveProp(
        'onChange',
        onSelect,
      );
    });
  });

  const extractComponents = (root) => ({
    root,
    select: root.find('select'),
    someCurrencyOption: root.find('[value="BGN"]'),
  });

  const renderComponent = (props) => (
    shallow(
      <Select
        label="default label"
        onSelect={() => {}}
        value="default value"
        {...props}
      />
    )
  );
});
