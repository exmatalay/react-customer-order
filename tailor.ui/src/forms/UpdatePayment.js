import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios'

class UpdatePayment extends Component {

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

    changeOrder = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeCustomer = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:1415/payments/${id}`)

        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error } = response.data;
        this.setState({
            customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error
        })
    }

    validateForm = () => {
        const { name } = this.state;
        if (name === "") {
            return false;
        }
        return true;
    }

    updatePayment = async (dispatch, e) => {
        e.preventDefault();
        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error } = this.state;
        const { id } = this.props.match.params;

        const updatedPayment = {
            customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error
        };

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.put(`http://localhost:1415/payments/${id}`, updatedPayment);
        dispatch({ type: "UPDATE_PAYMENT", payload: response.data });

        // Redirect
        this.props.history.push("/payments");
    }
    render() {
        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount, error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch, customers, orders } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update Payment</h4>
                                </div>

                                <div className="card-body">
                                    {
                                        error ?
                                            <div className="alert alert-danger">
                                                A simple danger alert for Validations !!!
                                            </div>
                                            : null
                                    }
                                    <form className="row g-3" onSubmit={this.updatePayment.bind(this, dispatch)} >
                                        <div className="form-group col-md-6">
                                            <label htmlFor="customerid" className="form-label">Customer</label>
                                            <select name="customerid" className="form-select form-control-lg" aria-label="Default select example" onChange={this.changeCustomer}>
                                                {
                                                    customers.map(customer => {
                                                        return (
                                                            <option value={customer.id} selected={customerid === customer.id ? true : false}  >{customer.name + " " + customer.surname}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="orderid" className="form-label">Order</label>
                                            <select name="orderid" className="form-select form-control-lg" aria-label="Default select example" onChange={this.changeOrder}>
                                                {
                                                    /*
                                                    orders.map(order => {
                                                        return (
                                                            <option value={order.id} selected={orderid === order.id ? true : false}  >{order.name}</option>
                                                        )
                                                    })
                                                    */

                                                    orders.filter(function (order) { // filter first for orders
                                                        return order.customerid === customerid // returns a new array
                                                    }).map(function (order) {  // map the new array to list items
                                                        return <option value={order.id}>{order.name}</option>
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
                                                onChange={this.changeInput}
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
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group col-md-12">
                                            <span className="input-group-text">Notes</span>
                                            <textarea aria-label="With textarea"
                                                type="text"
                                                name="notes"
                                                id="notes"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={notes}
                                                onChange={this.changeInput}
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
                                                    onChange={this.changeInput}
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
                                                    onChange={this.changeInput}
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
                                                    onChange={this.changeInput}
                                                />
                                                <span className="input-group-text">.00</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-lg" type="submit">Update Payment</button>
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
export default UpdatePayment;
