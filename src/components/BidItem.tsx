import { bidType } from "../types/types"

type propsType = {
    item: bidType
}

export const BidItem: React.FC<propsType> = ({item}) => {
    
    return (
        <div className="panel panel--no-hover">
            <div className="panel__bidid">{item.id}</div>
            <div className="panel__bidname">{item.name}</div>
            <div className="panel__bidphone">{item.phone}</div>
        </div>
    )
}