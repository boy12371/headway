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


## Routes

Public, Static:

```
GET /
GET /app
```

Public:

```
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
