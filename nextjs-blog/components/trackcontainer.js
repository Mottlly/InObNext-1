import React from "react";
import Head from "next/head";
import HealthBar from "../components/healthbar";
import styles from "../styles/trackcontainer.module.scss";

export default function TrackContainer({
  healthone,
  healthtwo,
  healththree,
  healthfour,
}) {
  return (
    <>
      <Head>
        <title>Health Bar Tracker</title>
      </Head>
      <div id="trackcontaineractual" className={styles.healthcontainer}>
        <HealthBar health={healthone} />
        <HealthBar health={healthtwo} />
        <HealthBar health={healththree} />
        <HealthBar health={healthfour} />
      </div>
    </>
  );
}
