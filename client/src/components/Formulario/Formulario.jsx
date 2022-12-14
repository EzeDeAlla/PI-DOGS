import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments} from "../../Redux/actions/index";
import { useState, useEffect } from "react";
import s from "./Formulario.module.css";
import { Link } from 'react-router-dom';
import imgP from '../../img/dallePerroFeliz.png';
import { validation } from './Validations';

export default function CreateDog() {
  const dispatch = useDispatch();
  const  allTemperaments= useSelector((e) => e.temperaments);

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlife_span: "",
    maxlife_span: "",
    image: "",
    temperaments: [],
    createdInBd: false,
  });
  const [errors, setErrors] = useState({});
console.log(errors);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors.name &&
        !errors.minHeight &&
        !errors.maxHeight &&
        !errors.minWeight &&
        !errors.maxWeight &&
        !errors.minlife_span &&
        !errors.maxlife_span){
      let crear = {
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        life_span: `${input.minlife_span} - ${input.maxlife_span} years`,
        image: input.image,
        temperaments: input.temperaments.join(", "),  
      };
      dispatch(postDogs(crear));
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minlife_span: "",
        maxlife_span: "",
        image: "",
        temperaments: [],
        createdInBd: true,
      });
      alert('Dog Create!!')} else {
        alert('completa los campos requeridos')
      }
  }
  console.log(errors)
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
          [e.target.name]: e.target.value,
      })
    )
  }

  function handleSelectTemperament(e) {
  if(!input.temperaments.includes(e.target.value)){
  
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  } 
   
  }
  function handleDelete(e) {
  
    e.preventDefault();
       setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e.target.innerText),
      
    });
  }

  return (
    <div className={s.fromPerfil}>
      <div >
        <div>
          
          <Link to="/home">
            <button className={s.boton5}>
              Home
            </button>
          </Link>
          <h1 className={s.titleForm}>Create Dog</h1>
        </div>
        <div className="">
          <form className={s.fromPerfil}>
          
            <div className="">
              <label className={s.title5}>Name:</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.name}</strong>

              <label className={s.title5}>Height min:</label>
              <input
                type="number"
                name="minHeight"
                value={input.minHeight}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minHeight}</strong>

              <label className={s.title5}>Height max:</label>
              <input
                type="number"
                name="maxHeight"
                value={input.maxHeight}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.maxHeight}</strong>

              <label className={s.title5}>Weight min:</label>
              <input
                type="number"
                name="minWeight"
                value={input.minWeight}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minWeight}</strong>

              <label className={s.title5}>Weight max:</label>
              <input
                type="number"
                name="maxWeight"
                value={input.maxWeight}
                onChange={(e) => handelChange(e)}
              ></input><br/><strong>{errors.maxWeight}</strong>

              <label className={s.title5}>Life span min:</label>
              <input
                type="number"
                name="minlife_span"
                value={input.minlife_span}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minlife_span}</strong>

              <label className={s.title5}>Life span max:</label>
              <input
                type="number"
                name="maxlife_span"
                value={input.maxlife_span}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.maxlife_span}</strong>

              <label name="image" className={s.title5}>
                Image:
              </label>
              <input
                name="image"
                value={input.image}
                placeholder='URL'
                onChange={(e) => handelChange(e)}
              ></input>

              <label className={s.title5} value="temperament" name="temperament">
                {" "}
                Temperaments:{" "}
              </label>
              <select
                className={s.boton5}
                onChange={(e) => handleSelectTemperament(e)}
              >
                <option>Temperaments</option>
                {allTemperaments &&
                  allTemperaments.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select><br/>

              {input.temperaments.map((nombre) => {
                return (
                  <div className={s.concatFiltro}>
                  <span key={nombre}>
                   
                    <button className={s.boton3} onClick={(nombre)=> handleDelete(nombre)}>
                      {nombre} 
                    </button>
                  </span>
                  </div>
                );  
              })}   
              
              <button
                className={s.boton5}
                type="submit"
                onClick={(e) => handleSubmit(e)}
              > Create new Dog
              </button>

            </div>
          </form>
        </div>
      </div>
      <div className={s.imgperfil}>
        <img className={s.imgP} src={imgP} alt="perfil" />
      </div>
    </div>
  );
}

