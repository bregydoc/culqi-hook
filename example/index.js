import React, { useEffect } from "react";

import ReactDOM from "react-dom";
import { useCulqi } from "culqi-hook";

const App = () => {
  const [token, createToken, ready] = useCulqi("pk_test_POQJOT184VO1HOkc");

  useEffect(() => {
    console.log(token);
  }, [token]);

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
      <h1>Hello World</h1>
      <div>{ready ? "Ready!" : "Starting..."}</div>
      <br />
      <div>newToken: {token ? token : ""}</div>
      <button onClick={newToken}>Hello</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
