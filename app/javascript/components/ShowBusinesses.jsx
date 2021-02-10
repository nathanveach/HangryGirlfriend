import React from "react";
import RandomBusiness from "./RandomBusiness";
import TitleBody from "./TitleBody";
import AllBusinesses from "./AllBusinesses";

const ShowBusinesses = (props) => {
  const { businesses } = props.businesses;
  if (businesses == undefined) {
    return <TitleBody />;
  } else {
    if (props.showAll) {
      return <AllBusinesses businesses={businesses} />;
    } else {
      return <RandomBusiness businesses={businesses} />;
    }
  }
};

export default ShowBusinesses;
