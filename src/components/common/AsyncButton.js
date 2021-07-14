import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function AsyncButton({ children, onClick = () => Promise.resolve(''), onFinish = () => { }}) {
  let [processing, setProcessing] = useState(false);
  function start() {
    if (!processing) {
      setProcessing(true);
      onClick()
        .then(() => {
          onFinish();
        })
        .finally(() => {
          setProcessing(false);
        })
    }
  }

  return (
    <button className={`theme_btn track-btn stretch`} onClick={start}>
      {processing ? <Spinner animation="border" variant="primary" size="sm" /> : children}
    </button>);
}