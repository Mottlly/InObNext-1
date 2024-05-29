import React from "react";
import Head from "next/head";

const CreditsContainer = ({ headertext, text }) => {
  return (
    //need a parent container/element
    <>
      <div id="namediv">
        <p>{headertext}</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </>
  );
};

export default CreditsContainer;
