import React from "react";

export default function ImageButton(props) {
  return (
    <button>
      <img src={props.text} />
    </button>
  );
}
