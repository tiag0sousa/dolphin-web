const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT ||3001;

app.use(cors());
app.use(express.json());

app.post('/chat/stable', async (req, res) => {

    try {

        const response = await axios
            .post('http://openai-poc-recommendations.westeurope.cloudapp.azure.com/v1/chat', req.body);

        res.send(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error accessing external API -> ChatAPI stable');
      }

});

app.post('/chat/exploratory', async (req, res) => {
  
  try {

    const response = await axios
        .post('http://34.123.16.98:8001/v1/chat', req.body);

    res.send(response.data);

} catch (error) {
    console.error(error);
    res.status(500).send('Error accessing external API -> ChatAPI exploratory');
  }
});

app.post('/searchProducts', async (req, res) => {
  
    try {

      // Get token:
      const tokenUrl = 'https://api.farfetch.net/ext/auth/connect/token'
  
      const headers = {
        'Host': 'api.farfetch.net',
        'Connection': 'close',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Content-Length': '110',
        'User-Agent': 'dolphin-project-ios/1.0 (iPhone; iOS 16.4.0; Scale/1.00)'
      };

      const data = {
        'grant_type': 'GuestUser',
        'client_id': '19AB83A37D804711ACDBCFA643FE435D',
        'client_secret': '051C96F59D8248429CF582FD55E892CE'
      };

      const tokenResponse = await axios.post(tokenUrl, data, { headers });

      const productIds = req.body.productIds

      const url = 'https://api.farfetch.net/v1/search/products?sort=requestProductsIds&fields=gender,brand,quantity,priceWithoutDiscount,labels,promotionPercentage,id,categories,currencyIsoCode,images,merchantId,price,shortDescription,priceType,tag,type&page=1&contextFilters=priceType:0&categories=ne:141257&imagesSizes=480&pageSize=40&id=' + productIds
      
      const response = await axios
          .get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'FF-Currency': 'USD',
                  'FF-Country': 'US',
                  'Accept-Language': 'en-US',
                  'Authorization': 'Bearer ' + tokenResponse.data.access_token
                }
          });

      // Enviando a resposta da API externa como a resposta para a solicitação GET na nossa API
      res.send(response.data);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error accessing external API -> ECAPI');
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
