import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductListIndex from './Components/ProductList/ProductListIndex';
import AddItemIndex from './Components/AddItem/AddItemIndex';
import E404 from './Components/Common/E404';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css'
const RootContainer = document.getElementById('root');
const Body = document.getElementsByTagName('body')[0];
const root = ReactDOM.createRoot(RootContainer);
function App() {
    const [DarkMode, setDarkMode] = React.useState(localStorage.getItem("DarkMode") ? true : false);
    Body.className = DarkMode ? "DarkMode" : "";
    function toggleDark() {
        setDarkMode(prevDarkMode => !prevDarkMode)
        localStorage.setItem("DarkMode", DarkMode)
        console.log(DarkMode, localStorage.getItem("DarkMode"))
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={
                        <ProductListIndex DarkMode={DarkMode} toggleDark={toggleDark} />

                    }
                    />
                    <Route exact path='/addproduct' element={
                        <AddItemIndex DarkMode={DarkMode} toggleDark={toggleDark} />
                    }
                    />
                    <Route exact path='*' element={<E404 />} />
                </Routes>
            </Router>
        </>

    )
}

root.render(<App />);