const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

let books = [
  { name: 'name1', genre: 'Fantasy', id: '1', authorId: 1 },
  { name: 'name2', genre: 'Fantasy', id: '2', authorId: 2 },
  { name: 'name3', genre: 'Sci-Fi', id: '3', authorId: 3 },
  { name: 'name4', genre: 'Fantasy', id: '4', authorId: 2 },
  { name: 'name5', genre: 'Fantasy', id: '5', authorId: 2 },
  { name: 'name6', genre: 'Sci-Fi', id: '6', authorId: 3 }
];

let authors = [
  { name: 'author1', age: 44, id: '1' },
  { name: 'author2', age: 42, id: '2' },
  { name: 'author3', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: authorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find(author => author.id == parent.authorId);
      }
    }
  })
});

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId == parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
