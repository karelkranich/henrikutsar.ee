import React from "react";
import { animated } from "react-spring";

function Hover({ children }) {
  const HOVER_TEXT_STYLE = {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "100%",
    padding: "8px",
    color: "white",
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

// onMouseEnter={() => {
//   open();
// }}
// onMouseLeave={() => {
//   leave();
// }}

// function Hover({ style }) {
// const text = "Kai kunstikeskuse in-house disain";

// const HOVER_TEXT_STYLE = {
//   backgroundColor: "rgba(0, 0, 0, 0.25)",
//   position: "absolute",
//   top: 0,
//   width: "100%",
//   height:"100%",
//   padding: "8px",
//   color: "white",
// };
// return (
//   <animated.div className="hide-hover testime" >
//     <div
//     // style={HOVER_TEXT_STYLE}
//     >
//       {text}</div>
//   </animated.div>

// );
// }
