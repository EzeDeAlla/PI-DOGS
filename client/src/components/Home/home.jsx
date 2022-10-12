import React from "react";
import DogCard from "../Card/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  filterByApiDb,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../../Redux/actions/index";
import s from "./home.module.css";
import Pagination from "../Paginado/paginado";

export const Home = () => {
  const dogs = useSelector((state) => state.dogs);
  const temperamentos = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, []);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Filtrados
  const [orden, setOrden] = useState("");

  function handleFilterByApiDb(e) {
    dispatch(filterByApiDb(e.target.value));
  }

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={s.div}>
      <div className={s.divSelect}>
        <select onChange={(e) => handleFilterByApiDb(e)} className={s.select}>
          <option>Todos</option>
          <option>Creados</option>
          <option>Existentes</option>
        </select>
        <select
          onChange={(e) => handleFilterByTemperament(e)}
          className={s.select}
        >
          <option>Temperamentos</option>
          {temperamentos.map((el) => {
            return <option>{el.name}</option>;
          })}
        </select>
        <select onChange={(e) => handleSortName(e)} className={s.select}>
          <option>Nombre</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select onChange={(e) => handleSortWeight(e)} className={s.select}>
          <option>Peso</option>
          <option>Menor peso</option>
          <option>Mayor peso</option>
        </select>
      </div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          totalDogs={dogs.length}
          paginate={paginate}
        />
      </div>
      <div className={s.dogsContainer}>
        {dogs.length > 0 ? (
          currentDogs.map((el) => (
            <DogCard
              image={el.image}
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
    </div>
  );
};

export default Home;