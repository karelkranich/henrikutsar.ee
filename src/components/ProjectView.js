import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import teine from "../images/teine.jpg";
import InfoContact from "./InfoContact";
import axios from "axios";
import kai_keskus_2 from "../images/kai_keskus_2.jpg";
import kai_keskus_3 from "../images/kai_keskus_3.jpg";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function ProjectView({ open, style, close }) {
  // FETCH DATA FROM WORDPRESS REST API
  const [posts, setPosts] = useState("");

  const { id } = useParams();

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
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
    };

    fetchData();
  }, [id]);

  console.log(posts);

  // const descriptionsWidth = {
  //   width: dimensions.width,
  //   height: "100%",
  // };

  const DESCRIPTIONS_CONTAINER = {
    fontStyle: "normal",
    fontWeight: "400",
    border: "5px solid red",
    width: dimensions.width,
    height: "100%",
  };

  const LONGER_PARAGRAPH_DESCRIPTION = {
    paddingTop: "3.4%",
    display: "block",
  };

  const OVERYLAY_STYLES = {
    position: "fixed",
    height: "100%",
    backdropFilter: "blur(8px)",
    width: "100vw",
    overflow: "scroll",
  };

  const PROJECT_VIEW_BACKGROUNDCOLOR = {
    backgroundColor: posts.projektivaate_taustavarv,
    // width:""
  };

  // GO BACK TO PREVIOUS PAGE, CHANGE BODY OVERFLOW TO UNSET
  let history = useHistory();
  const routeChange = () => {
    history.push("/");
    document.querySelector("body").style.overflow = "unset";
  };

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
            transition={{ duration: 0.1 }}
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
                <img className="landing-picture" src={teine} alt="Savant" />
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
                <div className="project-picture-size picture-1">
                  <img
                    className="first-project-picture"
                    src={kai_keskus_2}
                    alt="kai_keskus_2"
                  />
                </div>
                <div className="project-picture-size project-picture-2">
                  <img
                    className="second-project-picture"
                    src={kai_keskus_3}
                    alt="kai_keskus_3"
                  />
                </div>
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
          <nav className="project-nav">
            <div className="project-list-items project-henri-kutsar-element">
              <Link onClick={routeChange} to={"/"}>
                HENRI KUTSAR
              </Link>
            </div>
            <InfoContact />
          </nav>

          <motion.div
            initial={{
              transform: "translateY(-100%)",
            }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.1 }}
          >
            <div
              style={PROJECT_VIEW_BACKGROUNDCOLOR}
              className="main-landing-picture-container"
            >
              <div className="landing-picture-container">
                <img className="landing-picture" src={teine} alt="Savant" />
              </div>
            </div>
            {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
            <div
              className="main-description-container"
              style={PROJECT_VIEW_BACKGROUNDCOLOR}
            >
              <div
                className="descriptions-container"
                style={DESCRIPTIONS_CONTAINER}
              >
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
                  <div className="project-picture-size picture-1">
                    <img
                      className="first-project-picture"
                      src={kai_keskus_2}
                      alt="kai_keskus_2"
                    />
                  </div>
                  <div className="project-picture-size project-picture-2">
                    <img
                      className="second-project-picture"
                      src={kai_keskus_3}
                      alt="kai_keskus_3"
                    />
                  </div>
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
