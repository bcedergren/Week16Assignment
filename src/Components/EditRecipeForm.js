import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  MdAdd,
  MdDelete,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import Loading from "./Loading";

function EditRecipeForm({ onSubmit, recipe }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialFormData = {
    title: "",
    ingredients: [""],
    instructions: [""],
    estimatedTime: 0,
    rating: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || "",
        ingredients: recipe.ingredients || [""],
        instructions: recipe.instructions || [""],
        estimatedTime: recipe.estimatedTime || 0,
        rating: recipe.rating || 0,
      });
    }
  }, [recipe]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    // Validate ingredients and instructions fields here
    if (!formData.ingredients || formData.ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required";
      isValid = false;
    }

    if (!formData.instructions || formData.instructions.length === 0) {
      newErrors.instructions = "At least one instruction is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = e.target.value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleInstructionChange = (e, index) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = e.target.value;
    setFormData({
      ...formData,
      instructions: updatedInstructions,
    });
  };

  const handleAddInput = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const handleRemoveInput = (field, index) => {
    const updatedInputs = [...formData[field]];
    updatedInputs.splice(index, 1);
    setFormData({
      ...formData,
      [field]: updatedInputs,
    });
  };

  const handleMoveUp = (field, index) => {
    if (index > 0) {
      const updatedInputs = [...formData[field]];
      const temp = updatedInputs[index];
      updatedInputs[index] = updatedInputs[index - 1];
      updatedInputs[index - 1] = temp;
      setFormData({
        ...formData,
        [field]: updatedInputs,
      });
    }
  };

  const handleMoveDown = (field, index) => {
    if (index < formData[field].length - 1) {
      const updatedInputs = [...formData[field]];
      const temp = updatedInputs[index];
      updatedInputs[index] = updatedInputs[index + 1];
      updatedInputs[index + 1] = temp;
      setFormData({
        ...formData,
        [field]: updatedInputs,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    navigate(`/recipes/${id}`);
  };

  if (!recipe) {
    return <Loading />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control type='hidden' name='id' value={recipe.rating || 0} />
      <Form.Group>
        <Form.Label>
          <strong>Title</strong>
        </Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={formData.title || ""}
          onChange={handleChange}
          isInvalid={!!errors.title}
          required
        />
        <Form.Control.Feedback type='invalid'>
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <strong>Estimated Time (minutes)</strong>
        </Form.Label>
        <Form.Control
          type='number'
          name='estimatedTime'
          value={formData.estimatedTime}
          onChange={handleChange}
          isInvalid={!!errors.estimatedTime}
          step={5}
          required
        />
        <Form.Control.Feedback type='invalid'>
          {errors.estimatedTime}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <strong>Ingredients</strong>
        </Form.Label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className='d-flex mb-2'>
            <Form.Control
              type='text'
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              isInvalid={!!errors.ingredients}
              required
            />
            {index === formData.ingredients.length - 1 && (
              <Button
                variant='primary'
                className='ml-2'
                onClick={() => handleAddInput("ingredients")}
              >
                <MdAdd />
              </Button>
            )}
            {formData.ingredients.length > 1 && (
              <>
                <Button
                  variant='danger'
                  className='ml-2'
                  onClick={() => handleRemoveInput("ingredients", index)}
                >
                  <MdDelete />
                </Button>
              </>
            )}
          </div>
        ))}
        <Form.Control.Feedback type='invalid'>
          {errors.ingredients}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <strong>Instructions</strong>
        </Form.Label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className='d-flex mb-2'>
            <Form.Control
              type='text'
              value={instruction}
              onChange={(e) => handleInstructionChange(e, index)}
              isInvalid={!!errors.instructions}
              required
            />
            {index === formData.instructions.length - 1 && (
              <Button
                variant='primary'
                className='ml-2'
                onClick={() => handleAddInput("instructions")}
              >
                <MdAdd />
              </Button>
            )}
            {formData.instructions.length > 1 && (
              <>
                <Button
                  variant='danger'
                  className='ml-2'
                  onClick={() => handleRemoveInput("instructions", index)}
                >
                  <MdDelete />
                </Button>
                <Button
                  variant='light'
                  className='ml-2'
                  onClick={() => handleMoveUp("instructions", index)}
                  disabled={index === 0}
                >
                  <MdArrowUpward />
                </Button>
                <Button
                  variant='light'
                  className='ml-2'
                  onClick={() => handleMoveDown("instructions", index)}
                  disabled={index === formData.instructions.length - 1}
                >
                  <MdArrowDownward />
                </Button>
              </>
            )}
          </div>
        ))}
        <Form.Control.Feedback type='invalid'>
          {errors.instructions}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type='submit' variant='primary' disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Save Recipe"}
      </Button>
      <Button
        variant='secondary'
        type='cancel'
        className='m-2'
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default EditRecipeForm;
