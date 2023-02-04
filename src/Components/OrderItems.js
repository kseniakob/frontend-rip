import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {OrderContext} from "../App";
import NameGoodsOrder from "./NameGoodsOrder";


function OrderItem(props) {


    const [filtredGoods, setFiltredGoods]= useState()
    const {goods, goods_in_orders, setGoodsInOrders} = useContext(OrderContext)
    const fgoods = goods_in_orders
    const name_goods = goods
    console.log(props)


    const goodsFiltred = () =>{
        return(
            fgoods.filter(item => item.id_order === props.id_order)


        )
    }
    const goodsFiltr = goodsFiltred()

    const getNameGood =(id_good) =>{

        const filtr_name = name_goods.filter(item => item.id_good === 1)

        return filtr_name.name_good

    }
    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/order_item/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGoodsInOrders(data);


            })
    }, [])




    return(
        <>
            {goodsFiltr && goodsFiltr.map((item, index)=>{
                return (
                    <li><NameGoodsOrder id_good={item.id_good}/></li>
                )
            })}



        </>

    )
}
export default OrderItem;