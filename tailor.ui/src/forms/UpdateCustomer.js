import React, { Component } from 'react';
import UserConsumer from '../context';
import axios from 'axios'

class UpdateCustomer extends Component {

    state = {
        name: "",
        surname: "",
        phone1: "",
        phone2: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        mail: "",
        notes: "",
        date: "",
        error: false
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:1415/customers/${id}`)

        const { name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date } = response.data;
        this.setState({
            name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date
        })
    }

    validateForm = () => {
        const { name, surname } = this.state;
        if (name === "" || surname === "") {
            return false;
        }
        return true;
    }

    updateCustomer = async (dispatch, e) => {
        e.preventDefault();
        const { name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date } = this.state;
        const { id } = this.props.match.params;

        const updatedCustomer = {
            name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date
        };

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const response = await axios.put(`http://localhost:1415/customers/${id}`, updatedCustomer);
        dispatch({ type: "UPDATE_CUSTOMER", payload: response.data });

        // Redirect
        this.props.history.push("/customers");
    }
    render() {
        const { name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date, error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="container py-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update Customer</h4>
                                </div>

                                <div className="card-body">
                                    {
                                        error ?
                                            <div className="alert alert-danger">
                                                A simple danger alert for Validations !!!
                                            </div>
                                            : null
                                    }
                                    <form className="row g-3" onSubmit={this.updateCustomer.bind(this, dispatch)} >
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
                                            <label htmlFor="surname" className="form-label">Surname</label>
                                            <input type="text"
                                                name="surname"
                                                id="surname"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={surname}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone1" className="form-label">Phone</label>
                                            <input type="text"
                                                name="phone1"
                                                id="phone1"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={phone1}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone2" className="form-label">Other Phone</label>
                                            <input type="text"
                                                name="phone2"
                                                id="phone2"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={phone2}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="address1" className="form-label">Address</label>
                                            <input type="text"
                                                name="address1"
                                                id="address1"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={address1}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="address2" className="form-label">Other Address</label>
                                            <input type="text"
                                                name="address2"
                                                id="address2"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={address2}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text"
                                                name="city"
                                                id="city"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={city}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input type="text"
                                                name="state"
                                                id="state"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={state}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="mail" className="form-label">Mail</label>
                                            <input type="mail"
                                                name="mail"
                                                id="mail"
                                                placeholder="..."
                                                className="form-control form-control-lg"
                                                value={mail}
                                                onChange={this.changeInput}
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
                                        <div className="col-md-12">
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
                                        <button className="btn btn-primary btn-lg" type="submit">Update Customer</button>
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
export default UpdateCustomer;
