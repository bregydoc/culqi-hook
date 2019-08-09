import { useState } from "react";

const CULQI_CHECKOUT = "https://checkout.culqi.com";

/**
 * This hook returns a simple array with two or three options, first: your token generation result,
 * second: your trigger to generate token and finally (and optional) your ready state
 *
 * _Heads up:_ This will make your component render on every navigation unless you set this hook to passive!
 * @param {string} publicKey Pass your public key extracted from your culqi dashboard (e.g. pk_test_POQJOT184VO1HOkc)
 * @returns {[{ready: Boolean, loading:Boolean, error: {message: string, userMessage: string}, token: string}, Function]}
 */

export const useCulqi = publicKey => {
  const [response, setResponse] = useState({ ready: false });

  const [f, _] = useState(document.createElement("iframe"));

  if (!response.ready) {
    f.style.display = "none";
    f.setAttribute(
      "src",
      CULQI_CHECKOUT +
        "/?public_key=" +
        publicKey +
        "&title=Q3VscWkgU3RvcmU%3D&currency=UEVO&" +
        "description=UG9sbyBDdWxxaSBsb3Zlcg%3D%3D&" +
        "amount=MzUwMA%3D%3D&logo=aHR0cHM6Ly9zdGF0aWM" +
        "uY3VscWkuY29tL3YyL3YyL3N0YXRpYy9pbWcvbG9nby5wbmc%3D&" +
        "installments=false&orders="
    );

    document.body.appendChild(f);
    window.addEventListener(
      "message",
      function receive(evt) {
        if (evt.origin === CULQI_CHECKOUT) {
          if (evt.data.object) {
            if (evt.data.object === "token") {
              setResponse({
                ...response,
                token: evt.data.id,
                loading: false,
                ready: true
              });
            } else {
              if (evt.data.object === "error") {
                setResponse({
                  ...response,
                  error: {
                    message: evt.data.merchant_message,
                    userMessage: evt.data.user_message
                  },
                  ready: true,
                  loading: false
                });
              }
            }
          }
        }
      },
      false
    );

    f.addEventListener("load", function() {
      setResponse({ ...response, ready: true });

      f.contentWindow.postMessage(
        {
          _publicKey: publicKey,
          _settings: {
            title: "Culqi Store",
            currency: "PEN",
            description: "Polo Culqi lover",
            amount: 3500,
            version: "2"
          },
          _options: {
            lang: "auto",
            modal: !0,
            onlyInputs: !1,
            head: !0,
            installments: !1,
            customButton: "",
            style: {
              bgcolor: "#fafafa",
              maincolor: "#0ec1c1",
              disabledcolor: "#ffffff",
              buttontext: "#ffffff",
              maintext: "#4A4A4A",
              desctext: "#4A4A4A",
              logo: "https://static.culqi.com/v2/v2/static/img/logo.png"
            }
          }
        },
        "*"
      );
    });
  }

  const generateToken = details => {
    if (response.ready) {
      setResponse({ ...response, loading: true });
      f.contentWindow.postMessage(
        {
          type: "createToken",
          card_number: details.cardNumber,
          email: details.email,

          cvv: details.cvv,
          expiration_year: details.expirationYear,
          expiration_month: details.expirationMonth
        },
        "*"
      );
    }
  };

  return [response, generateToken];
};
