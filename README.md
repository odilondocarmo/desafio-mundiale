***Desafio Mundiale***

O desafio proposto é basicamente efetuar uma busca no site mercadolivre.com.br e retornar alguns dados seguindo o padrão:


Request - um POST onde no body contem um JSON onde search é o termo da busca e o limit é a quantidade de registros maximos.

Request: *{*
    *"search": String,*
    *"limit": Int*
*}*

Response - O resposta deve ser um vetor, contendo no máximo o "limit" especificado na request, onde cada posição desse vetor contém:
    "name" - Nome do produto
    "link" - Link do produto
    "price" - Valor do produto
    "store" - Nome da loja
    "state" - Estado do produto

Response: *[*
    *{*
        *"name": String,*
        *"link": String,*
        *"price": Number,*
        *"store": String,*
        *"state": String*
    *}*
*]*

***Estratégia***

Para criar esse crawler, são utilizadas as bibliotecas:
    *EXPRESS para lidar com as requisições e as respostas,*
    *CHEERIO para tratar a pagina de destino,*

As rotas são controladas pelo arquivo: ./src/routes.js
O servidor e seus parâmetros são controlados pelo arquivo: ./src/server.js
Toda a lógica será colocada no controller: ./src/controllers/CrawlerMercadoLivreController.js

A requisição para o mercado livre é feita de forma nativa (sem libs), para evitar que o projeto fique desnecessáriamente maior, assim como toda a validação de entrada.

Versão do nodeJS utilizada: v12.14.1