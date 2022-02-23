import React, { useState, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

function Ingredients() {
  const [useringredients, setUseringredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredDataHandler = useCallback((filteredData) => {
    setUseringredients(filteredData);
  }, []);

  const addIngredientsHandler = (ingedients) => {
    setIsLoading(true);
    fetch(
      "https://summary-7359f-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingedients),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setUseringredients((previousState) => [
          ...previousState,
          { id: responseData.name, ...ingedients },
        ]);
      })
      .catch((err) => {
        setError("Something went wrong");
      });
  };

  const removeIngredientsHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://summary-7359f-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      { method: "DELETE" }
    ).then((response) => {
      setIsLoading(false);
      setUseringredients((previousState) =>
        previousState.filter((item) => item.id !== id)
      );
    });
  };
  const errorHandler = () => {
    setIsLoading(false);
    setError();
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={errorHandler}>{error}</ErrorModal>}
      <IngredientForm
        onAddInputValues={addIngredientsHandler}
        isloading={isLoading}
      />
      <section>
        <Search onLoadedFilteredData={filteredDataHandler} />
        <IngredientList
          ingredients={useringredients}
          onRemoveItem={removeIngredientsHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
