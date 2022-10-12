import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const FILTER_BY_API_DB = "FILTER_BY_API_DB";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";



const getAllDogs = () => {
    return async function (dispatch) {
        try{
            var json = await axios.get('http://localhost:3001/dogs');
            return dispatch({
                type: GET_ALL_DOGS,
                payload: json.data
            })
        }
        catch(error){
            throw error;
        }
    }; 
};


const getTemperaments = () => {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/temperaments')
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data
            })
        }
        catch(error){
            throw error;
        }
    }
}

const getDog = (id) => {
    return async (dispatch) => {
        let json = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_DOG,
            payload: json.data
        });
    };
};

const getDogByName = (name) => {
    return async (dispatch) => {
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: json.data
            })
    }
}

const filterByApiDb = (payload) => {
    return {
      type: FILTER_BY_API_DB,
      payload,
    };
};

const filterByTemperament = (payload) => {
    return {
      type: FILTER_BY_TEMPERAMENT,
      payload,
    };
};

const orderByName = (payload) => {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
};

const orderByWeight = (payload) => {
    return {
      type: ORDER_BY_WEIGHT,
      payload,
    };
};

const filterA_Z = (payload) => {
    return {
        type: 'FILTER_A_Z',
        payload,
    };
};

const filter_created = (payload) => {
    return {
        type: 'FILTER_BY_CREATED',
        payload,
    };
};

const postDogs =(payload)=>{
    return async function(){
        const create= await axios.post('http://localhost:3001/dogs',payload);
        return create;
    }
}




export {
    getAllDogs,
    getTemperaments,
    getDog,
    getDogByName,
    filterByApiDb,
    filterByTemperament,
    orderByName,
    orderByWeight,
    filterA_Z,
    filter_created,
    postDogs,
}