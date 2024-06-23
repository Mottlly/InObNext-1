import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/transoverlay.module.scss";

const FullscreenOverlay = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navWidth, setNavWidth] = useState("0%");

  const openNav = () => {
    setNavWidth("100%");
    setIsOpen(true);
  };

  const closeNav = () => {
    setNavWidth("0%");
    setIsOpen(false);
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="Open Fullscreen Overlay"
        onClick={openNav}
        width={100}
        height={100}
      />
      {isOpen && (
        <div id="myNav" className={styles.overlay} style={{ width: navWidth }}>
          <a
            href="javascript:void(0)"
            className={styles.closebtn}
            onClick={closeNav}
          >
            &times;
          </a>
          <div className={styles.overlaycontent}>
            <p>Hello, I am a fullscreen overlay!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullscreenOverlay;
