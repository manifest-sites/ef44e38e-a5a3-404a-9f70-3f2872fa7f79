import { useState, useEffect } from 'react'
import Monetization from './components/monetization/Monetization'
import FernApp from './components/FernApp'

function App() {

  return (
    <Monetization>
      <FernApp />
    </Monetization>
  )
}

export default App