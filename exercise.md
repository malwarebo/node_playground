# Coding Exercise: Data Storage API (Node.js) :turtle::rocket:

Implement a small HTTP service in Node.js to store objects organized by repository.
Clients of this service should be able to `GET`, `PUT`, and `DELETE` objects.

## Expectations

This exercise is a pair programming exercise you will do with other engineers.

We value focused, high-quality code over code that is optimized for all possible edge cases.

## General Requirements

* The service should de-duplicate data objects by repository.
* The included tests should pass and not be modified. Adding additional tests is encouraged.
* The service should implement the API as described below.
* The data can be persisted in memory, on disk, or wherever you like.
* External dependencies can be used, but are not required.

## Suggestions

* You are welcome to use the existing [`express` module](https://www.npmjs.com/package/express) dependency or any other web framework that you are comfortable with.
* Remember that this is a web application, and multiple requests could come in at the same time. Be sure to plan for this.
* For data storage, we suggest starting simple. Try to get to a working solution and avoid complex dependencies like databases at first. If you have extra time, you can always experiment with other options.

## API

### Upload an Object

```
PUT /data/{repository}
```

#### Response

```
Status: 201 Created
{
  "oid": "2845f5a412dbdfacf95193f296dd0f5b2a16920da5a7ffa4c5832f223b03de96",
  "size": 1234
}
```

### Download an Object

```
GET /data/{repository}/{objectID}
```

#### Response

```
Status: 200 OK
{object data}
```

Objects that are not on the server will return a `404 Not Found`.

### Delete an Object

```
DELETE /data/{repository}/{objectID}
```

#### Response

```
Status: 200 OK
```

## Getting started and Testing

This exercise requires a recent version of Node.js. Get started by installing dependencies:

```sh
npm install
```

Write your server implementation in `server.js`. Then run the tests:

```sh
npm test
```

Or run them continuously as you work:

```sh
npm run test-watch
```

Once you have a working implementation, open a pull request that includes your changes.
