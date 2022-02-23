import React, { useEffect, useState, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [enteredValue, setenteredValue] = useState("");
  const { onLoadedFilteredData } = props;
  const enteredRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      
      if (enteredValue === enteredRef.current.value) {
        const query =
          enteredValue.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredValue}"`;

        fetch(
          "https://summary-7359f-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const fetchedData = [];
            for (let key in responseData) {
              fetchedData.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadedFilteredData(fetchedData);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue, onLoadedFilteredData]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={enteredRef}
            value={enteredValue}
            onChange={(event) => setenteredValue(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
