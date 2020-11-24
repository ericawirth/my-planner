<<<<<<< HEAD
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
=======
import React from "react";

export default function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.title)}
    >
      <span>{props.title}</span>
    </button>
  );
}
>>>>>>> 23bd86203b4ba592698f022b2fbf66c704f4ab35
