import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios'

class UpdateOrder extends Component {

    state = {
        customerid: 0,
        name: "",
        price: "",
        date: "",
        notes: "",
        type: "",
        duedate: "",
        error: false
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
        const response = await axios.get(`http://localhost:1415/orders/${id}`)

        const { customerid, name, price, date, notes, type, duedate } = response.data;
        this.setState({
            customerid,
            name,
            price,
            date,
            notes,
            type,
            duedate,
        })
    }

    validateForm = () => {
        const { name } = this.state;
        if (name === "") {
            return false;
        }
        return true;
    }

    updateOrder = async (dispatch, e) => {
        e.preventDefault();
        const { customerid, name, price, date, notes, type, duedate } = this.state;
        const { id } = this.props.match.params;

        const updatedOrder = {
            customerid, name, price, date, notes, type, duedate
        };

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.put(`http://localhost:1415/orders/${id}`, updatedOrder);
        dispatch({ type: "UPDATE_ORDER", payload: response.data });

        // Redirect
        this.props.history.push("/orders");
    }

    render() {
        const { customerid, name, price, date, notes, type, duedate, error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch, customers } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update Order</h4>
                                </div>

                                <div className="card-body">
                                    {
                                        error ?
                                            <div className="alert alert-danger">
                                                A simple danger alert for Validations !!!
                                            </div>
                                            : null
                                    }
                                    <form className="row g-3" onSubmit={this.updateOrder.bind(this, dispatch)} >
                                        <div className="form-group col-md-6">
                                            <label htmlFor="customerid" className="form-label">Customer</label>
                                            <select name="customerid" className="form-select form-control-lg" aria-label="Default select example" onChange={this.changeCustomer}>
                                                {
                                                    customers.map(customer => {
                                                        return (
                                                            <option value={customer.id} selected={customerid === customer.id ? true : false}>{customer.name + " " + customer.surname}</option>
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
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">TL</span>
                                                <input type="text"
                                                    id="id"
                                                    name="price"
                                                    placeholder="..."
                                                    className="form-control form-control-lg"
                                                    value={price}
                                                    onChange={this.changeInput}
                                                />
                                                <span className="input-group-text">.00</span>
                                            </div>
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
                                        <button className="btn btn-primary btn-lg" type="submit">Update Order</button>
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
export default UpdateOrder;
