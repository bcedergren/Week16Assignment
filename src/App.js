import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Layout from "./Components/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
          <Route path='/add' element={<AddRecipe />} />
          <Route path='/edit/:id' element={<EditRecipe />} />
        </Routes>
      </Layout>
    </Router>
  );
}
