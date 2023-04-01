import { createSlice } from '@reduxjs/toolkit'
import { initialBidStateType } from '../../types/types'


const initialState: initialBidStateType = {
    isFetching: false,
    bidsArray: [],
    isFetchingBids: false
}

const bidsSlice = createSlice({
    name: 'bidsSlice',
    initialState,
    reducers: {
        fetchingAddBid(state, action) {
            state.isFetching = action.payload
        },
        fetchingBids(state, action) {
            state.isFetchingBids = action.payload
        },
        setBids(state, action) {
            state.bidsArray = action.payload
        },
    }     
})

export const { fetchingAddBid, fetchingBids, setBids } = bidsSlice.actions
export default bidsSlice.reducer

      
