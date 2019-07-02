import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = props => {
  const renderBooks = () => {
    let data = props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }
  };
  return <ul id="book-list">{renderBooks()}</ul>;
};

export default graphql(getBooksQuery)(BookList);
