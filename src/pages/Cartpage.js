import React, {useContext, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import { OrderContext } from "../App";
import { useReducer} from "react";
import {reducer} from "../App";


function Cartpage() {

    const {order, setOrder, goods, setGoods} = useContext(OrderContext)


    const ClearCart =()=>{
        setOrder([])
    }

    const DeleteItem =async(id_good) =>{
        try {

        } catch (err) {

        }
    }


    return (
        <div className="container mx-auto font-mono">

            <div className="flex justify-center flex-col align-middle">

                <div>
                    {order && order.map(item => (

                        <div className="blog-preview" >
                            <h2>{item.name_good}</h2>
                            <p>Осталось на складе: {item.amount} </p>
                            <p >Цена: {item.price} рублей</p>
                        </div>))}

                </div>
            </div>
           <Button onClick={ClearCart}>Оформить заказ</Button>

        </div>
    );
}

export {Cartpage};
