import React, { Component } from 'react';

import DeleteIcon from 'react-icons/lib/md/delete';
import BookIcon from 'react-icons/lib/fa/book';

import BookDetails from './BookDetails';

// Index on month corresponds to Date.getMonth() value of 0 to 11
let month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
// Represents a book in the store
class Book extends Component {

	constructor(props) {
		super(props);
		this.state = {
			details: false
		};

		this.toggleDetails = this.toggleDetails.bind(this);
	}

	toggleDetails() {
		this.setState({
			details: !this.state.details
		});
	}

	render() {
		return <div className="book">
			<a onClick={this.toggleDetails}
			   className={this.state.details ? "book-details-visible" : "book-details-invisible"}></a>

			<a onClick={this.toggleDetails}>
			<div className="icon"><BookIcon /></div>
			<div className="delete">
				<a onClick={(e) => this.props.delete(e, this.props.info.isbn)} title="Delete this book">
					<DeleteIcon />
				</a>
			</div>
			<div className="main">
				<span>{this.props.info.author}</span> - <span>{this.props.info.title}</span>
			</div>
			<div className="published">
				Published in <span>{month[this.props.info.published.getMonth()]} {this.props.info.published.getFullYear()}</span>
			</div>
			<div className="genre">
				Genre: {this.props.info.genre.map((genre, i, allGenre) => {
				if (i < allGenre.length - 1)
					return <span key={genre}>{genre}, </span>;
				return <span key={genre}>{genre}</span>;
			})}
			</div>
			</a>
			<a name="details" className="details" onClick={this.toggleDetails}>More Details</a>
			{this.state.details ?
			 <BookDetails info={this.props.info}
			              close={this.toggleDetails} /> : null}
		</div>
	}
}

export default Book;