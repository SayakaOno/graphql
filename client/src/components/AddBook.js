import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBook = props => {
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const handleForm = (event, label) => {
    if (label === 'bookName') {
      setBookName(event.target.value);
    } else if (label === 'genre') {
      setGenre(event.target.value);
    } else if (label === 'author') {
      setAuthor(event.target.value);
    }
  };

  const renderAuthors = () => {
    let data = props.data;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name</label>
        <input
          type="text"
          onChange={e => handleForm(e, 'bookName')}
          value={bookName}
        />
      </div>
      <div className="field">
        <label>Genre</label>
        <input
          type="text"
          onChange={e => handleForm(e, 'genre')}
          value={genre}
        />
      </div>
      <div className="field">
        <label>Author</label>
        <select onChange={e => handleForm(e, 'author')} value={author}>
          <option>Select author</option>
          {renderAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
