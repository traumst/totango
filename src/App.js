import React, { Component } from 'react';
import axios from 'axios';

import PlusIcon from 'react-icons/lib/fa/plus';

import './App.css';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

// Maintains the state of the application
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    books: [],
	    booksBackup: [],
	    addBookPopup: false
    };

	  this.rollbackState = this.rollbackState.bind(this);
	  this.toggleAddBook = this.toggleAddBook.bind(this);
	  this.addBook = this.addBook.bind(this);
	  this.deleteBook = this.deleteBook.bind(this);
  }

  rollbackState() {
  	this.setState({
		  books: this.state.booksBackup
	  })
  }

	toggleAddBook() {
		this.setState({
			addBookPopup: !this.state.addBookPopup
		});
	}

  addBook(newBook) {
	  this.toggleAddBook();
	  let booksUpdated = this.state.books;
	  booksUpdated.push(newBook);
	  this.setState({
		  booksBackup: this.state.books,
		  books: booksUpdated
	  });
	  // Keep THIS accessible inside of axios callback
	  let that = this;
	  axios.post('/add', { book: newBook })
	   .then(response => {
		   // Failed to ADD on the server
		   if (!response.data) {
			   // Roll back the changes
			   that.rollbackState();
			   alert('Currently unable to add books');
		   }
	   })
	   .catch(err => that.rollbackState());
  }

  deleteBook(e, isbn) {
  	// Remove delete book from the list
	  this.setState({
		  booksBackup: this.state.books,
		  books: this.state.books.filter(book => book.isbn !== isbn)
	  });
	  // Keep THIS accessible inside of axios callback
	  let that = this;
	  // axios.delete(`/book?isbn=${isbn}`, {"isbn": isbn})
	  axios.delete(`/book`, {params: {isbn: isbn}})
	   .then(response => {
		   // Failed to DELETE on the server
	   	if (!response.data) {
		    // Roll back the changes
		    that.rollbackState();
		    alert('Currently unable to delete books');
	    }
	   })
	   .catch(err => that.rollbackState());
  }

  componentDidMount() {
  	// Requests list of books and updates the state
	  axios.get('/books')
	   .then(response => {
		   response.data.forEach(book => book.published = new Date(book.published));
		   this.setState({
			   books: response.data
		   });
	   })
	   .catch(err => {
		   console.error(err);
	   });
  }

  render() {
    return (
      <div className="app">
	      {/* Overlay background placeholder */}
	      <a onClick={this.toggleAddBook}
	       className={this.state.addBookPopup ? "add-book-visible" : "add-book-invisible"}>{null}</a>

	      <a onClick={this.toggleAddBook}>
		      <div className="add-book-button">
			      <span className="plus"><PlusIcon/> </span>
			      Add New Book
		      </div>
	      </a>
	      {this.state.addBookPopup ?
	       <AddBook close={this.toggleAddBook}
	                submit={this.addBook} /> : null}
        <BookList
	         books={this.state.books}
	         addBook={this.toggleAddBook}
	         deleteBook={this.deleteBook} />
      </div>
    );
  }
}

export default App;
