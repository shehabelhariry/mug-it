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
  };

  const getFeed = () => {
    var graphObject = graph.get("/me/feed", function(err, res) {
      console.log(res);
    });
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
        <span>
          {" "}
          You have access to choose your facebook posts
          <button onClick={getFeed}>get your Feed</button>
        </span>
      ) : null}
    </div>
  );
}

export default App;
