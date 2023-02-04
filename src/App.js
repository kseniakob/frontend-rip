import { Route, Routes, Link } from "react-router-dom";
import {Homepage}  from './pages/Homepage';
import { GoodPage } from './pages/Goodpage';
import { NotFoundpage } from './pages/NotFoundpage';
import  {Departmentpage} from "./pages/Departmentpage";
import {Cartpage}  from './pages/Cartpage';

import React, {useEffect, useReducer, useState} from "react";
import OrderPage from "./pages/OrderPage";
import { store } from './store/store';
import { Provider } from 'react-redux';


export const OrderContext = React.createContext({});

export function  reducer(state, action){
    switch (action.type) {
        case 'guest':
            return {
                ...state,
                ...action.payload
            }
        case 'login':
            return { }

    }
}

function App() {

    const [order, setOrder] = useState([])
    const [goods, setGoods] = useState()
    const [goods_in_orders, setGoodsInOrders] = useState()
    const [state, dispatch] = useReducer(reducer,'quest')
    const [filtred_goods, setFiltred_Goods]=useState()
    const [searchTerm, setSearchTerm]=useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/goods/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGoods(data);
            })
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/order_item/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGoodsInOrders(data);


            })
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/filtred_goods/?search='+searchTerm+'&min_price=100&max_price=700')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setFiltred_Goods(data);
            })
    }, [])


  return (
      <>
        <OrderContext.Provider value ={{order, setOrder, goods, setGoods, goods_in_orders, setGoodsInOrders, filtred_goods, setFiltred_Goods, searchTerm, setSearchTerm}}>
            <header className="header_bar">
                <Link to="/" >Главная</Link>
                <Link to="/orders">Заказы</Link>
                <Link to="/cart">Корзина</Link>
            </header>
            <header>
                <h1>Добро пожаловать в наш строительный магазин!</h1>
            </header>

            <hr />
            <div>
                <Routes>
                    <Route path="/" element={<GoodPage/>} />
                    <Route path="/cart" element={<Cartpage  />} />
                    <Route path="/orders" element={<OrderPage />}/>
                    <Route path="/catalog/:id" element={<Departmentpage />}/>
                    <Route path="/goods" element={<GoodPage />}/>
                    <Route path="*" element={<NotFoundpage />}/>
                </Routes>
            </div>
        </OrderContext.Provider>
      </>
  );
}

export default App;
