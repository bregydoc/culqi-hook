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
  const [token, createToken] = useCulqi("pk_test_POQJOT184VO1HOkc");

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
      <br />
      <div>GENERATED TOKEN: {token ? token : ""}</div>
      <button onClick={newToken}>Hello</button>
    </div>
  );
};
```
