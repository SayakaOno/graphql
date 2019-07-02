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
  console.log(props);
  return (
    <ul id="book-list">
      <li>book name</li>
    </ul>
  );
};

export default graphql(getBooksQuery)(BookList);
