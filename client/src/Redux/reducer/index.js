import {
  GET_ALL_DOGS,
  GET_DOG,
  CREATE_DOG,
  GET_TEMPERAMENTS,
  GET_DOG_BY_NAME,
  FILTER_BY_API_DB,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "../actions/index";

const initialState = {
  dog: {},
  dogs: [],
  allDogs: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
      };

    case CREATE_DOG:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case GET_DOG_BY_NAME:
      return {
        ...state,
        dog: action.payload,
      };
    case FILTER_BY_API_DB:
      const allDogs = state.allDogs;
      let apiDbFiltered = [];
      if (action.payload === "Todos") {
        apiDbFiltered = allDogs;
      } else if (action.payload === "Creados") {
        apiDbFiltered = allDogs.filter((el) => el.createdInDb);
      } else {
        apiDbFiltered = allDogs.filter((el) => !el.createdInDb);
      }

      return {
        ...state,
        dogs: apiDbFiltered,
      };


      case FILTER_BY_TEMPERAMENT:
        const allTemps=state.allDogs;

        const all= action.payload==='all'?
         allTemps :
         allTemps.filter((e)=>e.temperament?.includes(action.payload));

        return{
            ...state,
            dogs: all,
        }
  
    case ORDER_BY_NAME:
      const allDogsFilterName = state.allDogs;
      let sortedArr;
      if (action.payload === "Nombre") {
        sortedArr = allDogsFilterName;
      } else {
        sortedArr =
          action.payload === "A-Z"
            ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
      }

      return {
        ...state,
        dogs: sortedArr,
      };

    case ORDER_BY_WEIGHT:
      const allDogsFilterWeight = state.allDogs;
      let sortedArrPeso;
      if (action.payload === "Peso") {
        sortedArrPeso = allDogsFilterWeight;
      } else {
        sortedArrPeso =
          action.payload === "Menor peso"
            ? state.dogs.sort(function (a, b) {
                if (
                  Number(a.weight.split(" ")[0]) >
                  Number(b.weight.split(" ")[0])
                ) {
                  return 1;
                }
                if (
                  Number(b.weight.split(" ")[0]) >
                  Number(a.weight.split(" ")[0])
                ) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (
                  Number(a.weight.split(" ")[0]) >
                  Number(b.weight.split(" ")[0])
                ) {
                  return -1;
                }
                if (
                  Number(b.weight.split(" ")[0]) >
                  Number(a.weight.split(" ")[0])
                ) {
                  return 1;
                }
                return 0;
              });
      }

      return {
        ...state,
        dogs: sortedArrPeso,
      };

      case 'FILTER_A_Z':
            const order= action.payload==='a-z'?
             state.dogs.sort((a,b)=>{
                 return a.name.localeCompare(b.name);
             }) : 
             state.dogs.sort((a,b)=>{
                 return b.name.localeCompare(a.name)
            });

            return{
                ...state,
                dogs: [...order],
            };

            case 'FILTER_BY_CREATED':
        var createdFilter=
        action.payload==='created' ?
        state.allDogs?.filter((e)=>e.createdInDb):
        state.allDogs?.filter((e)=>!e.createdInDb);

        if(action.payload==='all'){
            createdFilter= state.allDogs;
        }
        if(!createdFilter){
            return{
                ...state,
                error:{ created:true}
            }
        }

        return {
            ...state,
            dogs: createdFilter,
        }

        

    default:
      return state;
  }
};

export default rootReducer;