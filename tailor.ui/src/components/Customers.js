import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Customer from './Customer'
import UserConsumer from "../context";

class Customers extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { customers } = value;
                        return (
                            <main className="flex-shrink-0 container py-3" >
                                <section className="py-5 text-center container">
                                    <div className="row py-lg-2">
                                        <div className="col-lg-6 col-md-8 mx-auto">
                                            <div className="d-grid gap-2">
                                                <form className="d-flex">
                                                    <input className="form-control me-2 form-control-lg" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                                                    <datalist id="datalistOptions" className="" style={{ color: "red", display: "block!important" }}>
                                                        {
                                                            customers.map(customer => {
                                                                return (
                                                                    <option className="" value={customer.name + " " + customer.surname} style={{ color: "red!important" }}></option>
                                                                )
                                                            })
                                                        }
                                                    </datalist>
                                                    {
                                                        /* 
                                                        <select className="form-select" aria-label="Default select example">
                                                            {
                                                                customers.map(customer => {
                                                                    return (
                                                                        <option value={customer.id}>{customer.name + " " + customer.surname}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select> 
                                                        */
                                                    }
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
                                    <h2 className="card-title"> Customer List </h2>
                                    <small className="text-muted">
                                        <div className="btn-group">
                                            <Link to="/addCustomer" className="btn btn-primary btn-lg">Add Customer</Link>
                                        </div>
                                    </small>
                                </div>
                                <div className="album py-5 bg-light">
                                    <div className="container">
                                        <div className="row text-center">
                                            {
                                                customers.map(customer => {
                                                    return (
                                                        <Customer
                                                            key={customer.id.toString()}
                                                            id={customer.id}
                                                            name={customer.name}
                                                            surname={customer.surname}
                                                            phone1={customer.phone1}
                                                            phone2={customer.phone2}
                                                            address1={customer.address1}
                                                            address2={customer.address2}
                                                            city={customer.city}
                                                            state={customer.state}
                                                            mail={customer.mail}
                                                            notes={customer.notes}
                                                            date={customer.date}
                                                        ></Customer>
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
export default Customers;
