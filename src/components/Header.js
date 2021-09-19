import React, { useState } from "react";
import InfoModal from "./InfoModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-container">
      <nav className="nav">
        <div className="list-items henri-kutsar-element">
          <a href="/">HENRI KUTSAR</a>
        </div>
        <div className="list-items hide-nav-element">
          <div className="middle-nav-element">TRÜKI- JA DIGIDISAIN</div>
        </div>
        <div className="list-items info-contact-element">
          <div className="right-nav-element" onClick={() => setIsOpen(true)}>
            INFO & KONTAKT
          </div>
          <div>
            <InfoModal open={isOpen} close={() => setIsOpen(false)}></InfoModal>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
