import React, { useState, useEffect } from "react";
import Hover from "./Hover";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Projects() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function hashHandler() {
      document.querySelector("body").style.overflow = "unset";
    }
    window.addEventListener("popstate", hashHandler, false);

    const fetchData = async () => {
      const results = await axios(
        "https://admin.henrikutsar.ee/wp-json/wp/v2/projektid/"
      );
      setPosts(results.data);
    };
    hashHandler();
    fetchData();
  }, []);

  return (
    <div>
      <section className="image-section ">
        <div className="grid-container">
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="grid-item">
                <Link to={`/${post.slug}`}>
                  <Hover>
                    <div
                      className="remove-padding"
                      dangerouslySetInnerHTML={{
                        __html: post.acf.projekti_pealkiri,
                      }}
                    />
                  </Hover>
                  <img
                    className="bigger-screen-view"
                    src={post.acf.thumbnaili_foto.url}
                    alt={post.slug}
                  />
                  <img
                    className="smaller-screen-view"
                    src={post.acf.thumbnaili_foto.sizes.medium_large}
                    alt={post.slug}
                  />
                </Link>

                <div className="project-title project-title-2">
                  <div
                    className="remove-padding"
                    dangerouslySetInnerHTML={{
                      __html: post.acf.projekti_pealkiri,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
