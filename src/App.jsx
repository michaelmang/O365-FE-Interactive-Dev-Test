import 'bulma/css/bulma.css';
import React from 'react';

import styles from './App.module.scss';
import ConversionRateForm from './components/ConversionRateForm.jsx';

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className="title">Look Up Conversion Rate</h1>
      <ConversionRateForm />
    </div>
  );
};

export default App;
