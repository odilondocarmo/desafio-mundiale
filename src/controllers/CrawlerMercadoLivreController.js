const LoadPageData = require('../utils/LoadPageData');

class CrawlerMercadoLivreController{
    async index(req, res) {
        const {search, limit} = req.body;

        // Request validation - verify if body format is correct
        if(!search || !limit) return res.json({error: "Invalid request. 'search' and 'limit' is required!"})
        if(typeof search != 'string') return res.json({error: "search must be a String"});
        if(!Number.isInteger(limit)) return res.json({error: "limit must be an Integer"});
        
        let itemsArray = [];
        let data = null;
        do{
            data = await LoadPageData.load(search, itemsArray.length, limit);
            if(!data) break;
            itemsArray = itemsArray.concat(data);
        }while(data && itemsArray.length < limit)
        
        return res.json(itemsArray.length);
    }
}

module.exports = new CrawlerMercadoLivreController();