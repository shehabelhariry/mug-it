import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import graph from "fb-react-sdk";

import moment from "moment";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [code, setCode] = useState("");
  const [posts, setPosts] = useState([]);
  const getAccesToken = () => {
    var authUrl = graph.getOauthUrl({
      client_id: "2326480507388664",
      redirect_uri: "https://quizzical-carson-5f9a0e.netlify.com/"
    });

    window.open(authUrl, "_blank");
    console.log(authUrl);
  };

  const getFeed = () => {
    var graphObject = graph.get(
      "/me/feed?fields=full_picture,message,created_time,description,height,icon,message_tags,caption,child_attachments,admin_creator,name,properties,source,story,subscribed,type",
      function(err, res) {
        setPosts(res.data);
      }
    );
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
          You have access to choose your facebook posts
          <button onClick={getFeed}>get your Feed</button>
        </span>
      ) : null}
      {posts.length
        ? posts.map(post => (
            <div>
              <div className="fb-post-container">
                <div className="fb-post-info d-flex align-items-center p-2">
                  <img
                    className="blue pr-1"
                    style={{ borderRadius: "100%" }}
                    src="https://scontent-hbe1-1.xx.fbcdn.net/v/t1.0-1/p50x50/64541420_10157125287094550_8871862309803261952_n.jpg?_nc_cat=104&amp;_nc_oc=AQmdBqG12jRewIdmfVOdU_qLmIu19C7FwiaSS2WiCs8yuiShBzjFMfizP1Ll1IHXk0A&amp;_nc_ht=scontent-hbe1-1.xx&amp;oh=e7bd42e6ed42c047bf61e99d5df515f2&amp;oe=5DD3943B"
                  />
                  <div>
                    <div>
                      <a href="#" className="blue pr-1">
                        Shehab Elhariry
                      </a>
                      <span className="light-grey">shared a live video.</span>
                    </div>
                    <div className="lightest-grey pt-1">
                      {post.created_time
                        ? moment("2019-08-12T07:20:59+0000")
                            .format("MMMM D at h:mm A")
                            .replace("amt", "at")
                        : null}
                    </div>
                  </div>
                </div>
                <div
                  className="fb-post-image"
                  style={{
                    width: "100%",
                    height: "260px",
                    overflow: "hidden"
                  }}
                >
                  {post.full_picture ? (
                    <img
                      src={post.full_picture}
                      style={{
                        width: "100%"
                      }}
                    />
                  ) : null}
                </div>
                <div className="fb-post-desc">
                  <div className="lightest-grey uppercase pb-1">
                    {post.source}
                  </div>
                  <div className="black-bold pb-1">{post.name}</div>
                  <div>{post.description}</div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
