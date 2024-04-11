import React from "react";
import Image from "next/image";
import Link from "next/link";

const ImageButton = ({ imageUrl, href }) => {
  return (
    <Link href={href}>
      <Image src={imageUrl} alt="Link Icon" width={100} height={100} />
    </Link>
  );
};

export default ImageButton;
