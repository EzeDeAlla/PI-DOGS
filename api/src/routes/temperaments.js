const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Temperament } = require('../db')
const { getTemperaments } = require('../controllers/index')



router.get('/', async (req, res) =>{
    let temperaments = await getTemperaments();
   
    temperaments.sort().forEach((element) => {
        Temperament.findOrCreate({
            where: { name: element },
        });
    });

    let t = await Temperament.findAll()
    res.send(t)
});





module.exports = router;