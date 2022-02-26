import React, { useEffect, useState, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import Card from "../UI/Card";
import "./Search.css";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  const [enteredValue, setenteredValue] = useState("");
  const { onLoadedFilteredData } = props;
  const enteredRef = useRef();
  const { loading, error, data, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredValue === enteredRef.current.value) {
        const query =
          enteredValue.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredValue}"`;

        sendRequest(
          "https://summary-7359f-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue, sendRequest, enteredRef]);

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedData = [];
      for (const key in data) {
        fetchedData.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadedFilteredData(fetchedData);
    }
  }, [data, onLoadedFilteredData, error, loading]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading</span>}
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
