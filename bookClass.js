function Book ({isbn, title, author, description, genre, published, price}) {
	if (isbn && title && author) {
		// Just in case - parse isbn to number
		this.isbn = parseInt(isbn);
		this.title = title;
		this.author = author;
		this.published = published ? Date.parse(published) : new Date();
		this.price = price ? parseFloat(price) : 0;
		this.description = description || '';
		this.genre = genre || [];
	} else {
		throw new Error('Missing essential attributes')
	}
}

module.exports = Book;