import { shallow } from 'enzyme';
import React from 'react';

import Date from './Date.jsx';
import renderSnapshot  from '../testing/renderSnapshot.js';

jest.mock('./Date.module.scss', () => ({
  field: 'styles.field',
}));

describe('Date', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  describe('input', () => {
    it('passes down onChange prop with value of onDate', () => {
      let onDate = jest.fn();
      let { input: subject } = extractComponents(renderComponent({
        onDate,
      }));

      expect(subject).toHaveProp(
        'onChange',
        onDate,
      );
    });
  });

  const extractComponents = (root) => ({
    input: root.find('input'),
    root,
  });

  const renderComponent = (props) => (
    shallow(
      <Date
        onDate={() => {}}
        value="some date"
        {...props}
      />
    )
  );
});
