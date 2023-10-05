import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { MdAdd, MdDelete } from "react-icons/md";

function AddRecipeForm({ onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""], // Start with one empty ingredient
    instructions: [""], // Start with one empty instruction
    estimatedTime: 0, // Initialize estimatedTime as 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    navigate("/recipes");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <strong>Title</strong>
        </Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={formData.title}
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
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "ingredients",
                    value: e.target.value,
                  },
                })
              }
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
              <Button
                variant='danger'
                className='ml-2'
                onClick={() => handleRemoveInput("ingredients", index)}
              >
                <MdDelete />
              </Button>
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
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "instructions",
                    value: e.target.value,
                  },
                })
              }
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
              <Button
                variant='danger'
                className='ml-2'
                onClick={() => handleRemoveInput("instructions", index)}
              >
                <MdDelete />
              </Button>
            )}
          </div>
        ))}
        <Form.Control.Feedback type='invalid'>
          {errors.instructions}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type='submit'
        variant='primary'
        disabled={isSubmitting}
        className='m-2'
      >
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

export default AddRecipeForm;
