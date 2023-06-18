export interface initialFilterStateType {
    initialFilter: filterType | null
    queryFilterArray: Array<apartament>
    isFetching: boolean
    cardsCount: number | null
    fetchingQuery: boolean
}

export interface apartament {
    id: string
    scu: string
    title: string
    complex_name: string
    square: string
    price_sq_m: string
    price_total: string
    building: string
    floor: string
    floors_total: string
    rooms: string
    flat_number: string
    image: string
}

export interface filterType {
    priceMin: string
    priceMax: string
    squareMin: string
    squareMax: string
    complexNames: string[]
    roomValues: string[]
    currentComplex: string,
    currentRoom: []
}

export interface inputsType {
    priceMin: string
    priceMax: string
    squareMin: string
    squareMax: string
    complexNames: string[]
}

export interface initialCardStateType {
    currentCard: apartament | null
    isFetching: boolean
    favoritesArray: Array<apartament> 
}

export interface initialBidStateType {
    isFetching: boolean
    bidsArray: Array<bidType>
    isFetchingBids: boolean
}

export type bidType = {
    id: string
    name: string
    phone: string
}