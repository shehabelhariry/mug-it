import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import graph from "fb-react-sdk";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [code, setCode] = useState("");
  const getAccesToken = () => {
    var authUrl = graph.getOauthUrl({
      client_id: "2326480507388664",
      redirect_uri: "https://quizzical-carson-5f9a0e.netlify.com/"
    });

    window.open(authUrl, "_blank");
    console.log(authUrl);

    const accessToken =
      "AQAHbF9HvemmP5Q2FokGbrlzOIpc-ge1xCWSZ2o7U0TsJRtfBgRX9Vu02jv73XIOE57Cl5ZSozwSkGIx_sTbJ0Mk61RIaTAZ-rufaUfk5mCjke4JIK5Qaf6RlvRHz9tl2b37EaK64ylryGBRRWeSINtSZSfyFnLKp_yIx4gmiCH4jH4XC9SQLEjx0viDd7VJFO07UgPm6oXW31d-2y2ssr7NkWPD_WNgeyWz28dioXq_aD04kSMyxQAriuwbEtOq4gXtqYnneW9CpaL9Uudsug_scpgQMDG-ZdJGpx2tcnMnRjcYaaTVgUKQS6YeoixHn3I";
  };

  useEffect(() => {
    if (window.location.href.includes("code=")) {
      setCode(window.location.href.split("code=")[1].split("#_=_")[0]);
      graph.authorize(
        {
          client_id: "2326480507388664",
          redirect_uri: "https://quizzical-carson-5f9a0e.netlify.com/",
          client_secret: "49d1fd41f5416e447e1dc9678b523e5a",
          code: window.location.href.split("code=")[1].split("#_=_")[0]
        },
        function(err, facebookRes) {
          console.log(facebookRes, err);
          if (facebookRes) {
            setAccessToken(facebookRes.access_token);
          }
        }
      );
    }
  }, []);
  console.log(accessToken);
  return (
    <div className="App">
      {code == "" ? (
        <button onClick={getAccesToken}>Click to open auth</button>
      ) : null}
      {accessToken !== "" ? (
        <span> You have access to choose your facebook posts </span>
      ) : null}
    </div>
  );
}

export default App;
