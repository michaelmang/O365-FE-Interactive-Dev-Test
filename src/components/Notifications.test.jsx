import { shallow } from 'enzyme';
import React from 'react';

import Notifications from './Notifications.jsx';
import renderSnapshot from '../testing/renderSnapshot.js';

jest.mock('./Notifications.module.scss', () => ({
  container: 'styles.container',
}));

describe('Notifications', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  const extractComponents = (root) => ({
    root,
  });

  const renderComponent = (props) => (
    shallow(
      <Notifications
        errors={[
          { id: 'some-error', message: 'derp' },
          { id: 'another-error', message: 'chirp' },
          { id: 'third-error', message: 'hero' },
        ]}
      />
    )
  );
});
