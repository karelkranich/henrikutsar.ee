import React, { useState } from "react";
import InfoModal from "./InfoModal";
import { useTransition } from "react-spring";

export default function InfoContact() {
  const [isOpen, setIsOpen] = useState(false);

  const infoTransitions = useTransition(isOpen, null, {
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
    <div className="project-list-items project-info-contact-element">
      <div onClick={() => setIsOpen(true)}>INFO & KONTAKT</div>
      {infoTransitions.map(
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
  );
}
