// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';
import logo from '../../logo.svg';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get(
        `https://api.vatcomply.com/rates?base=${fromCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get('https://api.vatcomply.com/currencies');
        const currencyList = Object.keys(response.data).map((currencyCode) => ({
          code: currencyCode,
          name: response.data[currencyCode].name,
          symbol: response.data[currencyCode].symbol,
        }));
        setCurrencies(currencyList);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    getCurrencies();
  }, []);

  useEffect(() => {
    getExchangeRate(sourceCurrency, targetCurrency);
  }, [sourceCurrency, targetCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      const converted = amount * exchangeRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSourceCurrencyChange = (event) => {
    const newSourceCurrency = event.target.value;
    const newTargetCurrency = targetCurrency === newSourceCurrency ? sourceCurrency : targetCurrency;

    setSourceCurrency(newSourceCurrency);
    setTargetCurrency(newTargetCurrency);
    getExchangeRate(newSourceCurrency, newTargetCurrency);
  };

  const handleTargetCurrencyChange = (event) => {
    const newTargetCurrency = event.target.value;
    setTargetCurrency(newTargetCurrency);
    getExchangeRate(sourceCurrency, newTargetCurrency);
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Coinvert Logo" className="logo-img" />
        <h1 className="logo-text">Coinvert</h1>
      </div>
      <div className='section'>
      <div className="input-group">
        <label>
          Amount
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <label>
          From
          <select value={sourceCurrency} onChange={handleSourceCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </label>
        <label>
          To
          <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
            {currencies
              .filter((currency) => currency.code !== sourceCurrency)
              .map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
          </select>
        </label>
      </div>
      </div>
      <div>
        <button>Convert</button>
      </div>
      <div>
        <p>Converted Amount: {convertedAmount}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
