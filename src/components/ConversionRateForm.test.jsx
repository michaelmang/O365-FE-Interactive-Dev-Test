import { shallow } from 'enzyme';
import React from 'react';

import ConversionRateForm from './ConversionRateForm.jsx';
import renderSnapshot from '../testing/renderSnapshot.js';

describe('ConversionRateForm', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  const extractComponents = (root) => ({
    root,
  });

  const renderComponent = (props) => (
    shallow(
      <ConversionRateForm
        {...props}
      />
    )
  );
});
