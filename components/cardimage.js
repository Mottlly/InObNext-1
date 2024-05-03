import React from "react";
import Image from "next/image";

const CardImage = ({ imageUrl }) => {
  return (
    <div>
      <Image
        src={imageUrl}
        alt="event_image"
        layout="responsive"
        width={100}
        height={100}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CardImage;
