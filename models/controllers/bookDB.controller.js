const Book = require('../Book');

module.exports = {

  // create:
  addBook: (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ success: false, error: 'No book data provided' });
    }
    const book = new Book(body);
    if (!book) {
      return res.status(400).json({ success: false, error: err });
    }
    book.save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: book._id,
          message: 'successfully saved book'
        })
      })
      .catch(err => {
        return res.status(400).json({
          err,
          message: 'Failed to add book to database'
        });
      });
  },

  // read:
  findAll: async (req, res) => {
    await Book.find({}, (err, books) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!books.length) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: books });
    })
      .catch(err => console.log(err));
  },

  findById: async (req, res) => {
    await Book.findOne({ _id: req.params.id }, (err, book) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!book) {
        return res.status(404).json({ success: false, error: 'Book not found' });
      }
      return res.status(200).json({ success: true, data: book });
    })
      .catch(err => console.log(err));
  },

  // update:
  markRead: async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: "You must provide a book to update" });
    }
    await Book.findOneAndUpdate(
      { _id: body._id },
      {
        // this function is only built to update whether or not
        // the book is read (true/false). But we can update more stuff based
        // on what we pass in the 'put' body
        read: body.read,
        updatedAt: Date.now()
      },
      // passing { new: true } assures that the function will return
      // the NEW document and not the old one.
      { new: true }
    )
      .then(update => {
        return res.json({ success: true, book: update });
      });
  },

  // delete:
  deleteById: async (req, res) => {
    await Book.findByIdAndDelete(
      { _id: req.params.id },
    )
      .then(result => res.json({ success: true, deleted: result.title }));
  }

}