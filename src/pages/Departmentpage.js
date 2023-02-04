import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, map} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import image from './image.jpg';




const Departmentpage  = () => {

    const {id} = useParams();

    const [goods, setGoods] = useState([]);

    const goodsFiltred = () =>{
        return goods.filter(item => item.id_department == id);
    }

    const goodsFiltr = goodsFiltred()



    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/goods/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setGoods(data);
            })
    }, [])


    return (
        <>
            <div className="container">
                <h2> Вы можете заказать товары: </h2>
            </div>
            <div className="container" >
                <Row xs={4} md={4} className="g-4">
                    {goodsFiltr.map((item, index)=>{
                        return<Col >
                            <Card key={index} className="card">
                                <Card.Img className="cardImage" variant="top" src={item.image} height={200} width={100}  />
                                <Card.Body>
                                    <div  className="home">
                                        <Card.Text>
                                            <Card.Title><h2>{item.name_good}</h2>  </Card.Title>
                                            Цена: {item.price} рублей
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    })}
                </Row>
            </div>
        </>
    );
}

export {Departmentpage}