const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getApiB, getDbBreeds, post } = require('../controllers');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
// si no funciona poner cambiar por: //// router.get('/', async (req, res) => { ////
router.get('', async (req, res) => {
    let {name} = req.query;
    
    if(!name){

        const breeds = await getApiB();
        const breedsDb = await getDbBreeds();
        const allBreeds = breeds.concat(breedsDb);

        res.send(allBreeds);
    } else {
        try {
            const apiReturn = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            var breeds = []
            apiReturn.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    breeds.push({
                        id: e.id,
                        image: e.image,
                        name: e.name,
                        temperament: e.temperament,
                        weight: e.weight.metric
                    })
                }
            });
            if (breeds.length>0){
                const breedsDb = await Dog.findAll({where: {name: name}});
                if (breedsDb){
                    let allBreeds = [...breeds,...breedsDb]
                    return res.send(allBreeds)
                }
                return res.send(breeds)
            } else {
                const breedsDb = await Dog.findAll({where: {name: name}});
                if (breedsDb) {
                    res.send(breedsDb)
                } else return res.status(404).send(`No results found four your search (${name})`)
            }
        } catch (error) {
            console.log('Error', error)
        }
    }
})


router.get('/:idRaza', async (req, res) => {
   try {
       const { idRaza } = req.params;
       const allDogs = await getApiB();
       if (!idRaza) {
           res.status(404).json("Couldn't find the name on DBase")
       } else {
           const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
           res.status(200).json(dog)
       }
   } catch (error) {
       res.status(404).send(error)
   }
})


router.post('/', async (req, res) =>{

    let {image, name, height, weight, temperament} = req.body;

    if(!name || !height || !weight || !image){
        res.status(400).send('Necessary data missing')
    }
    else{
        try{
            const dog = await Dog.create({
                image: image,
                name: name,
                height: height ,
                weight: weight,
            });
            
            if(temperament){
                temperament.forEach(async e => {
                    const temper = await Temperament.findOne({
                        where: {
                            name: e
                        }
                    })
                    // await temper.addDog(dog);
                    await dog.addTemperaments(temper);
                });
            }
            res.send(dog);
        }
        catch(e){
            console.log('ERROR!!: ',e)
        }
    }
});


module.exports = router;