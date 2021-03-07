import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios'

class AddPayment extends Component {

    state = {
        customerid: 0,
        orderid: 0,
        name: "",
        date: new Date().toLocaleDateString("sv"),
        notes: "",
        totalamount: "",
        paidamount: "",
        remainingamount: "",
        error: false,
        first: true
    }

    validateForm = () => {
        const { name, orderid } = this.state;
        if (name === "" || orderid === "") {
            return false;
        }
        return true;
    }

    changeOrder = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    changeCustomer = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.validateForm()) {
            this.setState({
                error: false,
                first: false,
            })
        }
    }

    addPayment = async (dispatch, e) => {
        e.preventDefault();
        const { customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount } = this.state;

        const newPayment = {
            customerid, orderid, name, date, notes, totalamount, paidamount, remainingamount
        }

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.post("http://localhost:1415/payments/", newPayment)
        dispatch({ type: "ADD_PAYMENT", payload: response.data });

        // Redirect
        this.props.history.push("/payments");
    }


    componentWillUnmount() {
        console.log("componentWillUnmount");
        // component domdan silinmedne önce yapılması gerekenler yada uyarılar verilebilir
    }

    componentDidMount = async () => {
        console.log("componentDidMount");
    }

    render() {
        const { customerid, name, date, notes, totalamount, paidamount, remainingamount, error, first } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch, customers, orders } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add Payment</h4>
                                </div>

                                <div className="card-body">
                                    {
                                        error ?
                                            <div className="alert alert-danger">
                                                A simple danger alert for Validations !!!
                                            </div>
                                            :
                                            first ?
                                                null
                                                :
                                                <div className="alert alert-success" role="alert">
                                                    <h4 className="alert-heading">Well done!</h4>
                                                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                                                    <hr />
                                                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                                </div>
                                    }
                                    <form className="row g-3" onSubmit={this.addPayment.bind(this, dispatch)} >

                                        <div className="form-group col-md-12">
                                            <label htmlFor="customerid" className="form-label">Customer</label>
                                            <select name="customerid" className="form-select" aria-label="Default select example" onChange={this.changeCustomer}>
                                                {
                                                    customers.map(customer => {
                                                        return (
                                                            <option value={customer.id}>{customer.name + " " + customer.surname}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="orderid" className="form-label">Order</label>
                                            <select name="orderid" className="form-select" aria-label="Default select example" onChange={this.changeOrder}>
                                                {
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

                                        <button className="btn btn-primary btn-lg" type="submit">  Add Payment  </button>
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
export default AddPayment;
