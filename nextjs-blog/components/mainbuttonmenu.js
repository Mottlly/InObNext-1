import React from "react";
import Image from "next/image";
import ImageButton from "./imagebutton";

function MainMenuButtons() {
  return (
    <>
      <div id="mainbuttons" className="mainbuttons">
        <ImageButton imageUrl="/play.png" href="/maingame" />
        <ImageButton imageUrl="/burger.png" href="/homepage" />
        <ImageButton imageUrl="/cog.png" href="nil" />
      </div>
    </>
  );
}

export default MainMenuButtons;
