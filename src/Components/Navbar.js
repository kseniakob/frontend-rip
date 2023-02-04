import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useEffect, useReducer, useState} from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import {reducer} from "../App";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";


function NavBar(props) {

    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, '')

    return (
        <Navbar class="navbar navbar-dark bg-dark" >
            <Container>
                <Navbar.Brand href="/">Строительный магазин</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="navbar-text">
                       <a className="navbar-link" href="/cart">
                         Корзина
                       </a>
                    </div>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/orders">Заказы</Nav.Link>
                    </Nav>
                    <div className="navbar pull-right">
                        <Nav.Link href="/cart">Корзина</Nav.Link>

                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export {NavBar};