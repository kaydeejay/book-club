import React, { useState, useEffect } from 'react';


import API from '../../../utils/API';

const Home = () => {
  const [appState, setAppState] = useState("ready");
  const [savedBooks, setSavedBooks] = useState([]);
  // const [searchedBooks, setSearchedBooks] = useState([]);
  // const [form, setForm] = useState({});

  useEffect(() => {
    loadBooks();
  }, [])

  const loadBooks = () => {
    setAppState("loading");
    API.getBooks()
      .then(res => {
        setSavedBooks(res.data);
        setAppState("resolved");
      })
      .catch(err => {
        console.log(err);
        setAppState("failure");
      });
  }

  return (
    <div>
      {/* BookList, contains BookListItems.
        These will be reusable for the searched books */}
      <BookList appstate={appState} header={"Your Library"}>
        {!savedBooks.length
          ? props.appstate
          : savedBooks.map(book => (
            <BookListItem
              key={book._id}
              image={book.image}
              title={book.title}
              authors={book.authors.join(', ')}
              description={book.description.slice(0, 280)}
            />
          ))}
      </BookList>
      {/* SearchForm, sets searchedBooks */}
      {/* BookList again, for searched books. */}
    </div>
  )
}

export default Home;
