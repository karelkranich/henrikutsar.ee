import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useResizeObserver from "./useResizeObserver";

export default function ProjectView() {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const resizeObserver = useResizeObserver();
  let navigate = useNavigate();

  useEffect(() => {
    function hashHandler() {
      document.querySelector("body").style.overflow = "hidden";
    }
    window.addEventListener("hashchange", hashHandler, false);

    const fetchData = async () => {
      const results = await axios(
        `https://admin.henrikutsar.ee/wp-json/acf/v3/projektid?slug[]=${slug}`
      );
      setPosts(results.data);
    };

    fetchData();
    hashHandler();
  }, [slug]);

  const LONGER_PARAGRAPH_DESCRIPTION = {
    marginTop: "3.4%",
    display: "block",
  };

  const OVERYLAY_STYLES = {
    position: "fixed",
    height: "100%",
    width: "100vw",
    overflow: "scroll",
  };

  const routeChange = () => {
    document.querySelector("body").style.overflow = "unset";
    navigate("/");
  };

  return ReactDom.createPortal(
    <div>
      {posts.length > 0 ? (
        posts &&
        posts.map((projects) => (
          <div
            key={projects.id}
            className="overlay-styles"
            style={OVERYLAY_STYLES}
            onClick={routeChange}
          >
            <div className="larger-project-view">
              <motion.div
                className="main-landing-picture-container"
                initial={{
                  transform: "translateY(-100%)",
                }}
                animate={{ transform: "translateY(0%)" }}
                exit={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.35 }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="landing-picture-container"
                >
                  <img
                    className="landing-picture"
                    src={projects.acf.viewporti_foto.url}
                    alt={slug}
                    ref={resizeObserver.ref}
                  />
                </div>
              </motion.div>

              <div
                className="main-description-container"
                style={{
                  backgroundColor: projects.acf.projektivaate_taustavarv,
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ width: resizeObserver.width }}
                  className="descriptions-container"
                >
                  <div>
                    <div className="project-details">
                      <div className="project-client">
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.vasak_esimene_tekst,
                          }}
                        />

                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.vasak_teine_tekst,
                          }}
                        />
                      </div>

                      <div className="year-cvi">
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.parem_esimene_tekst,
                          }}
                        />
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.parem_teine_tekst,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="longer-paragraph-description"
                    style={LONGER_PARAGRAPH_DESCRIPTION}
                  >
                    <div
                      className="remove-padding"
                      dangerouslySetInnerHTML={{
                        __html: projects.acf.kirjeldus,
                      }}
                    />
                  </div>

                  <div className="project-view-pictures">
                    {projects.acf.pildid &&
                      projects.acf.pildid.map((pictures) => (
                        <div key={pictures.id} className="project-picture-size">
                          <img src={pictures.url} alt={slug} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="smaller-project-view"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <motion.div
                initial={{
                  transform: "translateY(-100%)",
                }}
                animate={{ transform: "translateY(0%)" }}
                exit={{ transform: "translateY(0%)" }}
                transition={({ duration: 0.2 }, { ease: "easeInOut" })}
              >
                <div
                  style={{
                    backgroundColor: projects.acf.projektivaate_taustavarv,
                  }}
                  className="main-landing-picture-container"
                >
                  <div className="landing-picture-container">
                    <img
                      className="landing-picture"
                      src={projects.acf.viewporti_foto.sizes.medium_large}
                      alt={slug}
                    />
                  </div>
                </div>

                <div
                  className="main-description-container"
                  style={{
                    backgroundColor: projects.acf.projektivaate_taustavarv,
                  }}
                >
                  <div className="descriptions-container">
                    <div className="project-details">
                      <div className="project-client">
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.vasak_esimene_tekst,
                          }}
                        />
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.vasak_teine_tekst,
                          }}
                        />
                      </div>

                      <div className="year-cvi">
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.parem_esimene_tekst,
                          }}
                        />
                        <div
                          className="remove-padding"
                          dangerouslySetInnerHTML={{
                            __html: projects.acf.parem_teine_tekst,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="longer-paragraph-description"
                      style={LONGER_PARAGRAPH_DESCRIPTION}
                    >
                      <div
                        className="remove-padding"
                        dangerouslySetInnerHTML={{
                          __html: projects.acf.kirjeldus,
                        }}
                      />
                    </div>

                    <div className="project-view-pictures">
                      {projects.acf.pildid &&
                        projects.acf.pildid.map((pictures) => (
                          <div
                            key={pictures.id}
                            className="project-picture-size"
                          >
                            <img src={pictures.sizes.medium_large} alt={slug} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))
      ) : (
        <div className="main-buffer-container">
          <div className="buffer-container"></div>
        </div>
      )}
    </div>,
    document.getElementById("project-view")
  );
}
