import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import Time from "./Time";

function RecipeItem({ recipe }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className='recipe-card'>
        <Card.Body>
          <span className='recipe-time-icon'>
            <Time minutes={recipe.estimatedTime} />
          </span>
          <Link to={`/recipes/${recipe.id}`} className='recipe-card-title'>
            <h4>{recipe.title}</h4>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RecipeItem;
