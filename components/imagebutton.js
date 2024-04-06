import React from "react";
import Image from "next/image";

const ImageButton = ({ imageUrl }) => {
  return (
    <button>
      <Image src={imageUrl} alt="settings cog" width={100} height={100} />
    </button>
  );
};

export default ImageButton;
