import React, { useState } from 'react'
import { MainContext } from './ListContextApi'

export default function ListContextApiFooter() {

  const [theme, setTheme] = useState('Light');

  const data = {
    theme,
    setTheme
  }


  return (
      <MainContext.Provider value={data}>

      </MainContext.Provider>
  )
}
