const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');
let apiCache = require('apicache')

// Env vars 

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_BASE_NAME;
const API_BASE_VALUE = process.env.API_BASE_VALUE;
apiCache = apiCache.middleware

router.get('/' , apiCache('2 minutes'),async (req, res)=>{
   try {
    const params = new URLSearchParams({
        [API_KEY_NAME] : API_BASE_VALUE,
        ...url.parse(req.url,true).query
    })

    console.log(process.env.NODE_ENV);
    const apiRes = await needle('get' , `${API_BASE_URL}?${params}` )
    const data = apiRes.body

    res.status(200).json(data)
   } catch (error) {
    res.status(500).json(error)
   }
})

module.exports = router