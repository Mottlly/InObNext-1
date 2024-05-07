import React from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "../styles/imagebutton.module.scss";

const ImageButton = ({ imageUrl, href }) => {
  return (
    <Link href={href}>
      <div className={Styles.Imagebutt}>
        <Image
          src={imageUrl}
          alt="Link Icon"
          layout="responsive"
          width={100}
          height={100}
          style={{ width: "100%" }}
        />
      </div>
    </Link>
  );
};

export default ImageButton;
