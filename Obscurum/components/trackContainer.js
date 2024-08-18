import React from "react";
import Head from "next/head";
import HealthBar from "./healthbar";
import styles from "../styles/trackcontainer.module.scss";
import BuildIcon from "@mui/icons-material/Build";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SpaIcon from "@mui/icons-material/Spa";

export default function TrackContainer({
  healthOne,
  healthTwo,
  healthThree,
  healthFour,
}) {
  return (
    <>
      <Head>
        <title>Health Bar Tracker</title>
      </Head>
      <div id="trackcontaineractual" className={styles.healthcontainer}>
        <div className={styles.healthItem}>
          <HealthBar health={healthOne} />
          <BuildIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthTwo} />
          <HealthAndSafetyIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthThree} />
          <SentimentSatisfiedAltIcon />
        </div>
        <div className={styles.healthItem}>
          <HealthBar health={healthFour} />
          <SpaIcon />
        </div>
      </div>
    </>
  );
}