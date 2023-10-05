import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import "../styles/Recipes.css";
import ErrorBoundary from "./ErrorBoundary";

function Layout({ children }) {
  return (
    <ErrorBoundary>
      <NavigationBar />
      <Container className='mt-4'>{children}</Container>
    </ErrorBoundary>
  );
}

export default Layout;
