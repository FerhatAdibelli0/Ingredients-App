import React, { useCallback, useReducer, useMemo, useEffect } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/useHttp";

const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.ingedients;
    case "DELETE":
      return state.filter((ing) => ing.id !== action.id);
    case "ADD":
      return [...state, action.ingedient];
    default:
      throw new Error("Should not get something");
  }
};

function Ingredients() {
  const [useringredients, dispatch] = useReducer(ingredientsReducer, []);
  const { loading, error, data, sendRequest, reqExtra, reqIdentifier, clear } =
    useHttp();

  console.log(data);

  useEffect(() => {
    if (!loading && !error && reqIdentifier === "REMOVEITEM") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!loading && !error && reqIdentifier === "ADDITEM") {
      dispatch({
        type: "ADD",
        ingedient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, loading, error, reqIdentifier]);

  const filteredDataHandler = useCallback((filteredData) => {
    dispatch({ type: "SET", ingedients: filteredData });
  }, []);

  const addIngredientsHandler = useCallback(
    (ingedients) => {
      sendRequest(
        "https://summary-7359f-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingedients),
        ingedients,
        "ADDITEM"
      );
    },
    [sendRequest]
  );

  const removeIngredientsHandler = useCallback(
    (ingedientId) => {
      sendRequest(
        `https://summary-7359f-default-rtdb.firebaseio.com/ingredients/${ingedientId}.json`,
        "DELETE",
        null,
        ingedientId,
        "REMOVEITEM"
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={useringredients}
        onRemoveItem={removeIngredientsHandler}
      />
    );
  }, [useringredients, removeIngredientsHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddInputValues={addIngredientsHandler}
        isloading={loading}
      />
      <section>
        <Search onLoadedFilteredData={filteredDataHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
