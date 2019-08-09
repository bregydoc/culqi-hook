import React from "react";
import ReactDOM from "react-dom";
import { useCulqi } from "culqi-hook";

const App = () => {
  const [result, createToken] = useCulqi("pk_test_POQJOT184VO1HOkc");

  const newToken = () => {
    createToken({
      cardNumber: "4111111111111111",
      email: "bregy.malpartida@utec.edu.pe",
      cvv: "123",
      expirationYear: "2020",
      expirationMonth: "09"
    });
  };

  return (
    <div>
      <h1>culqi-hook, use example</h1>
      <div>{result.ready ? "Ready!" : "Starting..."}</div>
      <div>{result.loading ? "Loading..." : "Loaded!"}</div>
      <br />
      <div>
        Result: {result.token ? "[TOKEN] " : result.error ? "[ERROR] " : ""}
        {result.token ? result.token : ""}
        {result.error ? result.error.userMessage : ""}
      </div>
      <button onClick={newToken}>Generate Token</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
