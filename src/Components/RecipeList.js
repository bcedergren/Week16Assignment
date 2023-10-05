import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getAllRecipes } from "../api/RecipeApi";
import RecipeItem from "./RecipeItem";
import Loading from "./Loading";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 12;

  useEffect(() => {
    getAllRecipes()
      .then((response) => {
        setRecipes(response);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = recipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (recipes.length === 0) {
    return <Loading />;
  }
  return (
    <Container className='mt-4'>
      <Row className='recipe-card-container'>
        {subset.map((recipe) => (
          <Col key={recipe.id}>
            <RecipeItem recipe={recipe} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Link to='/add' className='btn btn-primary mt-2'>
            Add Recipe
          </Link>
        </Col>
        <Col>
          <ReactPaginate
            containerClassName={"pagination justify-content-end mt-2"}
            activeClassName={"page-item active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeList;
