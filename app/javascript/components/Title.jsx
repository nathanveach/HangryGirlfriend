import React from "react";

const Title = (props) => {
  return (
    <div className="my-3 text-center logo">
      <a onClick={props.onClick}>
        <img src="https://i.ibb.co/JK14mVn/image-2.png" className="img-fluid" />
        <hr className="w-75 bg-danger custom-hr" />
      </a>
    </div>
  );
};

export default Title;
