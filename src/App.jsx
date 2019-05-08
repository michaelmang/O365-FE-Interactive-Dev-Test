import 'bulma/css/bulma.css';
import React from 'react';

import './App.css';
import ConversionRateForm from './components/ConversionRateForm.jsx';

const App = () => {
  return (
    <div className="App">
      <h1 className="title">Look Up Conversion Rate</h1>
      <ConversionRateForm />
    </div>
  );
};

export default App;
