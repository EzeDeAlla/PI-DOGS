import React from "react";
import { useDispatch } from "react-redux";
import { filter_created } from "../../Redux/actions/index";
import styles from './filters.module.css'

const FilterByCreated = ({setPage})=> {
    const dispatch = useDispatch();

    const handleFilterByCreated= (e)=>{
        e.preventDefault();
        dispatch(filter_created(e.target.value));
        setPage(1);
    };

    return (
        <div className={styles.filterCreated}>
            <label htmlFor=''>Filter by Created</label>
                <select onChange={handleFilterByCreated}>
                        <option value= 'all'>All Dogs</option>
                        <option value= 'created'>Created Dogs</option>
                        <option value= 'api'>Existing Dogs</option>
            </select>
        </div>
    );

};

export default FilterByCreated;