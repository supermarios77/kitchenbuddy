import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function Form() {
  const [formData, setFormData] = useState({
    includeIngredients: "",
    excludeIngredients: "",
    cuisine: "",
  });

  const [fetchedRecipes, setFetchedRecipes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://kitchenbuddy-backend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Recipes:", data);
        setFetchedRecipes(data);
      } else {
        console.error("Error fetching recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  return (
    <div className="form">
      <h2>Let's Search For A Delicious Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="includeIngredients" className="form-label">
            Include Ingredients
          </label>
          <input
            type="text"
            id="includeIngredients"
            name="includeIngredients"
            value={formData.includeIngredients}
            placeholder="Eg.. Tomatoes, Fish Please Separate With A Comma If More Than 1"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="excludeIngredients" className="form-label">
            Exclude Ingredients
          </label>
          <input
            type="text"
            id="excludeIngredients"
            name="excludeIngredients"
            value={formData.excludeIngredients}
            placeholder="Eg.. Eggs, Rice etc.. Separate With A Comma."
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cuisine" className="form-label">
            Cuisine
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            placeholder="Eg.. Asian, English etc.. Separate With A Comma."
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Search
        </button>
      </form>
      <div className="recipe-cards-container">
        {fetchedRecipes.length > 0 ? (
          fetchedRecipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))
        ) : (
          <p className="P">No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Form;
