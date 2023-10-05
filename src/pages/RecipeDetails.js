import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/RecipeApi";
import RecipeDetail from "../Components/RecipeDetail";
import Loading from "../Components/Loading";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        setRecipe(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]); // Dependency on 'id' to re-fetch data when the ID changes

  if (!recipe) {
    return <Loading />;
  }

  return <RecipeDetail recipe={recipe} />;
}

export default RecipeDetails;
