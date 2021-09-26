import React from "react";
import { motion } from "framer-motion";

function infoModal({ open, close }) {
  const BACKGROUND_BLUR = {
    backgroundColor: " rgba(0, 0, 0, 0.25)",
  };

  if (!open) {
    document.querySelector("body").style.overflow = "unset";

    return null;
  } else if (open) {
    document.querySelector("body").style.overflow = "hidden";

    return (
      <div
        style={BACKGROUND_BLUR}
        className="info-overlay-styles"
        onClick={() => {
          // close modal when outside of modal is clicked
          close();
        }}
      >
        <motion.div
          initial={{
            transform: "translateY(-100%)",
          }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(0%)" }}
          transition={({ duration: 0.12 }, { ease: "easeInOut" })}
        >
          <div
            className="info-content-styles"
            // style={CONTENT_STYLES}
            // onClick={(e) => {
            //   // do not close modal if anything inside modal content is clicked
            //   e.stopPropagation();
            // }}
          >
            <div className="main-info-grid-container">
              <div className="info-grid-container">
                <div className="info-item info-item-1">
                  Olen Võrumaalt pärit, üle Eesti tegutsev vabakutseline
                  graafiline disainer. Keskendun peamiselt visuaalsete
                  identiteetide väljatöötamisele ning kõikvõimalikele trüki- ja
                  digilahendustele. Kuulmiseni!
                </div>

                <div className="info-item info-item-2">
                  Kliente: Võru Linnavalitsus, Eesti Kunstiakadeemia, Miina
                  Härma Gümnaasium, Võru Kesklinna Kool, Vana-Võromaa
                  kultuurikoda, Kai kunstikeskus, PRAXIS Mõttekoda, Von Krahli
                  Aed, jt.
                </div>

                <div className="info-item info-item-3">
                  Kompetents: Adobe Creative Cloud, Figma, MailerLite, Mailchimp
                  <div className="info-item info-item-4">
                    <span href="mailto:karelkranich@gmail.com">
                      Veebilehe arendus:
                    </span>{" "}
                    <div className="karel-kranich-element">
                      <a href="mailto:karelkranich@gmail.com">Karel Kranich</a>
                    </div>
                  </div>
                </div>
                {/* Larger INFO-MODAL-LAYOUT */}
                <div className="info-item info-item-5 computer-info-layout">
                  Henri Kutsar OÜ <div>Reg nr: 12224294</div>
                </div>
                <div className="info-item info-item-6 computer-info-layout">
                  <div className="no-underline">
                    <a href="tel:372-529-3741">+372 529 3741</a>
                  </div>
                  <div>
                    <div className="no-underline">
                      <a href="mailto:info@henrikutsar.ee">Meiliaadress</a>
                    </div>
                    ,{" "}
                    <div className="no-underline-two">
                      <a href="http://www.instagram.com/henrikutsardisain/">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>

                {/* smaller INFO-MODAL-LAYOUT */}
                <div className="mobile-info-layout">
                  <div className="info-item info-item-5">
                    Henri Kutsar OÜ <div>Reg nr: 12224294</div>
                  </div>

                  <div className="info-item info-item-6">
                    <a className="test" href="tel:372-529-3741">
                      +372 529 3741
                    </a>
                    <div>
                      <a href="mailto:info@henrikutsar.ee">
                        info@henrikutsar.ee
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default infoModal;
