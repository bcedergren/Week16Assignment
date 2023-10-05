import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../api/RecipeApi";
import EditRecipeForm from "../Components/EditRecipeForm";
import Loading from "../Components/Loading";
import { Col, Container, Row } from "react-bootstrap";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    // Fetch the recipe data from json-server based on the ID
    getRecipeById(id)
      .then((response) => {
        setRecipe(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleUpdateRecipe = (formData) => {
    // Merge id with formData
    const updatedFormData = { ...formData, id };

    // Update the recipe data on the server
    updateRecipe(updatedFormData)
      .then(() => {
        navigate(`/recipes/${id}`);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  if (!recipe) {
    return <Loading />;
  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col>
          <h2>Edit Recipe</h2>
          <EditRecipeForm onSubmit={handleUpdateRecipe} recipe={recipe} />
        </Col>
      </Row>
    </Container>
  );
}

export default EditRecipe;
