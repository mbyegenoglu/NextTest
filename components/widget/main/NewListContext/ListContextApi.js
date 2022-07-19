import { create } from 'domain'
import React from 'react'
import { createContext,useContext } from 'react'

const MainContext = createContext()


export {
  MainContext,
  useContext
}
