import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          console.error('Error fetching recipe');
        }
      } catch (error) {
        console.error('Error fetching recipe', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe || !recipe.title) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-page">
    <h1 className="recipe-title">{recipe.title}</h1>
    <img className="recipe-image" src={recipe.image} alt={recipe.title} />
    <p className="recipe-instructions">Instructions: {recipe.instructions}</p>
    <div className="recipe-meta">
      <p>Cooking Time: {recipe.readyInMinutes} minutes</p>
      <p>Serving Size: {recipe.servings}</p>
    </div>
    <p className="recipe-ingredients">Ingredients:</p>
    <ul className="recipe-ingredients-list">
      {recipe.extendedIngredients.map((ingredient) => (
        <li key={ingredient.id} className="recipe-ingredients-item">{ingredient.original}</li>
      ))}
    </ul>
    <div className="recipe-nutrition">
      <p>Nutrition Information:</p>
      <div className="nutrition-item">
        <span>Calories:</span>
        <span>{recipe.nutrition?.nutrients.find((n) => n.title === "Calories")?.amount}</span>
      </div>
    </div>
    <button className="btn btn-warning" onClick={handleGoBack}>Go Back</button>
  </div>
  );
}

export default RecipePage;
