import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import teine from "../images/teine.jpg";

import axios from "axios";

import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectView({ open, style, close }) {
  // FETCH DATA FROM WORDPRESS REST API
  const [posts, setPosts] = useState("");
  // Set different sizes of the REST API images
  const [originalSize, setOriginalSize] = useState("");

  const { id } = useParams();

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // holds the timer for setTimeout and clearInterval
  // let movement_timer = null;

  // // the number of ms the window size must stay the same size before the
  // // dimension state variable is reset
  // const RESET_TIMEOUT = 100;

  // const test_dimensions = () => {
  //   // For some reason targetRef.current.getBoundingClientRect was not available
  //   // I found this worked for me, but unfortunately I can't find the
  //   // documentation to explain this experience
  //   if (targetRef.current) {
  //     setDimensions({
  //       width: targetRef.current.offsetWidth,
  //       height: targetRef.current.offsetHeight,
  //     });
  //   }
  // };

  // useLayoutEffect(() => {
  //   test_dimensions();
  // }, []);

  // window.addEventListener("resize", () => {
  //   clearInterval(movement_timer);
  //   movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
  // });

  useEffect(() => {
    // TO MAKE SURE THE BODY OVERFLOW IS NEVER UNSET
    function hashHandler() {
      document.querySelector("body").style.overflow = "hidden";
    }
    window.addEventListener("hashchange", hashHandler, false);

    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }

    const fetchData = async () => {
      const results = await axios(
        `https://henrikutsar.ee/admin/wp-json/wp/v2/projektid/${id}`
      );

      setPosts(results.data.acf);
      setOriginalSize(results.data.acf.pildid);
    };

    hashHandler();
    fetchData();
  }, [id]);

  const DESCRIPTIONS_CONTAINER = {
    width: dimensions.height * 1.5,
  };

  // console.log("hi");

  console.log(posts);
  // console.log(originalSize);
  // console.log(imageSize);

  const LONGER_PARAGRAPH_DESCRIPTION = {
    paddingTop: "3.4%",
    display: "block",
  };

  const OVERYLAY_STYLES = {
    position: "fixed",
    height: "100%",
    // backdropFilter: "blur(8px)",
    width: "100vw",
    overflow: "scroll",
  };

  const PROJECT_VIEW_BACKGROUNDCOLOR = {
    backgroundColor: posts.projektivaate_taustavarv,
  };

  // GO BACK TO PREVIOUS PAGE, CHANGE BODY OVERFLOW TO UNSET
  let history = useHistory();
  const routeChange = () => {
    history.push("/");

    // document.querySelector("body").style.overflow = "unset";
  };

  // if (isOpen) {
  //   document.querySelector("body").style.overflow = "hidden";
  // }
  // if (!isOpen) {
  //   document.querySelector("body").style.overflow = "unset";
  // }

  return ReactDom.createPortal(
    <div>
      <div
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
            transition={{ duration: 0.2 }}
          >
            <div className="main-landing-picture-container">
              <div
                ref={targetRef}
                onClick={(e) => {
                  // do not close projectview if anything inside modal content is clicked
                  e.stopPropagation();
                }}
                className="landing-picture-container"
              >
                <img
                  className="landing-picture"
                  src={posts.pilt}
                  alt="Savant"
                />
              </div>
            </div>
          </motion.div>

          {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
          <div
            className="main-description-container"
            style={PROJECT_VIEW_BACKGROUNDCOLOR}
          >
            <div
              onClick={(e) => {
                // do not close projectview if anything inside modal content is clicked
                e.stopPropagation();
              }}
              style={DESCRIPTIONS_CONTAINER}
              className="descriptions-container"
            >
              <div>
                <div className="project-details">
                  <div className="project-client">
                    <div>{posts.vasak_esimene_tekst}</div>
                    <div>{posts.vasak_teine_tekst}</div>
                  </div>

                  <div className="year-cvi">
                    <div>{posts.parem_esimene_tekst}</div>
                    <div>{posts.parem_teine_tekst}</div>
                  </div>
                </div>
              </div>
              {/* LONGER, DETAILED PARAGRAPH */}
              <div
                className="longer-paragraph-description"
                style={LONGER_PARAGRAPH_DESCRIPTION}
              >
                {posts.kirjeldus}
              </div>
              {/* PROJECT PICTURES*/}
              <div className="project-view-pictures">
                {originalSize &&
                  originalSize.map((pilt) => (
                    <div key={pilt.id} className="project-picture-size">
                      <img src={pilt.url} alt="kai_keskus_2" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="smaller-project-view"
          onClick={(e) => {
            // do not close projectview if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          {/* <nav className="project-nav"> */}
          {/* <div className="project-list-items project-henri-kutsar-element"> */}
          {/* <div>HENRI KUTSAR</div> */}
          {/* <Link onClick={routeChange} to={"/"}> */}
          {/* HENRI KUTSAR */}
          {/* </Link> */}
          {/* </div> */}
          {/* <InfoContact /> */}
          {/* </nav> */}

          {/* <Header 
          classname="headerz"
          style={headerstyle} /> */}

          <motion.div
            initial={{
              transform: "translateY(-100%)",
            }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.1 }}
          >
            <div className="main-landing-picture-container">
              <div className="landing-picture-container">
                <img className="landing-picture" src={teine} alt="trenn" />
              </div>
            </div>
            {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
            <div
              className="main-description-container"
              style={PROJECT_VIEW_BACKGROUNDCOLOR}
            >
              <div className="descriptions-container">
                <div className="project-details">
                  <div className="project-client">
                    <div>Kai kunstikeskuse in-house disain</div>
                    <div>Klient: Kai kunstikeskus</div>
                  </div>

                  <div className="year-cvi">
                    <div>Aasta: 2019…–</div>
                    <div>CVI: Stuudio Stuudio</div>
                  </div>
                </div>
                {/* LONGER, DETAILED PARAGRAPH */}
                <div
                  className="longer-paragraph-description"
                  style={LONGER_PARAGRAPH_DESCRIPTION}
                >
                  Andi asitati osapic te sae vit offic te et apere perum ipsam
                  quaerit, cum etum ipsanditetur as solo vel magnist, corrovid
                  mintur? Quisque di officip sandit volor ma corum eturehendusa
                  nihillupti consequi offic totate desto blabori ipicitatibus
                  suntium, omnihitatiis reria volupis aboreiur rem.
                </div>
                {/* PROJECT PICTURES*/}
                <div className="project-view-pictures">
                  {originalSize &&
                    originalSize.map((pilt) => (
                      <div key={pilt.id} className="project-picture-size">
                        <img src={pilt.sizes.medium_large} alt="kai_keskus_2" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>,
    document.getElementById("project-view")
  );
}
