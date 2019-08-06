import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import graph from "fb-react-sdk";

function App() {
  const getAccesToken = () => {
    var authUrl = graph.getOauthUrl({
      client_id: "2326480507388664",
      redirect_uri: "https://quizzical-carson-5f9a0e.netlify.com/"
    });

    window.open(authUrl, "_blank");
    console.log(authUrl);
  };
  return (
    <div className="App">
      <button onClick={getAccesToken}>Click to open auth</button>
    </div>
  );
}

export default App;
