import React, { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [inputTitle, setinputTitle] = useState("");
  const [inputAmount, setinputAmount] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddInputValues({
      title: inputTitle,
      amount: inputAmount,
    });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputTitle}
              onChange={(event) => {
                setinputTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputAmount}
              onChange={(event) => {
                setinputAmount(event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isloading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
