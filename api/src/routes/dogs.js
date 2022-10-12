const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getApiB, getDbBreeds, post, getBreeds } = require('../controllers');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

// || // || // || // || // || // GET DOG // || // || // || // || // || // || // || // || //
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

// || // || // || // || // || // GET DOG ID// || // || // || // || // || // || // || // || //
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const breeds = await getBreeds();
    if (id) {
      const filtrados = await breeds.filter((e) => e.id == id);
      filtrados.length
        ? res.status(200).json(filtrados)
        : res.status(404).send("Raza no encontrada por ID");
    }
  });

// || // || // || // || // || // || POST  || // || // || // || // || // || // || // || //
router.post("/", async (req, res) => {
    const {
      name,
      height,
      weight,
      life_span,
      temperaments,
      image,
    } = req.body;
  
    const createDog = await Dog.create({
      name:name,
      height: height,
      weight: weight,
      life_span: life_span,
      image: image,
      temperament: temperaments,
      
    });
   if(createDog){
  res.status(200).json(createDog);
   }else{
     res.status(500).send('uncreated dog')
   }
});


module.exports = router;