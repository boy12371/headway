# headway

## Development

TLDR; `make db`, `make dev`, `make server` and open [http://localhost:8080](http://localhost:8080)

Install dependencies with `make install`

Build frontend with `make build`

Reset database with `make db`

Start node server with `make server` (nodemon)

Start client dev server with `make dev` (webpack-dev-server)

Create a new component with `make component name=FluxCapacitor`

Lint both client and server with `make lint`

Lint both client and server with `make lint`

Run database report with `make report`


## Technology

Client is based on `vue-webpack-typescript` boilerplate

Server is TypeScript, run with `ts-node`

Data stored in MySQL, accessed via `sequelize`


## Routes

Public, Static:

```
GET /
GET /app
GET /dashboard
```

For APIs, see POSTMAN collection in [tests/Headway.postman_collection.json](tests/Headway.postman_collection.json)

## Dev on Windows

Might need to run some commands slightly differently. You'll figure it out.

```
npm install
make dev
node_modules\.bin\ts-node.cmd server\reset-database.ts
node_modules\.bin\ts-node.cmd server\server.ts
```
