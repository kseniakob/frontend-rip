import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {OrderContext} from "../App";


function NameGoodsOrder(props) {


    const [filtredGoods, setFiltredGoods]= useState()
    const {goods, goods_in_orders, setGoodsInOrders} = useContext(OrderContext)
    const toname_goods = goods
    console.log(props)


    const goodsFiltred = () =>{

        const filtr_name =toname_goods.filter(item => item.id_good === props.id_good)
        console.log('name_good',filtr_name[0].name_good)

        return filtr_name[0].name_good

    }
    const goodsFiltr = goodsFiltred()




    return(
        <>
            {goodsFiltr}
        </>

    )
}
export default NameGoodsOrder;