const {Router, json} = require('express');
const CrawlerMercadoLivreController = require('./controllers/CrawlerMercadoLivreController');

const routes = new Router();

routes.use(json());
routes.post('/search', CrawlerMercadoLivreController.index);

module.exports = routes;