import React from 'react';

const DbContext = React.createContext({
  books: [],
  handleBookDelete: () => undefined,
  handleBookToggle: () => undefined
});

export default DbContext;
