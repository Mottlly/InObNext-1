import React from "react";
import SpeedDial from "./SpeedDial";
import FormDialog from "./LoginPop";
import CreateAccount from "./CreateUser";
import styles from "../styles/topBar.module.scss";

export default function TopBar() {
  return (
    <div className={styles.topbarparent}>
      <SpeedDial />
      <FormDialog />
      <CreateAccount />
    </div>
  );
}
