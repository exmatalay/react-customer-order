import React, { Component } from 'react';
import axios from 'axios'
import UserConsumer from '../context';

class ViewOrder extends Component {

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

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:1415/orders/${id}`)

        const { customerid, name, price, date, notes, type, duedate, error } = response.data;
        this.setState({
            customerid, name, price, date, notes, type, duedate, error
        })
    }

    render() {
        const { customerid, name, price, date, notes, type, duedate } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { customers } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>View Customer</h4>
                                </div>
                                <div className="card-body">
                                    <form className="row g-3" >
                                        <fieldset disabled>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="customerid" className="form-label">Customer</label>
                                                <select name="customerid" className="form-select" aria-label="Default select example">
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
                                                <label htmlFor="type" className="form-label">Type</label>
                                                <input type="text"
                                                    id="id"
                                                    name="type"
                                                    placeholder="..."
                                                    className="form-control form-control-lg"
                                                    value={type}
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
                                                />
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

export default ViewOrder;