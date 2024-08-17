import React from "react";
import SpeedDial from "./speeddial";
import FormDialog from "./loginpop";
import CreateAccount from "./createuser";
import styles from "../styles/topbar.module.scss";

export default function TopBar() {
  return (
    <div className={styles.topbarparent}>
      <SpeedDial />
      <FormDialog />
      <CreateAccount />
    </div>
  );
}
