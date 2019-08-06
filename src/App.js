import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import graph from "fb-react-sdk";

function App() {
  const [accessToken, setAccessToken] = useState("");
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
      setAccessToken(window.location.href.split("code=")[1].split("#_=_")[0]);
    }
  }, []);
  console.log(accessToken);
  return (
    <div className="App">
      <button onClick={getAccesToken}>Click to open auth</button>
    </div>
  );
}

export default App;
