import React from "react";
import { Link } from "react-router-dom";
import s from "./landinPage.module.css";

export const LandingPage = () => {
  return (
    <div className={s.div}>
      <Link to="/home">
        <h1>home</h1>
      </Link>
    </div>
  );
};

export default LandingPage;