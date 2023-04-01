import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store/store"
import { apartament } from "../types/types"
import { toggleFavorites } from "./../redux/slices/cardSlice"

type propsType = {
    item: apartament
}

export const CardItem: React.FC<propsType> = ({item}) => {
    const dispatch = useDispatch<AppDispatch>()
    const favorite: apartament | undefined = useSelector((state: RootState) => state.cards.favoritesArray).find((i) => (i.id).toString() == item.id)

    function toggleFavor(e: any) {
        e.preventDefault()
        dispatch(toggleFavorites(item))
    }

    return (
        <div className="col-md-4">
            <NavLink to={`/cardItem/${item.id}`} className="card" data-id="${object.id}">
                <div className="card__header">
                    <div className="card__title">
                        {item.complex_name}
                    </div>
                    <div onClick={toggleFavor} className={`card__like ${favorite ? 'card__like--active' : ''}`}>
                        <i className="fas fa-heart"></i>
                    </div>
                </div>
                <div className="card__img">
                    <img src={item.image} alt="План квартиры" />
                </div>
                <div className="card__desc">
                    <div className="card__price">
                        <div className="card__price-total">
                            {item.price_total}
                        </div>
                        <div className="card__price-per-meter">
                            {item.price_sq_m} ₽/м2 
                        </div>
                    </div>

                    <div className="card__params params">
                        <div className="params__item">
                            <div className="params__definition">
                                Комнат
                            </div>
                            <div className="params__value">
                                {item.rooms}
                            </div>
                        </div>
                        <div className="params__item">
                            <div className="params__definition">
                                Площадь
                            </div>
                            <div className="params__value">
                                {item.square}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card__footer">
                    <div className="card__art">
                        {item.scu}
                    </div>
                    <div className="card__floor">
                        Этаж {item.floor} из ${item.floors_total}
                    </div>
                </div>
            </NavLink>
        </div>
    )
}