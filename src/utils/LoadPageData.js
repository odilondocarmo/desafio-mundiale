const axios = require('axios');
const cheerio = require('cheerio');

class LoadPageData{
    async load(search, currLength, limit){
        // verificar se o tamanho atual é maior que o limite, caso verdadeiro, sai da função retornando Null
        if(currLength > limit){
            console.log('Verify the currLength configuration.')
            return null;
        }
        /* Caso o tamanho atual seja zero, não é necessário alterar a busca,
        caso contrário, a busca é alterada para o valor atual + 1, se for inferior ao limite
        A sintaxe da busca caso seja superior ao valor da pag. [Busca]_Desde_[currLength+1]*/
        if(currLength > 0) {
            search = `${search}_Desde_${
                currLength + 1 < limit ? currLength + 1 : limit
            }`;
        }
        const mlURL = `https://lista.mercadolivre.com.br/${search}`;
        const {data : body} = await axios(mlURL);
        const fullPage = cheerio.load(body);
        if(!fullPage('#searchResults')) return res.status(500).json({error: "There are no ads that match your search."});
        const $ = cheerio.load(fullPage('#searchResults').html());
        
        return $('.results-item').map(function (index, element){
            const itemValue = `${$(this)
                .find('div.rowItem .item__info .item__price .price__fraction')
                .text()
                .trim()}.${$(this)
                    .find('div.rowItem .item__info .item__price .price__decimals')
                    .text()
                    .trim()}`;
            let store = $(this)
                .find('div.rowItem a .item__brand-title-tos')
                .text()
                .replace('por ', '')
                .trim();
            let state = $(this)
                .find('div.rowItem .item__info .item__condition')
                .text()
                .trim();
            if(state === '') state = null;
            if(store === '') store = null;
            const item = {
                name: $(this)
                    .find('div.rowItem .item__info .item__title')
                    .text()
                    .trim(),
                link: $(this)
                    .find('div.rowItem a')
                    .attr('href'),
                price: Number.parseFloat(itemValue),
                store,
                state,
            }
            return item;
        }).toArray().slice(0,limit - currLength);
    }
}

module.exports = new LoadPageData();
