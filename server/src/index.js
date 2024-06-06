const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurrencies', async(req, res) => {
  const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=66f584c7ecbd4f28831a7c5043b633e8`;

  try{

    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;

    return res.json(nameData);

  }catch(error){
    console.log(error);
  }
});

//get the target amount
app.get('/convert', async(req, res) => {
  const{
    date,
    sourceCurrency,
    targetCurrency,
    amountInSourceCurrency,
  }= req.query;

  try{
    const dataUrl=`https://openexchangerates.org/api/historical/${date}.json?app_id=66f584c7ecbd4f28831a7c5043b633e8`;

    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    //rate of source currency
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));


  }catch(error){
    console.log(error);
  }
});

//listen to port 5000
app.listen(5000, () => {
  console.log('SERVER STARTED ON PORT 5000');
});