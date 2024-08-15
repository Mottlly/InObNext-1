import React, { useEffect, useState } from "react";
import styles from "../styles/healthbar.module.scss";

const HealthBar = ({ health }) => {
  const [prevFilledSections, setPrevFilledSections] = useState(health);
  const [flashClass, setFlashClass] = useState("");

  const calculateFilledSections = (health) => Math.max(0, Math.min(10, health));

  useEffect(() => {
    const currentFilledSections = calculateFilledSections(health);
    const prevFilled = calculateFilledSections(prevFilledSections);

    if (currentFilledSections > prevFilled) {
      setFlashClass(styles.flashGreen);
    } else if (currentFilledSections < prevFilled) {
      setFlashClass(styles.flashRed);
    } else {
      setFlashClass("");
    }

    setPrevFilledSections(health);

    // Remove flash class after animation ends
    const timer = setTimeout(() => setFlashClass(""), 500); // Adjust duration as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [health]);

  return (
    <div className={`${styles.healthBar} ${flashClass}`}>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={`${styles.healthSection} ${
            index >= 10 - calculateFilledSections(health) ? styles.healthy : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default HealthBar;
