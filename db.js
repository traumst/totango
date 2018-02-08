//
//
//
//  I don't use a real DB, but just a mockup.
//  I'm using plain JSON to persist changes in the data.
//  In a real app Data Access Layer would be connected to an instance of MySQL, MongoDB, etc.
//
//
//
const fs = require('fs');
// Using a class pattern to parse and verify book objects
const Book = require('./bookClass');
const log = require('./logger');

const dbFilename = 'db.json';
let db = [];

// Load data from the file
try {
	// Sync, because the app serves no purpose without DB
	let dbFile = fs.readFileSync(dbFilename);
	db = JSON.parse(dbFile);
	log('DB connected')
} catch (err) {
	log.error(err.message);
	process.exit(1);
}

function getAllBooks() {
	return db
}

// Async function persisting DB to the FILE
function persist() {
	fs.writeFile(dbFilename, JSON.stringify(db, null, 3), (err) => {
		if (err) throw err;
		log('Changes persisted to the file');
	});
}

function addBook(bookData) {
	try{
		// Parse argument book to an instance of Book
		// debugger
		let book = new Book(bookData);
		if (book instanceof Book) {
			// Check whether
			if (!db.find(b => b.isbn == book.isbn)){
				db.push(book);
				persist();
				return true;
			}
		}
	} catch(err) {
		log.error(err.message)
	}
	return false
}

function deleteBook(isbn) {
	// Count books before deletion
	let dbCountBeforeDelete = db.length;
	// Filter out deleted book
	db = db.filter(book => book.isbn != isbn);
	// Check that number of books changed
	let changesMade = db.length < dbCountBeforeDelete;
	// Persist changes
	if (changesMade) persist();

	return changesMade;
}

module.exports = {
	getAllBooks,
	addBook,
	deleteBook
};