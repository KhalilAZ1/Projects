import React, { useEffect, useState } from 'react';
import Converter from './Converter'

function App() {
  const apiUrl = 'https://openexchangerates.org/api/latest.json'
  const apiKey = '02f8a01dcac74e70ac40ad2d1e82d795'

  const baseCurrency = 'USD'
  const targetCurrency = 'EUR'

  const urlSpecific = `${apiUrl}?app_id=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`
  const url = `${apiUrl}?app_id=${apiKey}&base=${baseCurrency}`

  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState('AED')
  const [toCurrency, setToCurrency] = useState('AED')
  const [fromAmount, setFromAmount] = useState(1)
  const [toAmount, setToAmount] = useState(1)
  const [fromAmountChanged, setFromAmountChanged] = useState(false)

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setRates(data.rates)
    })
  }, [])

  useEffect(() => {
    let rate = rates[toCurrency]/ rates[fromCurrency]
    if(fromAmountChanged) {
      setFromAmount(fromAmount)
      setToAmount(fromAmount * rate)
    } else {
      setToAmount(toAmount)
      setFromAmount(toAmount / rate)
    }
  },[toCurrency, fromCurrency, fromAmount, toAmount, fromAmountChanged])

  useEffect(() => {
    setFromAmountChanged(true)
  }, [fromCurrency, fromAmount])
  
  useEffect(() => {
    setFromAmountChanged(false)
  }, [toCurrency, toAmount])

  const CurrencyList = ({ rates }) => {
    return (
      <div>
        {Object.keys(rates).map((rate, index) => (
          <div key={index}>
            {rate}: {rates[rate]}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <h1> Converter </h1>
      <Converter rates={rates} currency={fromCurrency} setCurrency={setFromCurrency} amount={fromAmount} setAmount={setFromAmount}/>
      <h2> = </h2>
      <Converter rates={rates} currency={toCurrency} setCurrency={setToCurrency} amount={toAmount} setAmount={setToAmount} />
      <div> 
        <br></br>
        <br></br>
        - Exchange rates with base USD : 
        <br></br>
      </div>
      <CurrencyList rates={rates} />
    </>
  );
}

export default App;