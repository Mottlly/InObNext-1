import React from "react";

export default function imageButton(props) {
  return (
    <button>
      <img src={props.text} />
    </button>
  );
}
