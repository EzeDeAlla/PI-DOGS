require ('dotenv').config()
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db')
const axios = require('axios');
const router = require('../routes');

const getApiB = async () => {
    try{
        const apiReturn = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiBreeds = await apiReturn.data.map(e => {
            if(!e.weight.metric.includes('-')){
                if(e.weight.metric.includes('NaN')){
                    return {
                        id: e.id,
                        image: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        weight: `13 - 27`
                    }
                } else if (Number(e.weight.metric) !== NaN) {
                    return {
                        id: e.id,
                        image: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        weight: `1 - ${e.weight.metric}`
                    }
                }
            }
            return {
                id: e.id,
                image: e.image.url,
                name: e.name,
                temperament: e.temperament,
                life_span: e.life_span,
                weight: e.weight.metric, //error por no poner .metric, no se mostraba xq react no se que cosa con los cokponentes hijos ya que no accedia a .metric
                height: e.height.metric  //error por no poner .metric, no se mostraba xq react no se que cosa con los cokponentes hijos ya que no accedia a .metric
            }
        })
        return apiBreeds;
    } catch (error) {
        console.log('Error', error)
    }
}

const getDbBreeds = async () => {
    try {
        const dbBreeds = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        return dbBreeds;
    } catch {
        return 'No created dog founded'
    }
}

async function getTemperaments(){

    const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
    let temperaments = apiResult.data.map(e => e.temperament);
    temperaments = temperaments.join().split(",");
    
    let temp = temperaments.map((e) => {
        if(e[0] === ' '){
            return e.slice(1)
        }
        else{
            return e;
        }
    });
    return temp;
}





// const post = async (name, weight, height, life_span, temperament, image) => {
//     let newDog = await Dog.create({
//         name: name,
//         height: {metric: height},
//         weight: {metric: weight},
//         life_span: life_span,
//         image: image,
//     });
//     let TemperamentDB = await Temperament.findAll({
//         where: {name: temperament},
//     });

//     return await newDog.addTemperament(TemperamentDB);
// }

// si vas a usar lo de arriba no te olvies de exportarlo (:

module.exports = {
    getApiB,
    getDbBreeds,
    getTemperaments,
};