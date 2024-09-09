import React from "react";
import Head from "next/head";
import HealthBar from "./HealthBar";
import styles from "../styles/trackContainer.module.scss";
import BuildIcon from "@mui/icons-material/Build";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SpaIcon from "@mui/icons-material/Spa";

export default function TrackContainer({
  healthOne,
  healthTwo,
  healthThree,
  healthFour,
  setGameOver,
}) {
  return (
    <>
      <Head>
        <title>Health Bar Tracker</title>
      </Head>
      <div id="trackcontaineractual" className={styles.healthcontainer}>
        <div className={styles.healthItem}>
          <HealthBar health={healthOne} setGameOver={setGameOver} />
          <BuildIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthTwo} setGameOver={setGameOver} />
          <HealthAndSafetyIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthThree} setGameOver={setGameOver} />
          <SentimentSatisfiedAltIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthFour} setGameOver={setGameOver} />
          <SpaIcon />
        </div>
      </div>
    </>
  );
}
