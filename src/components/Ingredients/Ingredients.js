import React, { useState } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [useringredients, setUseringredients] = useState([]);

  const ingredientsHandler = (ingedients) => {
    fetch(
      "https://summary-7359f-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingedients),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setUseringredients((previousState) => [
          ...previousState,
          { id: responseData.name, ...ingedients },
        ]);
      });
  };

  const removeIngredientsHandler = (id) => {
    setUseringredients((previousState) =>
      previousState.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddInputValues={ingredientsHandler} />
      <section>
        <Search />
        <IngredientList
          ingredients={useringredients}
          onRemoveItem={removeIngredientsHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
