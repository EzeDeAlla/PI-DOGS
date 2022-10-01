import {
    GET_ALL_DOGS,
    GET_DOG,
    GET_TEMPERAMENTS,
    GET_DOG_BY_NAME,
    FILTER_BY_API_DB,
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
} from '../actions/index'


const initialState = {
    dog: {},
    dogs: {},
    allDogs: [],
    temperaments: [],
}


const rootReducer = (state = initialState, action) => {
    
}

export default rootReducer;