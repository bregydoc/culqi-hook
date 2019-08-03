import { useState } from "react";

const CULQI_CHECKOUT = "https://checkout.culqi.com";

export const useCulqi = publicKey => {
    const [token, setToken] = useState(undefined);
    const [ready, setReady] = useState(false);
  
    const [f, _] = useState(document.createElement("iframe"));
  
    if (!ready) {
      f.style.display = "none";
      f.setAttribute(
        "src",
        CULQI_CHECKOUT+"/?public_key=" +
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
                setToken(evt.data.id);
              } else {
                setToken(undefined);
              }
            }
          }
        },
        false
      );
  
      f.addEventListener("load", function() {
        console.log("ready");
  
        setReady(true);
  
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
    };
  
    return [token, generateToken, ready];
  };