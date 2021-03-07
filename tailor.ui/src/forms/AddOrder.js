import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios'

class AddOrder extends Component {

    state = {
        customerid: 0,
        name: "",
        price: "",
        date: new Date().toLocaleDateString("sv"),
        notes: "",
        type: "",
        duedate: new Date().toLocaleDateString("sv"),
        error: false,
        first: true
    }

    validateForm = () => {
        const { name } = this.state;
        if (name === "") {
            return false;
        }
        return true;
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
        if (this.validateForm()) {
            this.setState({
                error: false,
                first: false,
            })
        }
    }

    addOrder = async (dispatch, e) => {
        e.preventDefault();
        const { customerid, name, price, date, notes, type, duedate } = this.state;

        const newOrder = {
            customerid, name, price, date, notes, type, duedate
        }

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.post("http://localhost:1415/orders/", newOrder)
        dispatch({ type: "ADD_ORDER", payload: response.data });

        // Redirect
        this.props.history.push("/orders");
    }


    render() {
        const { name, price, date, notes, type, duedate, error, first } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch, customers } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add Order</h4>
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
                                    <form className="row g-3" onSubmit={this.addOrder.bind(this, dispatch)} >

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
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price" className="form-label">Price</label>
                                            <input type="text"
                                                id="id"
                                                name="price"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={price}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
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
                                            <label htmlFor="type" className="form-label">Type</label>
                                            <input type="text"
                                                id="id"
                                                name="type"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={type}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="duedate" className="form-label">Due Date</label>
                                            <input type="date"
                                                name="duedate"
                                                id="duedate"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={duedate}
                                                onChange={this.changeInput}
                                            />
                                        </div>

                                        <button className="btn btn-primary btn-lg" type="submit">  Add Order  </button>
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
export default AddOrder;
