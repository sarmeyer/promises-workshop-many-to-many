var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Promise = require('bluebird');
var helpers = require('../lib/helpers');

function Authors() {
    return knex('authors');
}

function Books() {
    return knex('books');
}

function Authors_Books() {
    return knex('authors_books');
}

router.get('/', function(req, res, next) {
    Authors().then(function(authors) {
        Promise.all(
            authors.map(function(author) {
                return knex('authors_books').where('author_id', author.id).pluck('book_id').then(function(bookIds) {
                    return knex('books').whereIn('id', bookIds).then(function(books) {
                        author.books = books;
                        return author
                    })
                })
            })
        ).then(function(authors) {
            res.render('authors/index', {
                authors: authors
            })
        })
    })
})

router.get('/new', function(req, res, next) {
    Books().select().then(function(books) {
        res.render('authors/new', {
            books: books
        });
    })
});

router.post('/', function(req, res, next) {
    var bookIds = req.body.book_ids.split(",");
    delete req.body.book_ids;
    Authors().returning('id').insert(req.body).then(function(id) {
        helpers.insertIntoAuthorsBooks(bookIds, Authors_Books, id[0]).then(function() {
            res.redirect('/authors');
        })
    })
});

router.get('/:id/delete', function(req, res, next) {
    helpers.getAuthorBooks(req.params.id).then(function(author) {
        res.render('authors/delete', {
            author: author,
            author_books: author.books,
            books: author.books
        });
    })
})

router.post('/:id/delete', function(req, res, next) {
    Promise.all([
        Authors().where('id', req.params.id).del(),
        Authors_Books().where('author_id', req.params.id).del()
    ]).then(function(results) {
        res.redirect('/authors')
    })
})

router.get('/:id/edit', function(req, res, next) {
    helpers.getAuthorBooks(req.params.id).then(function(author) {
        res.render('authors/edit', {
            author: author,
            author_books: author.books,
            books: author.books
        });
    })
})

router.post('/:id', function(req, res, next) {
    var bookIds = req.body.book_ids.split(",");
    delete req.body.book_ids;
    Authors().returning('id').where('id', req.params.id).update(req.body).then(function(id) {
        id = id[0];
        helpers.insertIntoAuthorsBooks(bookIds, id).then(function() {
            res.redirect('/authors');
        });
    })
})

router.get('/:id', function(req, res, next) {
    helpers.getAuthorBooks(req.params.id).then(function(author) {
        res.render('authors/delete', {
            author: author,
            books: author.books
        });
    })
})

module.exports = router;
