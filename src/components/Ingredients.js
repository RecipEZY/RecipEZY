import React from 'react';

const Ingredients = ({name, price, picture}) => {
   
  return (  
    <div className="ingredients">
      <div className="individual">
        {picture ? (<img src={picture} alt='ingredient image'/>) : <></>}
        <div> &nbsp; {name}</div>
        <div> &nbsp; ${price}</div>
      </div>
    </div>
  )
}

export default Ingredients;