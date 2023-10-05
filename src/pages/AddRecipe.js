import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api/RecipeApi";
import AddRecipeForm from "../Components/AddRecipeForm";

function AddRecipe() {
  const navigate = useNavigate();
  const handleAddRecipe = async (formData) => {
    // Send a POST request to add the new recipe to the server
    createRecipe(formData)
      .then(() => {
        navigate("/recipes");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <Container className='mt-4'>
      <Row>
        <Col>
          <h2>Add Recipe</h2>
          <AddRecipeForm
            onSubmit={handleAddRecipe}
            initialData={{
              id: 0,
              title: "",
              ingredients: "",
              instructions: "",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddRecipe;
