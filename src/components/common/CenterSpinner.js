import React from 'react';
import './CenterSpinner.scss';
import Spinner from 'react-bootstrap/Spinner';

function CenterSpinner() {
  return (
    <span className="center-spinner">
      <Spinner animation="border" variant="primary" />
    </span>
  );
}

export default CenterSpinner;