import React, { useState } from "react";
import styles from "../styles/healthbar.module.scss";

const HealthBar = () => {
  const [health, setHealth] = useState(10);

  const handleClickUp = () => {
    setHealth(health + 1);
  };

  const handleClickDown = () => {
    setHealth(health - 1);
  };

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
      <button onClick={handleClickUp}>{"Up"}</button>
      <button onClick={handleClickDown}>{"Down"}</button>
    </div>
  );
};

export default HealthBar;
