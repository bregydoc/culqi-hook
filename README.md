# Culqi Hook
The modern alternative to culqi checkout.

A small hook to integrate Culqi with the most recent react's feature: hooks.
Tested from React 16.8.1 upwards.

## How to install
Well, this is straightforward:

```
yarn add culqi-hook
```

## Documentation
Currently Culqi Hook doesn't have a full documentation, but you can read a full example [here](https://github.com/bregydoc/culqi-hook/blob/master/example/index.js)


## A quick example

```js
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

```
