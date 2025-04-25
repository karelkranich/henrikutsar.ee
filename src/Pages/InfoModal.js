import React from "react";
import { motion } from "framer-motion";
import hkIcon from "../images/HK-icon.jpg";

function infoModal({ open, close }) {
  const BACKGROUND_BLUR = {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  };

  if (!open) {
    document.querySelector("body").style.overflow = "unset";
    return null;
  } else {
    document.querySelector("body").style.overflow = "hidden";
    return (
      <div
        style={BACKGROUND_BLUR}
        className="info-overlay-styles"
        onClick={() => {
          close();
        }}
      >
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(0%)" }}
          transition={{ duration: 0.12, ease: "easeInOut" }}
        >
          <div
            className="info-content-styles"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="info-content-styles"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="desktop-modal-container">
                <div className="modal-flex-container">
                  <div className="image-container">
                    <img src={hkIcon} alt="HK Icon" className="rounded-image" />
                  </div>

                  <div className="content-container">
                    <div className="text-content-block">
                      Kliente & koostööpartnereid: Eesti Kunstiakadeemia, Kai
                      kunstikeskus, Miina Härma Gümnaasium, MOMU Mootorispordi
                      Muuseum, PRAXIS Mõttekoda, Re-Imagine Europe, Tallinna
                      Kunstihoone, Tartu Elektriteater, Tütar galerii,
                      Vana-Võromaa kultuurikoda, Von Krahli Aed, Võru Kesklinna
                      Kool, Võru Linnavalitsus, jt.
                    </div>

                    <div class="credentials-content-block">
                      <div class="first-block">
                        <div class="first-credentials-block">
                          <div>Henri Kutsar Disain OÜ</div>
                          <div>Reg nr: 16330461</div>
                        </div>

                        <div class="second-credentials-block">
                          <div>
                            <a href="tel:372-529-3741">+372 529 3741</a>
                          </div>
                          <div>
                            <a href="mailto:info@henrikutsar.ee">
                              info@henrikutsar.ee
                            </a>
                          </div>
                          <div>
                            <a href="https://www.instagram.com/henrikutsardesign/">
                              Instagram
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="second-block">
                        <div class="developed-by-block">
                          <a href="mailto:karelkranich@gmail.com">
                            Veebilehe arendus: Karel Kranich
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobile-grid-container">
              <div className="first-block">
                <div className="image-container">
                  <img src={hkIcon} alt="HK Icon" className="rounded-image" />
                </div>
                <div className="content-container">
                  <div>
                    <div>Henri Kutsar Disain OÜ</div>
                    <div>Reg nr: 16330461</div>
                  </div>

                  <div>
                    <a href="tel:372-529-3741">+372 529 3741</a>
                    <a href="mailto:info@henrikutsar.ee">info@henrikutsar.ee</a>
                    <a href="https://www.instagram.com/henrikutsardesign/">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              <div className="second-block">
                <div>
                  Kliente & koostööpartnereid: Eesti Kunstiakadeemia, Kai
                  kunstikeskus, Miina Härma Gümnaasium, MOMU Mootorispordi
                  Muuseum, PRAXIS Mõttekoda, Re-Imagine Europe, Tallinna
                  Kunstihoone, Tartu Elektriteater, Tütar galerii, Vana-Võromaa
                  kultuurikoda, Von Krahli Aed, Võru Kesklinna Kool, Võru
                  Linnavalitsus, jt.
                </div>
                <a href="karelkranich@gmail.com">
                  Veebilehe arendus: Karel Kranich
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default infoModal;
