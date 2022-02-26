import { useCallback, useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  reqIdentifier: null,
};

const httpRequestReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        reqIdentifier: action.identity,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        extra: action.reqExtra,
        data: action.responseData,
      };
    case "ERROR":
      return { ...state, error: action.errorItem };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(
    httpRequestReducer,
    initialState
  );

  const clear = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  }, []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHttp({ type: "SEND", identity: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            reqExtra: reqExtra,
          });
        })
        .catch((err) => {
          dispatchHttp({ type: "ERROR", errorItem: "Something went wrong" });
        });
    },
    []
  );

  return {
    loading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.reqIdentifier,
    clear: clear,
  };
};

export default useHttp;
