import React, { useEffect } from "react";
import styles from "../styles/healthbar.module.scss";

const HealthBar = ({ health }) => {
  useEffect(() => {
    // This will log whenever the health prop changes
    console.log("Health changed to:", health);
  }, [health]);

  return (
    <div className={styles.healthBar}>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={`${styles.healthSection} ${
            index >= 10 - health ? styles.healthy : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default HealthBar;
