import React, { useState, useEffect } from 'react';
import './App.css';




function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,tether,solana,xrp,usdc,cardano,dogecoin,avalanche,tron,chainlink,polkadot');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Crypto Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Price (USD)</th>
            <th>24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map(crypto => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>${crypto.current_price}</td>
              <td>{crypto.price_change_percentage_24h.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

