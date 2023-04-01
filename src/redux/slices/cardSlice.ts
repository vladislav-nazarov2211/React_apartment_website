import { createSlice } from '@reduxjs/toolkit'
import { initialCardStateType } from '../../types/types'

let favorites = (sessionStorage.getItem("favorites"))

const initialState: initialCardStateType = {
    currentCard: null,
    isFetching: false,
    favoritesArray: (favorites === null ? [] : JSON.parse(sessionStorage.getItem("favorites") || ''))
}

const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        setCurrentCard (state, action) {
            state.currentCard = action.payload
        },
        fetchingCard(state, action) {
            state.isFetching = action.payload
        },
        toggleFavorites(state, action) {
            let flag: boolean = false
            const saveToSessionStorage = () => {
                sessionStorage.setItem("favorites", JSON.stringify([...state.favoritesArray]))
            }
            const addItem = () => {
                state.favoritesArray = state.favoritesArray.concat({...action.payload})
                saveToSessionStorage()
            }
            if (state.favoritesArray.length != 0) {
                for (let item = 0; item < state.favoritesArray.length; item++) {
                    if (state.favoritesArray[item].id == action.payload.id) {
                        flag = false
                        state.favoritesArray = state.favoritesArray.filter((element) => {
                            return element.id != action.payload.id 
                        })
                        saveToSessionStorage()
                        break
                    } else {
                        flag = true
                    }
                }
                if (flag) {
                    addItem()
                }
            } else {
                addItem()
            }           
        } 
    }     
})

export const { setCurrentCard, fetchingCard, toggleFavorites } = cardSlice.actions
export default cardSlice.reducer

      
