import axios from 'axios';

export default {
  // save a new book:
  saveBook: (book) => {
    return axios.post('/api/books/new', book);
  },
  // get all books:
  getBooks: () => {
    return axios.get('/api/books');
  },
  // get book by id:
  getBookById: (id) => {
    return axios.get('/api/books/' + id);
  },
  // update book:
  updateBook: (book) => {
    return axios.put('/api/books/update', book);
  },
  // delete book:
  deleteBook: (id) => {
    return axios.delete('/api/books/delete/' + id);
  },
  // search for new books on google books:
  googleBookSearch: (url) => {
    return axios.put('/api/search', { url: url });
  }
}