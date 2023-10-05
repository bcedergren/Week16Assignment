const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const paginate = require("./middleware/paginate");

// Use the custom middleware
server.use(paginate);

// Use default middlewares (e.g., logger, CORS)
server.use(middlewares);

// Use the router
server.use(router);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
