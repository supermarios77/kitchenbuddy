import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const { title, image, id } = recipe;

  return (
    <Link to={`/recipes/${id}`}>
      <div className="card">
        <div className="top">
          <h2 className="name">{title}</h2>
          <img className="circle-img" src={image} alt={title} />
        </div>
        <div className="bottom"></div>
        <p className="info">id: {id}</p>
      </div>
    </Link>
  );
}

export default RecipeCard;

