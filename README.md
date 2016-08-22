## Overview

This exercise is designed for you to practice chaining Promises together to manage
asynchronous database calls and pass information to the view.

All code in the views has been set up for you. __You only need to write code in each associated route.__

## Objectives

* Be able to use `Knex` built in query functions instead of raw SQL
* Be able to chain promises using `.then`
* Be able to make multiple asynchronous database calls using `Promise.all`
* Be able to pass a higher order function to `Promise.all`
* Be able to extract complex database calls into smaller, well organized functions

## Set Up

```
npm install
createdb galvanize_reads_development
knex migrate:latest
knex seed:run
nodemon
```  

## GET STARTED

Work through the following routes one by one and in this order.

## Authors

__#1 SHOW__

1. In `authors.js`, find the `GET` route for `/:id`
2. Implement `Promises` using the pseudo code as a guide

__#2 EDIT__

1. In `authors.js`, find the `GET` route for `/:id/edit`
2. Implement `Promises` using the pseudo code as a guide

__#3 ALL__

1. In `authors.js` find the GET route for `/`
2. Implement Promises using the pseudo code as a guide

#### REFACTOR AUTHOR ROUTES

1. Inside `lib/helpers.js` find the `getAuthorBooks` function.
2. Refactor your routes so that the heavy lifting is done in this function.
3. Inside your routes, call your helper function to get the job done.

## Books (rinse and repeat)

Don't just copy the code from `authors.js` to get this done. _Challenge yourself
to think through each route again_ and be able to make the necessary database calls
and pass the informtion to the view.

__#1 SHOW__

1. In `books.js`, find the `GET` route for `/:id`
2. Implement `Promises` using the pseudo code as a guide

__#2 EDIT__

1. In `books.js`, find the `GET` route for `/:id/edit`
2. Implement `Promises` using the pseudo code as a guide

__#3 ALL__

1. In `books.js` find the GET route for `/`
2. Implement Promises using the pseudo code as a guide

#### REFACTOR BOOKS ROUTES

1. Inside `lib/helpers.js` find the `getBookAuthors` function.
2. Refactor your routes so that the heavy lifting is done in this function.
3. Inside your routes, call your helper function to get the job done.
