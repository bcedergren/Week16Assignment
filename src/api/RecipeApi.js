// Define the base URL of the JSON Server
const apiUrl = "http://localhost:3001";

// Create a new recipe
export const createRecipe = async (recipe) => {
  try {
    // Format the recipe object
    const formattedRecipe = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };

    const response = await fetch(`${apiUrl}/recipes`, {
      method: "POST",
      body: JSON.stringify(formattedRecipe),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create a new recipe: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error creating recipe", error);
  }
};

// Read all recipes
export const getAllRecipes = async () => {
  try {
    const response = await fetch(`${apiUrl}/recipes`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Read a single recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/recipes/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe by ID");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// Update an existing recipe by ID
export const updateRecipe = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/recipes/${formData.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update the recipe");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/recipes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the recipe");
    }

    return true; // Deletion was successful
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

// Fetch ratings
export const fetchRatings = async (id) => {
  try {
    // Fetch ratings from local db
    const response = await fetch(`${apiUrl}?recipes=${id}`, {});
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch ratings");
    }

    const rating = data.results;
    console.log(rating);

    return rating;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const updateRating = async (id, rating) => {
  try {
    const recipeResponse = await fetch(`${apiUrl}/recipes?id=${id}`);

    if (!recipeResponse.ok) {
      throw new Error("Failed to find recipe");
    }

    const recipeData = await recipeResponse.json();

    const response = await fetch(`${apiUrl}/recipes/${recipeData[0].id}`, {
      method: "PATCH",
      body: JSON.stringify({
        rating: rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update rating");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};
