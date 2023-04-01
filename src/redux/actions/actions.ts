import { AppDispatch } from './../../redux/store/store'
import axios from 'axios'
import { setFilter, fetching, setQueryFilter, fetchingQuery } from '../slices/filterSlice';
import { inputsType } from '../../types/types';
import { fetchingCard, setCurrentCard } from '../slices/cardSlice';
import { fetchingAddBid, fetchingBids, setBids } from '../slices/bidsSlice'

let axiosInstance = axios.create({
    baseURL: 'https://jsproject.webcademy.ru/'
})

export const fetchFilter = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetching(true))
            const response = await axiosInstance.get('/itemsinfo')
            dispatch(setFilter(response.data))
            dispatch(fetching(false))
        } catch (Error) {
            console.log('fetchFilter', Error)
        }
    }
}

export const fetchQueryFilter = (inputs: inputsType, checkedValues: string[]) => {
    let rooms = checkedValues.toString()
    let roomsStr = rooms == '' ? '' : `&rooms=${rooms}` 
    let complexStr: Array<string> | string

    if (Array.isArray(inputs.complexNames)) {
        complexStr = ''
    } else {
        complexStr = `complex=${inputs.complexNames}`
    }
      
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingQuery(true))
            const response = await axiosInstance.get(`/items?${complexStr}${roomsStr}&sqmin=${inputs.squareMin}&sqmax=${inputs.squareMax}&pricemin=${inputs.priceMin}&pricemax=${inputs.priceMax}`)
            dispatch(setQueryFilter(response.data))
            dispatch(fetchingQuery(false))
        } catch (Error) {
            console.log('fetchQueryFilter', Error)
        }
    }
}

export const fetchCurrentCard = (id: string | undefined) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingCard(true))
            const response = await axiosInstance.get(`/items/${id}`)
            dispatch(setCurrentCard(response.data))
            dispatch(fetchingCard(false))
        } catch (Error) {
            console.log('fetchCurrentCard', Error)
        }
    }
}

export const fetchAddBid = ({name, phone}: {name: string, phone: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingAddBid(true))
            const response = await axiosInstance.post(`/bidnew`, {
                "name": name,
                "phone": phone
            })
            if (response.data.message === 'Bid Created') {
                alert('Заявка успешно добавлена!')
            } else {
                alert('Заявку не удалось добавить!')
            }
            dispatch(fetchingAddBid(false))
        } catch (Error) {
            console.log('fetchAddBid', Error)
        }
    }
}

export const fetchBids = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingBids(true))
            const response = await axiosInstance.get(`/bids`)
            dispatch(setBids(response.data))
            dispatch(fetchingBids(false))
        } catch (Error) {
            console.log('fetchBids', Error)
        }
    }
}