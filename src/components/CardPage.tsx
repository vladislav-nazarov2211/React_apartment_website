import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store/store"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCurrentCard } from "../redux/actions/actions"
import { Preloader } from "../common/preloader/Preloader"
import { toggleFavorites } from "../redux/slices/cardSlice"
import { apartament } from "../types/types"
import { Modal } from "./Modal"

export const CardPage = () => {
    const location = useParams()
    const ID = location.id 
    const dispatch = useDispatch<AppDispatch>()
    const obj = useSelector((state: RootState) => state.cards.currentCard)
    const isFetching = useSelector((state: RootState) => state.cards.isFetching)
    const favorite: apartament | undefined = useSelector((state: RootState) => state.cards.favoritesArray).find((item) => (item.id).toString() == ID) 
    const [activeModal, setActiveModal] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchCurrentCard(ID))
    }, [])

    function openModal() {
        setActiveModal(true)
    }

    return (
        <>
            {isFetching ? 
                <div className="preloader__position2">
                    <Preloader />
                </div> 
            :
            <>
                <div className="cardItem container p-0 pt-5">
                    <div className="heading-1">
                        {obj?.title}, {obj?.square} м2 за {obj?.price_total} ₽ 
                    </div>

                    <div className="object">
                        <div className="object__photo">
                            <div className="object__photo-wrapper">
                                <img src={obj?.image} alt="" />
                            </div>
                        </div>
                        <div className="object__desc">
                            <div className="object__desc-sector">
                                ЖК {obj?.complex_name} 
                            </div>

                            <div className="object__desc-name">
                                <div className="object__desc-title">
                                {obj?.title}, ${obj?.square} м2 
                                </div>
                                <div className="object__desc-art">
                                    {obj?.scu} 
                                </div>
                                <button onClick={() => {dispatch(toggleFavorites(obj))}} id="addToFavouriteBtn" 
                                    className={`button-favourite ${favorite ? 'button-favourite--active' : ''}`}>
                                    <i className="fas fa-heart"></i> 
                                    <span>
                                        {favorite ? 'В избранном' : 'В избранное'}
                                    </span>
                                </button>

                            </div>

                            <div className="object__desc-details">
                                <div className="params">
                                    <div className="params__item">
                                        <div className="params__definition">Корпус</div>
                                        <div className="params__value">
                                            {obj?.building} 
                                        </div>
                                    </div>
                                    <div className="params__item">
                                        <div className="params__definition">Этаж</div>
                                        <div className="params__value">
                                            {obj?.floor} 
                                        </div>
                                    </div>
                                    <div className="params__item">
                                        <div className="params__definition">Номер</div>
                                        <div className="params__value">
                                            {obj?.flat_number} 
                                        </div>
                                    </div>
                                    <div className="params__item">
                                        <div className="params__definition">Комнат</div>
                                        <div className="params__value">
                                            {obj?.rooms} 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="details">
                                <div className="details__row">
                                    <div className="details__name">Стоимость</div>
                                    <div
                                        className="details__value details__value--price"
                                    >
                                    {obj?.price_total} ₽ 
                                    </div>
                                </div>
                                <div className="details__row">
                                    <div className="details__name">Цена за м2</div>
                                    <div className="details__value">
                                        {obj?.price_sq_m} ₽/м2 
                                    </div>
                                </div>
                                <div className="details__row">
                                    <div className="details__name">Площадь</div>
                                    <div className="details__value">
                                        {obj?.square} м2 
                                    </div>
                                </div>
                            </div>

                            <button onClick={openModal} className="button-order">Забронировать</button>
            
                        </div>
                        
                    </div>
                </div>

                {activeModal ? <Modal obj={obj} setActiveModal={setActiveModal} /> : null}

                <div className="container p-0">
                    <a href="/" className="back-to-results"
                        >← Вернуться к результатам поиска
                    </a>
                </div> 
            </>  
            }
        </>
    )
}