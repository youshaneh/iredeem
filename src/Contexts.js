import React from 'react';

export let SearchOptionContext = React.createContext({
  nonStopOnly: false,
  availableOnly: false,
  setNonStopOnly: () => {},
  setAvailableOnly: () => {}
});

export let RouteContext = React.createContext({
  routes: undefined
});