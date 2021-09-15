import React, { useState, useEffect } from "react";
import Hover from "./Hover";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Projects() {
  // FETCH DATAFROM WORDPRESS REST API
  const [posts, setPosts] = useState([]);

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER

  useEffect(() => {
    // TO MAKE SURE THE HOMEPAGE OVERFLOW IS NEVER HIDDEN
    function hashHandler() {
      document.querySelector("body").style.overflow = "unset";
    }
    window.addEventListener("hashchange", hashHandler, false);

    const fetchData = async () => {
      const results = await axios(
        // "https://henrikutsar.ee/admin/wp-json/acf/v3/projektid/"
        "https://henrikutsar.ee/admin/wp-json/wp/v2/projektid/"
      );
      setPosts(results.data);
    };
    hashHandler();
    fetchData();
  }, []);

  return (
    <>
      <section className="image-section ">
        <div className="grid-container">
          {posts &&
            posts.map((post) => (
              <div
                style={{ width: `${post.acf.pildi_laius}%`}}
                key={post.id}
                className="grid-item "
              >
                {console.log(post.acf.pildi_laius)}
                <Link to={`/${post.slug}`}>
                  <Hover>{post.acf.projekti_pealkiri}</Hover>

                  <img
                    className="bigger-screen-view"
                    src={post.acf.thumbnaili_foto.url}
                    alt={post.acf.projekti_pealkiri}
                  />
                  <img
                    className="smaller-screen-view"
                    src={post.acf.thumbnaili_foto.sizes.medium_large}
                    alt={post.acf.projekti_pealkiri}
                  ></img>
                  {/* ))} */}
                </Link>

                <div className="project-title project-title-2">
                  {/* {post.title.rendered} */}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
