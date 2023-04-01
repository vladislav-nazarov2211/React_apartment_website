import { apartament } from "../types/types"
import { CardItem } from "./CardItem"

type propsType = {
    arrayToRender: Array<apartament> 
}

export const Cards: React.FC<propsType> = ({arrayToRender}) => {

    return (
        <div className="cards-wrapper">
            <div className="container p-0 pt-5">
                <div id="listingContainer" className="row">    
                    {arrayToRender.map((item: apartament) => {
                        return <CardItem key={item.id} item={item} /> 
                    })} 
                </div>
            </div>
        </div>
    )
}