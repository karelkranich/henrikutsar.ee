import React from "react";
import { animated } from "react-spring";

function infoModal({ open, style, close }) {
  const BACKGROUND_BLUR = {
    backgroundColor: " rgba(0, 0, 0, 0.25)",
  };
  if (!open) {
    document.querySelector("body").style.overflow = "unset";

    return null;
  } else if (open) {
    document.querySelector("body").style.overflow = "hidden";

    return (
      <>
        <div className="info-grid-parent">
          <div
            style={BACKGROUND_BLUR}
            className="info-overlay-styles"
            onClick={() => {
              // close modal when outside of modal is clicked
              close();
            }}
          >
            <animated.div style={style}>
              <div
                className="info-content-styles"
                // style={CONTENT_STYLES}
                onClick={(e) => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
              >
                <div className="main-info-grid-container">
                  <div className="info-grid-container">
                    <div className="info-item info-item-1">
                      Olen Võrumaalt pärit, üle Eesti tegutsev vabakutseline
                      graafiline disainer. Keskendun peamiselt visuaalsete
                      identiteetide väljatöötamisele ning kõikvõimalikele trüki-
                      ja digilahendustele. Kuulmiseni!
                    </div>

                    <div className="info-item info-item-2">
                      Kliente: Võru Linnavalitsus, Eesti Kunstiakadeemia, Miina
                      Härma Gümnaasium, Võru Kesklinna Kool, Vana-Võromaa
                      kultuurikoda, Kai kunstikeskus, PRAXIS Mõttekoda, Von
                      Krahli Aed, jt.
                    </div>

                    <div className="info-item info-item-3">
                      Kompetents: Adobe Creative Cloud, Figma, MailerLite,
                      Mailchimp
                      <div className="info-item info-item-4">
                        Veebilehe arendus: Karel Kranich
                      </div>
                    </div>

                    <div className="info-item info-item-5 computer-info-layout">
                      Henri Kutsar OÜ <div>Reg nr: 12224294</div>
                    </div>

                    <div className="info-item info-item-6 computer-info-layout">
                      <a href="tel:372-529-3741">+372 529 3741</a>{" "}
                      <div>
                        {" "}
                        <a href="mailto:info@henrikutsar.ee">
                          info@henrikutsar.ee
                        </a>
                      </div>
                    </div>

                    {/* MOBILE-INFO-MODAL-LAYOUT */}
                    <div className="mobile-info-layout">
                      <div className="info-item info-item-5">
                        Henri Kutsar OÜ <div>Reg nr: 12224294</div>
                      </div>

                      <div className="info-item info-item-6">
                        <a href="tel:372-529-3741">+372 529 3741</a>{" "}
                        <div>
                          <a href="mailto:info@henrikutsar.ee">
                            info@henrikutsar.ee
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </>
    );
  }
}

export default infoModal;
