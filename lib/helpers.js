var Promise = require('bluebird');
var knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

function Books(){
  return knex('books');
}

function Authors_Books() {
  return knex('authors_books');
}

function prepIds(ids) {
  return ids.filter(function (id) {
    return id !== '';
  })
}

function insertIntoAuthorsBooks(bookIds, authorId) {
  bookIds = prepIds(bookIds);
  return Promise.all(bookIds.map(function (book_id) {
    book_id = Number(book_id)
    return Authors_Books().insert({
      book_id: book_id,
      author_id: authorId
    })
  }))
}

function getAuthorBooks(author) {
  // return knex('authors').where('id', author).first().then(function(author) {
  //     return knex('authors_books').where('author_id', author.id).pluck('book_id').then(function(booksId) {
  //         return knex('books').whereIn('id', booksId).then(function(books){
  //           return books;
  //         })
  //     })
  // })
}

function getBookAuthors(book) {
  // your code here
}


module.exports = {
  getAuthorBooks: getAuthorBooks,
  getBookAuthors: getBookAuthors
}
