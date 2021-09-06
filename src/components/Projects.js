import React, { useState, useEffect } from "react";
import teine from "../images/teine.jpg";
import kolmas from "../images/kolmas.jpg";
import Hover from "./Hover";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Projects() {
  // FETCH DATAFROM WORDPRESS REST API
  const [posts, setPosts] = useState("");

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        "https://henrikutsar.ee/admin/wp-json/wp/v2/projektid"
      );
      setPosts(results.data);
    };

    fetchData();
  }, []);

  const onLinkClick = () => {
    document.querySelector("body").style.overflow = "hidden";
  };

  return (
    <section className="image-section">
      <div className="grid-container">
        {posts &&
          posts.map((post) => (
            <div
              // style={{ width: `${post.acf.laius}` + "%" }}
              key={post.id}
              className="grid-item"
            >
              <Link onClick={onLinkClick} to={`/projektid/${post.id}`}>
                <Hover>{post.title.rendered}</Hover>
                <img src={teine} alt="Savant" />
              </Link>
              <div className="project-title project-title-2">
                {post.title.rendered}
              </div>
            </div>
          ))}
        <div className="grid-item grid-item-3">
          <img src={kolmas} alt="Savant" />
          <div className="project-title project-title-3">Ida ots(as)?</div>
        </div>

        {/* <div className="grid-item grid-item-4"> */}
        {/* <div className="justify-image-frame"> */}
        {/* <img src={neljas} alt="Savant" /> */}
        {/* </div> */}
        {/* <div className="project-title project-title-4">Elusäde</div> */}
        {/* </div> */}
        <div className="grid-item grid-item-5">
          <img src={kolmas} alt="Savant" />
          <div className="project-title project-title-3">Ida ots(as)?</div>
        </div>
        <div className="grid-item grid-item-3">
          <img src={kolmas} alt="Savant" />
          <div className="project-title project-title-3">Ida ots(as)?</div>
        </div>
      </div>
    </section>
  );
}
