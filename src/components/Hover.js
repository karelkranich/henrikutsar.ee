import React from "react";
import { animated } from "react-spring";

function Hover({ children }) {
  const HOVER_TEXT_STYLE = {
    width: "100%",
    padding: "0px",
    color: "white",
    backgroundColor: "#333333",
  };

  return (
    <animated.div className="hide-hover hover-animation">
      <div className="hover-text-style" style={HOVER_TEXT_STYLE}>
        {children}
      </div>
    </animated.div>
  );
}

export default Hover;
