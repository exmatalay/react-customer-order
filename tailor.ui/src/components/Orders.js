import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Order from './Order'
import UserConsumer from "../context";

class Orders extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { orders } = value;
                        return (
                            <main className="flex-shrink-0 container py-3" >
                                <section className="py-5 text-center container">
                                    <div className="row py-lg-2">
                                        <div className="col-lg-6 col-md-8 mx-auto">
                                            <div className="d-grid gap-2">
                                                <form className="d-flex">
                                                    {
                                                        /* 
                                                        <select className="form-select" aria-label="Default select example">
                                                        {
                                                            orders.map(order => {
                                                                return (
                                                                    <option value={order.id}>{order.name}</option>
                                                                )
                                                            })
                                                        }
                                                        </select> 
                                                        */
                                                    }
                                                    <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                                                    <datalist id="datalistOptions" className="" style={{ color: "red", display: "block!important" }}>
                                                        {
                                                            orders.map(order => {
                                                                return (
                                                                    <option className="" value={order.name} style={{ color: "red!important" }}></option>
                                                                )
                                                            })
                                                        }
                                                    </datalist>
                                                    {
                                                        /* 
                                                        <input className="form-control me-2 form-control-lg" type="search" placeholder="Search" aria-label="Search" /> 
                                                        */
                                                    }
                                                    <button className="btn btn-outline-primary btn-lg" type="submit">Search</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <hr></hr>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="card-title"> Order List </h2>
                                    <small className="text-muted">
                                        <div className="btn-group">
                                            <Link to="/addOrder" className="btn btn-primary btn-lg">Add Order</Link>
                                        </div>
                                    </small>
                                </div>
                                <div className="album py-5 bg-light">
                                    <div className="container">
                                        <div className="row text-center">
                                            {
                                                orders.map(order => {
                                                    return (
                                                        <Order
                                                            key={order.id.toString()}
                                                            id={order.id}
                                                            customerid={order.customerid}
                                                            name={order.name}
                                                            price={order.price}
                                                            date={order.date}
                                                            price={order.price}
                                                            notes={order.notes}
                                                            duedate={order.duedate}
                                                        ></Order>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </main>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default Orders;