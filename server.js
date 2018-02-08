const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const config = require('./config');
const log = require('./logger');
const db = require('./db');
// Parse body of request
app.use(bodyParser.json());
// Define publicly accessible folder
app.use(express.static(path.join(__dirname, 'public')));

// Get all books
app.get('/books', (req, res) => {
	log.access(`${req.method} ${req.url} from ${req.headers['x-forwarded-for']}`);
	res.json(db.getAllBooks());
});

// Add a book
app.post('/add', (req, res) => {
	log.access(`${req.method} ${req.url} from ${req.headers['x-forwarded-for']}`, ` adding book: ${JSON.stringify(req.body)}`);
	res.send(db.addBook(req.body.book));
});

// Remove a book
app.delete('/book', (req, res) => {
	log.access(`${req.method} ${req.url} from ${req.headers['x-forwarded-for']}`);
	let bookDeleted = false;
	if (req.query && req.query.isbn) {
		bookDeleted = db.deleteBook(req.query.isbn)
	}
	res.send(bookDeleted);
});

app.listen(config.port, () => log.access(`Server is listening on port ${config.port}`));
