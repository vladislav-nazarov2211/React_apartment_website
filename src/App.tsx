import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './components/Filter';
import { CardPage } from './components/CardPage';
import { Cards } from './components/Cards';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import { Bids } from './components/Bids';

function App() {
	const favoritesArray = useSelector((state: RootState) => state.cards.favoritesArray)

	return (
		<div className="sticky-footer">
			<BrowserRouter>
				<Header />
					<Routes>
						<Route path='/' element={<Filter />}/>
						<Route path='/cardItem/:id' element={<CardPage />}/>
						<Route path='/favorites' element={<Cards arrayToRender={favoritesArray} />}/>
						<Route path='/bids' element={<Bids />}/>
					</Routes>  
				<Footer />
			</BrowserRouter>	
		</div>
	);
}

export default App;
