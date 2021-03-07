import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Payment from './Payment'
import UserConsumer from "../context";

class Payments extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { payments } = value;
                        return (
                            <main className="flex-shrink-0 container py-3" >
                                <section className="py-5 text-center container">
                                    <div className="row py-lg-2">
                                        <div className="col-lg-6 col-md-8 mx-auto">
                                            <div className="d-grid gap-2">
                                                <form className="d-flex">
                                                    <input className="form-control me-2 form-control-lg" type="search" placeholder="Search" aria-label="Search" />
                                                    <button className="btn btn-outline-primary btn-lg" type="submit">Search</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <hr></hr>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="card-title"> Payment List </h2>
                                    <small className="text-muted">
                                        <div className="btn-group">
                                            <Link to="/addPayment" className="btn btn-primary btn-lg">Add Payment</Link>
                                        </div>
                                    </small>
                                </div>
                                <div className="album py-5 bg-light">
                                    <div className="container">
                                        <select className="form-select" aria-label="Default select example">
                                            {
                                                payments.map(payment => {
                                                    return (
                                                        <option value={payment.id}>{payment.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <br></br>
                                        <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                                        <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                                        <datalist id="datalistOptions" className="" style={{ color: "red", display: "block!important" }}>
                                            {
                                                payments.map(payment => {
                                                    return (
                                                        <option className="" value={payment.name} style={{ color: "red!important" }}></option>
                                                    )
                                                })
                                            }
                                        </datalist>
                                        <br></br>
                                        <div className="row text-center">
                                            {
                                                payments.map(payment => {
                                                    return (
                                                        <Payment
                                                            key={payment.id.toString()}
                                                            id={payment.id}
                                                            customerid={payment.customerid}
                                                            orderid={payment.orderid}
                                                            name={payment.name}
                                                            date={payment.date}
                                                            notes={payment.notes}
                                                            totalamount={payment.totalamount}
                                                            paidamount={payment.paidamount}
                                                            remainingamount={payment.remainingamount}
                                                        ></Payment>
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

export default Payments;