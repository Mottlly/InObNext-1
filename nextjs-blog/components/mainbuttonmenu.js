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
        <FullscreenOverlay imageUrl="/cog.png" />
        <ImageButton imageUrl="/Copyright.png" href="/credits" />
      </div>
    </>
  );
}

export default MainMenuButtons;
