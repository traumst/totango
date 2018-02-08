import React from 'react';

import CloseIcon from 'react-icons/lib/fa/close';

// index corresponds to Date.getMonth() value of 0 to 11
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

let BookDetails = (props) => {
	return <div className="book-details">
		<a name="close" onClick={props.close} className="close"><CloseIcon /></a>
		<div className="title"><span>Title:</span> {props.info.title}</div>
		<div className="author"><span>Author:</span> {props.info.author}</div>
		<div className="published">
			<span>Published:</span> {month[props.info.published.getMonth()]} {props.info.published.getDate()}, {props.info.published.getFullYear()}
		</div>
		<div className="genre">
			<span>Genre:</span> {props.info.genre.map((genre, i, allGenre) => {
			if (i < allGenre.length - 1)
				return <span key={genre}>{genre}, </span>;
			return <span key={genre}>{genre}</span>;
		})}
		</div>
		<div className="description">
			<span>Description</span>: {props.info.description}
		</div>
		<div className="price">
			<span>Price:</span> ${props.info.price}
		</div>
		<div className="isbn">
			<span>ISBN:</span> {props.info.isbn}
		</div>
	</div>
};

export default BookDetails;