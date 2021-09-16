import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectView() {
  // FETCH DATA FROM WORDPRESS REST API
  const [posts, setPosts] = useState("");

  const { slug } = useParams();
  // TO SET THE BUFFER
  const [isOpen, setIsOpen] = useState(false);

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
        });
      }
    }
    if (posts.length > 0) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [posts]);

  useEffect(() => {
    // TO MAKE SURE THE BODY OVERFLOW, WHEN PROJECT IS OPEN, IS NEVER UNSET
    function hashHandler() {
      document.querySelector("body").style.overflow = "hidden";
    }
    window.addEventListener("hashchange", hashHandler, true);

    const fetchData = async () => {
      const results = await axios(
        `https://henrikutsar.ee/admin/wp-json/acf/v3/projektid?slug[]=${slug}`
      );

      setIsOpen(true);
      setPosts(results.data);
    };

    fetchData();
    hashHandler();
  }, [slug]);

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
    history.push("/");
  };
  if (isOpen) {
    return ReactDom.createPortal(
      <div>
        {posts &&
          posts.map((pilt) => (
            <div
              key={pilt.id}
              className="overlay-styles"
              style={OVERYLAY_STYLES}
              onClick={routeChange}
            >
              <div className="larger-project-view">
                <motion.div
                  initial={{
                    transform: "translateY(-100%)",
                  }}
                  animate={{ transform: "translateY(0%)" }}
                  exit={{ transform: "translateY(0%)" }}
                  transition={({ duration: 0.2 }, { ease: "easeInOut" })}
                >
                  <div className="main-landing-picture-container">
                    <div
                      onClick={(e) => {
                        // do not close projectview if anything inside projectview content is clicked
                        e.stopPropagation();
                      }}
                      className="landing-picture-container"
                    >
                      <img
                        ref={targetRef}
                        className="landing-picture"
                        src={pilt.acf.viewporti_foto.url}
                        alt={slug}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
                <div
                  className="main-description-container"
                  style={{ backgroundColor: pilt.acf.projektivaate_taustavarv }}
                >
                  <div
                    onClick={(e) => {
                      // do not close projectview if anything inside projectview content is clicked
                      e.stopPropagation();
                    }}
                    // style={DESCRIPTIONS_CONTAINER}

                    style={{ width: dimensions.width }}
                    className="descriptions-container"
                  >
                    <div>
                      <div className="project-details">
                        <div className="project-client">
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.vasak_esimene_tekst,
                            }}
                          />
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.vasak_teine_tekst,
                            }}
                          />
                        </div>

                        <div className="year-cvi">
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.parem_esimene_tekst,
                            }}
                          />
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.parem_teine_tekst,
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
                          __html: pilt.acf.kirjeldus,
                        }}
                      />
                    </div>
                    {/* PROJECT PICTURES*/}
                    <div className="project-view-pictures">
                      {pilt.acf.pildid &&
                        pilt.acf.pildid.map((pildid) => (
                          <div key={pildid.id} className="project-picture-size">
                            <img src={pildid.url} alt={slug} />
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
                      backgroundColor: pilt.acf.projektivaate_taustavarv,
                    }}
                    className="main-landing-picture-container"
                  >
                    <div className="landing-picture-container">
                      <img
                        className="landing-picture"
                        src={pilt.acf.viewporti_foto.sizes.medium_large}
                        alt={slug}
                      />
                    </div>
                  </div>

                  {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
                  <div
                    className="main-description-container"
                    style={{
                      backgroundColor: pilt.acf.projektivaate_taustavarv,
                    }}
                  >
                    <div className="descriptions-container">
                      <div className="project-details">
                        <div className="project-client">
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.vasak_esimene_tekst,
                            }}
                          />
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.vasak_teine_tekst,
                            }}
                          />
                        </div>

                        <div className="year-cvi">
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.parem_esimene_tekst,
                            }}
                          />
                          <div
                            className="remove-padding"
                            dangerouslySetInnerHTML={{
                              __html: pilt.acf.parem_teine_tekst,
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
                            __html: pilt.acf.kirjeldus,
                          }}
                        />
                      </div>
                      {/* PROJECT PICTURES*/}
                      <div className="project-view-pictures">
                        {pilt.acf.pildid &&
                          pilt.acf.pildid.map((pildid) => (
                            <div
                              key={pildid.id}
                              className="project-picture-size"
                            >
                              <img src={pildid.sizes.medium_large} alt={slug} />
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
  if (!isOpen) {
    return (
      <div className="main-buffer-container">
        <div className="buffer-container"></div>
      </div>
    );
  }
}
