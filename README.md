***Desafio Mundiale***

O desafio proposto é basicamente efetuar uma busca no site mercadolivre.com.br e retornar alguns dados seguindo o padrão:


Request - um POST onde no body contem um JSON onde search é o termo da busca e o limit é a quantidade de registros maximos.

Request:

*{*

 *"search": String,*

 *"limit": Int*
*}*

Response - O resposta deve ser um vetor, contendo no máximo o "limit" especificado na request, onde cada posição desse vetor contém:
    "name" - Nome do produto
    "link" - Link do produto
    "price" - Valor do produto
    "store" - Nome da loja
    "state" - Estado do produto

Response: 
*[*

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
*AXIOS para efetuar a coleta do HTML da pagina,* 
*CHEERIO para tratar a pagina de destino*

As rotas são controladas pelo arquivo: ./src/routes.js
O servidor e seus parâmetros são controlados pelo arquivo: ./src/server.js
Toda a requisição é tratada no controller: ./src/controllers/CrawlerMercadoLivreController.js
Toda a lógica de tratamento dos dados: ./src/utils/LoadPageData.js

**Suporte à multiplas páginas**

Este script possui suporte à multiplas páginas de forma dinâmica, basta digitar um valor acima do limite de paginas (48 normalmente) e ele vai conseguir efetuar a busca, entretanto pode não ser performático, devido ao método de coleta de dados (via crawler). Para coletar 49 items, a pagina é carregada 2x.
Seguindo a logica de CEIL(48 / Quantidade de Items).
Não realizei análises de complexidade do algoritmo para verificar a possibilidade de melhoria no próprio código.
Nos testes, para uma consulta:
48 itens -> 1.8 segundos;
100 itens -> 5.9 segundos;
480 itens -> 16.7 segundos;

Versão do nodeJS utilizada: v12.14.1

Libs:
"axios": "^0.19.2",
"cheerio": "^1.0.0-rc.3",
"express": "^4.17.1"