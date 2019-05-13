import { shallow } from 'enzyme';
import React from 'react';

import App from './App.jsx';
import ConversionRateForm from './components/ConversionRateForm.jsx';
import Notifications from './components/Notifications.jsx';
import renderSnapshot from './testing/renderSnapshot.js';

jest.mock('./App.module.scss', () => ({
  container: 'styles.container',
}));
jest.mock('./components/ConversionRateForm.jsx', () => 'ConversionRateForm');
jest.mock('./components/Notifications.jsx', () => 'Notifications');

describe('App', () => {
  it('matches the saved snapshot', () => {
    let { root: actual } = extractComponents(renderComponent());

    expect(renderSnapshot(actual)).toMatchSnapshot();
  });

  describe('errors appended', () => {
    it('passes down appended errors to Notifications', () => {
      let {
        conversionRateForm,
        notifications: subject,
        root,
      } = extractComponents(renderComponent());

      expect(subject).toHaveProp(
        'errors',
        [],
      );

      conversionRateForm.props().appendError({
        id: 'some-error',
        message: 'some error message',
      });
      root.update();

      subject = extractComponents(root).notifications;

      expect(subject).toHaveProp(
        'errors',
        [{ id: 'some-error', message: 'some error message' }],
      );
    });
  });

  describe('errors cleared', () => {
    it('passes down empty list of errors to Notifications when errors cleared', () => {
      let {
        conversionRateForm,
        notifications: subject,
        root,
      } = extractComponents(renderComponent());

      conversionRateForm.props().appendError({
        id: 'some-error',
        message: 'some error message',
      });
      root.update();

      subject = extractComponents(root).notifications;

      expect(subject).toHaveProp(
        'errors',
        [{ id: 'some-error', message: 'some error message' }],
      );

      conversionRateForm.props().clearError();
      root.update();


      subject = extractComponents(root).notifications;

      expect(subject).toHaveProp(
        'errors',
        [],
      );
    });
  });
  const extractComponents = (root) => ({
    conversionRateForm: root.find(ConversionRateForm),
    notifications: root.find(Notifications),
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
