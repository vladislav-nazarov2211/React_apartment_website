import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Preloader } from "../common/preloader/Preloader"
import { fetchBids } from "../redux/actions/actions"
import { AppDispatch, RootState } from "../redux/store/store"
import { bidType } from "../types/types"
import { BidItem } from "./BidItem"

export const Bids = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isFetching = useSelector((state: RootState) => state.bids.isFetchingBids)
    const bidsArray = useSelector((state: RootState) => state.bids.bidsArray)

    useEffect(() => {
        dispatch(fetchBids())
    }, [])

    return (
        <>
            {isFetching ? 
                <div className="preloader__position4">
                    <Preloader />
                </div>
            :   
                <>
                    <div className="container p-0 mb-5">
                        <div className="heading-1">Заявки</div>
                    </div>

                    <div className="panels-wrapper">
                        <div id="bidsHolder" className="container p-0">
                            {bidsArray.map((item: bidType) => {
                                return <BidItem key={item.id} item={item} /> 
                            })}
                        </div>
                    </div>
                </>
            }
        </>
    )
}