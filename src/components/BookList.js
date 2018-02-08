import React from 'react';

import Book from './Book';

// Maps a list of books to the Book components
let BookList = (props) => {
	return <div className="book-list">
		{props.books.map(book => <Book key={book.isbn}
		                               info={book}
		                               delete={props.deleteBook}/>)}
	</div>
};

export default BookList;