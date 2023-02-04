import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import OrderItem from "../Components/OrderItems";

function OrderPage() {

    const [orders, setOrders] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/orders/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setOrders(data);
            })
    }, [])



    return(
        <>
            <h1>Orders</h1>
            <div className="container">
                <Row xs={4} md={4} className="g-4">
                    {orders && orders.map((item, index)=>{
                        return<Col >
                            <Card key={index} className="card">
                                <Card.Body>
                                    <div  className="textStyle">
                                        <Card.Text>
                                            <Card.Title> <h2>{item.id_order}</h2> </Card.Title>
                                            ID покупателя {item.id_customer}
                                            <p>Дата заказа: {item.date_order} </p>
                                            <OrderItem id_order={item.id_order}></OrderItem>
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    })}
                </Row>
            </div>
        </>

    )
}
export default OrderPage;