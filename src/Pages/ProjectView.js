import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import useResizeObserver from "./useResizeObserver";

export default function ProjectView() {
  // test
  // const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  // FETCH DATA FROM WORDPRESS REST API
  const [posts, setPosts] = useState(null);

  const { slug } = useParams();
  // TO SET THE BUFFER
  const [isOpen, setIsOpen] = useState(false);

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER
  // const ref = useRef();
  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  // });

  useEffect(() => {
    // TO MAKE SURE THE BODY OVERFLOW, WHEN PROJECT IS OPEN, IS NEVER UNSET
    function hashHandler() {
      document.querySelector("body").style.overflow = "hidden";
    }
    window.addEventListener("hashchange", hashHandler, false);

    // GET THE DATA FROM WP API
    const fetchData = async () => {
      const results = await axios(
        `https://admin.henrikutsar.ee/wp-json/acf/v3/projektid?slug[]=${slug}`
      );

      setIsOpen(true);
      setPosts(results.data);
    };

    fetchData();
    hashHandler();
  }, [slug]);

  // useEffect(() => {
  //   // RERENDER IF SIZE CHANGES
  //   function handleResize() {
  //     if (targetRef.current) {
  //       setDimensions({
  //         width: targetRef.current.offsetWidth,
  //       });
  //     }
  //   }
  //   // TO AFFIRM THE WIDTH IS CORRECT
  //   if (posts.length > 0) {
  //     handleResize();
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [posts]);
  const resizeObserver = useResizeObserver();

  console.log(dimensions.width);

  const LONGER_PARAGRAPH_DESCRIPTION = {
    paddingTop: "3.4%",
    display: "block",
  };

  const OVERYLAY_STYLES = {
    position: "fixed",
    height: "100%",
    width: "100vw",
    overflow: "scroll",
  };

  // GO BACK TO PREVIOUS PAGE, CHANGE BODY OVERFLOW TO UNSET
  let history = useHistory();
  const routeChange = () => {
    document.querySelector("body").style.overflow = "unset";
    history.push("/");
  };

  if (!isOpen) {
    return (
      <div className="main-buffer-container">
        <div className="buffer-container"></div>
      </div>
    );
  }
  if (isOpen) {
    return ReactDom.createPortal(
      <div>
        {posts &&
          posts.map((projects) => (
            // WRAPPER
            <div
              key={projects.id}
              className="overlay-styles"
              style={OVERYLAY_STYLES}
              onClick={routeChange}
            >
              {/* PARENT */}
              <div className="larger-project-view">
                {/* CHILD */}
                <motion.div
                  className="main-landing-picture-container"
                  initial={{
                    transform: "translateY(-100%)",
                  }}
                  animate={{ transform: "translateY(0%)" }}
                  exit={{ transform: "translateY(0%)" }}
                  transition={({ duration: 0.2 }, { ease: "easeInOut" })}
                >
                  <div
                    onClick={(e) => {
                      // do not close projectview if anything inside projectview content is clicked
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

                {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
                <div
                  className="main-description-container"
                  style={{
                    backgroundColor: projects.acf.projektivaate_taustavarv,
                  }}
                >
                  {/* CHILD */}
                  <div
                    onClick={(e) => {
                      // do not close projectview if anything inside projectview content is clicked
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
                    {/* LONGER, DETAILED PARAGRAPH */}
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
                    {/* PROJECT PICTURES*/}
                    <div className="project-view-pictures">
                      {projects.acf.pildid &&
                        projects.acf.pildid.map((pictures) => (
                          <div
                            key={pictures.id}
                            className="project-picture-size"
                          >
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
                  // do not close projectview if anything inside projectview content is clicked
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

                  {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
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
                      {/* LONGER, DETAILED PARAGRAPH */}
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
                      {/* PROJECT PICTURES*/}
                      <div className="project-view-pictures">
                        {projects.acf.pildid &&
                          projects.acf.pildid.map((pictures) => (
                            <div
                              key={pictures.id}
                              className="project-picture-size"
                            >
                              <img
                                src={pictures.sizes.medium_large}
                                alt={slug}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
      </div>,
      document.getElementById("project-view")
    );
  }
}
