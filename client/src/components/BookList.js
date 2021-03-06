import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = props => {
  const [selectedBook, setSelectedBook] = useState(null);

  const renderBooks = () => {
    let data = props.data;
    if (!data.books || data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => (
        <li key={book.id} onClick={() => setSelectedBook(book.id)}>
          {book.name}
        </li>
      ));
    }
  };
  return (
    <div>
      <ul id="book-list">{renderBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
