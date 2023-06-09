import React from "react";
import "../styles/components/card.css";

// import { Navigate } from "react-router-dom";

export default function Card({ mealicon, title, fn, data, fn1 }) {
  // Mealsdata(data);

  const setmeal = () => {
    fn(data);
    fn1(true);
  };

  return (
    <div className="mealscon">
      <img
        className="mealsimg"
        src={mealicon}
        alt=""
        onClick={() => setmeal()}
      />
      <p>{title}</p>
    </div>
  );
}
