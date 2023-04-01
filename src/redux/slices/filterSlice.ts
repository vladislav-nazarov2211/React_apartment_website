import { createSlice } from '@reduxjs/toolkit'
import { initialFilterStateType } from '../../types/types'

const initialState: initialFilterStateType = {
    initialFilter: null,
    queryFilterArray: [],
    isFetching: false,
    cardsCount: null,
    fetchingQuery: false,
}

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        fetching(state, action) {
            state.isFetching = action.payload
        },
        setFilter(state, action) {
            state.initialFilter = action.payload
        },
        setQueryFilter(state, action) {
            state.queryFilterArray =  action.payload
            state.cardsCount = state.queryFilterArray.length
        }, 
        fetchingQuery(state, action) {
            state.fetchingQuery = action.payload
        },
    }  
})

export const { setFilter, fetching, setQueryFilter, fetchingQuery } = filterSlice.actions
export default filterSlice.reducer