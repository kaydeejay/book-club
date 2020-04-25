import React from 'react';

const SearchContext = React.createContext({
  books: [],
  handleBookSave: () => undefined,
});

export default SearchContext;