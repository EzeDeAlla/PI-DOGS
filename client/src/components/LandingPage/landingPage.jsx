import React from "react";
import { Link } from "react-router-dom";
import s from "./landinPage.module.css";

export const LandingPage = () => {
  return (
    <div className={s.div}>
      <div className={s.contentText}>
        <h1 className={s.title}>DOGS PI</h1>
      <h2>Welcome to the dog characteristics page</h2>
      <Link to='/home' >
          <button className={s.buttonStart}>
            <span>Get Into</span>
          </button>
      </Link>
      </div>
    </div>
  );
};

export default LandingPage;