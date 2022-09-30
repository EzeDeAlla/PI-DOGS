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


export {
    getAllDogs,
}