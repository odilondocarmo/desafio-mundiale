const {Router, json} = require('express');
const cors = require('cors');
const CrawlerMercadoLivreController = require('./controllers/CrawlerMercadoLivreController');

const routes = new Router();

routes.use(cors());
routes.use(json());
routes.post('/search', CrawlerMercadoLivreController.index);

module.exports = routes;