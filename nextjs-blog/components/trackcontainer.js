import React, { useState } from "react";
import Head from "next/head";
import HealthBar from "../components/healthbar";
import styles from "../styles/trackcontainer.module.scss";

export default function TrackContainer() {
  const [health, setHealth] = useState(5);
  return (
    <>
      <Head>
        <title>Health Bar Tracker</title>
      </Head>
      <div id="trackcontaineractual" className={styles.healthcontainer}>
        <HealthBar health={health} setHealth={setHealth} />
        <HealthBar health={health} setHealth={setHealth} />
        <HealthBar health={health} setHealth={setHealth} />
        <HealthBar health={health} setHealth={setHealth} />
      </div>
    </>
  );
}
