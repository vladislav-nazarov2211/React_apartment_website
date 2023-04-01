import { NavLink } from "react-router-dom"

export const Header = () => {
    return(
        <div className="top-panel">
            <div className="top-panel__container">
                <div className="top-panel__title">
                    <NavLink to='/'>интернет магазин недвижимости</NavLink>
                </div>
                    <div className="top-panel__phone"><a href="tel:+8800557755">8 (800) 55-77-55</a></div> 

                <div className="top-panel__favourites">
                    <NavLink to="/favorites" className="btn-show-favourites mr-30">
                        <i className="fas fa-heart"></i> Избранное
                    </NavLink>

                    <NavLink to="/bids" className="btn-show-favourites">
                        <i className="fas fa-file-alt"></i> Заявки
                    </NavLink>
                </div>
            </div>
        </div>    
    )
}