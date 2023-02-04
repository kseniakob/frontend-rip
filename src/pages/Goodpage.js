import React, {useState, useEffect, useContext} from "react";
import {Card, Col, Row, Button, Spinner, map} from "react-bootstrap";
import {Link} from "react-router-dom";
import image from './image.jpg';
import { OrderContext } from "../App";


const filterGoods = (searchText, goods) => {
    if (!searchText) {
        return goods;
    }
    return goods.filter(({ name_good }) =>
        name_good.toLowerCase().includes(searchText.toLowerCase())
    );
}



function GoodPage() {

    const [fgoods, setfGoods] = useState();
    const [data, setData]=useState();
    const [item, setItem]= useState([]);
    const [err, setErr]= useState();
    const [minTerm, setMinTerm]=useState();
    const [maxTerm, setMaxTerm]=useState();



    const Filtr = async (text, min, max) => {
        try{
            if (searchTerm!==undefined){
                await fetch('http://127.0.0.1:8000/hardware_store/filtred_goods/?search='+text+'&min_price='+min+'&max_price='+max+'')
                    .then(res => {
                        return res.json();
                    })
                    .then(async data => {
                        await setFiltred_Goods(data);
                    })
            }
            else {
                console.log('null searchterm', searchTerm)
                setSearchTerm("")
                setMinTerm("")
                setMaxTerm("")
                 await fetch('http://127.0.0.1:8000/hardware_store/filtred_goods/?search='+""+'&min_price='+""+'&max_price=')
                    .then(res => {
                        return res.json();
                    })
                    .then(async data => {
                         await setFiltred_Goods(data);
                    })

            }
        } catch (err) {
            setErr(err.message());
        }


    }

    const {order, setOrder, goods, setGoods, filtred_goods, setFiltred_Goods, searchTerm, setSearchTerm} = useContext(OrderContext)

    const PostOrder = async (item)=> {

        if (!order[0]){
            try {
                const current = new Date();
                const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`
                const response = await  fetch('http://127.0.0.1:8000/hardware_store/orders/', {
                    method: 'POST',
                    body: JSON.stringify({
                        id_customer: 1,
                        date_order: date
                    }),
                    headers: {
                        'Content-Type':'application/json',
                        Accept: 'application/json',
                    },
                }).then( res => res.json()).
                then( data =>{
                        const response_item =   fetch('http://127.0.0.1:8000/hardware_store/order_item/', {
                        method: 'POST',
                        body: JSON.stringify({
                            id_order: data.id_order,
                            id_good: item,
                            amount: 1
                        }),
                        headers: {
                            'Content-Type':'application/json',
                            Accept: 'application/json',
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                        },
                    });
                        setData(data)
                    console.log('id_data',data.id_order)


                } );
                if (!response.ok){
                    throw new Error (`Error! Status ${response.status}`);
                }

            } catch (err) {
                setErr(err.message());
            }

        } else {}

    }

    const PostItemsOrder = async (item)=>{
        console.log(item)
        try {
            const response_item = await  fetch('http://127.0.0.1:8000/hardware_store/order_item/', {
                method: 'POST',
                body: JSON.stringify({
                    id_order: data.id_order,
                    id_good: item,
                    amount: 1
                }),
                headers: {
                    'Content-Type':'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
            });
            if (!response_item.ok){
                throw  new Error (`Error! Status ${response_item.status}`);
            }
            const result_item = await response_item.json();
            console.log('result is: ', JSON.stringify(result_item, null, 4));


        } catch (err) {
            setErr(err.message());
        }
    }
    const NullFilter = () => {

        const e =' '

        setSearchTerm(e)
        setMaxTerm(e)
        setMinTerm(e)
        console.log('allterms', searchTerm, maxTerm, minTerm, e)
        Filtr()
    }


    const addToOrder = (item) => {

        setOrder([...order, item]);
        console.log(order)

    }

    const setIdOrder = (result) => {
        setData(result)
    }


    useEffect(() => {
        const Debounce = setTimeout(() => {
            if (searchTerm==="")
            {
                setfGoods(goods);
            } else {
            const filteredGoods = filterGoods(searchTerm, goods);
            setfGoods(filteredGoods);
            }
        }, 300);

        return () => clearTimeout(Debounce);
    }, [searchTerm]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/hardware_store/filtred_goods/?search=&min_price=&max_price=')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setFiltred_Goods(data);
            })
    }, [])

    const HandleSearchName = (e) => {
        console.log(e.target.value)
        setSearchTerm(e.target.value)
        const text = e.target.value
        Filtr(text, minTerm, maxTerm)

    }
    useEffect(()=>{

    }, [searchTerm])
    const HandleSearchMin = (e) => {
        console.log(e.target.value)
        setMinTerm(e.target.value)
        const min = e.target.value
        Filtr(searchTerm, min, maxTerm)

    }
    const HandleSearchMax = (e) => {
        console.log(e.target.value)
        setMaxTerm(e.target.value)
        const max = e.target.value
        Filtr(searchTerm, minTerm, max)

    }







    return (

        <div className="container mx-auto font-mono">
            <div ><h2>Введите товар, который хотите найти</h2></div>
            <div className="flex justify-center flex-col align-middle">
                <input

                    type="text"
                    autoComplete="off"
                    placeholder="Поиск товара по названию"
                    onChange={(e) => {
                        HandleSearchName(e)
                        }}
                    className="w-100 text-stone-900 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-sm py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mx-auto"
                    srtyle={{
                        width: '600px',
                    }}
                />
                <input

                    type="text"
                    autoComplete="off"
                    placeholder="Товары ценой от"
                    onChange={(e) => {
                            HandleSearchMin(e)
                    }}
                    className="w-10 direction:rtl display:flex text-stone-900 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-sm py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mx-auto"
                    srtyle={{
                        width: '600px',
                    }}
                />
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Товары ценой до"
                    onChange={(e) => {
                        HandleSearchMax(e)
                    }}
                    className="w-10 display:flex direction:rtl text-stone-900 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-sm py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mx-auto"
                    srtyle={{
                        width: '600px',
                    }}
                />

                <div>Вот, что нам удалось найти:</div>




                <div className="container">
                    <Row xs={4} md={4} className="g-4">

                        {filtred_goods && filtred_goods.map((item, index)=>{
                            return<Col >
                                <Card key={index} className="card">
                                    <Card.Img className="cardImage" variant="top" src={item.image} height={200} width={100}  />
                                    <Card.Body>
                                        <div  className="textStyle">
                                            <Card.Text>
                                                <Card.Title> <h2>{item.name_good}</h2> </Card.Title>
                                                Цена: {item.price} рублей
                                                <p>Осталось на складе: {item.amount} </p>
                                            </Card.Text>
                                        </div>
                                        <div className="cardButton">
                                            <Button className="cardButton" onClick={() => {addToOrder(item); PostOrder(item.id_good); PostItemsOrder(item.id_good)}}> Оформить заказ </Button>
                                       </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                        })}
                    </Row>
                </div>
                <br></br>

            </div>
        </div>
    );
}

export {GoodPage};