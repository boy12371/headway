# headway

## Technology

Client is based on `vue-webpack-typescript` boilerplate

Server is TypeScript, run with `ts-node`

Data stored in MySQL, accessed via `sequelize`


## Development

Install dependencies with `make install`

Build frontend with `make build`

Reset database with `make db`

Start node server with `make server` (nodemon)

Start client dev server with `make dev` (webpack-dev-server)

Create a new component with `make component name=FluxCapacitor`

Lint both client and server with `make lint`

Run database report with `make report`


## Routes

Public, Static:

```
GET /
GET /app
```

Public:

```
GET /status
GET /user
GET /logout

GET, POST /admin/login
GET, POST /student/login
```

Requires Admin Auth:

```
GET /admin
GET, POST, PUT, DELETE /api/admin
GET, POST, PUT, DELETE /api/card
GET, POST, PUT, DELETE /api/course
```


Requires Student Auth:

```
GET /student
```

## Dev on Windows

Might need to run some commands slightly differently. You'll figure it out.

```
npm install
make dev
node_modules\.bin\ts-node.cmd server\reset-database.ts
node_modules\.bin\ts-node.cmd server\server.ts
```
