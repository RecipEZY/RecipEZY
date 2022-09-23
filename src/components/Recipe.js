import React from 'react';
import { useNavigate } from 'react-router-dom';

const Recipe = ({img, name, url, price, setRecipeDetail}) => {
  
  //render individual recipes (flexbox with align centers, and space between)
  const Navigate = useNavigate();

  return (  
    <div className="recipes">
      <div className="recipe-info">
        <p><strong>Recipe:</strong> <a href={url} target="_blank">{name}</a></p>
        {price ? typeof price === 'string' ? (<p style={{color:"red"}}>{price}</p>) : (<p><strong>Price:</strong> ${Number(price).toFixed(2)}</p>) : (<p><strong>Price:</strong> Calculating... </p>)}
        <button id={name} onClick={e => {
          setRecipeDetail(e);
          Navigate('/recipes');
          }}>
          Get Ingredients
        </button>
      </div>
      <div></div>
      <div className="recipe-image">
        <img src={img} alt="Recipe image"/>
      </div>
    </div>
  )
}

export default Recipe;