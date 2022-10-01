import axios from 'axios';




const getAllDogs = () => {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost3001/dogs');
            return dispatch({
                type: 'GET_ALL_DOGS',
                payload: json.data
            })
        } 
        catch(error){
            throw error;
        }
    }
}


const getTemperaments = () => {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost3001/temperaments')
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        }
        catch(error){
            throw error;
        }
    }
}

const getDog = (id) => {
    return async function (dispatch) {
        try{
            var json = await axios.get(`http://localhost3001/dogs/${id}`)
            return dispatch({
                type: 'GET_DOG',
                payload: json.data
            })
        }
        catch(error) {
            throw error;
        }
    }
}

const getDogByName = (name) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost3001/dogs?name=${name}`)
            return dispatch({
                type: 'GET_DOG_BY_NAME',
                payload: json.data
            })
        }
        catch(error) {
            throw error;
        }
    }
}

const filterByApiDb = (payload) => {
    return {
      type: 'FILTER_BY_API_DB',
      payload,
    };
};

const filterByTemperament = (payload) => {
    return {
      type: 'FILTER_BY_TEMPERAMENT',
      payload,
    };
};

const orderByName = (payload) => {
    return {
      type: 'ORDER_BY_NAME',
      payload,
    };
};

const orderByWeight = (payload) => {
    return {
      type: 'ORDER_BY_WEIGHT',
      payload,
    };
};



export {
    getAllDogs,
    getTemperaments,
    getDog,
    getDogByName,
    filterByApiDb,
    filterByTemperament,
    orderByName,
    orderByWeight,
}