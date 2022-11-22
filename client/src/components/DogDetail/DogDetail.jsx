import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDog, removeSelectedDog } from "../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from './DogDetail.module.css'
import { Link } from "react-router-dom";


export default function Detail(){
    const { id }= useParams();
    const dogDetail = useSelector((e)=>e.dog);
    console.log(dogDetail);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDog(id));
        return () => {
            dispatch(removeSelectedDog())
        }
    }, [dispatch, id]);

    return (
        <div>
            <div className={s.paginado}>
                <Link to= "/home">
                <button className={s.boton4}>Home</button>
                </Link>
            </div>
                {dogDetail.length > 0 
                ? (
                <main className={s.paginado2}>
                    <div>
                        <div >
                            
                            <img className={s.imagdetalle} src={dogDetail[0].image} alt= "no tiene imagen"/>
                        </div>
                    </div>
                    <div className={s.cardDetalle}>
                        <div>
                            <h1>{dogDetail[0].name}</h1>
                        </div>
                        <div className={s.base3}>
                            <h4>Temperament:</h4>
                            <p>{dogDetail[0].temperament}</p>
                        </div>
                        <div className={s.base3}>
                            <h4>Height:</h4>
                            <p>{dogDetail[0].height}</p>
                        </div >
                        <div className={s.base3}>
                            <h4>Weight:</h4>
                            <p>{dogDetail[0].weight}</p>
                        </div>
                        <div className={s.base3}>
                            <h4>Life Span</h4>
                            <p>{dogDetail[0].life_span}</p>  
                        </div>
                    </div>
                </main>
                ) : (
              <h1>Cargando ...</h1>
                )}
        </div>
    )
}