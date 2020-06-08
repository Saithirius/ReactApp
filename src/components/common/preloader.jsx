import React from "react";
import preloader from "../../assets/img/preloader.svg";
import s from "./preloader.module.css";

let Preloader = () => {
  return (
    <div className={s.preloader}>
      <img src={preloader} alt="" ></img>
    </div>
  );
};

export default Preloader;
