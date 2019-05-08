import React from 'react';

import './ConversionRateForm.css';

const ConversionRateForm = (props) => {
  return (
    <form className="container">
      <div className="field">
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Base Currency</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className="select">
            <select>
              <option>Pick Target Currency</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="date" />
        </div>
      </div>

      <button className="button is-primary">Look Up</button>
    </form>
  );
};

export default ConversionRateForm;
