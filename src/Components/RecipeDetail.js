import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import Stars from "./Stars";
import { deleteRecipe, updateRating } from "../api/RecipeApi";

export default function RecipeDetail({ recipe }) {
  const navigate = useNavigate();
  const { id, title, ingredients, instructions } = recipe;
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(recipe.rating);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    // Navigate to the edit page for the specific recipe
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = () => {
    // If confirmed, send a DELETE request to remove the recipe
    deleteRecipe(id)
      .then(() => {
        // Redirect to the recipes list after successful delete
        navigate("/recipes");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleRatingChange = async (newRating) => {
    try {
      // Update the rating in the component state
      setRating(newRating);
      // Send the updated rating to the API
      const updatedRating = await updateRating(id, newRating);
      // Update the rating in the component state with the response from the API
      setRating(updatedRating.rating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <Container>
      <h3>{title}</h3>
      <p>Estimated time: {recipe.estimatedTime} minutes</p>
      <Stars rating={rating} onRatingChange={handleRatingChange} />
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Instructions:</strong>
      </p>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>

      <Button variant='primary' onClick={handleEdit} className='m-2'>
        Edit Recipe
      </Button>
      <Link to='/recipes' className='btn btn-secondary m-2'>
        Back to Recipes
      </Link>
      <Button variant='danger' onClick={handleShow} className='m-2'>
        Delete Recipe
      </Button>
      <DeleteModal
        show={show}
        onHandleClose={handleClose}
        onHandleDelete={handleDelete}
      />
    </Container>
  );
}
