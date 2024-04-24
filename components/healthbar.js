import React, { useState } from "react";
import styles from "../styles/healthbar.module.scss";

const HealthBar = () => {
  const [health, setHealth] = useState(10);

  return (
    <div className={styles.healthBar}>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={`${styles.healthSection} ${
            index < health ? styles.healthy : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default HealthBar;
