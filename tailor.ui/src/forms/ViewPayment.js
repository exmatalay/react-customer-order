import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios'

class ViewPayment extends Component {

    state = {
        customerid: 0,
        orderid: 0,
        name: "",
        date: "",
        notes: "",
        totalamount: "",
        paidamount: "",
        remainingamount: "",
        error: false
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:1415/payments/${id}`)

        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error } = response.data;

        this.setState({
            customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error
        })
    }

    render() {
        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { customers, orders } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update Payment</h4>
                                </div>
                                <div className="card-body">
                                    <form className="row g-3"  >
                                        <fieldset disabled>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="customerid" className="form-label">Customer</label>
                                                <select name="customerid" className="form-select" aria-label="Default select example" >
                                                    {
                                                        customers.map(customer => {
                                                            return (
                                                                <option value={customer.id} selected={customerid === customer.id ? true : false}>{customer.name + " " + customer.surname} </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="orderid" className="form-label">Order</label>
                                                <select name="orderid" className="form-select" aria-label="Default select example" >
                                                    {
                                                        orders.map(order => {
                                                            return (
                                                                <option value={order.id} selected={orderid === order.id ? true : false}>{order.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text"
                                                    id="id"
                                                    name="name"
                                                    placeholder="..."
                                                    className="form-control form-control-lg"
                                                    value={name}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="date" className="form-label">Date</label>
                                                <input type="date"
                                                    name="date"
                                                    id="date"
                                                    placeholder="..."
                                                    className="form-control form-control-lg"
                                                    value={date}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="notes" className="form-label">Notes</label>
                                                <textarea aria-label="With textarea"
                                                    type="text"
                                                    name="notes"
                                                    id="notes"
                                                    placeholder="..."
                                                    className="form-control form-control-lg"
                                                    value={notes}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="totalamount" className="form-label">Total Amount</label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">TL</span>
                                                    <input type="text"
                                                        id="totalamount"
                                                        name="totalamount"
                                                        placeholder="..."
                                                        className="form-control form-control-lg"
                                                        value={totalamount}
                                                    />
                                                    <span className="input-group-text">.00</span>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="paidamount" className="form-label">Paid Amount</label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">TL</span>
                                                    <input type="text"
                                                        id="paidamount"
                                                        name="paidamount"
                                                        placeholder="..."
                                                        className="form-control form-control-lg"
                                                        value={paidamount}
                                                    />
                                                    <span className="input-group-text">.00</span>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="remainingamount" className="form-label">Remaining Amount</label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">TL</span>
                                                    <input type="text"
                                                        id="remainingamount"
                                                        name="remainingamount"
                                                        placeholder="..."
                                                        className="form-control form-control-lg"
                                                        value={remainingamount}
                                                    />
                                                    <span className="input-group-text">.00</span>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
    }
}

export default ViewPayment;