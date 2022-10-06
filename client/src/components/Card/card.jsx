import React from "react";
import { Link } from "react-router-dom";
import s from "./card.module.css";

export const Card = (props) => {
  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <div className={s.div}>
          <span>{props.name}</span>
          <img src={props.image} alt="Imagen del perro." className={s.img} />
          <div className={s.divTemperamento}>     
              <p> {props.temperament}</p>            
          </div>
          <p>Peso: {props.weight} </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;