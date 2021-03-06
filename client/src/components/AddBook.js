import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

const AddBook = props => {
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleForm = (event, label) => {
    if (label === 'bookName') {
      setBookName(event.target.value);
    } else if (label === 'genre') {
      setGenre(event.target.value);
    } else if (label === 'authorId') {
      setAuthorId(event.target.value);
    }
  };

  const submitForm = event => {
    event.preventDefault();
    if (bookName && genre && authorId) {
      props.addBookMutation({
        variables: {
          name: bookName,
          genre,
          authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      });
      setAuthorId('');
      setBookName('');
      setGenre('');
    } else {
      alert('Please provide all the information!');
    }
  };

  const renderAuthors = () => {
    let data = props.getAuthorsQuery;
    if (!data.authors || data.loading) {
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
        <select onChange={e => handleForm(e, 'authorId')} value={authorId}>
          <option value="">Select author</option>
          {renderAuthors()}
        </select>
      </div>
      <button onClick={submitForm}>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
