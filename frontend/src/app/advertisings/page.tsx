import React from "react";

const Advertisings = async () => {
  const advs = await fetch(`${process.env.API_URL}`);
  return <div></div>;
};

export default Advertisings;
