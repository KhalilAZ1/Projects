import React, { useState, useRef, useEffect } from 'react';

function App() {
    const [state, setState] = useState(() => {return {count : 0, color : "blue"}})
    const count = state.count

    function dec () {
      setState(prevState => {
        return {...prevState, count : prevState.count - 1}
      })
    } 
    function inc () {
      setState(prevState => {
        return {...prevState, count : prevState.count + 1}
      })
    } 

    return (
      <>
        <button onClick={dec}> - </button>
        <span> {count} </span>
        <button onClick={inc}> + </button>
      </>
    )
  }

export default App;