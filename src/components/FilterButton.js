import React from "react";

export default function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.taskName)}
    >
      <span>{props.taskName}</span>
    </button>
  );
}
