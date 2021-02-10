import React from "react";

const ShowTerm = (props) => {
  return (
    <div>
      <br />
      <br />
      <h1 className="text-danger text-center">{props.term}</h1>
      <br />
      <br />
    </div>
  );
};

export default ShowTerm;
