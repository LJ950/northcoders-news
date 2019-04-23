# northcoders-news

API for Reddit like forum which allows users to read and post articles and comments

## Installation

- Install all dependencies with `npm install`
- Run `npm run setup-db` to setup the databases
- Run `npm run migrate-latest` to build the tables
- Run `npm run seed` to seed the both dev and test databases

- `npm run dev` will start the server locally using the dev database

## Testing

-`npm test runs` the test suite with the test database

- See test descriptions for what is being tested

## Deployment

- Run `npm run migrate:latest:prod` to migrate the production database
- Run `npm run seed:prod` this will seed the production database with the dev data

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-db
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```

##Author

Luke Jones as part of NorthCoders training course
