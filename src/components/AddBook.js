import React, {Component} from 'react';

let genres = [
	"Sci-fi",
	"Comedy",
	"Drama",
	"Action",
	"Romance",
	"Mystery",
	"Horror"
];

// Form for adding books
class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			author: '',
			published: new Date(),
			genre: [],
			description: '',
			price: '',
			isbn: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		target.style = '';

		if (target.type === 'checkbox') {
			// Checkbox
			let genreList = this.state.genre;
			// Check and uncheck are handled differently
			if (target.checked) {
				genreList.push(target.name);
			} else {
				genreList = genreList.filter(genre => genre !== target.name);
			}

			this.setState({
				genre: genreList
			});
		} else if (target.type === 'date') {
			// if (target.value) {
				this.setState({
					[target.name]: new Date(target.value)
				});
			// }
		} else {
			this.setState({
				[target.name]: target.value
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		// Verify input
		if (this.state.title && this.state.author && this.state.isbn) {
			let currentState = this.state;
			currentState.isbn = parseInt(currentState.isbn);
			this.props.submit(currentState)
		} else {
			if (!this.state.title) e.target['title'].style = 'background-color:red;';
			if (!this.state.author) e.target['author'].style = 'background-color:red;';
			if (!this.state.isbn) e.target['isbn'].style = 'background-color:red;';
		}
	}

	render() {
		return (
		 <form className="add-book" onSubmit={this.handleSubmit}>
			 <h1>Add new Book</h1>
			 <fieldset>
				 <legend>Details</legend>
				 <p className="title">
					 <label>
						 <span>Title*:</span>
						 <input name="title"
						        type="text"
						        value={this.state.title}
						        onChange={this.handleChange} />
					 </label>
				 </p>
				 <p className="author">
					 <label>
						 <span>Author*:</span>
						 <input name="author"
						        type="text"
						        value={this.state.author}
						        onChange={this.handleChange} />
					 </label>
				 </p>
				 <p className="isbn">
					 <label>
						 <span>ISBN*:</span>
						 <input name="isbn"
						        type="text"
						        value={this.state.isbn}
						        onChange={this.handleChange} />
					 </label>
				 </p>
				 <p className="genre">
					 <span>Genre:</span>
					 <ul>
						 {genres.map(genre => (
						  <li key={genre}>
							  <label>
								  <input type="checkbox"
								         name={genre}
								         onChange={this.handleChange}/>
								  {this.state.genre.includes(genre) ?
								   <span className='selected'>{genre}</span> :
								   <span>{genre}</span>}
							  </label>
						  </li>
						 ))}
					 </ul>
				 </p>
				 <p className="description">
					 <label>
						 <span>Description:</span>
						 <textarea name="description"
						           value={this.state.description}
						           onChange={this.handleChange} />
					 </label>
				 </p>
				 <p className="price">
					 <label>
						 <span>Price:</span>
						 <input name="price"
						        type="text"
						        value={this.state.price}
						        onChange={this.handleChange} />
					 </label>
				 </p>
				 <p className="published">
					 <label>
						 <span>Date of Publishing:</span>
						 <input name="published"
						        type="date"
						        onChange={this.handleChange} />
					 </label>
				 </p>
			 </fieldset>
			 <p className="buttons">
				 <small>Fields marked with <b>*</b> are mandatory</small>
				 <input className="cancel" type="button" value="Cancel" onClick={this.props.close} />
				 <input className="submit" type="submit" value="Submit" />
			 </p>
		 </form>
		);
	}
}

export default AddBook;