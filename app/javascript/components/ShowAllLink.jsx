import React from "react";

const ShowAllLink = (props) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-link text-danger emergency-link"
        onClick={props.onClick}
      >
        <b>IN CASE OF EMERGENCY HIT THIS LINK!!! (SHOW ALL)</b>
      </button>
    </div>
  );
};

export default ShowAllLink;
