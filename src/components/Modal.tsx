import { useState } from "react"
import { apartament } from "../types/types"
import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from './../common/formatedInputvalue'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store/store"
import { fetchAddBid } from "../redux/actions/actions"
import { Preloader } from "../common/preloader/Preloader"


type propsType = {
    obj: apartament | null
    setActiveModal: (value: boolean) => void
}

export const Modal: React.FC<propsType> = ({setActiveModal, obj}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {register, formState: {errors}, handleSubmit} = useForm({mode: 'onBlur'})
    const isFetching = useSelector((state: RootState) => state.bids.isFetching)

    function closeModal(e: any) {
        if (e.target.closest('.modalWindow')) {
            return null
        } else {
            setActiveModal(false)
        }
    }

    const [inputs, setInputs] = useState({name: '', phone: ''})
    
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function onSubmit() {
        dispatch(fetchAddBid(inputs))
        setInputs({name: '', phone: ''})    
    }
   
    return (
        <div className="modal-wrapper" onClick={closeModal}>
            <div className="modalWindow">
                <div className="modal__header">
                    <div className="modal__title">
                        Заявка на бронирование
                    </div>
                    <div className="modal__details">
                        {obj?.title} в комплексе {`'${obj?.complex_name}'`} Дом {obj?.building}
                        <div className="modal__details-art">{obj?.scu}</div>
                    </div>
                </div>

                <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal__form-content">
                        <div className="formgroup">
                            <label
                                className="modal__form-input-label"
                                htmlFor="form-phone"
                            >
                                Имя
                            </label>
                            <input
                                {...register('name', {required: 'Введите Ваше имя!', pattern: {value: /^[а-яА-ЯёЁa-zA-Z\s]+$/, message: 'Имя должно содержать только буквы!'}, maxLength: {value: 35, message: 'Не более 35-ти символов!'}})}
                                onChange={changeHandler}
                                type="text"
                                id="form-name"
                                className="modal__form-input"
                                placeholder="Введите имя"
                                name='name'
                                value={inputs.name}
                            />
                            {errors?.name && <div className='nameError'>{errors.name.message?.toString()}</div>}
                        </div>
                        
                        <div className="formgroup">
                            <label
                                className="modal__form-input-label"
                                htmlFor="form-phone"
                            >
                                Телефон
                            </label>
                            <input                                
                                {...register('phone', {required: 'Введите Ваш телефон!', minLength: {value: inputs.phone[1] === '7' ? 18 : 17, message: 'Не корректный номер'}})} 
                                onChange={changeHandler}
                                onInput={onPhoneInput}
                                onKeyDown={onPhoneKeyDown}
                                onPaste={onPhonePaste}
                                type="tel"
                                id="form-phone"
                                className="modal__form-input"
                                placeholder="+7 (XXX) XXX-XX-XX"
                                name='phone'
                                value={inputs.phone}
                            />
                            {errors?.phone && <div className='phoneError'>{errors.phone.message?.toString()}</div>}
                        </div>
                        
                        <div className="formgroup formgroup--checkbox">
                            <input type="checkbox" id="policy" />
                            <label className="policy-text" htmlFor="policy">
                                Я согласен на обработку моих персональных
                                данных. С Политикой в отношении обработки
                                персональных данных ознакомлен и
                                согласен.
                            </label>
                        </div>
                    </div>
                    {isFetching ? 
                        <div className="preloader__position3">
                            <Preloader />
                        </div>
                    :
                        <input
                            className="modal__submit"
                            type="submit"
                            value="Отправить заявку"
                        />
                    }
                </form>
                <button onClick={() => {setActiveModal(false)}} className="modal__close">
                    Закрыть
                </button>
            </div>
        </div>
        
    )
}