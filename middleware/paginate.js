module.exports = (req, res, next) => {
  if (req.originalUrl === "/recipes") {
    // Calculate pagination data
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10; // Default limit per page
    const offset = (page - 1) * limit;

    // Access the database.json data and apply pagination
    const recipes = res.locals.data;
    const paginatedRecipes = recipes.slice(offset, offset + limit);

    // Set the response headers for pagination
    res.setHeader("X-Total-Count", recipes.length);
    res.setHeader("X-Total-Pages", Math.ceil(recipes.length / limit));
    res.locals.data = paginatedRecipes;
  }
  next();
};
