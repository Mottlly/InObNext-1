import React from "react";
import Image from "next/image";
import ImageButton from "./imagebutton";
import FullscreenOverlay from "../components/transoverlay";

function MainMenuButtons() {
  return (
    <>
      <div id="mainbuttons" className="mainbuttons">
        <ImageButton imageUrl="/play.png" href="/maingame" />
        <ImageButton imageUrl="/burger.png" href="/homepage" />
        <ImageButton imageUrl="/Copyright.png" href="/credits" />
        <FullscreenOverlay imageUrl="/cog.png" />
      </div>
    </>
  );
}

export default MainMenuButtons;
