import React, { useEffect, useState } from 'react';

const CurrencyTable = () => {
  const [rates, setRates] = useState([]);
  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

  useEffect(() => {
    fetch(`https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const currencyRates = currencies.map(currency => {
          const rate = parseFloat(data.rates[currency]);
          return {
            currency,
            weBuy: (rate * 1.05).toFixed(4),
            exchangeRate: rate.toFixed(4),
            weSell: (rate * 0.95).toFixed(4),
          };
        });
        setRates(currencyRates);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={index}>
            <td>{rate.currency}</td>
            <td>{rate.weBuy}</td>
            <td>{rate.exchangeRate}</td>
            <td>{rate.weSell}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
