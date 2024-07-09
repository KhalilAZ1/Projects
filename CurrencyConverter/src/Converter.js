import React from 'react'

export default function Converter(props) {
    const {rates, currency, setCurrency, amount, setAmount} = props

    return (
        <div>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>  
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {Object.keys(rates).map(rate => (<option key={rate} value={rate} >{rate}</option>))}
            </select>  
        </div>
    )
}