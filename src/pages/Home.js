import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <Container className='mt-4'>
      <Row>
        <Col>
          <h2>Welcome to the Recipe Book!</h2>
          <p>
            Explore a collection of delicious recipes. Click on "Recipes" to
            view the list of recipes, or "Add Recipe" to create your own.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
