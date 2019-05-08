import { shallow } from 'enzyme';
import React from 'react';

import App from './App.jsx';
import renderSnapshot from './testing/renderSnapshot.js';

jest.mock('./App.module.scss', () => ({
  container: 'styles.container',
}));

describe('App', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  const extractComponents = (root) => ({
    root,
  });

  const renderComponent = (props) => (
    shallow(
      <App
        {...props}
      />
    )
  );
});
