import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchFilter, fetchQueryFilter } from "../redux/actions/actions"
import { AppDispatch, RootState } from "../redux/store/store"
import { useState } from "react"
import { Preloader } from "../common/preloader/Preloader"
import { apartament, inputsType } from "../types/types"
import { Cards } from "./Cards"


export const Filter = () => {
    const dispatch = useDispatch<AppDispatch>()
    const initialFilter = useSelector((state: RootState) => state.filter.initialFilter)
    const isFetching = useSelector((state: RootState) => state.filter.isFetching)
    const cardsCount = useSelector((state: RootState) => state.filter.cardsCount)
    const isFetchingQuery = useSelector((state: RootState) => state.filter.fetchingQuery)
    const queryFilterArray = useSelector((state: RootState) => state.filter.queryFilterArray)
    

    useEffect(() => {
        if (initialFilter === null) {
            dispatch(fetchFilter())
        }
    }, [])

    let initialObj: inputsType = {
        priceMin: initialFilter?.priceMin || '',
        priceMax: initialFilter?.priceMax || '',
        squareMin: initialFilter?.squareMin || '',
        squareMax: initialFilter?.squareMax || '',
        complexNames: initialFilter?.complexNames || []
    }

    useEffect(() => {
        setInputs(initialObj)
    }, [initialFilter])

    const [inputs, setInputs] = useState<inputsType>(initialObj)
    const [roomValues, setCheckedValues] = useState<string[]>([])

    function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    let complexName = initialFilter?.complexNames.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    function handleChange(e: any) {
        const {value, checked} = e.target
        if (checked) {
            setCheckedValues(prev => [...prev, value])
        } else (
            setCheckedValues(prev => {
                return [...prev.filter(skill => skill !== value)]
            })
        )
    }
    
    let rooms = initialFilter?.roomValues.map((item, index) => {
        return (
            <div key={index}>
                <input
                    onChange={handleChange}
                    id={item}
                    name="roomValues"
                    type="checkbox"
                    className="rooms__checkbox"
                    value={item}/>
                <label htmlFor={item} className="rooms__btn">{item}</label>
            </div>
        )
    })

    useEffect(() => {
        if (initialFilter) {
            dispatch(fetchQueryFilter(inputs, roomValues))
        }
    }, [inputs, roomValues])

    function reset() {
        setInputs(initialObj)
        setCheckedValues([])
    }

    const [arrayToRender, setArrayToRender] = useState<Array<apartament>>([])    
    function render(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        setArrayToRender(queryFilterArray)
    }

    return (
        <form id="filter-form" method="GET" className="container p-0">
            <div className="heading-1">Выбор квартир:</div>
            <div className="filter">
                {isFetching ? 
                    <div className="preloader__position1">
                        <Preloader />
                    </div>
                :
                    <>
                        <div className="filter__col">
                            <div className="filter__label">Выбор проекта:</div>
                            <select onChange={changeHandler} name="complexNames" id="" className="filter__dropdown">
                                <option value='all'>Все проекты</option>
                                {complexName}
                            </select>
                        </div>
                        <div className="filter__col rooms">
                            <div className="filter__label">Комнат:</div>
                            <div className="rooms__wrapper">
                                {rooms}
                            </div>
                        </div>
                        <div className="filter__col">
                            <div className="filter__label">Площадь:</div>
                            <div className="range__wrapper">
                                <label className="range">
                                    <div className="range__label">от</div>
                                    <input
                                        onChange={changeHandler}
                                        name="squareMin"
                                        min="0"
                                        type="number"
                                        className="range__input"
                                        placeholder=""
                                        value={inputs.squareMin}
                                    />
                                    <div className="range__value">м2</div>
                                </label>
                                <label className="range">
                                    <div className="range__label">до</div>
                                    <input
                                        onChange={changeHandler}
                                        name="squareMax"
                                        min="0"
                                        type="number"
                                        className="range__input"
                                        placeholder=""
                                        value={inputs.squareMax}
                                    />
                                    <div className="range__value">м2</div>
                                </label>
                            </div>
                        </div>
                        <div className="filter__col">
                            <div className="filter__label">Стоимость:</div>
                            <div className="range__wrapper">
                                <div className="range">
                                    <label className="range__label">от</label>
                                    <input
                                        onChange={changeHandler}
                                        type="number"
                                        name="priceMin"
                                        min="0"
                                        className="range__input range__input--price"
                                        placeholder=""
                                        value={inputs.priceMin}
                                    />
                                    <div className="range__value">₽</div>
                                </div>
                                <div className="range">
                                    <label className="range__label">до</label>
                                    <input
                                        onChange={changeHandler}
                                        type="number"
                                        name="priceMax"
                                        min="0"
                                        className="range__input range__input--price"
                                        placeholder=""
                                        value={inputs.priceMax}
                                    />
                                    <div className="range__value">₽</div>
                                </div>
                            </div>
                        </div> 
                    </>
                }                
            </div>
            <div className="filter__buttons">
                <button onClick={render} disabled={isFetchingQuery} className="filter__show">
                    {isFetchingQuery ?
                        <div className="preloader__position1">
                            <Preloader />
                        </div>
                    :
                    <>
                        Показать объекты {cardsCount} шт. 
                    </>
                    }
                </button>
                <button onClick={reset} className="filter__reset" type="reset">Сбросить фильтр</button>
            </div>

            <Cards arrayToRender={arrayToRender} />     

        </form>
    )
}