import React from "react";
import Head from "next/head";
import HealthBar from "../components/healthbar";
import styles from "../styles/trackcontainer.module.scss";

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
        <HealthBar health={healthOne} />
        <HealthBar health={healthTwo} />
        <HealthBar health={healthThree} />
        <HealthBar health={healthFour} />
      </div>
    </>
  );
}
