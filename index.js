const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

  require('dotenv').config();

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for the books
const bookSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json());

// Create a new book
app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// Get all books
app.get('/api/books', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Update a book by ID
app.put('/api/books/:id', async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Book updated successfully' });
});

// Delete a book by ID
app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndRemove(req.params.id);
  res.json({ message: 'Book deleted successfully' });
});

