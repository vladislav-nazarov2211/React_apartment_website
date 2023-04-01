import { configureStore } from '@reduxjs/toolkit'
import bidsSlice from '../slices/bidsSlice'
import cardSlice from '../slices/cardSlice'
import filterSlice from '../slices/filterSlice'

export const store = configureStore({
    reducer: {
       filter: filterSlice, 
       cards: cardSlice,
       bids: bidsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch