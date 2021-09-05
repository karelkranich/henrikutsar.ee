import React, { useState } from "react";
import InfoModal from "./InfoModal";
import { useTransition } from "react-spring";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const transitions = useTransition(isOpen, null, {
    from: {
      transform: "translateY(-100%)",
      transition: " 100",
      transitionTimingFunction: "linear",
    },
    enter: { transform: "translateY(0px)" },
    leave: {
      transform: "translateY(0px)",
      transition: " 100",
      transitionTimingFunction: "linear",
    },
    config: { duration: 120 },
  });

  return (
    <header className="header-container">
      <nav className="nav">
        <div className="list-items henri-kutsar-element">
          <a href="/">HENRI KUTSARS</a>
        </div>
        <div className="list-items hide-nav-element">
          <div className="middle-nav-element">TRÜKI- JA DIGIDISAIN</div>
        </div>
        <div className="list-items info-contact-element">
          <div className="right-nav-element" onClick={() => setIsOpen(true)}>
            INFO & KONTAKT
          </div>
          {transitions.map(
            ({ item, key, props: style }) =>
              item && (
                <InfoModal
                  open={isOpen}
                  style={style}
                  key={key}
                  close={() => setIsOpen(false)}
                ></InfoModal>
              )
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
