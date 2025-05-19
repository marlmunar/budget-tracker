import React from "react";

const HomeCard = ({ title, children }) => {
  return (
    <section className="mt-5">
      <h2 className="homecard-title">{title}</h2>
      {children}
    </section>
  );
};

export default HomeCard;
