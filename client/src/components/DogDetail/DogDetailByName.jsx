import React from "react";
import { getDogByName, removeSelectedDog } from "../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DogCard from "../Card/card";
import s from "./DogDetailByName.module.css";

export const DogDetailByName = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const dog = useSelector((state) => state.dog);
  // console.log(dog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogByName(name));
    return () => {
      dispatch(removeSelectedDog())
  }
  }, [dispatch, name]);

  if (typeof dog.error === "string") {
    return (
      <div>
        <p>No se encontró un perro con ese nombre.</p>
      </div>
    );
  } else {
    return (
      <div className={s.dogsContainer}>
        {dog.length > 0 ? (
          dog.map((el) => (
            <DogCard
              image={el.image.url}
              name={el.name}
              temperament={el.temperament}
              weight={el.weight}
              id={el.id}
              key={el.id}
            />
          ))
        ) : (
          <h1>Cargando</h1>
        )}
      </div>
    );
  }
};

export default DogDetailByName;